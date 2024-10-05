/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/login.jpg')",
        'base-bg': "url('/base.jpg')"
      },
      colors: {
        primary: '#1D4ED8', // 好みの色に変更
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // 好みのフォントに変更
      },
    },
  },
  // ...
}
