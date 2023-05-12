const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["pages/**/*.{ts,tsx}", "app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        "zenon-bold": ["var(--font-zenon-bold)", ...fontFamily.serif],
        "zenon-regular": ["var(--font-zenon-regular)", ...fontFamily.serif],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      colors: {
        /* :root {
  --text: #212032;
  --text-accent: #212032;
  --primary: #2e51f5;
  --secondary: #52baea;
  --bg: #ecf2f9;
  --accent: #ff0ae6;
}

:root [data-theme="dark"] {
  --text: #ecf2f9;
  --text-accent: #9afcf4;
  --primary: #2e51f5;
  --secondary: #52baea;
  --bg: #212032;
  --accent: #ff0ae6;
}
 */
        text: "var(--text)",
        "text-accent": "var(--text-accent)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        bg: "var(--bg)",
        accent: "var(--accent)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
