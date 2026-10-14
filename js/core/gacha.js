// Lógica de apertura: devuelve las cartas que salen de una caja.
window.CP = window.CP || {};
CP.sacarCarta = function (rarezaId, grupo) {
  const cartas = CP.CARTAS.filter(c => !grupo || c.grupo === grupo);
  if (!cartas.length) throw new Error(`No hay cartas disponibles para el grupo "${grupo}".`);
  // Si no hay cartas de esa rareza, baja a la más cercana que tenga.
  for (let i = CP.rangoRareza(rarezaId); i >= 0; i--) {
    const pool = cartas.filter(c => c.rareza === CP.RAREZAS[i].id);
    if (pool.length) return CP.azar.entre(pool);
  }
  return CP.azar.entre(cartas);
};
CP.abrirCaja = function (caja) {
  if (!CP.CARTAS.some(c => !caja.grupo || c.grupo === caja.grupo)) {
    throw new Error(`No hay cartas disponibles para la caja "${caja.nombre}".`);
  }
  const peso = r => (caja.pesos && caja.pesos[r.id] != null) ? caja.pesos[r.id] : r.peso;
  const salida = [];
  for (let n = 0; n < caja.cartas; n++) {
    let r = CP.azar.ponderado(CP.RAREZAS, peso).id;
    if (n === caja.cartas - 1 && caja.garantia && CP.rangoRareza(r) < CP.rangoRareza(caja.garantia)) r = caja.garantia;
    salida.push(CP.sacarCarta(r, caja.grupo));
  }
  return salida;
};
