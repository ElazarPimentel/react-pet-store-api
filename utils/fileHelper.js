// filename: utils/fileHelper.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

// Prometer fs
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const copyFileAsync = promisify(fs.copyFile);
const accessAsync = promisify(fs.access);

// Obtener __dirname en módulos ES :(
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorio de datos
const dataDir = path.join(__dirname, '../data');

// Parámetros de backoff exponencial
const MAX_RETRIES = 5;
const BASE_DELAY = 100; // en ms

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Función para obtener ruta en /tmp
const getTmpPath = (filename) => path.join('/tmp', filename);

// Función para inicializar archivos en /tmp si no existen
const initializeFile = async (filename) => {
    const tmpPath = getTmpPath(filename);
    const dataPath = path.join(dataDir, filename);

    try {
        await accessAsync(tmpPath, fs.constants.F_OK);
    } catch (err) {
        try {
            await copyFileAsync(dataPath, tmpPath);
            console.log(`Archivo ${filename} inicializado en /tmp`);
        } catch (copyErr) {
            throw new Error(`No se pudo inicializar el archivo ${filename}: ${copyErr.message}`);
        }
    }
};

export const readFile = async (fileName) => {
    const filePath = getTmpPath(fileName); // Usar /tmp para ruta archivo

    // Inicializar archivo si no existe
    await initializeFile(fileName);

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const data = await readFileAsync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            if (attempt === MAX_RETRIES) {
                throw new Error(`Falló al leer el archivo después de ${MAX_RETRIES} intentos: ${err.message}`);
            }
            await delay(BASE_DELAY * 2 ** (attempt - 1));
        }
    }
};

export const writeFile = async (fileName, data) => {
    const filePath = getTmpPath(fileName); // Usar /tmp para ruta archivo

    // Inicializar archivo si no existe
    await initializeFile(fileName);

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            await writeFileAsync(filePath, JSON.stringify(data, null, 2), 'utf8');
            return;
        } catch (err) {
            if (attempt === MAX_RETRIES) {
                throw new Error(`Falló al escribir el archivo después de ${MAX_RETRIES} intentos: ${err.message}`);
            }
            await delay(BASE_DELAY * 2 ** (attempt - 1));
        }
    }
};
