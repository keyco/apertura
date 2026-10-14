// Componente carta: imagen del personaje + marco de su rareza (el dorso sale de --dorso).
window.CP = window.CP || {};
CP.aplicarDorso = function () {
  const d = CP.DORSOS.find(x => x.id === CP.Inv.dorso()) || CP.DORSOS[0];
  // Ruta absoluta: una url() relativa dentro de una variable CSS se resuelve respecto a css/, no a index.html
  const ruta = new URL(d.img, document.baseURI).href;
  document.documentElement.style.setProperty('--dorso', `url("${ruta}")`);
};
CP.crearCarta = function (carta, { oculta = false, bloqueada = false } = {}) {
  const r = CP.rareza(carta.rareza), el = document.createElement('div');
  el.className = 'carta' + (oculta ? ' oculta' : '') + (bloqueada ? ' bloqueada' : '');
  el.style.setProperty('--c', r.color); el.dataset.rareza = r.id; el.title = carta.nombre;
  el.innerHTML = `<div class="giro"><div class="cara"><img class="arte" src="${carta.img}" alt="${carta.nombre}" draggable="false">
    <img class="marco" src="${r.marco}" alt="" draggable="false"><span class="etq">${r.nombre}</span></div><div class="dorso"></div></div>`;
  return el;
};
