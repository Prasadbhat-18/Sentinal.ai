/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#121318',
        'surface-dim': '#121318',
        'surface-bright': '#38393f',
        'surface-container-lowest': '#0d0e13',
        'surface-container-low': '#1a1b21',
        'surface-container': '#1e1f25',
        'surface-container-high': '#292a2f',
        'surface-container-highest': '#34343a',
        'on-surface': '#e3e1e9',
        'on-surface-variant': '#b9cacb',
        outline: '#849495',
        'outline-variant': '#3b494b',
        primary: '#dbfcff',
        'on-primary': '#00363a',
        'primary-container': '#00f0ff',
        'on-primary-container': '#006970',
        secondary: '#d7ffc5',
        'secondary-container': '#2ff801',
        tertiary: '#fff2fe',
        'tertiary-container': '#f4ccff',
        error: '#ffb4ab',
        'error-container': '#93000a',
        background: '#121318',
        'on-background': '#e3e1e9',
      },
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
