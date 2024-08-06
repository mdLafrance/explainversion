"use client";

import { useThemeContext } from '../context/ThemeContext';
import { IconMoon, IconSun } from '@tabler/icons-react';

export default function ThemeSwitcher() {
    const [theme, setTheme] = useThemeContext() as any;

    const switchTheme = () => {
        setTheme(theme == "light" ? "dark" : "light")
    }

    return (
        <button
            className={`
                w-7 h-7 
                p-1
            `}
            onMouseUp={switchTheme}
        >

            {theme == "dark" ? <IconSun /> : <IconMoon />}

        </button>
    )
}
