// Genera assets/banner-dark.svg y assets/banner-light.svg desde una sola plantilla.
// Uso: node scripts/banner.mjs
import { mkdir, writeFile } from 'node:fs/promises';

const paletas = {
  dark: {
    bg1: '#0a0f1c', bg2: '#111a30', glow: '#3b82f6', text: '#f1f5f9', muted: '#94a3b8', accent: '#60a5fa',
    editor: '#0d1424', barra: '#16203a', borde: '#24324f', linea: '#475569',
    kw: '#c084fc', prop: '#7dd3fc', str: '#86efac', punt: '#cbd5e1', com: '#64748b',
  },
  light: {
    bg1: '#f8fafc', bg2: '#e6edfb', glow: '#93c5fd', text: '#0f172a', muted: '#475569', accent: '#2563eb',
    editor: '#ffffff', barra: '#eef2f9', borde: '#cfd8e8', linea: '#94a3b8',
    kw: '#9333ea', prop: '#0369a1', str: '#15803d', punt: '#334155', com: '#94a3b8',
  },
};

// Cada línea del editor: lista de [tipo, texto].
const codigo = [
  [['com', '// abierto a prácticas y empleo']],
  [['kw', 'const '], ['prop', 'kevin'], ['punt', ' = {']],
  [['prop', '  rol'], ['punt', ': '], ['str', '"Full Stack Developer"'], ['punt', ',']],
  [['prop', '  frontend'], ['punt', ': ['], ['str', '"React"'], ['punt', ', '], ['str', '"Angular"'], ['punt', ', '], ['str', '"Next.js"'], ['punt', '],']],
  [['prop', '  backend'], ['punt', ': ['], ['str', '"Spring Boot"'], ['punt', ', '], ['str', '"Express"'], ['punt', ', '], ['str', '"ASP.NET"'], ['punt', '],']],
  [['prop', '  datos'], ['punt', ': ['], ['str', '"PostgreSQL"'], ['punt', ', '], ['str', '"MongoDB"'], ['punt', ', '], ['str', '"Redis"'], ['punt', '],']],
  [['prop', '  despliegue'], ['punt', ': ['], ['str', '"Docker"'], ['punt', ', '], ['str', '"nginx"'], ['punt', '],']],
  [['punt', '};']],
];

const svg = (p) => {
  const x0 = 700, y0 = 56, ancho = 540, alto = 222;
  const lineas = codigo.map((tokens, i) => {
    const y = y0 + 62 + i * 21;
    const spans = tokens.map(([t, s]) => `<tspan fill="${p[t]}">${s.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</tspan>`).join('');
    return `<text x="${x0 + 22}" y="${y}" font-size="11" fill="${p.linea}" text-anchor="end">${i + 1}</text>
    <text x="${x0 + 34}" y="${y}" font-size="14" xml:space="preserve">${spans}</text>`;
  }).join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 320" width="1280" height="320" font-family="Segoe UI, Inter, Roboto, Helvetica, Arial, sans-serif">
  <title>Kevin Carrasco · Desarrollador Full Stack</title>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${p.bg1}"/><stop offset="1" stop-color="${p.bg2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.5" r="0.45">
      <stop offset="0" stop-color="${p.glow}" stop-opacity="0.22"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="subrayado" x1="0" x2="1">
      <stop offset="0" stop-color="${p.accent}"/><stop offset="1" stop-color="${p.kw}"/>
    </linearGradient>
  </defs>

  <rect width="1280" height="320" rx="18" fill="url(#bg)"/>
  <rect width="1280" height="320" rx="18" fill="url(#glow)"/>

  <text x="64" y="104" font-size="15" font-weight="700" letter-spacing="3" fill="${p.accent}">HOLA, SOY</text>
  <text x="62" y="166" font-size="60" font-weight="800" fill="${p.text}">Kevin Carrasco</text>
  <rect x="64" y="184" width="120" height="5" rx="2.5" fill="url(#subrayado)"/>
  <text x="64" y="226" font-size="24" font-weight="600" fill="${p.text}">Desarrollador Full Stack</text>
  <text x="64" y="258" font-size="18" fill="${p.muted}">APIs, aplicaciones web y despliegue con Docker · Ambato, Ecuador</text>

  <g>
    <rect x="${x0}" y="${y0}" width="${ancho}" height="${alto}" rx="12" fill="${p.editor}" stroke="${p.borde}"/>
    <path d="M${x0} ${y0 + 12} a12 12 0 0 1 12 -12 h${ancho - 24} a12 12 0 0 1 12 12 v22 h-${ancho} z" fill="${p.barra}"/>
    <circle cx="${x0 + 20}" cy="${y0 + 17}" r="5.5" fill="#f87171"/>
    <circle cx="${x0 + 38}" cy="${y0 + 17}" r="5.5" fill="#fbbf24"/>
    <circle cx="${x0 + 56}" cy="${y0 + 17}" r="5.5" fill="#34d399"/>
    <text x="${x0 + ancho / 2}" y="${y0 + 22}" text-anchor="middle" font-size="12" fill="${p.muted}">sobre-mi.ts</text>
    <g font-family="Cascadia Code, Consolas, Menlo, monospace">
    ${lineas}
    </g>
  </g>
</svg>
`;
};

await mkdir(new URL('../assets/', import.meta.url), { recursive: true });
for (const [nombre, p] of Object.entries(paletas)) {
  await writeFile(new URL(`../assets/banner-${nombre}.svg`, import.meta.url), svg(p));
}
console.log('banners generados');
