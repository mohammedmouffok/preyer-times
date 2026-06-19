import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext();
function DarkModeProvider(children) {
    const [darkMode, setDarkMode] = useState(false)
    function toogleDarkMode() {
        setDarkMode(!darkMode)
    }
    return (
        <DarkModeContext.Provider value={{darkMode,toogleDarkMode}}>
            {children}
         </DarkModeContext.Provider>
     )
}
function useTheme () {
    return useContext(DarkModeContext)
}
export {useTheme,DarkModeProvider}