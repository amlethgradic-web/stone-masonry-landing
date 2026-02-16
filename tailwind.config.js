/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3D2416',
        secondary: '#D4B896',
        accent: '#D4B896',
        light: '#F5E6D3',
        charcoal: '#3D2416',
        copper: '#D4B896',
        cream: '#F5E6D3',
        foreground: '#F5E6D3',
        'muted-foreground': '#D4B896',
        card: '#4A2C1C',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
      boxShadow: {
        stone: '0 4px 6px rgba(0, 0, 0, 0.1)',
        elevated: '0 20px 25px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {
        'charcoal-gradient': 'linear-gradient(135deg, #3D2416 0%, #4A2C1C 100%)',
        'stone-gradient': 'linear-gradient(135deg, #4A2C1C 0%, #3D2416 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4B896 0%, #E5C9A0 100%)',
      },
    },
  },
  plugins: [],
}