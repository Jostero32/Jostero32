// Regenera las secciones de proyectos del README a partir del portfolio.json de cada repo.
//
// Un repo entra si tiene la etiqueta (topic) "portfolio" y un portfolio.json en la raíz o en docs/.
// - DESARROLLO: proyectos web, backend y full stack, en tarjetas grandes de dos columnas.
// - IOT: proyectos con categoría "iot" o "embebidos", en tarjetas compactas de tres columnas.
// Dentro de cada grupo: destacados primero, luego los más recientes.
//
// Uso:  node scripts/proyectos.mjs            (GITHUB_TOKEN opcional, evita límites de la API)
import { readFile, writeFile } from 'node:fs/promises';

const USUARIO = 'Jostero32';
const README = new URL('../README.md', import.meta.url);

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'perfil-proyectos' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function api(ruta, extra = {}) {
  const r = await fetch(`https://api.github.com${ruta}`, { headers: { ...headers, ...extra } });
  return r;
}

async function leerFicha(repo) {
  for (const ruta of ['portfolio.json', 'docs/portfolio.json']) {
    // La API de contenidos devuelve siempre la versión actual (raw.githubusercontent.com cachea minutos).
    const r = await api(`/repos/${USUARIO}/${repo.name}/contents/${ruta}?ref=${repo.default_branch}`, {
      Accept: 'application/vnd.github.raw+json',
    });
    if (!r.ok) continue;
    try {
      return await r.json();
    } catch {
      console.warn(`portfolio.json inválido en ${repo.name}`);
    }
  }
  return null;
}

const html = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Logo de Simple Icons y color para cada tecnología; las que no están salen sin logo.
const LOGOS = {
  'TypeScript': ['typescript', '3178C6'], 'JavaScript': ['javascript', 'F7DF1E'], 'Java': ['openjdk', 'F89820'],
  'Java 21': ['openjdk', 'F89820'], 'Python': ['python', '3776AB'], 'C++': ['cplusplus', '00599C'],
  'React': ['react', '61DAFB'], 'Angular': ['angular', 'DD0031'], 'Next.js': ['nextdotjs', 'FFFFFF'],
  'Vite': ['vite', '646CFF'], 'Tailwind': ['tailwindcss', '38BDF8'], 'Express': ['express', 'FFFFFF'],
  'Fastify': ['fastify', 'FFFFFF'], 'Spring Boot': ['springboot', '6DB33F'], 'Flask': ['flask', 'FFFFFF'],
  'PostgreSQL': ['postgresql', '4169E1'], 'MongoDB': ['mongodb', '47A248'], 'SQLite': ['sqlite', '7FBCE6'],
  'Redis': ['redis', 'FF4438'], 'MinIO': ['minio', 'C72E49'], 'Drizzle': ['drizzle', 'C5F74F'],
  'TypeORM': ['typeorm', 'FE0803'], 'Sequelize': ['sequelize', '52B0E7'], 'Docker': ['docker', '2496ED'],
  'nginx': ['nginx', '009639'], 'Firebase': ['firebase', 'FFCA28'], 'Render': ['render', 'FFFFFF'],
  'WebSocket': ['socketdotio', 'FFFFFF'], 'TensorFlow.js': ['tensorflow', 'FF6F00'], 'TeX Live': ['latex', 'FFFFFF'],
  'BullMQ': ['redis', 'FF4438'], 'Android': ['android', '3DDC84'], 'ESP32': ['espressif', 'E7352C'],
  'ESP32-CAM': ['espressif', 'E7352C'], 'Arduino': ['arduino', '00979D'], 'Arduino Mega': ['arduino', '00979D'],
  'Bluetooth LE': ['bluetooth', '0082FC'], 'MQTT': ['mqtt', 'C084FC'], 'Mosquitto': ['eclipsemosquitto', 'C084FC'],
  'ASP.NET Core': ['dotnet', '9B7BFF'], 'SQL Server': ['microsoftsqlserver', 'CC2927'], 'JWT': ['jsonwebtokens', 'FFFFFF'],
  'Java 17': ['openjdk', 'F89820'], 'SonarQube': ['sonarqubeserver', '4E9BCD'], 'gRPC': ['google', '4DB6AC'],
};

function badge(tecnologia) {
  const texto = tecnologia.replace(/\//g, ' · ');
  const etiqueta = encodeURIComponent(texto.replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '_'));
  const [logo, color] = LOGOS[tecnologia] ?? [];
  const extra = logo ? `&logo=${logo}&logoColor=${color}` : '';
  return `<img src="https://img.shields.io/badge/${etiqueta}-1e293b?style=flat-square${extra}" alt="${html(tecnologia)}" />`;
}

const portada = (repo, f) =>
  f.portada ? `https://raw.githubusercontent.com/${USUARIO}/${repo.name}/${repo.default_branch}/${f.portada}` : null;

// Primera oración del resumen, para las tarjetas compactas.
function corto(texto = '', max = 120) {
  const frase = texto.split(/(?<=[.:;])\s/)[0].replace(/[.:;]$/, '');
  if (frase.length <= max) return `${frase}.`;
  return `${frase.slice(0, frase.lastIndexOf(' ', max))}…`;
}

function tarjetaGrande(repo, f) {
  const img = portada(repo, f);
  return [
    `<td width="50%" valign="top">`,
    img ? `<a href="${repo.html_url}"><img src="${img}" width="100%" alt="${html(f.titulo)}" /></a>` : '',
    `<h3><a href="${repo.html_url}">${html(f.titulo ?? repo.name)}</a></h3>`,
    `<p>${html(f.resumen)}</p>`,
    `<p>${(f.stack ?? []).slice(0, 7).map(badge).join(' ')}</p>`,
    f.estado ? `<p><sub>${html(f.estado)}${f.anio ? ` · ${f.anio}` : ''}</sub></p>` : '',
    `</td>`,
  ].filter(Boolean).join('\n');
}

function tarjetaCompacta(repo, f) {
  const img = portada(repo, f);
  return [
    `<td width="33%" valign="top">`,
    img ? `<a href="${repo.html_url}"><img src="${img}" width="100%" alt="${html(f.titulo)}" /></a>` : '',
    `<b><a href="${repo.html_url}">${html(f.titulo ?? repo.name)}</a></b><br/>`,
    `<sub>${html(corto(f.resumen))}</sub><br/>`,
    `${(f.stack ?? []).slice(0, 3).map(badge).join(' ')}`,
    `</td>`,
  ].filter(Boolean).join('\n');
}

// Proyectos de compañeros en los que contribuí: se describen en colaboraciones.json de este repo.
function tarjetaEquipo(c) {
  const principal = Object.values(c.enlaces ?? {})[0];
  const enlaces = Object.entries(c.enlaces ?? {}).map(([t, u]) => `<a href="${u}">${html(t)}</a>`).join(' · ');
  return [
    `<td width="33%" valign="top">`,
    c.portada ? `<a href="${principal}"><img src="${c.portada}" width="100%" alt="${html(c.titulo)}" /></a>` : '',
    `<h3><a href="${principal}">${html(c.titulo)}</a></h3>`,
    `<p>${html(c.resumen)}</p>`,
    `<p><b>Mi aporte:</b> ${html(c.aporte)}</p>`,
    `<p>${(c.stack ?? []).map(badge).join(' ')}</p>`,
    `<p>${enlaces}</p>`,
    `</td>`,
  ].filter(Boolean).join('\n');
}

function tabla(items, columnas, tarjeta) {
  const filas = [];
  for (let i = 0; i < items.length; i += columnas) {
    const celdas = items.slice(i, i + columnas).map((it) => (it.repo ? tarjeta(it.repo, it.ficha) : tarjeta(it)));
    filas.push(`<tr>\n${celdas.join('\n')}\n</tr>`);
  }
  return `<table>\n${filas.join('\n')}\n</table>`;
}

function reemplazar(readme, nombre, contenido) {
  const inicio = `<!-- ${nombre}:INICIO -->`;
  const fin = `<!-- ${nombre}:FIN -->`;
  const a = readme.indexOf(inicio);
  const b = readme.indexOf(fin);
  if (a < 0 || b < a) throw new Error(`Faltan los marcadores ${nombre} en README.md`);
  return `${readme.slice(0, a + inicio.length)}\n${contenido}\n${readme.slice(b)}`;
}

const busqueda = await (await api(`/search/repositories?q=user:${USUARIO}+topic:portfolio+fork:false&per_page=100`)).json();
const items = [];
for (const repo of busqueda.items ?? []) {
  if (repo.private || repo.archived) continue;
  const ficha = await leerFicha(repo);
  if (ficha) items.push({ repo, ficha });
  else console.warn(`sin portfolio.json: ${repo.name}`);
}
if (!items.length) throw new Error('No se encontró ningún proyecto; se deja el README como está.');

// "orden" (opcional) fija la posición; sin él: destacados primero y luego los más recientes.
const orden = (f) => (Number.isFinite(f.orden) ? f.orden : Infinity);
items.sort((a, b) =>
  (orden(a.ficha) - orden(b.ficha) || 0) ||
  Number(Boolean(b.ficha.destacado)) - Number(Boolean(a.ficha.destacado)) ||
  (b.ficha.anio ?? 0) - (a.ficha.anio ?? 0) ||
  new Date(b.repo.pushed_at) - new Date(a.repo.pushed_at),
);

const esIot = ({ ficha }) => (ficha.categorias ?? []).some((c) => c === 'iot' || c === 'embebidos');
const desarrollo = items.filter((i) => !esIot(i));
const iot = items.filter(esIot);

const destacados = desarrollo.filter((i) => i.ficha.destacado);
const otros = desarrollo.filter((i) => !i.ficha.destacado);
let seccionDesarrollo = tabla(destacados, 2, tarjetaGrande);
if (otros.length) {
  seccionDesarrollo += `\n\n<details>\n<summary><b>Más proyectos (${otros.length})</b></summary>\n<br/>\n\n${tabla(otros, 2, tarjetaGrande)}\n\n</details>`;
}
const equipo = JSON.parse(await readFile(new URL('../colaboraciones.json', import.meta.url), 'utf8'));

const original = await readFile(README, 'utf8');
let readme = reemplazar(original, 'PROYECTOS', seccionDesarrollo);
readme = reemplazar(readme, 'EQUIPO', tabla(equipo, 3, tarjetaEquipo));
readme = reemplazar(readme, 'IOT', tabla(iot, 3, tarjetaCompacta));

if (readme !== original) {
  await writeFile(README, readme);
  console.log(`README actualizado: ${destacados.length} destacados, ${otros.length} más, ${equipo.length} en equipo, ${iot.length} de IoT.`);
} else {
  console.log('Sin cambios.');
}
