// Lector de .zip en memoria, sin librerías. Descomprime con DecompressionStream (nativo del navegador).
window.CP = window.CP || {};
CP.Zip = (() => {
  const inflar = async datos => new Uint8Array(await new Response(new Blob([datos]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer());
  return {
    // bytes: Uint8Array con el .zip. Devuelve [{ nombre, datos() }]; datos() descomprime ese archivo solo cuando se pide.
    leer(bytes) {
      const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength), txt = new TextDecoder();
      let fin = -1;                                   // registro de fin del directorio central
      for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) if (v.getUint32(i, true) === 0x06054b50) { fin = i; break; }
      if (fin < 0) throw new Error('No es un archivo .zip válido');
      const total = v.getUint16(fin + 10, true); let p = v.getUint32(fin + 16, true);
      if (total === 0xffff || p === 0xffffffff) throw new Error('ZIP64 no está soportado');
      const lista = [];
      for (let k = 0; k < total; k++) {
        if (v.getUint32(p, true) !== 0x02014b50) throw new Error('Directorio del .zip dañado');
        const flags = v.getUint16(p + 8, true), metodo = v.getUint16(p + 10, true), tam = v.getUint32(p + 20, true);
        const nl = v.getUint16(p + 28, true), el = v.getUint16(p + 30, true), cl = v.getUint16(p + 32, true), off = v.getUint32(p + 42, true);
        const nombre = txt.decode(bytes.subarray(p + 46, p + 46 + nl)); p += 46 + nl + el + cl;
        if (nombre.endsWith('/')) continue;           // carpetas
        lista.push({ nombre, datos: async () => {
          if (flags & 1) throw new Error('El .zip está cifrado');
          if (v.getUint32(off, true) !== 0x04034b50) throw new Error('Entrada del .zip dañada: ' + nombre);
          const ini = off + 30 + v.getUint16(off + 26, true) + v.getUint16(off + 28, true), crudo = bytes.subarray(ini, ini + tam);
          if (metodo === 0) return crudo;
          if (metodo === 8) return inflar(crudo);
          throw new Error('Compresión no soportada en ' + nombre);
        } });
      }
      return lista;
    }
  };
})();
