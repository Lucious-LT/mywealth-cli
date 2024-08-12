'use client'

import { ReactNode, useContext } from "react"
import { ThemeContext, themeContextType } from "./theme-context"

const ClientThemeWrapper = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext(ThemeContext) as themeContextType

  return <div data-theme={theme}>{children}</div>
}

export default ClientThemeWrapper;
