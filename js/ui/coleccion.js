// Pantalla de colección: todas las cartas, las no obtenidas aparecen bloqueadas.
window.CP = window.CP || {};
CP.Coleccion = {
  filtro: 'todas',
  init(root) { this.root = root; this.render(); },
  render() {
    const root = this.root; if (!root) return;
    root.innerHTML = '';
    const barra = document.createElement('div'); barra.className = 'barra';
    barra.innerHTML = `<span>${CP.Inv.unicas()} / ${CP.CARTAS.length} cartas · ${CP.Inv.cajasAbiertas()} cajas abiertas</span>`;
    [{ id: 'todas', nombre: 'Todas', color: '#9fe' }, ...CP.RAREZAS].forEach(r => {
      const b = document.createElement('button'); b.className = 'chip' + (this.filtro === r.id ? ' on' : '');
      b.textContent = r.id === 'todas' ? r.nombre : `${r.nombre} · ${CP.CARTAS.filter(c => c.rareza === r.id).length}`; b.style.setProperty('--c', r.color);
      b.onclick = () => { this.filtro = r.id; this.render(); };
      barra.appendChild(b);
    });
    const reset = document.createElement('button'); reset.className = 'chip'; reset.textContent = 'Reiniciar';
    reset.onclick = () => { if (confirm('¿Borrar toda la colección?')) { CP.Inv.reiniciar(); this.render(); } };
    barra.appendChild(reset);
    if (CP.Cargador.origen && CP.Cargador.origen !== 'red') {
      const zips = document.createElement('button'); zips.className = 'chip'; zips.textContent = 'Cambiar zips'; zips.title = 'Olvida los zip guardados y vuelve a pedirlos';
      zips.onclick = () => CP.Cargador.olvidar().then(() => location.reload()); barra.appendChild(zips);
    }
    const grid = document.createElement('div'); grid.className = 'grid';
    CP.CARTAS.filter(c => this.filtro === 'todas' || c.rareza === this.filtro).forEach(c => {
      const n = CP.Inv.cantidad(c.id), el = CP.crearCarta(c, { bloqueada: !n });
      if (n > 1) { const x = document.createElement('i'); x.className = 'cant'; x.textContent = 'x' + n; el.appendChild(x); }
      grid.appendChild(el);
    });
    root.append(barra, grid);
  }
};
