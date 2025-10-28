import fluid, { extract, screens, fontSize } from "fluid-tailwind";

export default {
  mode: "jit",
  content: {
    files: [
      "./assets/**/*.{js,jsx,ts,tsx}",
      "./_site/**/*.html",
      "./_layouts/**/*.html",
      "./_layouts/**/*.md",
      "./_includes/**/*.md",
      "./*.html",
      "./*.md",
      "./[!node_modules]**/*.md",
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
      "2xl": "110rem",
      "3xl": "128rem",
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
        serif: ['"Tabular"', "serif"],
        sans: [
          '"Tabular"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        heading: ['"dharma-gothic-c"', "sans-serif"],
        "heading-light": ['"dharma-gothic-e"', "sans-serif"],
        mono: [
          '"Tabular"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        xs: [
          "0.75rem",
          {
            lineHeight: "1.4rem",
          },
        ],
        sm: [
          "0.825rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        base: [
          "0.95rem",
          {
            lineHeight: "1.6rem",
          },
        ],
        lg: [
          "1rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        xl: [
          "1.05rem",
          {
            lineHeight: "1.7rem",
          },
        ],
        "2xl": [
          "1.1rem",
          {
            lineHeight: "1.8rem",
          },
        ],
        "3xl": [
          "1.25rem",
          {
            lineHeight: "2.5rem",
          },
        ],
        "4xl": [
          "1.5rem",
          {
            lineHeight: "3rem",
          },
        ],
        "5xl": [
          "2.5rem",
          {
            lineHeight: "2.993rem",
          },
        ],
        "6xl": [
          "5rem",
          {
            lineHeight: "4.7rem",
          },
        ],
        "7xl": [
          "8rem",
          {
            lineHeight: "6.7rem",
          },
        ],
      },
      colors: {
        background: "#16161C",
        foreground: "#f5f8f8",
        "foreground-muted": "#b5bfc4",
        gray: {
          50: "#f5f8f8",
          100: "#eef0f1",
          200: "#dfe5e6",
          300: "#cbd3d6",
          400: "#b5bfc4",
          500: "#a1abb3",
          600: "#87909b",
          700: "#787f8a",
          800: "#636a70",
          900: "#52575d",
          950: "#303336",
        },
        primary: {
          50: "#faf9f7",
          100: "#f5f2ed",
          200: "#ebe4d9",
          300: "#ddd1c0",
          400: "#c9b89e",
          500: "#AE9C7B",
          600: "#9d8a66",
          700: "#847356",
          800: "#6d5f49",
          900: "#594f3d",
          950: "#2f2a20",
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
      maxWidth: {
        prose: "81.25ch",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    fluid({
      checkSC144: false, // default: true
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
