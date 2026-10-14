// Misiones. tipo: 'lote' (todas las cartas de una rareza), 'cajas', 'fusiones', 'desencantes', 'unicas'.
// premio = esencia. Para añadir una misión, agrega un objeto aquí.
window.CP = window.CP || {};
CP.MISIONES = [
  { id: 'lote_blanca',   nombre: 'Lote Común',      desc: 'Consigue todas las cartas Comunes',      tipo: 'lote', rareza: 'blanca',   premio: 100 },
  { id: 'lote_verde',    nombre: 'Lote Poco común', desc: 'Consigue todas las cartas Poco comunes', tipo: 'lote', rareza: 'verde',    premio: 200 },
  { id: 'lote_azul',     nombre: 'Lote Raro',       desc: 'Consigue todas las cartas Raras',        tipo: 'lote', rareza: 'azul',     premio: 400 },
  { id: 'lote_morado',   nombre: 'Lote Épico',      desc: 'Consigue todas las cartas Épicas',       tipo: 'lote', rareza: 'morado',   premio: 800 },
  { id: 'lote_amarillo', nombre: 'Lote Legendario', desc: 'Consigue las 10 cartas Legendarias',     tipo: 'lote', rareza: 'amarillo', premio: 1500 },
  { id: 'lote_rojo',     nombre: 'Lote Mítico',     desc: 'Consigue todas las cartas Míticas',      tipo: 'lote', rareza: 'rojo',     premio: 3000 },
  { id: 'cajas10',   nombre: 'Abridor',       desc: 'Abre 10 cajas',            tipo: 'cajas',       meta: 10, premio: 150 },
  { id: 'cajas50',   nombre: 'Maestro de cajas', desc: 'Abre 50 cajas',         tipo: 'cajas',       meta: 50, premio: 600 },
  { id: 'fusion5',   nombre: 'Fusionador',    desc: 'Fusiona cartas 5 veces',   tipo: 'fusiones',    meta: 5,  premio: 200 },
  { id: 'desenc20',  nombre: 'Reciclador',    desc: 'Desencanta 20 cartas',     tipo: 'desencantes', meta: 20, premio: 150 },
  { id: 'todas',     nombre: 'Colección total', desc: 'Consigue todas las cartas', tipo: 'unicas',    meta: 0,  premio: 5000 }
];
