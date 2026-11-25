// Genera assets/banner-dark.svg y assets/banner-light.svg desde una sola plantilla.
// Uso: node scripts/banner.mjs
import { mkdir, writeFile } from 'node:fs/promises';

const paletas = {
  dark: { bg1: '#0b1020', bg2: '#131c38', grid: '#1e2a4a', text: '#f1f5f9', muted: '#94a3b8', card: '#18233f', stroke: '#2b3a63', cyan: '#22d3ee', violet: '#a78bfa', amber: '#fbbf24', green: '#34d399' },
  light: { bg1: '#f8fafc', bg2: '#e8eefc', grid: '#d5def0', text: '#0f172a', muted: '#475569', card: '#ffffff', stroke: '#c7d2e8', cyan: '#0891b2', violet: '#7c3aed', amber: '#d97706', green: '#059669' },
};

const svg = (p) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 320" width="1280" height="320" font-family="Segoe UI, Inter, Roboto, Helvetica, Arial, sans-serif">
  <title>Kevin Carrasco · del pin GPIO al contenedor</title>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${p.bg1}"/><stop offset="1" stop-color="${p.bg2}"/>
    </linearGradient>
    <pattern id="puntos" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.3" fill="${p.grid}"/>
    </pattern>
    <linearGradient id="traza" x1="0" x2="1">
      <stop offset="0" stop-color="${p.amber}"/><stop offset="0.5" stop-color="${p.cyan}"/><stop offset="1" stop-color="${p.violet}"/>
    </linearGradient>
  </defs>

  <rect width="1280" height="320" rx="18" fill="url(#bg)"/>
  <rect width="1280" height="320" rx="18" fill="url(#puntos)"/>

  <!-- Texto -->
  <text x="64" y="98" font-size="15" font-weight="700" letter-spacing="3" fill="${p.cyan}">AMBATO · ECUADOR</text>
  <text x="62" y="160" font-size="56" font-weight="800" fill="${p.text}">Kevin Carrasco</text>
  <text x="64" y="202" font-size="22" font-weight="600" fill="${p.muted}">Desarrollador de software · IoT · Full stack</text>
  <text x="64" y="252" font-size="18" fill="${p.text}">Del <tspan font-family="Consolas, Menlo, monospace" fill="${p.amber}">pin GPIO</tspan> al <tspan font-family="Consolas, Menlo, monospace" fill="${p.violet}">contenedor</tspan>: firmware, protocolos, APIs y despliegue.</text>

  <!-- Ilustración: chip → protocolos → API → contenedores -->
  <g transform="translate(760,70)">
    <!-- Chip -->
    <rect x="0" y="58" width="96" height="96" rx="10" fill="${p.card}" stroke="${p.amber}" stroke-width="2.5"/>
    <rect x="22" y="80" width="52" height="52" rx="6" fill="none" stroke="${p.amber}" stroke-width="1.5" opacity="0.7"/>
    <text x="48" y="111" text-anchor="middle" font-size="13" font-weight="700" fill="${p.amber}" font-family="Consolas, Menlo, monospace">ESP32</text>
    <g stroke="${p.amber}" stroke-width="2.5" stroke-linecap="round">
      <path d="M18 58 v-12 M38 58 v-12 M58 58 v-12 M78 58 v-12 M18 154 v12 M38 154 v12 M58 154 v12 M78 154 v12"/>
    </g>

    <!-- Traza -->
    <path d="M96 106 H150 C170 106 170 60 190 60 H226 M190 60 C210 60 210 106 230 106 M150 106 C170 106 170 152 190 152 H226" fill="none" stroke="url(#traza)" stroke-width="3" stroke-linecap="round"/>
    <g font-size="11" font-weight="700" font-family="Consolas, Menlo, monospace">
      <rect x="168" y="46" width="58" height="28" rx="14" fill="${p.card}" stroke="${p.stroke}"/><text x="197" y="64" text-anchor="middle" fill="${p.cyan}">BLE</text>
      <rect x="168" y="92" width="58" height="28" rx="14" fill="${p.card}" stroke="${p.stroke}"/><text x="197" y="110" text-anchor="middle" fill="${p.cyan}">MQTT</text>
      <rect x="168" y="138" width="58" height="28" rx="14" fill="${p.card}" stroke="${p.stroke}"/><text x="197" y="156" text-anchor="middle" fill="${p.cyan}">UDP</text>
    </g>
    <path d="M226 60 H262 C276 60 276 106 290 106 M226 152 H262 C276 152 276 106 290 106 M226 106 H290" fill="none" stroke="${p.cyan}" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>

    <!-- API -->
    <rect x="290" y="78" width="84" height="56" rx="10" fill="${p.card}" stroke="${p.cyan}" stroke-width="2.5"/>
    <text x="332" y="104" text-anchor="middle" font-size="14" font-weight="800" fill="${p.cyan}">API</text>
    <text x="332" y="122" text-anchor="middle" font-size="10" fill="${p.muted}" font-family="Consolas, Menlo, monospace">REST · WS</text>
    <path d="M374 106 H408" stroke="${p.violet}" stroke-width="3" stroke-linecap="round"/>

    <!-- Contenedores -->
    <g fill="${p.card}" stroke="${p.violet}" stroke-width="2.5">
      <rect x="408" y="44" width="76" height="40" rx="8"/>
      <rect x="408" y="88" width="76" height="40" rx="8"/>
      <rect x="408" y="132" width="76" height="40" rx="8"/>
    </g>
    <g fill="${p.violet}">
      <circle cx="424" cy="64" r="4"/><circle cx="424" cy="108" r="4"/><circle cx="424" cy="152" r="4"/>
    </g>
    <g font-size="11" font-family="Consolas, Menlo, monospace" fill="${p.muted}">
      <text x="436" y="68">web</text><text x="436" y="112">api</text><text x="436" y="156">db</text>
    </g>
    <circle cx="474" cy="64" r="4" fill="${p.green}"/><circle cx="474" cy="108" r="4" fill="${p.green}"/><circle cx="474" cy="152" r="4" fill="${p.green}"/>
  </g>
</svg>
`;

await mkdir(new URL('../assets/', import.meta.url), { recursive: true });
for (const [nombre, p] of Object.entries(paletas)) {
  await writeFile(new URL(`../assets/banner-${nombre}.svg`, import.meta.url), svg(p));
}
console.log('banners generados');
