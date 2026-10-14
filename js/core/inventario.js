// Estado del jugador (localStorage): cartas, esencia, contadores y misiones reclamadas.
window.CP = window.CP || {};
CP.Inv = (() => {
  const KEY = 'cartas_inventario_v2';
  const base = () => ({ cartas: {}, esencia: CP.CONFIG.esenciaInicial, n: {}, reclamadas: {}, dorso: CP.DORSOS[0].id });
  let d = base();
  try { d = Object.assign(d, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) {}
  const guardar = () => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} };
  return {
    addCartas(l) { l.forEach(c => d.cartas[c.id] = (d.cartas[c.id] || 0) + 1); guardar(); },
    quitar(id, k = 1) { d.cartas[id] = Math.max(0, (d.cartas[id] || 0) - k); guardar(); },
    cantidad: id => d.cartas[id] || 0,
    extras: id => Math.max(0, (d.cartas[id] || 0) - 1),
    unicas: () => Object.values(d.cartas).filter(n => n > 0).length,
    esencia: () => d.esencia,
    ganar(n) { d.esencia += n; guardar(); },
    gastar(n) { if (d.esencia < n) return false; d.esencia -= n; guardar(); return true; },
    inc(k) { d.n[k] = (d.n[k] || 0) + 1; guardar(); },
    n: k => d.n[k] || 0,
    cajasAbiertas: () => d.n.cajas || 0,
    reclamada: id => !!d.reclamadas[id],
    reclamar(id) { d.reclamadas[id] = true; guardar(); },
    dorso: () => d.dorso,
    setDorso(id) { d.dorso = id; guardar(); },
    reiniciar() { d = base(); guardar(); }
  };
})();
