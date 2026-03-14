"use client"

import * as React from "react"

type AuthContextValue = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const login = React.useCallback(() => setIsLoggedIn(true), [])
  const logout = React.useCallback(() => setIsLoggedIn(false), [])
  const value = React.useMemo(
    () => ({ isLoggedIn, login, logout }),
    [isLoggedIn, login, logout]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export { AuthProvider, useAuth }
