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
        "inset-display": "inset 0 3px 30px #0055aa",
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
        gray: {
          '50': '#f9f7f7',
          '100': '#f2eeee',
          '200': '#e7e1e1',
          '300': '#d6cbcc',
          '400': '#bdacad',
          '500': '#a18c8d',
          '600': '#8c7677',
          '700': '#746162',
          '800': '#625253',
          '900': '#544849',
          '950': '#2b2424',
        },
        primary: {
          '50': '#eff7ff',
          '100': '#deedff',
          '200': '#b6ddff',
          '300': '#76c2ff',
          '400': '#2da4ff',
          '500': '#0289f5',
          '600': '#006ad2',
          '700': '#0055aa',
          '800': '#004e98',
          '900': '#073c73',
          '950': '#04264d',
        },
        gallery: {
          '50': '#f8f8f8',
          '100': '#ebebeb',
          '200': '#dcdcdc',
        },
        rose: {
          '50': '#fcf4f4',
          '100': '#f9e7e8',
          '200': '#f5d3d4',
          '300': '#eeb3b5',
          '400': '#e59497',
          '500': '#d36064',
          '600': '#be4449',
          '700': '#9f363a',
          '800': '#843033',
          '900': '#6f2d2f',
          '950': '#3b1415',
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
