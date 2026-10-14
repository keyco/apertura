// Carga las cartas al iniciar: lee los .zip EN MEMORIA (no extrae nada a disco), convierte cada .webp en una carta
// y devuelve la lista (la rareza la reparte core/distribucion.js). Admite zips dentro de zips.
window.CP = window.CP || {};
CP.Cargador = (() => {
  const GRUPOS = { personaje: { nombre: 'Personaje', orden: 0 }, vehiculo: { nombre: 'Vehículo', orden: 1 } };
  const grupoDe = ruta => /carro|vehic/i.test(ruta) ? 'vehiculo' : 'personaje';   // por el nombre del zip o de la carpeta

  // ── Caché (IndexedDB): con file:// el navegador no deja hacer fetch, así que se recuerdan los zip elegidos a mano.
  const idb = (modo, f) => new Promise((ok, no) => {
    const q = indexedDB.open('cajas_zips', 1);
    q.onupgradeneeded = () => q.result.createObjectStore('z');
    q.onerror = () => no(q.error);
    q.onsuccess = () => {
      const db = q.result, t = db.transaction('z', modo), r = f(t.objectStore('z'));
      t.oncomplete = () => { db.close(); ok(r.result); }; t.onerror = t.onabort = () => no(t.error);
    };
  });
  const Cache = {
    leer: () => idb('readonly', s => s.get('zips')).then(v => v || null).catch(() => null),
    guardar: z => idb('readwrite', s => s.put(z, 'zips')).catch(() => {}),
    borrar: () => idb('readwrite', s => s.delete('zips')).catch(() => {})
  };

  // ── Pantalla de carga
  const ui = (() => {
    let el; const q = s => el.querySelector(s);
    const crear = () => {
      if (el) return; el = document.createElement('div'); el.id = 'carga';
      el.innerHTML = `<h2>CAJAS</h2><p class="msg"></p><div class="barra-carga"><i></i></div><p class="error" hidden></p>
        <label class="soltar" hidden><input type="file" accept=".zip" multiple hidden><b>Elegir los .zip de cartas</b><small>o arrástralos aquí</small></label>`;
      document.body.appendChild(el);
    };
    return {
      progreso(txt, f) { crear(); el.hidden = false; q('.msg').textContent = txt; q('.barra-carga').hidden = false; q('.barra-carga i').style.width = Math.round((f || 0) * 100) + '%'; },
      error(txt) { crear(); el.hidden = false; q('.error').hidden = false; q('.error').textContent = txt; },
      ocultar() { if (el) el.hidden = true; },
      pedir() {
        crear(); el.hidden = false; const caja = q('.soltar'), inp = caja.querySelector('input');
        q('.msg').textContent = 'Elige cartas.zip y carros.zip (o apertura_cajas.zip). Se leen en memoria y quedan guardados para la próxima vez.';
        q('.barra-carga').hidden = true; caja.hidden = false;
        return new Promise(ok => {
          const listo = async fs => {
            fs = [...fs].filter(f => /\.zip$/i.test(f.name)); if (!fs.length) return;
            caja.hidden = true; q('.error').hidden = true; inp.value = '';
            ok(await Promise.all(fs.map(async f => ({ nombre: f.name, bytes: new Uint8Array(await f.arrayBuffer()) }))));
          };
          inp.onchange = () => listo(inp.files);
          caja.ondragover = e => { e.preventDefault(); caja.classList.add('sobre'); };
          caja.ondragleave = () => caja.classList.remove('sobre');
          caja.ondrop = e => { e.preventDefault(); caja.classList.remove('sobre'); listo(e.dataTransfer.files); };
        });
      }
    };
  })();

  // ── Lectura de zips
  const bajar = async url => { const r = await fetch(url); if (!r.ok) throw new Error(url + ': ' + r.status); return { nombre: url, bytes: new Uint8Array(await r.arrayBuffer()) }; };
  async function explorar(bytes, ruta, salida) {
    for (const f of CP.Zip.leer(bytes)) {
      const base = f.nombre.split('/').pop(), r = ruta + '/' + f.nombre;
      if (!base || base.startsWith('.') || f.nombre.startsWith('__MACOSX/')) continue;
      if (/\.zip$/i.test(base)) await explorar(await f.datos(), r, salida);          // zip dentro de zip
      else if (/\.webp$/i.test(base)) salida.push({ base, grupo: grupoDe(r), datos: f.datos });
    }
  }
  // c01.webp → carta completa · personaje_05_arriba_izq.webp / 1c_abajo_der.webp → cuadrante de una lámina
  function describir(base, grupo) {
    const G = GRUPOS[grupo].nombre, id = base.replace(/\.webp$/i, '');
    let m = id.match(/^c(\d+)$/i);
    if (m) return { id, nombre: `${G} ${m[1]}`, cod: m[1], tipo: 0, pos: 0 };
    m = id.match(/^(?:personaje_|vehiculo_|carro_)?(.+?)_(arriba|abajo)_(izq|der)$/i);
    if (m) return { id, nombre: `${G} ${m[1].toUpperCase()} · ${m[2]} ${m[3]}.`, cod: m[1], tipo: 1, pos: (m[2] === 'abajo' ? 2 : 0) + (m[3] === 'der' ? 1 : 0) };
    return { id, nombre: `${G} ${id}`, cod: id, tipo: 2, pos: 0 };
  }
  async function procesar(zips) {
    const archivos = []; for (const z of zips) await explorar(z.bytes, z.nombre, archivos);
    const vistos = new Set(), cartas = [];
    for (let i = 0; i < archivos.length; i++) {
      const a = archivos[i], d = describir(a.base, a.grupo);
      ui.progreso(`Leyendo cartas… ${i + 1} / ${archivos.length}`, (i + 1) / archivos.length);
      if (vistos.has(d.id)) { console.warn('Carta repetida, se ignora:', a.base); continue; }
      vistos.add(d.id);
      d.grupo = a.grupo; d.img = URL.createObjectURL(new Blob([await a.datos()], { type: 'image/webp' })); cartas.push(d);
    }
    const g = c => GRUPOS[c.grupo].orden;
    cartas.sort((a, b) => g(a) - g(b) || a.tipo - b.tipo || a.cod.localeCompare(b.cod, 'es', { numeric: true }) || a.pos - b.pos);
    return cartas.map(({ id, nombre, grupo, img }) => ({ id, nombre, grupo, img }));
  }

  return {
    origen: null,                                        // 'red' | 'cache' | 'archivos'
    async cargar() {
      if (typeof DecompressionStream === 'undefined') throw new Error('Este navegador es demasiado antiguo para leer .zip (falta DecompressionStream). Usa una versión reciente de Chrome, Edge, Firefox o Safari.');
      ui.progreso('Cargando cartas…', 0);
      let zips = null, origen = 'red';
      try { zips = await Promise.all(CP.FUENTES.map(bajar)); } catch (e) { zips = null; }   // servidor http: los zip de assets/
      if (!zips) { zips = await Cache.leer(); origen = 'cache'; }                           // file://: los que se eligieron antes
      for (;;) {
        try {
          if (!zips) { zips = await ui.pedir(); origen = 'archivos'; }
          const cartas = await procesar(zips);
          if (!cartas.length) throw new Error('No se encontró ninguna imagen .webp dentro de los zip.');
          if (origen === 'archivos') await Cache.guardar(zips);
          this.origen = origen; ui.ocultar(); return cartas;
        } catch (e) {
          console.error(e); if (origen === 'cache') await Cache.borrar();
          ui.error(e.message); zips = null;              // se vuelve a pedir
        }
      }
    },
    fallo: e => { console.error(e); ui.error('Error al iniciar: ' + e.message); },
    olvidar: () => Cache.borrar()
  };
})();
