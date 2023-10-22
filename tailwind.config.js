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
            lineHeight: "1.4",
            letterSpacing: "0",
            fontWeight: "300",
          },
        ],
        sm: [
          "0.9rem",
          {
            lineHeight: "1.4",
            letterSpacing: "0",
            fontWeight: "300",
          },
        ],
        base: [
          "1rem",
          {
            lineHeight: "1.4",
            letterSpacing: "0",
            fontWeight: "300",
          },
        ],
        lg: [
          "1rem",
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
        primary: {
          50: "#FBEAE9",
          100: "#F5CECA",
          200: "#E3B2AE",
          300: "#CE9894",
          400: "#B57A75",
          500: "#AA6C67",
          600: "#925E5A",
          700: "#83514D",
          800: "#5E3632",
          900: "#462B29",
        },
        gray: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d4d4d8",
          400: "#ababb2",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
        },
        gold: {
          300: "#DEAE83",
          500: "#A16B39",
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
