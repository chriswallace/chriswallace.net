module.exports = {
  mode: "jit",
  content: ["**/*.{html,md}"],
  theme: {
    container: {
      center: true, // centers the container by default
      padding: "0", // adds 1rem of padding on each side of the container
      screens: {
        sm: "1280px",
        md: "1280px",
        lg: "1280px",
        xl: "1280px",
      },
    },
    extend: {
      boxShadow: {
        "inset-display": "inset 0 3px 30px #5f009e",
      },
      scrollSnapType: {
        x: "x mandatory",
      },
      fontFamily: {
        sans: ["Gabarito", "sans-serif"],
      },
      fontSize: {
        xs: [
          "0.775rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0",
            fontWeight: "300",
          },
        ],
        sm: [
          "0.9rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0",
            fontWeight: "300",
          },
        ],
        base: [
          "1.1rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0",
            fontWeight: "300",
          },
        ],
        lg: [
          "1.2rem",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.01em",
            fontWeight: "400",
          },
        ],
        xl: [
          "1.4rem",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.01em",
            fontWeight: "400",
          },
        ],
        "2xl": [
          "1.8rem",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.01em",
            fontWeight: "400",
          },
        ],
        "3xl": [
          "2.2rem",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            fontWeight: "400",
          },
        ],
        "4xl": [
          "3rem",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.04em",
            fontWeight: "400",
          },
        ],
        "5xl": [
          "8rem",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.04em",
            fontWeight: "400",
          },
        ],
      },
      colors: {
        pink: {
          '50': '#fdf2f9',
          '100': '#fde6f5',
          '200': '#fcceec',
          '300': '#fca5dc',
          '400': '#f86ec3',
          '500': '#f143a9',
          '600': '#e12289',
          '700': '#c3136d',
          '800': '#a11359',
          '900': '#86154d',
          '950': '#52052b',
        },
        gray: {
          '50': '#f7f8f8',
          '100': '#ededf1',
          '200': '#d8dadf',
          '300': '#b6b9c3',
          '400': '#8e93a2',
          '500': '#707687',
          '600': '#5a5f6f',
          '700': '#4a4d5a',
          '800': '#434651',
          '900': '#383a42',
          '950': '#25262c',
        },
        blue: {
          '50': '#f4f2ff',
          '100': '#e6e2ff',
          '200': '#dad4ff',
          '300': '#beb2ff',
          '400': '#9e86ff',
          '500': '#7f55fd',
          '600': '#7031f6',
          '700': '#6120e1',
          '800': '#501abd',
          '900': '#44179b',
          '950': '#280c69',
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
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        DEFAULT: "4px",
        md: "0.375rem",
        lg: "30px",
        full: "9999px",
        large: "12px",
      },
      typography: {
        DEFAULT: {
          css: {
            p: {
              "font-size": "1.25rem",
              "font-weight": "300",
            },
            a: {
              color: "#fff",
              "&:hover": {
                color: "#eee",
              },
            },
            pre: {
              "font-family": '"Source Code Pro", monospace',
              display: "block",
              margin: 0,
              padding: "1rem",
              "font-size": "0.8rem",
              "white-space": "pre",
              "white-space": "pre-wrap",
              "word-break": "break-all",
              "word-wrap": "break-word",
              "background-color": "#333",
              color: "#ccc",
            },
            code: {
              padding: "0.2em 0.4em",
              "font-size": "85%",
              margin: 0,
              color: "#ccc",
              "background-color": "#333",
              "border-radius": "4px",
              "font-weight": "normal",
              "&::before": {
                content: "none !important",
              },
              "&::after": {
                content: "none !important",
              },
            },
            ".highlight": {
              "white-space": "pre",
              "overflow-x": "auto",
              "border-radius": "4px",
            },
          },
        },
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
