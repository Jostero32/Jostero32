// Regenera la sección de proyectos del README a partir del portfolio.json de cada repo.
//
// Un repo entra si tiene la etiqueta (topic) "portfolio" y un portfolio.json en la raíz
// o en docs/. Los destacados van primero; dentro de cada grupo, los más recientes.
//
// Uso:  node scripts/proyectos.mjs            (GITHUB_TOKEN opcional, evita límites de la API)
import { readFile, writeFile } from 'node:fs/promises';

const USUARIO = 'Jostero32';
const README = new URL('../README.md', import.meta.url);
const INICIO = '<!-- PROYECTOS:INICIO -->';
const FIN = '<!-- PROYECTOS:FIN -->';
const COLUMNAS = 2;

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'perfil-proyectos' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function api(ruta) {
  const r = await fetch(`https://api.github.com${ruta}`, { headers });
  if (!r.ok) throw new Error(`${ruta}: HTTP ${r.status}`);
  return r.json();
}

async function leerFicha(repo) {
  for (const ruta of ['portfolio.json', 'docs/portfolio.json']) {
    const r = await fetch(`https://raw.githubusercontent.com/${USUARIO}/${repo.name}/${repo.default_branch}/${ruta}`);
    if (!r.ok) continue;
    try {
      return await r.json();
    } catch {
      console.warn(`portfolio.json inválido en ${repo.name}`);
    }
  }
  return null;
}

const escapar = (s = '') => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');

function tarjeta(repo, f) {
  const img = f.portada
    ? `<a href="${repo.html_url}"><img src="https://raw.githubusercontent.com/${USUARIO}/${repo.name}/${repo.default_branch}/${f.portada}" alt="${escapar(f.titulo)}" width="420" /></a><br/>`
    : '';
  const stack = (f.stack ?? []).slice(0, 6).map((t) => `\`${escapar(t)}\``).join(' ');
  const estado = f.estado ? `<br/><sub>${escapar(f.estado)}${f.anio ? ` · ${f.anio}` : ''}</sub>` : '';
  return `${img}<b><a href="${repo.html_url}">${escapar(f.titulo ?? repo.name)}</a></b><br/>${escapar(f.resumen)}<br/>${stack}${estado}`;
}

function tabla(items) {
  const filas = [];
  for (let i = 0; i < items.length; i += COLUMNAS) {
    const celdas = items.slice(i, i + COLUMNAS).map(({ repo, ficha }) => `<td width="50%" valign="top">${tarjeta(repo, ficha)}</td>`);
    while (celdas.length < COLUMNAS) celdas.push('<td width="50%"></td>');
    filas.push(`<tr>${celdas.join('')}</tr>`);
  }
  return `<table>\n${filas.join('\n')}\n</table>`;
}

const busqueda = await api(`/search/repositories?q=user:${USUARIO}+topic:portfolio+fork:false&per_page=100`);
const items = [];
for (const repo of busqueda.items) {
  if (repo.private || repo.archived) continue;
  const ficha = await leerFicha(repo);
  if (ficha) items.push({ repo, ficha });
  else console.warn(`sin portfolio.json: ${repo.name}`);
}
items.sort((a, b) =>
  Number(Boolean(b.ficha.destacado)) - Number(Boolean(a.ficha.destacado)) ||
  (b.ficha.anio ?? 0) - (a.ficha.anio ?? 0) ||
  new Date(b.repo.pushed_at) - new Date(a.repo.pushed_at),
);

const destacados = items.filter((i) => i.ficha.destacado);
const otros = items.filter((i) => !i.ficha.destacado);
let seccion = tabla(destacados);
if (otros.length) {
  seccion += `\n\n<details>\n<summary><b>Más proyectos (${otros.length})</b></summary>\n<br/>\n\n${tabla(otros)}\n\n</details>`;
}
seccion += `\n\n<sub>Sección generada automáticamente a partir del <code>portfolio.json</code> de cada repositorio · ${items.length} proyectos.</sub>`;

const readme = await readFile(README, 'utf8');
const a = readme.indexOf(INICIO);
const b = readme.indexOf(FIN);
if (a < 0 || b < a) throw new Error('No se encontraron los marcadores de la sección de proyectos en README.md');
const nuevo = `${readme.slice(0, a + INICIO.length)}\n${seccion}\n${readme.slice(b)}`;
if (nuevo !== readme) {
  await writeFile(README, nuevo);
  console.log(`README actualizado: ${destacados.length} destacados, ${otros.length} más.`);
} else {
  console.log('Sin cambios.');
}
