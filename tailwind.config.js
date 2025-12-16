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
        sans: [
          '"Bandeins Sans"',
          '"Space Grotesk"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: ['"Bandeins Sans"', '"Space Grotesk"', "serif"],
        heading: ['"Bandeins Strange"', '"Syne"', "sans-serif"],
        "heading-light": ['"Bandeins Strange"', '"Syne"', "sans-serif"],
        mono: [
          '"Kode Mono"',
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
            lineHeight: "1.1rem",
          },
        ],
        sm: [
          "0.825rem",
          {
            lineHeight: "1.2rem",
          },
        ],
        base: [
          "0.95rem",
          {
            lineHeight: "1.35rem",
          },
        ],
        lg: [
          "1rem",
          {
            lineHeight: "1.35rem",
          },
        ],
        xl: [
          "1.05rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        "2xl": [
          "1.1rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        "3xl": [
          "1.25rem",
          {
            lineHeight: "1.6rem",
          },
        ],
        "4xl": [
          "1.5rem",
          {
            lineHeight: "1.8rem",
          },
        ],
        "5xl": [
          "3.2rem",
          {
            lineHeight: "3rem",
          },
        ],
        "6xl": [
          "4.6rem",
          {
            lineHeight: "4.2rem",
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
        background: "#30804f",
        "background-dark": "#113034",
        "background-light": "#ffffff",
        "background-cream": "#f2f6e5",
        foreground: "#ffffff",
        "foreground-muted": "rgba(33, 35, 31, 0.6)",
        "foreground-dark": "#21231f",
        gray: {
          50: "#f5f8f8",
          100: "#eef0f1",
          200: "#dfe5e6",
          300: "#cbd3d6",
          400: "#b5bfc4",
          500: "#505256",
          600: "#87909b",
          700: "#787f8a",
          800: "#636a70",
          900: "#52575d",
          950: "#303336",
        },
        primary: {
          50: "#f2f6e5",
          100: "#e5f0d4",
          200: "#b6d0a1",
          300: "#8fd570",
          400: "#83e36b",
          500: "#4f9d6e",
          600: "#30804f",
          700: "#225d55",
          800: "#2b4831",
          900: "#113034",
          950: "#101410",
        },
        teal: {
          50: "#f0f7f6",
          100: "#e0efed",
          200: "#c1dfdb",
          300: "#90b9b4",
          400: "#6fa8a0",
          500: "#4f9d8e",
          600: "#3d8076",
          700: "#225d55",
          800: "#1a4a44",
          900: "#113034",
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
