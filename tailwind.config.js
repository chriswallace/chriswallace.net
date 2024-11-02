module.exports = {
  darkMode: "media", // or 'class'
  mode: "jit",
  content: ["**/*.{html,md}"],
  theme: {
    container: {
      center: true, // centers the container by default
      padding: "0", // adds 1rem of padding on each side of the container
      screens: {
        sm: "640px",
        md: "900px",
        lg: "1280px",
        xl: "1640px",
        '2xl': "1920px",
        '3xl': '2560px',
        '4xl': '2940px'
      },
    },
    extend: {
      boxShadow: {
        "inset-display": "inset 0 3px 30px #0055aa",
      },
      scrollSnapType: {
        x: "x mandatory",
      },
      fontFamily: {
        sans: ["cofo-sans-mono-variable", "sans-serif"],
      },
      fontSize: {
        xs: [
          "0.83rem",
          {
            lineHeight: "2",
          },
        ],
        sm: [
          "0.9rem",
          {
            lineHeight: "2",
          },
        ],
        base: [
          "1rem",
          {
            lineHeight: "2",
            letterSpacing: "0",
          },
        ],
        lg: [
          "1.04rem",
          {
            lineHeight: "1.75",
            letterSpacing: "0",
          },
        ],
        xl: [
          "1.1rem",
          {
            lineHeight: "1.75",
            letterSpacing: "0",
          },
        ],
        "2xl": [
          "1.2rem",
          {
            lineHeight: "1.75",
            letterSpacing: "0",
          },
        ],
        "3xl": [
          "1.35rem",
          {
            lineHeight: "1.32",
            letterSpacing: "0",
          },
        ],
        "4xl": [
          "1.5rem",
          {
            lineHeight: "1.25",
            letterSpacing: "0",
          },
        ],
        "5xl": [
          "2.4rem",
          {
            lineHeight: "1.25",
            letterSpacing: "0",
          },
        ]
      },
      colors: {
        gray: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#919191",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#141414",
        },
        primary: {
          50: "#f5f4fe",
          100: "#efeafd",
          200: "#e0d8fc",
          300: "#c9b8fa",
          400: "#af90f5",
          500: "#8750ed",
          600: "#8542e5",
          700: "#7630d1",
          800: "#6328af",
          900: "#522290",
          950: "#321461",
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
