/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primaryColor': '#FFFFFF',
        'secondaryColor' : "#A6EE70",
        'tertiaryColor' : "#D4F4B3",
        'loginKaDabba' : "#087177",
      },
      fontFamily: {
        Changa: ['Changa', 'sans-serif'],
      },
      fontSize: {
        'large' : '50px'
      },
      textColor:{
        "ticketText" : "#087177"
      }
    },
  },
  plugins: [],
}