// Filename: utils/fileHelper.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorio de datos
const dataDir = path.join(__dirname, '../data');

// Función para obtener ruta en /tmp
const getTmpPath = (filename) => path.join('/tmp', filename);

// Inicializar archivos en /tmp si no existen
const initializeFile = async (filename) => {
  const tmpPath = getTmpPath(filename);
  const dataPath = path.join(dataDir, filename);

  try {
    await fs.access(tmpPath);
  } catch {
    try {
      await fs.copyFile(dataPath, tmpPath);
      console.log(`Archivo ${filename} inicializado en /tmp`);
    } catch (error) {
      throw new Error(`No se pudo inicializar el archivo ${filename}: ${error.message}`);
    }
  }
};

export const readFile = async (fileName) => {
  const filePath = getTmpPath(fileName);

  await initializeFile(fileName);

  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error al leer el archivo: ${error.message}`);
  }
};

export const writeFile = async (fileName, data) => {
  const filePath = getTmpPath(fileName);

  await initializeFile(fileName);

  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    throw new Error(`Error al escribir el archivo: ${error.message}`);
  }
};
