// Componente carta: imagen del personaje + marco de su rareza.
window.CP = window.CP || {};
CP.crearCarta = function (carta, { oculta = false, bloqueada = false } = {}) {
  const r = CP.rareza(carta.rareza);
  const el = document.createElement('div');
  el.className = 'carta' + (oculta ? ' oculta' : '') + (bloqueada ? ' bloqueada' : '');
  el.style.setProperty('--c', r.color);
  el.dataset.rareza = r.id;
  el.innerHTML = `<div class="giro">
    <div class="cara"><img class="arte" src="${carta.img}" alt="${carta.nombre}" draggable="false">
      <img class="marco" src="${r.marco}" alt="" draggable="false"><span class="etq">${r.nombre}</span></div>
    <div class="dorso"><span>?</span></div></div>`;
  return el;
};
