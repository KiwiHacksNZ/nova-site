import sharp from "sharp";

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bg" cx="30%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#1a1f5e"/>
      <stop offset="100%" stop-color="#0a0d28"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#cf6da0" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#cf6da0" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Subtle glow -->
  <ellipse cx="600" cy="315" rx="420" ry="280" fill="url(#glow)"/>

  <!-- Stars -->
  <circle cx="80" cy="60" r="1.5" fill="white" opacity="0.6"/>
  <circle cx="200" cy="40" r="1" fill="white" opacity="0.5"/>
  <circle cx="350" cy="90" r="2" fill="white" opacity="0.4"/>
  <circle cx="520" cy="30" r="1.5" fill="white" opacity="0.7"/>
  <circle cx="700" cy="55" r="1" fill="white" opacity="0.5"/>
  <circle cx="900" cy="35" r="2" fill="white" opacity="0.4"/>
  <circle cx="1050" cy="70" r="1.5" fill="white" opacity="0.6"/>
  <circle cx="1150" cy="45" r="1" fill="white" opacity="0.5"/>
  <circle cx="1100" cy="580" r="1.5" fill="white" opacity="0.5"/>
  <circle cx="950" cy="600" r="1" fill="white" opacity="0.4"/>
  <circle cx="150" cy="560" r="2" fill="white" opacity="0.3"/>
  <circle cx="50" cy="510" r="1" fill="white" opacity="0.6"/>
  <circle cx="1180" cy="480" r="1.5" fill="white" opacity="0.4"/>

  <!-- Pink accent bar -->
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="#cf6da0"/>

  <!-- KiwiHacks label -->
  <text x="600" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="500" fill="#cf6da0" text-anchor="middle" letter-spacing="6">KIWIHACKS</text>

  <!-- NOVA headline -->
  <text x="600" y="330" font-family="system-ui, -apple-system, sans-serif" font-size="144" font-weight="700" fill="white" text-anchor="middle" letter-spacing="-4">NOVA</text>

  <!-- Tagline -->
  <text x="600" y="400" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="400" fill="rgba(255,255,255,0.75)" text-anchor="middle">Free 24-hour hackathons for NZ high schoolers</text>

  <!-- City pills -->
  <rect x="300" y="450" width="160" height="40" rx="20" fill="#4f46e5" opacity="0.85"/>
  <text x="380" y="475" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="white" text-anchor="middle">Wellington</text>

  <rect x="520" y="450" width="160" height="40" rx="20" fill="#4f46e5" opacity="0.85"/>
  <text x="600" y="475" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="white" text-anchor="middle">Christchurch</text>

  <rect x="740" y="450" width="160" height="40" rx="20" fill="#4f46e5" opacity="0.85"/>
  <text x="820" y="475" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="white" text-anchor="middle">Auckland</text>

  <!-- URL -->
  <text x="600" y="560" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="rgba(255,255,255,0.4)" text-anchor="middle">nova.kiwihacks.org</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile("public/og-image.png");

const stats = await import("fs").then(m => m.promises.stat("public/og-image.png"));
console.log(`OG image generated: ${(stats.size / 1024).toFixed(1)} KB`);
