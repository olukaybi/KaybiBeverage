import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'kayora-blue': {
          100: '#E0EBF7',
          500: '#3E82CF',
          700: '#1A5BA8',
          900: '#003B7A',
        },
        'kayora-clay': {
          300: '#E1A48E',
          500: '#C45A3E',
          700: '#A04428',
        },
        'kayora-gold': {
          100: '#F5EBD0',
          500: '#C9A14A',
        },
        'kayora-ink': '#1A1A1A',
        'kayora-graphite': '#3D3D3D',
        'kayora-stone': '#6B6B6B',
        'kayora-mist': '#E8E5DF',
        'kayora-cream': '#FAF8F4',
        'kayora-success': '#2D7A4F',
        'kayora-warning': '#C49A28',
        'kayora-danger': '#B83A2E',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 4.5vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'eyebrow': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
      },
    },
  },
  plugins: [],
};

export default config;
