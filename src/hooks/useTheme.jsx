import { useContext } from "react";
import {DarkModeContext} from "../context/DarkModeContext";

export function useTheme() {
    return useContext(DarkModeContext)
}