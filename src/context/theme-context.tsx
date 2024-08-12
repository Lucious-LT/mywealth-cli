import { createContext, useState, useEffect, ReactNode } from "react"

type Props = {
  children: ReactNode
}

export type themeContextType = { theme: string, changeTheme: (theme: string) => void }

export const ThemeContext = createContext<themeContextType | null>(null)

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme)
  }, [])

  const changeTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>
  )
}
