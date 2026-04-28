import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'

import theme from './theme'

import { StoreProvider } from './context/StoreContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import PublicRoute from './components/PublicRoute.jsx' // ✅ ADD THIS

import Dashboard from './components/Dashboard.jsx'
import MedicineList from './components/MedicineList.jsx'
import AddMedicine from './components/AddMedicine.jsx'
import EditMedicine from './components/EditMedicine.jsx'
import Billing from './components/Billing.jsx'
import BillReceipt from './components/BillReceipt.jsx'
import Customers from './components/Customers.jsx'
import AddCustomer from './components/AddCustomer.jsx'
import ExpiredMedicines from './components/ExpiredMedicines.jsx'
import LowStock from './components/LowStock.jsx'
import SearchMedicine from './components/SearchMedicine.jsx'
import Login from './pages/Login.jsx'

function AppContent() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  return (
    <Box sx={{ display: 'flex' }}>
      {!isLoginPage && <Sidebar />}

      <Box sx={{ flexGrow: 1 }}>
        {!isLoginPage && <Navbar />}

        <Box sx={{ p: 3, mt: !isLoginPage ? '64px' : 0 }}>
          <Routes>

            {/* ✅ PUBLIC ROUTE (Login Protected from logged-in users) */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />

            {/* ✅ PROTECTED ROUTES */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/medicines" element={<ProtectedRoute><MedicineList /></ProtectedRoute>} />
            <Route path="/add-medicine" element={<ProtectedRoute><AddMedicine /></ProtectedRoute>} />
            <Route path="/edit-medicine/:id" element={<ProtectedRoute><EditMedicine /></ProtectedRoute>} />
            <Route path="/billing"
  element={
    <ProtectedRoute allowedRoles={['admin','staff']}>
      <Billing />
    </ProtectedRoute>
  }
/>
            <Route path="/bill-receipt/:id" element={<ProtectedRoute><BillReceipt /></ProtectedRoute>} />
            <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
            <Route path="/add-customer" element={<ProtectedRoute><AddCustomer /></ProtectedRoute>} />
            <Route path="/expired" element={<ProtectedRoute><ExpiredMedicines /></ProtectedRoute>} />
            <Route path="/low-stock" element={<ProtectedRoute><LowStock /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><SearchMedicine /></ProtectedRoute>} />

          </Routes>
        </Box>

        {!isLoginPage && <Footer />}
      </Box>
    </Box>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AuthProvider>
        <StoreProvider>
          <AppContent />
          <ToastContainer position="top-right" autoClose={3000} />
        </StoreProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App