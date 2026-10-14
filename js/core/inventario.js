// Colección del jugador (guardada en localStorage).
window.CP = window.CP || {};
CP.Inv = (() => {
  const KEY = 'cartas_inventario_v1';
  let d = { cartas: {}, cajas: 0 };
  try { d = Object.assign(d, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) {}
  const guardar = () => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} };
  return {
    agregar(cartas) { cartas.forEach(c => d.cartas[c.id] = (d.cartas[c.id] || 0) + 1); d.cajas++; guardar(); },
    cantidad: id => d.cartas[id] || 0,
    cajasAbiertas: () => d.cajas,
    unicas: () => Object.keys(d.cartas).length,
    reiniciar() { d = { cartas: {}, cajas: 0 }; guardar(); }
  };
})();
