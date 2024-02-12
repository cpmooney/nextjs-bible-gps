import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'green': '#9FC088',
      'dark-green': '#3C6E71',
      'light-brown': '#E8C07D',
      'brown': '#CC704B',
      'dark-brown': '#614124',
      'white': '#FFFFFF',
      'red': '#A23E08',
      'gray': '#F0F0F0',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: []
}
export default config
