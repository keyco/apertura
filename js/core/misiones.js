// Progreso y recompensas de misiones.
window.CP = window.CP || {};
CP.Misiones = {
  progreso(m) {
    if (m.tipo === 'lote') { const l = CP.CARTAS.filter(c => c.rareza === m.rareza); return { act: l.filter(c => CP.Inv.cantidad(c.id) > 0).length, meta: l.length }; }
    if (m.tipo === 'unicas') return { act: CP.Inv.unicas(), meta: m.meta || CP.CARTAS.length };
    return { act: Math.min(CP.Inv.n(m.tipo), m.meta), meta: m.meta };
  },
  lista: () => CP.MISIONES.map(m => { const p = CP.Misiones.progreso(m); return { m, ...p, lista: p.meta > 0 && p.act >= p.meta, hecha: CP.Inv.reclamada(m.id) }; }),
  reclamar(id) {
    const x = this.lista().find(q => q.m.id === id);
    if (!x || !x.lista || x.hecha) return false;
    CP.Inv.reclamar(id); CP.Inv.ganar(x.m.premio); return true;
  },
  pendientes: () => CP.Misiones.lista().filter(x => x.lista && !x.hecha).length
};
