/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base: same navy the portfolio has always used
        canvas: '#0d1224',
        surface: {
          DEFAULT: '#111830',
          raised: '#161e3a',
        },
        line: {
          DEFAULT: 'rgb(255 255 255 / 0.08)',
          strong: 'rgb(255 255 255 / 0.14)',
        },
        ink: {
          DEFAULT: '#e8ebf4',
          muted: '#a1a9c3',
          faint: '#7d86a5',
        },
        // Signature mint accent
        accent: {
          DEFAULT: '#16f2b3',
          soft: 'rgb(22 242 179 / 0.12)',
          line: 'rgb(22 242 179 / 0.35)',
        },
        violet: {
          soft: '#a78bfa',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '72rem',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.2s ease-out both',
      },
    },
  },
  plugins: [],
}
