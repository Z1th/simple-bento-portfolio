import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function ensureDirAndBackup(dir, outFile) {
  // Crear carpeta si no existe
  await fs.mkdir(dir, { recursive: true });

  // Si ya existe el archivo, crear backup con timestamp
  if (existsSync(outFile)) {
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    const backupName = path.join(dir, path.basename(outFile, path.extname(outFile)) + `.backup.${ts}.json`);
    await fs.copyFile(outFile, backupName);
  }
}

export async function loadExistingProfile(filePath) {
  if (!existsSync(filePath)) {
    throw new Error(`File ${filePath} does not exist`);
  }
  
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content);
}

export async function writeProfileJSON(outFile, data) {
  // garantizar estructura limpia (puedes adaptar)
  const toWrite = {
    name: data.name,
    role: data.role,
    bio: data.bio,
    contact: data.contact,
    social: data.social
  };

  const content = JSON.stringify(toWrite, null, 2) + "\n";
  
  // Si es solo copia, crear archivo con sufijo .copy
  if (data.generateFile === "copy") {
    const dir = path.dirname(outFile);
    const name = path.basename(outFile, path.extname(outFile));
    const copyFile = path.join(dir, `${name}.copy.json`);
    await fs.writeFile(copyFile, content, "utf8");
    return copyFile;
  }
  
  await fs.writeFile(outFile, content, "utf8");
  return outFile;
}
