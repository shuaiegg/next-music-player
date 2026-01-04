"use client"
import { useState, useEffect } from "react"

type Theme = "light" | "dark"

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>("light")

    useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null
        if (stored) {
            setTheme(stored)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light")
    }

    return { theme, setTheme, toggleTheme }
}
