import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

export default {
  darkMode: "media", // or 'class'
  mode: "jit",
  content: {
    files: [
      "./assets/**/*.{js,jsx,ts,tsx}",
      "./_site/**/*.html",
      "./_layouts/**/*.html",
      "./_includes/**/*.html",
      "./*.html",
      "./*.md",
      "./[!node_modules]**/*.md"
    ],
    extract,
  },
  theme: {
    container: {
      center: true,
      padding: "0",
    },
    screens: {
      ...screens,
      '2xl': '110rem',
      '3xl': '128rem'
    },
    fontSize,
    extend: {
      boxShadow: {
        "inset-display": "inset 0 3px 30px #0055aa",
      },
      scrollSnapType: {
        x: "x mandatory",
      },
      fontFamily: {
        serif: [
          '"norman-variable"',
          'serif'
        ],
        sans: [
          '"instrument-sans-variable"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ],
      },
      fontSize: {
        xs: [
          "0.75rem",
          {
            lineHeight: "1.2rem",
          },
        ],
        sm: [
          "0.82rem",
          {
            lineHeight: "1.3rem",
          },
        ],
        base: [
          "1rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        lg: [
          "1.125rem",
          {
            lineHeight: "1.75rem",
          },
        ],
        xl: [
          "1.25rem",
          {
            lineHeight: "2rem",
          },
        ],
        "2xl": [
          "1.5rem",
          {
            lineHeight: "2.5rem",
          },
        ],
        "3xl": [
          "1.75rem",
          {
            lineHeight: "2.75rem",
          },
        ],
        "4xl": [
          "2.25rem",
          {
            lineHeight: "3.25rem",
          },
        ],
        "5xl": [
          "2.625rem",
          {
            lineHeight: "3.5rem",
          },
        ],
        "6xl": [
          "3.25rem",
          {
            lineHeight: "4.6rem",
          },
        ],
        "7xl": [
          "7rem",
          {
            lineHeight: "10.5rem",
          },
        ]
      },
      colors: {
        gray: {
        '50': '#f5f6f6',
        '100': '#e5e7e8',
        '200': '#ced0d3',
        '300': '#acb0b4',
        '400': '#989DA3',
        '500': '#676d73',
        '600': '#55595e',
        '700': '#4b4e53',
        '800': '#424448',
        '900': '#3a3b3f',
        '950': '#121212',
        },
        primary: {
        '50': '#f1f6fd',
        '100': '#dfecfa',
        '200': '#c6def7',
        '300': '#9fc9f1',
        '400': '#7bb1ea',
        '500': '#508de1',
        '600': '#3c71d4',
        '700': '#325ec3',
        '800': '#2e4d9f',
        '900': '#2a437e',
        '950': '#1e2b4d',
        },
      },
      minWidth: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    fluid({
      checkSC144: false // default: true
    }),
    function ({ addUtilities }) {
      const newUtilities = {
        ".scroll-snap-x": {
          scrollSnapType: "x mandatory",
        },
        ".scroll-snap-start": {
          scrollSnapAlign: "start",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
