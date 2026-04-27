import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// MUI
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'

// Theme
import theme from './theme'

// Context
import { StoreProvider } from './context/StoreContext.jsx'

// Components
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
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
import Footer from './components/Footer.jsx'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <StoreProvider>
        {/* Main Layout */}
        <Box sx={{ display: 'flex' }}>

          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <Box sx={{ flexGrow: 1 }}>

            {/* Top Navbar */}
            <Navbar />

            {/* Page Content */}
            <Box sx={{ p: 3 }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/medicines" element={<MedicineList />} />
                <Route path="/add-medicine" element={<AddMedicine />} />
                <Route path="/edit-medicine/:id" element={<EditMedicine />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/bill-receipt/:id" element={<BillReceipt />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/add-customer" element={<AddCustomer />} />
                <Route path="/expired" element={<ExpiredMedicines />} />
                <Route path="/low-stock" element={<LowStock />} />
                <Route path="/search" element={<SearchMedicine />} />
              </Routes>
            </Box>

            {/* Footer */}
            <Footer />

          </Box>
        </Box>

        {/* Toast */}
        <ToastContainer position="top-right" autoClose={3000} />
      </StoreProvider>
    </ThemeProvider>
  )
}

export default App