import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { sampleBills, sampleCustomers, sampleMedicines } from '../components/data/sampleData'


const StoreContext = createContext()

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}

export const StoreProvider = ({ children }) => {
  const [medicines, setMedicines] = useState(() => {
    const saved = localStorage.getItem('medicines')
    return saved ? JSON.parse(saved) : sampleMedicines
  })

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('customers')
    return saved ? JSON.parse(saved) : sampleCustomers
  })

  const [bills, setBills] = useState(() => {
    const saved = localStorage.getItem('bills')
    return saved ? JSON.parse(saved) : sampleBills
  })

  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    localStorage.setItem('medicines', JSON.stringify(medicines))
  }, [medicines])

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers))
  }, [customers])

  useEffect(() => {
    localStorage.setItem('bills', JSON.stringify(bills))
  }, [bills])

  useEffect(() => {
    const newNotifications = []
    const today = new Date()

    medicines.forEach(med => {
      if (med.quantity <= 10) {
        newNotifications.push({
          type: 'warning',
          message: `Low stock: ${med.name} (${med.quantity} left)`
        })
      }
      if (new Date(med.expDate) <= today) {
        newNotifications.push({
          type: 'danger',
          message: `Expired: ${med.name} (Exp: ${med.expDate})`
        })
      }
      const threeMonths = new Date()
      threeMonths.setMonth(threeMonths.getMonth() + 3)
      if (new Date(med.expDate) <= threeMonths && new Date(med.expDate) > today) {
        newNotifications.push({
          type: 'info',
          message: `Expiring soon: ${med.name} (Exp: ${med.expDate})`
        })
      }
    })

    setNotifications(newNotifications)
  }, [medicines])

  const addMedicine = (medicine) => {
    const newMedicine = { ...medicine, id: Date.now() }
    setMedicines(prev => [...prev, newMedicine])
  }

  const updateMedicine = (id, updatedMedicine) => {
    setMedicines(prev =>
      prev.map(med => (med.id === id ? { ...med, ...updatedMedicine } : med))
    )
  }

  const deleteMedicine = (id) => {
    setMedicines(prev => prev.filter(med => med.id !== id))
  }

  const addCustomer = (customer) => {
    const newCustomer = { ...customer, id: Date.now(), totalPurchases: 0 }
    setCustomers(prev => [...prev, newCustomer])
  }

  const updateCustomer = (id, updatedCustomer) => {
    setCustomers(prev =>
      prev.map(cust => (cust.id === id ? { ...cust, ...updatedCustomer } : cust))
    )
  }

  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(cust => cust.id !== id))
  }

  const updateMedicineQuantity = (item) => {
    setMedicines(prev =>
      prev.map(med =>
        med.id === item.medicineId
          ? { ...med, quantity: med.quantity - item.quantity }
          : med
      )
    )
  }

  const updateCustomerPurchases = (customerPhone, amount) => {
    setCustomers(prev =>
      prev.map(cust =>
        cust.phone === customerPhone
          ? { ...cust, totalPurchases: cust.totalPurchases + amount }
          : cust
      )
    )
  }

  const createBill = (bill) => {
    const newBill = {
      ...bill,
      id: Date.now(),
      billNo: `BILL-${String(bills.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0]
    }

    bill.items.forEach(updateMedicineQuantity)

    if (bill.customerPhone) {
      updateCustomerPurchases(bill.customerPhone, bill.grandTotal)
    }

    setBills(prev => [...prev, newBill])
    return newBill
  }

  const getStats = () => {
    const today = new Date()
    const totalMedicines = medicines.length
    const totalStock = medicines.reduce((sum, med) => sum + med.quantity, 0)
    const lowStockCount = medicines.filter(med => med.quantity <= 10).length
    const expiredCount = medicines.filter(med => new Date(med.expDate) <= today).length
    const totalRevenue = bills.reduce((sum, bill) => sum + bill.grandTotal, 0)
    const totalCustomers = customers.length
    const todayBills = bills.filter(bill => bill.date === today.toISOString().split('T')[0])
    const todayRevenue = todayBills.reduce((sum, bill) => sum + bill.grandTotal, 0)
    const categories = [...new Set(medicines.map(med => med.category))]

    return {
      totalMedicines, totalStock, lowStockCount, expiredCount,
      totalRevenue, totalCustomers, todayBills: todayBills.length,
      todayRevenue, categories, totalBills: bills.length
    }
  }

  const value = useMemo(() => ({
    medicines, customers, bills, notifications,
    addMedicine, updateMedicine, deleteMedicine,
    addCustomer, updateCustomer, deleteCustomer,
    createBill, getStats
  }), [medicines, customers, bills, notifications, addMedicine, updateMedicine, deleteMedicine, addCustomer, updateCustomer, deleteCustomer, createBill, getStats])

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired
}