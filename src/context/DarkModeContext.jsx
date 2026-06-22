import { createContext, useState,useEffect } from "react";

export const DarkModeContext = createContext();

export  function DarkModeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            return savedTheme === "dark";
        }

        // Optional fallback: Check if their computer prefers dark mode by default
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
useEffect(() => {
    if (darkMode) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}, [darkMode]);



    function toggleDarkMode() {
        setDarkMode(!darkMode);
    }

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

