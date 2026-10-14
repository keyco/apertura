// Reparte las cartas entre las rarezas según la cuota de cada una (config/rarezas.js): muchas comunes, pocas míticas.
// Es determinista (misma carta → misma rareza en cada partida, así el inventario guardado sigue valiendo) y se hace
// por separado dentro de cada grupo (personajes, vehículos) para que todas las rarezas tengan un poco de cada tipo.
window.CP = window.CP || {};
CP.hash = s => { let h = 2166136261; for (const ch of s) { h = Math.imul(h ^ ch.charCodeAt(0), 16777619); } return h >>> 0; };
// Cuántas cartas le tocan a cada rareza de un total n (método del mayor resto: siempre suman n).
CP.cuotas = function (n) {
  const ex = CP.RAREZAS.map(r => n * r.cuota), c = ex.map(Math.floor), falta = n - c.reduce((a, b) => a + b, 0);
  ex.map((x, i) => [x - c[i], i]).sort((a, b) => b[0] - a[0]).slice(0, falta).forEach(([, i]) => c[i]++);
  return c;
};
CP.distribuir = function (cartas) {
  const grupos = {};
  cartas.forEach(c => (grupos[c.grupo] = grupos[c.grupo] || []).push(c));
  Object.values(grupos).forEach(lista => {
    const orden = lista.slice().sort((a, b) => CP.hash(a.id) - CP.hash(b.id) || a.id.localeCompare(b.id)), cuota = CP.cuotas(orden.length);
    let i = 0; CP.RAREZAS.forEach((r, k) => { for (let n = 0; n < cuota[k]; n++) orden[i++].rareza = r.id; });
  });
  cartas.forEach(c => { if (CP.RAREZA_FIJA && CP.RAREZA_FIJA[c.id]) c.rareza = CP.RAREZA_FIJA[c.id]; });
  return cartas;
};
