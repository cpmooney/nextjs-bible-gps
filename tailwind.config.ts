import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'dark-gray-1': '#2F362E',
      'orange-1': '#E87334',
      'brown-1': '#766453',
      'off-white-1': '#F2EBE4',
      'orange-2': '#E87334',
      'dark-gray-2': '#484848',
      'white': '#FFFFFF',
      'off-white-2': '#E5E5EB',
      'dark-gray-3': '#2C3E50',
      'dark-gray-4': '#676986'
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
