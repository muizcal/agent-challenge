// docWriter.ts
// For the challenge we create docs in a `generated_docs/` folder (locally) and return the paths.


import fs from 'fs';
import path from 'path';


export async function writeDocs(docs: { path: string; doc: string }[]) {
const outDir = path.join(process.cwd(), 'generated_docs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
const written: string[] = [];
for (const d of docs) {
const outPath = path.join(outDir, d.path + '.md');
const dir = path.dirname(outPath);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(outPath, d.doc);
written.push(outPath);
}
return written;
}