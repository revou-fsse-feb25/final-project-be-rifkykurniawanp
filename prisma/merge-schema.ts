// // prisma/merge-schema.ts
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const partsDir = path.join(__dirname, '../schema-parts');
// const outputFile = path.join(__dirname, 'schema.prisma');

// function getAllPrismaFiles(dir: string): string[] {
//   let results: string[] = [];
//   const list = fs.readdirSync(dir, { withFileTypes: true });

//   list.forEach((dirent) => {
//     const filePath = path.join(dir, dirent.name);
//     if (dirent.isDirectory()) {
//       results = results.concat(getAllPrismaFiles(filePath));
//     } else if (dirent.isFile() && filePath.endsWith('.prisma')) {
//       results.push(filePath);
//     }
//   });

//   return results;
// }

// // Cari semua file prisma
// const allFiles = getAllPrismaFiles(partsDir);

// // Urutkan agar base.prisma selalu pertama
// const baseFile = allFiles.find(f => path.basename(f) === 'base.prisma');
// let mergedSchema = '';

// if (baseFile) {
//   mergedSchema += `// ===== base.prisma =====\n`;
//   mergedSchema += fs.readFileSync(baseFile, 'utf-8').trim() + '\n\n';
// }

// // Ambil semua file lain selain base.prisma
// const otherFiles = allFiles
//   .filter(f => f !== baseFile)
//   .sort();

// for (const file of otherFiles) {
//   mergedSchema += `// ===== ${path.relative(partsDir, file)} =====\n`;
//   mergedSchema += fs.readFileSync(file, 'utf-8').trim() + '\n\n';
// }

// fs.writeFileSync(outputFile, mergedSchema.trim() + '\n', 'utf-8');

// console.log(`✅ schema.prisma berhasil dibuat di ${outputFile}`);
