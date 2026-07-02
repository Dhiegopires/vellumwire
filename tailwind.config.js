/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './projects/**/*.html',
    './assets/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        vw: {
          base:      '#0c0b09',
          surface:   '#1c1a17',
          accent:    '#c6f135',
          accentHov: '#b0d82e',
          pri:       '#ede9e2',
          sec:       '#8a8680',
          mut:       '#84827f',
          border:    'rgba(255,255,255,0.12)'
        }
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        ui:      ['"Syne"', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace']
      }
    }
  },
  plugins: [],
}
