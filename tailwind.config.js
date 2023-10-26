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
            fontWeight: "400",
          },
        ],
        sm: [
          "0.9rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0",
            fontWeight: "400",
          },
        ],
        base: [
          "1.1rem",
          {
            lineHeight: "1.5",
            letterSpacing: "0",
            fontWeight: "400",
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
            fontWeight: "600",
          },
        ],
        "4xl": [
          "3rem",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.04em",
            fontWeight: "600",
          },
        ],
        "5xl": [
          "8rem",
          {
            lineHeight: "1.2",
            letterSpacing: "-0.04em",
            fontWeight: "600",
          },
        ],
      },
      colors: {
        pink: {
          '500': '#db4e54',
          '600': '#c9393f',
        },
        gray: {
          '50': '#f7f7f8',
          '100': '#eeeef0',
          '200': '#d9d9de',
          '300': '#b9bac0',
          '400': '#92939e',
          '500': '#757682',
          '600': '#5e5e6b',
          '700': '#4d4d57',
          '800': '#42424a',
          '900': '#3a3a40',
          '950': '#131315',
        },
        blue: {
          '50': '#f0f0ff',
          '100': '#e5e5ff',
          '200': '#cecdff',
          '300': '#aba6ff',
          '400': '#8373ff',
          '500': '#5c3bff',
          '600': '#4914ff',
          '700': '#3902ff',
          '800': '#2f01d6',
          '900': '#24039b',
          '950': '#140077',
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
