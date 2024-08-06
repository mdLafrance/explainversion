"use client"

import { useContext, useState, createContext } from "react";

const ThemeContext = createContext(null);

export function useThemeContext() {
    const context = useContext(ThemeContext);

    if (context == null) {
        throw new Error("Theme context used without provider")
    }

    return context;
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
    const [themeSettings, setThemeSettings] = useState("dark")

    return (
        <ThemeContext.Provider
            value={[themeSettings, setThemeSettings] as any}
        >
            <div className={`${themeSettings == "dark" ? "dark" : "dark"}`} >
                {children}
            </div>
        </ThemeContext.Provider>
    )
}
