module.exports = {
  darkMode: "media", // or 'class'
  mode: "jit",
  content: [
    "./assets/**/*.{js,jsx,ts,tsx}",
    "./_site/**/*.html",
    "./_layouts/**/*.html",
    "./_includes/**/*.html",
    "./*.html",
    "./*.md",
    "./[!node_modules]**/*.md"
  ],
  theme: {
    container: {
      center: true, // centers the container by default
      padding: "0", // adds 1rem of padding on each side of the container
      screens: {
        'sm': "640px",
        'md': "900px", 
        'lg': "1280px",
        'xl': "1640px",
        '2xl': "1920px"
      },
    },
    extend: {
      screens: {
        '3xl': '2560px',
        '4xl': '2940px',
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
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
            lineHeight: "1.2rem",
          },
        ],
        base: [
          "16px",
          {
            lineHeight: "1.5rem",
            fontWeight: "400",
            letterSpacing: "0",
          },
        ],
        lg: [
          "1.125rem",
          {
            lineHeight: "1.9rem",
          },
        ],
        xl: [
          "1.25rem",
          {
            lineHeight: "1.9rem",
            letterSpacing: "0",
          },
        ],
        "2xl": [
          "1.5rem",
          {
            lineHeight: "2rem",
            letterSpacing: "0",
          },
        ],
        "3xl": [
          "1.75rem",
          {
            lineHeight: "3rem",
            letterSpacing: "0",
          },
        ],
        "4xl": [
          "2.25rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0",
          },
        ],
        "5xl": [
          "2.625rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0",
          },
        ],
        "6xl": [
          "3.25rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0",
          },
        ],
        "7xl": [
          "4.625rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0",
          },
        ]
      },
      colors: {
        gray: {
        '50': '#f5f6f6',
        '100': '#e5e7e8',
        '200': '#ced0d3',
        '300': '#acb0b4',
        '400': '#82888e',
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
