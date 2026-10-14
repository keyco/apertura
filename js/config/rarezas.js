// Rarezas (de menor a mayor). peso = probabilidad relativa al abrir cajas.
// esencia = lo que da desencantar una copia repetida. fusion = copias repetidas necesarias para subir a la siguiente rareza (0 = no se fusiona).
// cuota = proporción de las cartas que pertenece a esa rareza (todas suman 1); es lo que reparte core/distribucion.js.
window.CP = window.CP || {};
CP.CONFIG = { esenciaInicial: 500 };
CP.RAREZAS = [
  { id: 'blanca',   nombre: 'Común',      color: '#e8f0f0', marco: 'assets/marcos/marco_blanca.png',   peso: 50,  esencia: 5,   fusion: 4, cuota: .32 },
  { id: 'verde',    nombre: 'Poco común', color: '#2ecc40', marco: 'assets/marcos/marco_verde.png',    peso: 28,  esencia: 10,  fusion: 4, cuota: .26 },
  { id: 'azul',     nombre: 'Rara',       color: '#2d7dff', marco: 'assets/marcos/marco_azul.png',     peso: 13,  esencia: 25,  fusion: 3, cuota: .20 },
  { id: 'morado',   nombre: 'Épica',      color: '#aa3cf0', marco: 'assets/marcos/marco_morado.png',   peso: 6,   esencia: 60,  fusion: 3, cuota: .12 },
  { id: 'amarillo', nombre: 'Legendaria', color: '#ffd400', marco: 'assets/marcos/marco_amarillo.png', peso: 2.5, esencia: 150, fusion: 3, cuota: .07 },
  { id: 'rojo',     nombre: 'Mítica',     color: '#ff2a2a', marco: 'assets/marcos/marco_rojo.png',     peso: 0.5, esencia: 400, fusion: 0, cuota: .03 }
];
CP.rareza = id => CP.RAREZAS.find(r => r.id === id);
CP.rangoRareza = id => CP.RAREZAS.findIndex(r => r.id === id);
