// Comprar cajas, desencantar y fusionar. Solo se usan copias REPETIDAS (siempre te queda 1 de cada carta).
window.CP = window.CP || {};
CP.Eco = {
  comprar: caja => caja.precio === 0 || CP.Inv.gastar(caja.precio),
  desencantar(id, todas = false) {
    const c = CP.CARTAS.find(x => x.id === id), k = todas ? CP.Inv.extras(id) : Math.min(1, CP.Inv.extras(id));
    if (!k) return 0;
    CP.Inv.quitar(id, k); const g = k * CP.rareza(c.rareza).esencia;
    CP.Inv.ganar(g); for (let i = 0; i < k; i++) CP.Inv.inc('desencantes'); return g;
  },
  desencantarRepetidas(rarezaId) {
    return CP.CARTAS.filter(c => c.rareza === rarezaId).reduce((s, c) => s + this.desencantar(c.id, true), 0);
  },
  repetidas: rarezaId => CP.CARTAS.filter(c => c.rareza === rarezaId).reduce((s, c) => s + CP.Inv.extras(c.id), 0),
  fusionar(rarezaId) {
    const r = CP.rareza(rarezaId), sig = CP.RAREZAS[CP.rangoRareza(rarezaId) + 1];
    if (!sig || !r.fusion || this.repetidas(rarezaId) < r.fusion) return null;
    let falta = r.fusion;
    for (const c of CP.CARTAS.filter(c => c.rareza === rarezaId)) {
      const k = Math.min(falta, CP.Inv.extras(c.id)); if (k) { CP.Inv.quitar(c.id, k); falta -= k; }
    }
    const pool = CP.CARTAS.filter(c => c.rareza === sig.id), nueva = CP.azar.entre(pool);
    CP.Inv.addCartas([nueva]); CP.Inv.inc('fusiones'); return nueva;
  }
};
