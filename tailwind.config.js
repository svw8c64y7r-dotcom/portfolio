/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#080B12',
          deep: '#110720',
          surface: '#101722',
          card: '#131B2B',
          cardBorder: '#1E293B',
          green: '#00FF9C',
          blue: '#00D9FF',
          purple: '#8B5CF6',
          violet: '#7C3AED',
          muted: '#8A99AD',
          danger: '#FF4A60',
          warning: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif']
      },
      boxShadow: {
        'neon-green': '0 0 20px -3px rgba(0, 255, 156, 0.35)',
        'neon-blue': '0 0 20px -3px rgba(0, 217, 255, 0.35)',
        'neon-purple': '0 0 25px -3px rgba(139, 92, 246, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar': 'radar 4s linear infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
}
