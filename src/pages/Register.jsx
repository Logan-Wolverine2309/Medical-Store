import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

import {
  Box, Grid, TextField,
  Button, Typography
} from '@mui/material'

const Register = () => {
  const { register } = useAuth()

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    gender: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const success = await register({ ...form, role: 'customer' })

    if (success) {
      alert('Account Created! Please login')
    } else {
      alert('Error')
    }
  }

  return (
    <Grid container sx={{ height: '100vh' }}>

      {/* LEFT SIDE (Branding) */}
      <Grid item xs={6}
        sx={{
          background: 'linear-gradient(135deg,#1976d2,#42a5f5)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h3">💊 MedStore</Typography>
        <Typography>Manage medicines easily</Typography>
      </Grid>

      {/* RIGHT SIDE (FORM) */}
      <Grid item xs={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box sx={{ width: 350 }}>

          <Typography variant="h6" mb={2}>
            Create Customer Account
          </Typography>

          <form onSubmit={handleSubmit}>

            <TextField fullWidth label="Full Name" margin="normal"
              onChange={(e)=>setForm({...form, name:e.target.value})}
            />

            <TextField fullWidth label="Username" margin="normal"
              onChange={(e)=>setForm({...form, username:e.target.value})}
            />

            <TextField fullWidth label="Email" margin="normal"
              onChange={(e)=>setForm({...form, email:e.target.value})}
            />

            <TextField fullWidth label="Phone" margin="normal"
              onChange={(e)=>setForm({...form, phone:e.target.value})}
            />

            <TextField fullWidth label="Password" type="password" margin="normal"
              onChange={(e)=>setForm({...form, password:e.target.value})}
            />

            <TextField fullWidth label="Address" margin="normal"
              onChange={(e)=>setForm({...form, address:e.target.value})}
            />

            <TextField fullWidth label="Gender" margin="normal"
              onChange={(e)=>setForm({...form, gender:e.target.value})}
            />

            <Button fullWidth type="submit" variant="contained" sx={{ mt:2 }}>
              Create Account
            </Button>

          </form>

        </Box>
      </Grid>

    </Grid>
  )
}

export default Register