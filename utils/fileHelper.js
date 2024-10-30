// filename: utils/fileHelper.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import fs from 'fs';
import { promisify } from 'util';
import path from 'path';

// Prometer fs
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Parámetros de backoff exponencial
const MAX_RETRIES = 5;
const BASE_DELAY = 100; // en ms

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Función para obtener la ruta en /tmp
const getTmpPath = (filename) => path.join('/tmp', filename);

export const readFile = async (fileName) => {
    const filePath = getTmpPath(fileName); // Usar /tmp para la ruta del archivo
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
    const filePath = getTmpPath(fileName); // Usar /tmp para ruta  archiov
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
