import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import {
  Box, Paper, Tabs, Tab, TextField,
  Button, Typography
} from '@mui/material'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [role, setRole] = useState('admin')
  const [form, setForm] = useState({
    username: '',
    password: '',
    phone: '',
    otp: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const success = login({ ...form, role })

    if (success) {
      navigate('/', { replace: true })
    } else {
      alert('Invalid Credentials')
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg,#1976d2,#42a5f5)'
      }}
    >
      <Paper sx={{ p: 4, width: 350, borderRadius: 3 }} elevation={10}>
        
        <Typography variant="h5" align="center" mb={2}>
          💊 MedStore Login
        </Typography>

        {/* ROLE SWITCH */}
        <Tabs value={role} onChange={(e, v) => setRole(v)} centered>
          <Tab label="Admin" value="admin" />
          <Tab label="Staff" value="staff" />
          <Tab label="Customer" value="customer" />
        </Tabs>

        <form onSubmit={handleSubmit}>
          
          {/* ADMIN / STAFF */}
          {(role === 'admin' || role === 'staff') && (
            <>
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </>
          )}

          {/* CUSTOMER OTP */}
          {role === 'customer' && (
            <>
              <TextField
                fullWidth
                label="Phone Number"
                margin="normal"
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <TextField
                fullWidth
                label="OTP (use 123456)"
                margin="normal"
                onChange={(e) =>
                  setForm({ ...form, otp: e.target.value })
                }
              />
            </>
          )}

          <Button fullWidth variant="contained" sx={{ mt: 2 }} type="submit">
            Login
          </Button>
        </form>

      </Paper>
    </Box>
  )
}

export default Login