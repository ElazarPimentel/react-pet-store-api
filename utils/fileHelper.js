// archivo: utils/fileHelper.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

// archivo: utils/fileHelper.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import fs from 'fs';
import { promisify } from 'util';

// Prometer fs
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// Parámetros de backoff exponencial
const MAX_RETRIES = 5;
const BASE_DELAY = 100; // en ms

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const readFile = async (filePath) => {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const data = await readFileAsync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            if (attempt === MAX_RETRIES) {
                throw new Error(`Failed to read file after ${MAX_RETRIES} attempts: ${err.message}`);
            }
            await delay(BASE_DELAY * 2 ** (attempt - 1));
        }
    }
};

export const writeFile = async (filePath, data) => {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            await writeFileAsync(filePath, JSON.stringify(data, null, 2), 'utf8');
            return;
        } catch (err) {
            if (attempt === MAX_RETRIES) {
                throw new Error(`Failed to write file after ${MAX_RETRIES} attempts: ${err.message}`);
            }
            await delay(BASE_DELAY * 2 ** (attempt - 1));
        }
    }
};
