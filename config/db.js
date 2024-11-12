// filename: config/db.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

const mongoConfig = {
    uri: 'mongodb://127.0.0.1:27017/pata_pata_petstore', 
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  };
  
  export { mongoConfig };
  