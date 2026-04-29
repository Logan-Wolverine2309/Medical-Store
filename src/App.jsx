import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import theme from './theme'

import { StoreProvider } from './context/StoreContext'
import { AuthProvider } from './context/AuthContext'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

import Dashboard from './components/Dashboard'
import MedicineList from './components/MedicineList'
import AddMedicine from './components/AddMedicine'
import Billing from './components/Billing'
import Customers from './components/Customers'
import Login from './pages/Login'
import Register from './pages/Register.jsx'



function AppContent() {
  const location = useLocation()
  const isLogin = location.pathname === '/' || location.pathname === '/login'

  return (
    <Box sx={{ display:'flex' }}>
      {!isLogin && <Sidebar />}

      <Box sx={{ flexGrow:1 }}>
        {!isLogin && <Navbar />}

        <Routes>
          <Route path="/" element={<PublicRoute><Login/></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />

          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard/></ProtectedRoute>
          }/>

          <Route path="/add-medicine" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AddMedicine/>
            </ProtectedRoute>
          }/>

          <Route path="/billing" element={
            <ProtectedRoute allowedRoles={['admin','staff']}>
              <Billing/>
            </ProtectedRoute>
          }/>

          <Route path="/customers" element={
            <ProtectedRoute allowedRoles={['admin','staff']}>
              <Customers/>
            </ProtectedRoute>
          }/>


          <Route path="/register" element={<Register />} />

          <Route path="/medicines" element={
            <ProtectedRoute><MedicineList/></ProtectedRoute>
          }/>
        </Routes>
        

        {!isLogin && <Footer />}
      </Box>
    </Box>
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <StoreProvider>
          <AppContent />
        </StoreProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}