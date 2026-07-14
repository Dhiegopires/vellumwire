/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './projects/**/*.html',
    './insights/**/*.html',
    './assets/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        vw: {
          base:         '#0c0b09',
          surface:      '#1c1a17',
          surfaceHover: '#2a2722',
          card:         '#141310',
          footer:       '#0a0908',
          deep:         '#0a0a09',
          accent:       '#c6f135',
          accentHov:    '#b0d82e',
          pri:          '#ede9e2',
          sec:          '#8a8680',
          mut:          '#84827f',
          border:       'rgba(255,255,255,0.12)'
        }
      },
      fontFamily: {
        display: ['"Archivo"', 'sans-serif'],
        ui:      ['"Syne"', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace']
      }
    }
  },
  plugins: [],
}
