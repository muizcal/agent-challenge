// repoParser.ts
// For this starter we support 2 modes: local path scanning (developer) or repo URL fetch (basic)
// To keep this repo self-contained we will support: if repoUrl starts with "local:",
// we read the local folder. Otherwise we return a mocked repo structure.


import fs from 'fs';
import path from 'path';


export async function parseRepo(repoUrl: string) {
if (!repoUrl) {
// return a small mocked repo
return {
repoName: 'mock-repo',
files: [
{ path: 'src/index.ts', content: '// example file\nexport function add(a,b){return a+b}' },
{ path: 'src/utils.ts', content: '// helper functions\nexport const noop = () => {}' },
],
};
}


if (repoUrl.startsWith('local:')) {
const rel = repoUrl.replace('local:', '');
const base = path.resolve(process.cwd(), rel);
const files: any[] = [];
function walk(dir: string) {
for (const name of fs.readdirSync(dir)) {
const p = path.join(dir, name);
const st = fs.statSync(p);
if (st.isDirectory()) walk(p);
else {
const content = fs.readFileSync(p, 'utf-8');
files.push({ path: path.relative(base, p), content });
}
}
}
walk(base);
return { repoName: path.basename(base), files };
}


// TODO: support GitHub fetching (rate limits, auth). For now return mock.
return {
repoName: 'remote-mock',
files: [
{ path: 'index.js', content: '// remote mock' },
],
};
}