// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    // You can choose a strategy: 'class' (manual toggle) or 'media' (OS preference)
    darkMode: 'class', // or 'media'
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
