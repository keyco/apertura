// Lógica de apertura: devuelve las cartas que salen de una caja.
window.CP = window.CP || {};
CP.sacarCarta = function (rarezaId) {
  // Si no hay cartas de esa rareza, baja a la más cercana que tenga.
  for (let i = CP.rangoRareza(rarezaId); i >= 0; i--) {
    const pool = CP.CARTAS.filter(c => c.rareza === CP.RAREZAS[i].id);
    if (pool.length) return CP.azar.entre(pool);
  }
  return CP.azar.entre(CP.CARTAS);
};
CP.abrirCaja = function (caja) {
  const peso = r => (caja.pesos && caja.pesos[r.id] != null) ? caja.pesos[r.id] : r.peso;
  const salida = [];
  for (let n = 0; n < caja.cartas; n++) {
    let r = CP.azar.ponderado(CP.RAREZAS, peso).id;
    if (n === caja.cartas - 1 && caja.garantia && CP.rangoRareza(r) < CP.rangoRareza(caja.garantia)) r = caja.garantia;
    salida.push(CP.sacarCarta(r));
  }
  return salida;
};
