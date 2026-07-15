/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./public/**/*.html"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50:  '#fefbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    950: '#451a03',
                    DEFAULT: '#d97706',
                },
                spice: {
                    50:  '#fef2f2',
                    100: '#fee2e2',
                    500: '#ef4444',
                    600: '#dc2626',
                    700: '#b91c1c',
                    DEFAULT: '#b91c1c',
                },
            },
            fontFamily: {
                display: ['"Plus Jakarta Sans"', 'sans-serif'],
                body:    ['"Inter"', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
