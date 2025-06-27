/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // HTML entry point
    "./src/**/*.{js,ts,jsx,tsx}", // All source files using Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        primary: '#037eee',       // Custom blue for reuse
      },
    },
  },
  plugins: [],
};
