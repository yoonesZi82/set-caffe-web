import tailwindMotion from "tailwindcss-motion";
/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        whiteText: "#e4e6b2",
        darkBrown: "#34180e",
        lightBrown: "#3f2616",
        textBrown: "#3c2415",
        sidebarTheme: "#d2b48c",
        navbarDashboard: "#4b382a",
        contentDashboard: "#f4f4f4",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      mobile: "640px",
      tablet: "768px",
      laptop: "1024px",
      xl: "1200px",
      desktop: "1280px",
    },
    container: {
      center: true,
    },
  },
  plugins: [require("daisyui"), tailwindMotion],
};
