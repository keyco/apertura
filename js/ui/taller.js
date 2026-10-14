// Taller: desencantar copias repetidas por esencia y fusionarlas en una rareza superior.
window.CP = window.CP || {};
CP.Taller = {
  resultado: null,
  init(root) { this.root = root; this.render(); },
  render() {
    const root = this.root; if (!root) return; root.innerHTML = '';
    const fus = document.createElement('div'); fus.className = 'panel';
    fus.innerHTML = '<h2>Fusionar</h2><p class="nota">Combina copias repetidas de una rareza para obtener una carta de la siguiente. Siempre conservas 1 copia de cada carta.</p>';
    CP.RAREZAS.forEach((r, i) => {
      const sig = CP.RAREZAS[i + 1], rep = CP.Eco.repetidas(r.id), fila = document.createElement('div'); fila.className = 'fila-taller'; fila.style.setProperty('--c', r.color);
      fila.innerHTML = `<b>${r.nombre}</b><span>Repetidas: ${rep}${sig ? ' / ' + r.fusion : ''}</span>`;
      const f = document.createElement('button'); f.className = 'btn';
      if (sig) { f.textContent = `Fusionar ${r.fusion} → ${sig.nombre}`; f.disabled = rep < r.fusion; f.onclick = () => { this.resultado = CP.Eco.fusionar(r.id); CP.refrescar(); }; } else { f.textContent = 'Máxima rareza'; f.disabled = true; }
      const d = document.createElement('button'); d.className = 'btn'; d.textContent = `Desencantar todas (+◈ ${rep * r.esencia})`; d.disabled = !rep;
      d.onclick = () => { CP.Eco.desencantarRepetidas(r.id); CP.refrescar(); };
      fila.append(f, d); fus.appendChild(fila);
    });
    if (this.resultado) { const b = document.createElement('div'); b.className = 'resultado'; b.innerHTML = '<p>¡Nueva carta!</p>'; b.appendChild(CP.crearCarta(this.resultado)); fus.appendChild(b); }
    const des = document.createElement('div'); des.className = 'panel'; des.innerHTML = '<h2>Desencantar una copia</h2>';
    const grid = document.createElement('div'); grid.className = 'grid';
    const rep = CP.CARTAS.filter(c => CP.Inv.extras(c.id) > 0);
    if (!rep.length) des.insertAdjacentHTML('beforeend', '<p class="nota">No tienes cartas repetidas todavía.</p>');
    rep.forEach(c => {
      const w = document.createElement('div'); w.className = 'celda'; w.appendChild(CP.crearCarta(c));
      const b = document.createElement('button'); b.className = 'btn'; b.textContent = `x${CP.Inv.cantidad(c.id)} · +◈ ${CP.rareza(c.rareza).esencia}`;
      b.onclick = () => { CP.Eco.desencantar(c.id); CP.refrescar(); }; w.appendChild(b); grid.appendChild(w);
    });
    des.appendChild(grid); root.append(fus, des);
  }
};
