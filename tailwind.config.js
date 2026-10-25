/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        // Theme colors are driven by CSS variables so GSAP can tween them when the flavor changes.
        accent: 'rgb(var(--ar) var(--ag) var(--ab) / <alpha-value>)',
        accent2: 'rgb(var(--a2r) var(--a2g) var(--a2b) / <alpha-value>)',
        tint: 'rgb(var(--tr) var(--tg) var(--tb) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -10px rgb(var(--ar) var(--ag) var(--ab) / 0.55)',
        'glow-lg': '0 0 120px -20px rgb(var(--ar) var(--ag) var(--ab) / 0.65)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        pulseGlow: 'pulseGlow 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
