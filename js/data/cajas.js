// Tipos de caja. precio en esencia (0 = gratis). garantia: la última carta sale como mínimo de esa rareza.
window.CP = window.CP || {};
CP.CAJAS = [
  { id: 'basica', nombre: 'Caja Básica', grupo: 'personaje', cartas: 5, precio: 100, garantia: null, pesos: null, color: '#2d7dff', img: 'assets/cajas/caja_basica.png' },
  { id: 'elite', nombre: 'Caja Élite', grupo: 'personaje', cartas: 5, precio: 300, garantia: 'azul',
    pesos: { blanca: 25, verde: 30, azul: 25, morado: 14, amarillo: 5, rojo: 1 }, color: '#aa3cf0', img: 'assets/cajas/caja_elite.png' },
  { id: 'carros', nombre: 'Caja de Carros', grupo: 'vehiculo', cartas: 5, precio: 300, garantia: 'azul',
    pesos: { blanca: 25, verde: 30, azul: 25, morado: 14, amarillo: 5, rojo: 1 }, color: '#28d7d0', img: 'assets/cajas/caja_elite.png' }
];
