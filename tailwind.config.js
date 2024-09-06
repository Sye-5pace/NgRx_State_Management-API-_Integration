/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],

  theme: {
    screens: {
      'mobile': {'min':'200px','max':'752px'},
      'tablet': {'min':'768px','max':'1024px'},
      'laptop': {'min':'1024.1px'}
    },
    fontFamily:{
      'redhat': ['Red Hat Text', 'sans-serif'],
    },
    colors: {
      'tiamaria':'#C73B0F',
      'graphite':'#260F08',
      'beaver':'#87635A',
      'pharlap':'#AD8A85',
      'clamshell':'#CAAFA7',
      'dawnpink':'#F5EEEC',
      'fantasy':'#FCF8F6',
      'mountainmeadow':'#1EA575',
    },
    extend: {},
  },
  plugins: [],
}

