'use client'

import React from "react";
import {
  createContext,
  useContext,
  useState
} from 'react'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [token, setToken] = useState('eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ0b2RvX2FwcCIsImV4cCI6MTc1NTI4MjgzNywiaWF0IjoxNzUyODYzNjM3LCJpc3MiOiJ0b2RvX2FwcCIsImp0aSI6IjBlYmMzYzBjLTQ3OWItNGQ3OC04MTRjLTZlODRkY2FkMDQ4YSIsIm5iZiI6MTc1Mjg2MzYzNiwic3ViIjoiMzg2ODU0MTItZTNjNS00YWNiLWE0YzAtMzgxYzBlYzNiYTkyIiwidHlwIjoiYWNjZXNzIn0.OHl7Mq6uYy25dHUJeDSO7sI9lAE-EdjrYEY6Nl_wdku9NmItfSvV15oCdKzrusHZG4yFvnf4HWM1hozsYiYJwQ')

  return (
    <AuthContext.Provider
      value={{token, setToken}}
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