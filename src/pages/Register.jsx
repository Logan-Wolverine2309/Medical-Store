import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import {
  Box, Paper, Tabs, Tab, TextField,
  Button, Typography
} from '@mui/material'

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [role, setRole] = useState('customer')
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const success = await register({ ...form, role })

    if (success) {
      alert('Registered successfully!')
      navigate('/login')
    } else {
      alert('Registration failed')
    }
  }

  return (
    <Box sx={{
      height:'100vh',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    }}>
      <Paper sx={{ p:4, width:350 }}>
        <Typography variant="h5" align="center">
          📝 Register
        </Typography>

        <Tabs value={role} onChange={(e,v)=>setRole(v)} centered>
          <Tab label="Admin" value="admin" />
          <Tab label="Staff" value="staff" />
          <Tab label="Customer" value="customer" />
        </Tabs>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            onChange={(e)=>setForm({...form, username:e.target.value})}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            onChange={(e)=>setForm({...form, password:e.target.value})}
          />

          <Button fullWidth type="submit" variant="contained" sx={{ mt:2 }}>
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default Register