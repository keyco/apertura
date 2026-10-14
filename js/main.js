// Arranque: pestañas e inicialización de módulos.
document.addEventListener('DOMContentLoaded', () => {
  const vistas = { apertura: document.getElementById('v-apertura'), coleccion: document.getElementById('v-coleccion') };
  CP.Apertura.init(vistas.apertura);
  CP.Coleccion.init(vistas.coleccion);
  document.querySelectorAll('nav button').forEach(b => b.onclick = () => {
    document.querySelectorAll('nav button').forEach(x => x.classList.toggle('on', x === b));
    Object.entries(vistas).forEach(([k, v]) => v.hidden = k !== b.dataset.v);
  });
});
