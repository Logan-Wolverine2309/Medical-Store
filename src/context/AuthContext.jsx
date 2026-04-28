import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (data) => {
    // ADMIN LOGIN
    if (data.role === 'admin') {
      if (data.username === 'admin' && data.password === '1234') {
        const userData = { role: 'admin', name: 'Admin' }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return true
      }
    }

    // STAFF LOGIN
    if (data.role === 'staff') {
      if (data.username === 'staff' && data.password === '1234') {
        const userData = { role: 'staff', name: 'Staff' }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return true
      }
    }

    // CUSTOMER OTP LOGIN (DEMO)
    if (data.role === 'customer') {
      if (data.phone && data.otp === '123456') {
        const userData = { role: 'customer', phone: data.phone }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return true
      }
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
