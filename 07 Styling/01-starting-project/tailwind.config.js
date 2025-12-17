// tailwind.config.js
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
        "./components/**/*.{js,jsx,ts,tsx}"
    ],
    darkMode: "class", // or 'media'
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "1.5rem",
                lg: "2rem",
                xl: "4rem",
            },
        },
        extend: {
            colors: {
                primary: {
                    50: "#f5f9ff",
                    100: "#e6f0ff",
                    200: "#bcd8ff",
                    300: "#8fbfff",
                    400: "#5796ff",
                    500: "#2b6efb",
                    600: "#1f55e6",
                    700: "#1742b4",
                    800: "#0f2f82",
                    900: "#071b51",
                },
            },
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui", "Helvetica", "Arial"],
                title: ['"Pacifico"', 'cursive'],
            },
            boxShadow: {
                "md-soft": "0 6px 18px rgba(16,24,40,0.06)",
            },
        },
    },
    variants: {
        extend: {
            opacity: ["disabled"],
            cursor: ["disabled"],
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/aspect-ratio"),
    ],
};