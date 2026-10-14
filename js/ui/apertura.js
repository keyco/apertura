// Pantalla de apertura de cajas.
window.CP = window.CP || {};
CP.Apertura = {
  init(root) {
    this.root = root;
    root.innerHTML = `<div class="selector"></div><div class="escena"></div><div class="acciones"></div>`;
    const sel = root.querySelector('.selector');
    CP.CAJAS.forEach(caja => {
      const b = document.createElement('button');
      b.className = 'btn'; b.textContent = `${caja.nombre} (${caja.cartas} cartas)`;
      b.style.setProperty('--c', caja.color);
      b.onclick = () => this.mostrarCaja(caja);
      sel.appendChild(b);
    });
    this.mostrarCaja(CP.CAJAS[0]);
  },
  mostrarCaja(caja) {
    const escena = this.root.querySelector('.escena'), acc = this.root.querySelector('.acciones');
    acc.innerHTML = ''; escena.innerHTML = '';
    const el = document.createElement('div');
    el.className = 'caja'; el.style.setProperty('--c', caja.color);
    el.innerHTML = `<div class="tapa"></div><div class="cuerpo"><b>${caja.nombre}</b><small>Toca para abrir</small></div>`;
    el.onclick = () => this.abrir(caja, el);
    escena.appendChild(el);
  },
  abrir(caja, el) {
    if (el.classList.contains('abriendo')) return;
    const cartas = CP.abrirCaja(caja);
    const mejor = cartas.reduce((a, c) => CP.rangoRareza(c.rareza) > CP.rangoRareza(a.rareza) ? c : a);
    el.style.setProperty('--c', CP.rareza(mejor.rareza).color);
    el.classList.add('abriendo');
    setTimeout(() => { el.classList.add('abierta'); }, 900);
    setTimeout(() => this.revelar(caja, cartas), 1500);
  },
  revelar(caja, cartas) {
    const escena = this.root.querySelector('.escena'), acc = this.root.querySelector('.acciones');
    escena.innerHTML = ''; acc.innerHTML = '';
    const fila = document.createElement('div'); fila.className = 'fila';
    const els = cartas.map((c, i) => {
      const e = CP.crearCarta(c, { oculta: true });
      e.style.animationDelay = (i * 0.12) + 's';
      e.onclick = () => e.classList.remove('oculta');
      fila.appendChild(e); return e;
    });
    escena.appendChild(fila);
    CP.Inv.agregar(cartas);
    const todas = document.createElement('button'); todas.className = 'btn'; todas.textContent = 'Revelar todas';
    todas.onclick = () => els.forEach((e, i) => setTimeout(() => e.classList.remove('oculta'), i * 250));
    const otra = document.createElement('button'); otra.className = 'btn'; otra.textContent = 'Abrir otra caja';
    otra.onclick = () => this.mostrarCaja(caja);
    acc.append(todas, otra);
    if (CP.Coleccion) CP.Coleccion.render();
  }
};
