import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                inter: ["var(--font-inter)"],
                poppins: ["var(--font-poppins)"],
            },
        },
    },
    plugins: [require("daisyui")],
    darkMode: ["class", "[data-theme=dracula]"],
    daisyui: {
        themes: ["light", "dracula"],
    },
};
export default config;
