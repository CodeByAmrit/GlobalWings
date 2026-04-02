/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/**/*.html",
    "./public/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          deep: '#0a0c12',
          main: '#f0f3fc',
          dim: '#93adcf',
          accent: '#3b82f6',
          cyan: '#0ad2ff',
          glass: 'rgba(15, 20, 30, 0.55)',
          'glass-border': 'rgba(80, 140, 210, 0.25)',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'sky-accent': 'radial-gradient(circle at 15% 30%, rgba(20, 30, 55, 0.5) 0%, #07090f 100%)',
        'cyan-glow': 'radial-gradient(ellipse at 70% 40%, rgba(0, 160, 255, 0.2), transparent 70%)',
      }
    },
  },
  plugins: [],
}
