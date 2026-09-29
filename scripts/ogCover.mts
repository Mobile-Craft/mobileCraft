/**
 * Genera la tarjeta de Open Graph en 1200×630.
 *
 * Antes `og:image` apuntaba al retrato vertical, así que el recorte de
 * `summary_large_image` lo destrozaba. Una tarjeta con las proporciones que la
 * previsualización espera es lo que ve un reclutador antes de abrir el sitio.
 */
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;
const OUT = 'public/assets/og-cover.png';

const BG = '#141719';
const SURFACE = '#1d2124';
const TEXT = '#f4f6f7';
const DIM = '#9aa4a8';
const ACCENT = '#7fd6d0';

const CLIENTS = ['Banreservas', 'AFP Siembra', 'Grupo Humano', 'APORDOM'];

const chips = CLIENTS.map((name, index) => {
  const x = 72 + index * 262;
  return `
    <rect x="${x}" y="470" width="242" height="52" rx="26" fill="${SURFACE}" stroke="#2c3235"/>
    <text x="${x + 121}" y="503" fill="${DIM}" font-size="20" text-anchor="middle"
          font-family="Helvetica Neue, Helvetica, Arial, sans-serif">${name}</text>`;
}).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <radialGradient id="glow" cx="18%" cy="12%" r="70%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="92%" cy="88%" r="60%">
      <stop offset="0%" stop-color="#8b7fd6" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#8b7fd6" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow2)"/>
  <rect x="0" y="0" width="${WIDTH}" height="6" fill="${ACCENT}"/>

  <circle cx="82" cy="96" r="7" fill="${ACCENT}"/>
  <text x="104" y="104" fill="${DIM}" font-size="22" letter-spacing="3"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif">SANTO DOMINGO · REP. DOMINICANA</text>

  <text x="72" y="228" fill="${TEXT}" font-size="76" font-weight="700"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif">Elder Tavárez</text>

  <text x="72" y="296" fill="${ACCENT}" font-size="34" font-weight="600"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif">Ingeniero de Software Móvil</text>

  <text x="72" y="360" fill="${DIM}" font-size="27"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif">React Native · Flutter · TypeScript — 6+ años en producción</text>

  <text x="72" y="404" fill="${DIM}" font-size="27"
        font-family="Helvetica Neue, Helvetica, Arial, sans-serif">Banca · Pensiones · Seguros · Sector público</text>

  ${chips}
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(OUT, png);

const { width, height, size } = await sharp(png).metadata();
console.log(`${OUT} — ${width}×${height}, ${((size ?? 0) / 1024).toFixed(1)} kB`);
