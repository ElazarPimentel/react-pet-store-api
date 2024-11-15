// Filename: utils/fileHelper.js
// Alumno: Alessio (Elazar) Aguirre Pimentel

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../data');

export const readFile = async (fileName) => {
  const filePath = path.join(dataDir, fileName);
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await writeFile(fileName, []);
      return [];
    }
    throw error;
  }
};

export const writeFile = async (fileName, data) => {
  const filePath = path.join(dataDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8'); //No 16 
};
