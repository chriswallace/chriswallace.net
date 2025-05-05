import fluid, { extract, screens, fontSize } from "fluid-tailwind";

export default {
  darkMode: "media", // or 'class'
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
        serif: ['"New Title"', "serif"],
        sans: [
          '"General Sans"',
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
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
          "2rem",
          {
            lineHeight: "2.5rem",
          },
        ],
        "3xl": [
          "2.6rem",
          {
            lineHeight: "2.75rem",
          },
        ],
        "4xl": [
          "3.2rem",
          {
            lineHeight: "3.25rem",
          },
        ],
        "5xl": [
          "3.6rem",
          {
            lineHeight: "3.5rem",
          },
        ],
        "6xl": [
          "5rem",
          {
            lineHeight: "4.6rem",
          },
        ],
        "7xl": [
          "6rem",
          {
            lineHeight: "5.8rem",
          },
        ],
      },
      colors: {
        gray: {
          50: "#f4f5f0",
          100: "#e8e9de",
          200: "#d0d2bc",
          300: "#b7bb9b",
          400: "#9ca17a",
          500: "#7f855d",
          600: "#646947",
          700: "#4d5239",
          800: "#404331",
          900: "#373a2d",
          950: "#1c1e15",
        },
        primary: {
          50: "#ffffe5",
          100: "#fbffc8",
          200: "#f6ff97",
          300: "#ebfb5b",
          400: "#d6f00f",
          500: "#bdd80a",
          600: "#94ad03",
          700: "#6e8308",
          800: "#58670d",
          900: "#495710",
          950: "#263102",
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
