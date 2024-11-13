// filename: db/connection.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import mongoose from 'mongoose';

// Conexión con URI 
const uri = 'mongodb://localhost:27017/pata_pata_petstore';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

export default connectDB;
