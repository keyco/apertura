// Pantalla de apertura de cajas.
window.CP = window.CP || {};
CP.Apertura = {
  init(root) {
    this.root = root;
    root.innerHTML = `<div class="selector"></div><div class="escena"></div><div class="acciones"></div>`;
    const sel = root.querySelector('.selector');
    CP.CAJAS.forEach(caja => {
      const b = document.createElement('button'); b.className = 'btn';
      b.textContent = `${caja.nombre} · ${caja.precio ? '◈ ' + caja.precio : 'Gratis'}`;
      b.style.setProperty('--c', caja.color); b.onclick = () => this.mostrarCaja(caja); sel.appendChild(b);
    });
    const d = document.createElement('select'); d.className = 'btn'; d.title = 'Dorso de las cartas';
    d.innerHTML = CP.DORSOS.map(x => `<option value="${x.id}">Dorso: ${x.nombre}</option>`).join('');
    d.value = CP.Inv.dorso(); d.onchange = () => { CP.Inv.setDorso(d.value); CP.aplicarDorso(); };
    sel.appendChild(d); this.mostrarCaja(CP.CAJAS[0]);
  },
  mostrarCaja(caja) {
    const escena = this.root.querySelector('.escena'); this.root.querySelector('.acciones').innerHTML = ''; escena.innerHTML = '';
    const el = document.createElement('div'); el.className = 'caja'; el.style.setProperty('--c', caja.color);
    el.innerHTML = `<img src="${caja.img}" alt="${caja.nombre}" draggable="false"><div class="lbl"><b>${caja.nombre}</b><small>${caja.precio ? 'Abrir por ◈ ' + caja.precio : 'Toca para abrir'}</small></div>`;
    el.onclick = () => this.abrir(caja, el); escena.appendChild(el);
  },
  abrir(caja, el) {
    if (el.classList.contains('abriendo')) return;
    if (!CP.Eco.comprar(caja)) { el.querySelector('small').textContent = 'Esencia insuficiente'; return; }
    const cartas = CP.abrirCaja(caja), mejor = cartas.reduce((a, c) => CP.rangoRareza(c.rareza) > CP.rangoRareza(a.rareza) ? c : a);
    const color = CP.rareza(mejor.rareza).color;
    el.classList.add('abriendo');                                   // 1) sacude
    setTimeout(() => {                                              // 2) destello
      const f = document.createElement('div'); f.className = 'destello'; f.style.setProperty('--c', color);
      document.body.appendChild(f); setTimeout(() => f.remove(), 950);
    }, 1050);
    setTimeout(() => this.revelar(caja, cartas), 1300);             // 3) aparecen las cartas
  },
  revelar(caja, cartas) {
    const escena = this.root.querySelector('.escena'), acc = this.root.querySelector('.acciones');
    escena.innerHTML = ''; acc.innerHTML = '';
    const fila = document.createElement('div'); fila.className = 'fila';
    const els = cartas.map((c, i) => {
      const e = CP.crearCarta(c, { oculta: true }); e.style.animationDelay = (i * 0.12) + 's';
      e.onclick = () => e.classList.remove('oculta'); fila.appendChild(e); return e;
    });
    escena.appendChild(fila);
    els.forEach((e, i) => setTimeout(() => e.classList.remove('oculta'), 600 + i * 380));   // se voltean solas, una a una
    CP.Inv.addCartas(cartas); CP.Inv.inc('cajas');
    const todas = document.createElement('button'); todas.className = 'btn'; todas.textContent = 'Revelar todas';
    todas.onclick = () => els.forEach((e, i) => setTimeout(() => e.classList.remove('oculta'), i * 250));
    const otra = document.createElement('button'); otra.className = 'btn';
    otra.textContent = caja.precio ? `Abrir otra (◈ ${caja.precio})` : 'Abrir otra caja'; otra.onclick = () => this.mostrarCaja(caja);
    acc.append(todas, otra); CP.refrescar(['Coleccion', 'Taller', 'MisionesUI']);
  }
};
