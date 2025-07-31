module.exports = {
  darkMode: false,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // kalau kamu simpan file di src/
    "./node_modules/flowbite-react/**/*.js"
  ],
  plugins: [
    require("flowbite/plugin"),
  ],
};
