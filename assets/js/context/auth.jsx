'use client'

import React from "react";
import {
  createContext,
  useContext,
  useState
} from 'react'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const setAuthToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
    setToken(newToken)
  }

  return (
    <AuthContext.Provider
      value={{ token, setToken: setAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
