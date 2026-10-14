// Tipos de caja. 'garantia': la última carta sale como mínimo de esa rareza.
// 'pesos': (opcional) sobrescribe los pesos de rarezas.config para esta caja.
window.CP = window.CP || {};
CP.CAJAS = [
  { id: 'basica', nombre: 'Caja Básica', cartas: 5, garantia: null, pesos: null, color: '#2d7dff' },
  { id: 'elite',  nombre: 'Caja Élite',  cartas: 5, garantia: 'azul',
    pesos: { blanca: 25, verde: 30, azul: 25, morado: 14, amarillo: 5, rojo: 1 }, color: '#aa3cf0' }
];
