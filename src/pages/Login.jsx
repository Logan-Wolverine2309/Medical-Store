import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

import {
  Box, Paper, Tabs, Tab, TextField,
  Button, Typography
} from '@mui/material'

const Login = () => {
  const { login, register } = useAuth()

  const [mode, setMode] = useState('login') // 🔥 login / register
  const [role, setRole] = useState('customer')

  const [form, setForm] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    employeeId: ''
  })

  // ✅ LOGIN
  const handleLogin = async (e) => {
    e.preventDefault()

    const success = await login({
      username: form.username,
      password: form.password
    })

    if (!success) alert('Invalid Credentials')
  }

  // ✅ REGISTER
  const handleRegister = async (e) => {
    e.preventDefault()

    const success = await register({ ...form, role })

    if (success) {
      alert('Account Created! Now login')
      setMode('login') // 🔥 back to login form
    } else {
      alert('Registration failed')
    }
  }

  return (
    <Box sx={{
      height:'100vh',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      background:'linear-gradient(135deg,#1976d2,#42a5f5)'
    }}>
      <Paper sx={{ p:4, width:380 }}>

        <Typography variant="h5" align="center">
          💊 MedStore {mode === 'login' ? 'Login' : 'Register'}
        </Typography>

        {/* ROLE TABS */}
        <Tabs value={role} onChange={(e,v)=>setRole(v)} centered>
          <Tab label="Admin" value="admin"/>
          <Tab label="Staff" value="staff"/>
          <Tab label="Customer" value="customer"/>
        </Tabs>

        {/* ================= LOGIN ================= */}
          {mode === 'login' && (
            <form onSubmit={handleLogin}>

              <TextField fullWidth label="Username" margin="normal"
                onChange={(e)=>setForm({...form, username:e.target.value})}
              />

              <TextField fullWidth label="Password" type="password" margin="normal"
                onChange={(e)=>setForm({...form, password:e.target.value})}
              />

              <Button fullWidth type="submit" variant="contained" sx={{ mt:2 }}>
                Login
              </Button>

              <Button
          fullWidth
          sx={{ mt:1 }}
          onClick={() => setMode('register')}
        >
          New Customer? 
        </Button>

            </form>
          )}
{/* 
          ================= REGISTER ================= */}
        {mode === 'register' && (
          <form onSubmit={handleRegister}>

            {/* COMMON */}
            <TextField fullWidth label="Full Name" margin="normal"
              onChange={(e)=>setForm({...form, name:e.target.value})}
            />

            <TextField fullWidth label="Username" margin="normal"
              onChange={(e)=>setForm({...form, username:e.target.value})}
            />

            <TextField fullWidth label="Email" margin="normal"
              onChange={(e)=>setForm({...form, email:e.target.value})}
            />

            <TextField fullWidth label="Phone Number" margin="normal"
              onChange={(e)=>setForm({...form, phone:e.target.value})}
            />

            <TextField fullWidth label="Password" type="password" margin="normal"
              onChange={(e)=>setForm({...form, password:e.target.value})}
            />

            {/* CUSTOMER */}
            {role === 'customer' && (
              <>
                <TextField fullWidth label="Address" margin="normal"
                  onChange={(e)=>setForm({...form, address:e.target.value})}
                />

                <TextField fullWidth label="Gender" margin="normal"
                  onChange={(e)=>setForm({...form, gender:e.target.value})}
                />
              </>
            )}

            {/* ADMIN / STAFF */}
            {(role === 'admin' || role === 'staff') && (
              <TextField fullWidth label="Employee ID" margin="normal"
                onChange={(e)=>setForm({...form, employeeId:e.target.value})}
              />
            )}

            <Button fullWidth type="submit" variant="contained" sx={{ mt:2 }}>
              Register
            </Button>

            <Button fullWidth sx={{ mt:1 }} onClick={()=>setMode('login')}>
              Back to Login
            </Button>

          </form>
        )}

      </Paper>
    </Box>
  )
}

export default Login