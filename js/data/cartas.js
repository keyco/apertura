// Las cartas ya NO se listan a mano: se leen de los .zip al iniciar (core/cargador.js) y se reparten en rarezas (core/distribucion.js).
window.CP = window.CP || {};
CP.CARTAS = [];                                              // se llena al iniciar
CP.FUENTES = ['assets/cartas.zip', 'assets/carros.zip'];     // zips que se leen en memoria (pueden tener zips dentro)
// Para forzar la rareza de una carta concreta, descomenta y edita (id = nombre del archivo sin .webp). Ojo: el resto no se reajusta.
CP.RAREZA_FIJA = {
  // c01: 'rojo',
};
