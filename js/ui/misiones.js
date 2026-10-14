// Pantalla de misiones.
window.CP = window.CP || {};
CP.MisionesUI = {
  init(root) { this.root = root; this.render(); },
  render() {
    const root = this.root; if (!root) return; root.innerHTML = '<div class="panel"><h2>Misiones</h2></div>';
    const panel = root.firstChild;
    CP.Misiones.lista().forEach(x => {
      const r = x.m.rareza ? CP.rareza(x.m.rareza) : null, el = document.createElement('div'); el.className = 'mision' + (x.hecha ? ' hecha' : '');
      el.style.setProperty('--c', r ? r.color : '#4ef');
      el.innerHTML = `<div class="info"><b>${x.m.nombre}</b><small>${x.m.desc}</small><div class="prog"><i style="width:${Math.min(100, x.act / x.meta * 100)}%"></i></div><small>${x.act} / ${x.meta}</small></div>`;
      const b = document.createElement('button'); b.className = 'btn';
      b.textContent = x.hecha ? 'Reclamada' : `Reclamar ◈ ${x.m.premio}`; b.disabled = !x.lista || x.hecha;
      b.onclick = () => { CP.Misiones.reclamar(x.m.id); CP.refrescar(); }; el.appendChild(b); panel.appendChild(el);
    });
  }
};
