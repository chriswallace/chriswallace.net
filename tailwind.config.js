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
          50: "#f7f7f6",
          100: "#e5e5e2",
          200: "#cacac5",
          300: "#a7a8a0",
          400: "#7c7d73",
          500: "#6a6b61",
          600: "#54554c",
          700: "#45463f",
          800: "#393a35",
          900: "#31322f",
          950: "#1a1b18",
        },
        primary: {
          50: "#fcfde9",
          100: "#f8fbc6",
          200: "#f7f990",
          300: "#f5f24f",
          400: "#f0e31f",
          500: "#e0cb12",
          600: "#c1a00d",
          700: "#9a750e",
          800: "#805c13",
          900: "#6d4b16",
          950: "#3f2809",
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
