// Filename: config/db.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import mongoose from 'mongoose';



export async function connectDB() {

  try {
    await mongoose.connect('mongodb://localhost:27017/pata_pata_petstore');
    console.log('Conectado a MongoDB');


  } catch (error) {
    console.error('Error de conexión a MongoDB:', error.message);
    process.exit(1);
  }

}
