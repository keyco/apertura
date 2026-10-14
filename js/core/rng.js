// Utilidades de azar.
window.CP = window.CP || {};
CP.azar = {
  entre: arr => arr[Math.floor(Math.random() * arr.length)],
  ponderado(items, peso) {
    const total = items.reduce((s, i) => s + peso(i), 0);
    let r = Math.random() * total;
    for (const i of items) { r -= peso(i); if (r <= 0) return i; }
    return items[items.length - 1];
  }
};
