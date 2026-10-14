// Rarezas: orden de menor a mayor. 'peso' = probabilidad relativa de salir.
window.CP = window.CP || {};
CP.RAREZAS = [
  { id: 'blanca',   nombre: 'Común',      color: '#e8f0f0', marco: 'assets/marcos/marco_blanca.png',   peso: 50 },
  { id: 'verde',    nombre: 'Poco común', color: '#2ecc40', marco: 'assets/marcos/marco_verde.png',    peso: 28 },
  { id: 'azul',     nombre: 'Rara',       color: '#2d7dff', marco: 'assets/marcos/marco_azul.png',     peso: 13 },
  { id: 'morado',   nombre: 'Épica',      color: '#aa3cf0', marco: 'assets/marcos/marco_morado.png',   peso: 6 },
  { id: 'amarillo', nombre: 'Legendaria', color: '#ffd400', marco: 'assets/marcos/marco_amarillo.png', peso: 2.5 },
  { id: 'rojo',     nombre: 'Mítica',     color: '#ff2a2a', marco: 'assets/marcos/marco_rojo.png',     peso: 0.5 }
];
CP.rareza = id => CP.RAREZAS.find(r => r.id === id);
CP.rangoRareza = id => CP.RAREZAS.findIndex(r => r.id === id);
