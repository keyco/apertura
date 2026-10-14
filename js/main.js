// Arranque: pestañas, esencia en cabecera e inicialización de módulos.
CP.refrescar = function (solo) {
  document.getElementById('esencia').textContent = '◈ ' + CP.Inv.esencia();
  const n = CP.Misiones.pendientes(), b = document.getElementById('badge'); b.textContent = n; b.hidden = !n;
  (solo || ['Coleccion', 'Taller', 'MisionesUI']).forEach(k => CP[k] && CP[k].render());
};
document.addEventListener('DOMContentLoaded', () => {
  CP.aplicarDorso();
  const vistas = {};
  document.querySelectorAll('main > section').forEach(s => vistas[s.id.slice(2)] = s);
  CP.Apertura.init(vistas.apertura); CP.Coleccion.init(vistas.coleccion); CP.Taller.init(vistas.taller); CP.MisionesUI.init(vistas.misiones);
  document.querySelectorAll('nav button').forEach(b => b.onclick = () => {
    document.querySelectorAll('nav button').forEach(x => x.classList.toggle('on', x === b));
    Object.entries(vistas).forEach(([k, v]) => v.hidden = k !== b.dataset.v);
  });
  // Agregar esencia
  const menu = document.getElementById('menu-agregar'), inp = document.getElementById('agregar-n');
  const agregar = n => { if (CP.Eco.agregar(n)) { CP.refrescar(); inp.value = ''; menu.hidden = true; } };
  document.getElementById('btn-agregar').onclick = e => { e.stopPropagation(); menu.hidden = !menu.hidden; };
  menu.onclick = e => e.stopPropagation();
  document.addEventListener('click', () => menu.hidden = true);
  menu.querySelectorAll('[data-n]').forEach(b => b.onclick = () => agregar(b.dataset.n));
  document.getElementById('agregar-ok').onclick = () => agregar(inp.value);
  inp.onkeydown = e => { if (e.key === 'Enter') agregar(inp.value); };
  CP.refrescar();
});
