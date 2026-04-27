import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { toast } from 'react-toastify'
import { FaPlus, FaTrash, FaReceipt, FaTimes } from 'react-icons/fa'

const Billing = () => {
  const { medicines, customers, createBill } = useStore()
  const navigate = useNavigate()

  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [discount, setDiscount] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const [selectedMedicine, setSelectedMedicine] = useState('')
  const [selectedQty, setSelectedQty] = useState(1)

  const availableMedicines = medicines.filter(
    med => med.quantity > 0 && new Date(med.expDate) > new Date()
  )

  const handleCustomerSearch = (phone) => {
    setCustomerPhone(phone)
    const customer = customers.find(c => c.phone === phone)
    if (customer) {
      setCustomerName(customer.name)
      toast.info(`Customer found: ${customer.name}`)
    }
  }

  const addToCart = () => {
    if (!selectedMedicine) { toast.error('Please select a medicine!'); return }
    const medicine = medicines.find(m => m.id === Number.parseInt(selectedMedicine))
    if (!medicine) return

    const existingItem = cartItems.find(item => item.medicineId === medicine.id)
    const currentQty = existingItem ? existingItem.quantity : 0

    if (currentQty + selectedQty > medicine.quantity) {
      toast.error(`Only ${medicine.quantity - currentQty} units available!`); return
    }

    if (existingItem) {
      setCartItems(prev => prev.map(item =>
        item.medicineId === medicine.id
          ? { ...item, quantity: item.quantity + selectedQty, total: (item.quantity + selectedQty) * item.price }
          : item
      ))
    } else {
      setCartItems(prev => [...prev, {
        medicineId: medicine.id, name: medicine.name, price: medicine.price,
        quantity: selectedQty, total: medicine.price * selectedQty
      }])
    }
    setSelectedMedicine(''); setSelectedQty(1)
    toast.success(`${medicine.name} added to cart!`)
  }

  const removeFromCart = (medicineId) => {
    setCartItems(prev => prev.filter(item => item.medicineId !== medicineId))
  }

  const updateCartQty = (medicineId, newQty) => {
    const medicine = medicines.find(m => m.id === medicineId)
    if (newQty > medicine.quantity) { toast.error(`Only ${medicine.quantity} units available!`); return }
    if (newQty < 1) return
    setCartItems(prev => prev.map(item =>
      item.medicineId === medicineId
        ? { ...item, quantity: newQty, total: newQty * item.price }
        : item
    ))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = (subtotal * discount) / 100
  const taxAmount = (subtotal - discountAmount) * 0.05
  const grandTotal = subtotal - discountAmount + taxAmount

  const handleGenerateBill = () => {
    if (cartItems.length === 0) { toast.error('Cart is empty!'); return }
    if (!customerName.trim()) { toast.error('Customer name is required!'); return }

    const bill = createBill({
      customerName, customerPhone, paymentMethod,
      items: cartItems, subtotal, discount, discountAmount,
      tax: taxAmount, grandTotal
    })
    toast.success(`Bill ${bill.billNo} generated successfully! 🧾`)
    navigate(`/bill-receipt/${bill.id}`)
  }

  return (
    <div className="billing-page">
      <div className="page-header"><h1>🛒 Billing Counter</h1></div>

      <div className="billing-container">
        <div className="billing-left">
          <div className="billing-section">
            <h3>👤 Customer Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerPhone">Phone Number</label>
                <input id="customerPhone" type="tel" value={customerPhone} onChange={(e) => handleCustomerSearch(e.target.value)} placeholder="Search by phone..." />
              </div>
              <div className="form-group">
                <label htmlFor="customerName">Customer Name *</label>
                <input id="customerName" type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer name" />
              </div>
            </div>
          </div>

          <div className="billing-section">
            <h3>💊 Add Medicine</h3>
            <div className="form-row three-col">
              <div className="form-group">
                <label htmlFor="selectedMedicine">Select Medicine</label>
                <select id="selectedMedicine" value={selectedMedicine} onChange={(e) => setSelectedMedicine(e.target.value)}>
                  <option value="">-- Select Medicine --</option>
                  {availableMedicines.map(med => (
                    <option key={med.id} value={med.id}>{med.name} - ₹{med.price} (Stock: {med.quantity})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="selectedQty">Quantity</label>
                <input id="selectedQty" type="number" value={selectedQty} onChange={(e) => setSelectedQty(Number.parseInt(e.target.value) || 1)} min="1" />
              </div>
              <div className="form-group">
                <button className="btn btn-primary" onClick={addToCart}><FaPlus /> Add</button>
              </div>
            </div>
          </div>

          <div className="billing-section">
            <h3>🛒 Cart Items ({cartItems.length})</h3>
            {cartItems.length === 0 ? (
              <p className="no-data">No items in cart</p>
            ) : (
              <table className="table">
                <thead>
                  <tr><th>#</th><th>Medicine</th><th>Price</th><th>Qty</th><th>Total</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={item.medicineId}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>₹{item.price.toFixed(2)}</td>
                      <td>
                        <input type="number" value={item.quantity} onChange={(e) => updateCartQty(item.medicineId, Number.parseInt(e.target.value))} min="1" className="qty-input" />
                      </td>
                      <td>₹{item.total.toFixed(2)}</td>
                      <td><button className="btn-icon btn-delete" onClick={() => removeFromCart(item.medicineId)}><FaTrash /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="billing-right">
          <div className="bill-summary">
            <h3>📋 Bill Summary</h3>
            <div className="summary-row"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div className="summary-row">
              <label htmlFor="discountInput">Discount (%):</label>
              <input id="discountInput" type="number" value={discount} onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)} min="0" max="100" className="discount-input" />
            </div>
            <div className="summary-row"><span>Discount Amount:</span><span className="text-danger">-₹{discountAmount.toFixed(2)}</span></div>
            <div className="summary-row"><span>GST (5%):</span><span>₹{taxAmount.toFixed(2)}</span></div>
            <div className="summary-row grand-total"><span>Grand Total:</span><span>₹{grandTotal.toFixed(2)}</span></div>

            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>

            <div className="bill-actions">
              <button className="btn btn-success btn-full" onClick={handleGenerateBill}><FaReceipt /> Generate Bill</button>
              <button className="btn btn-secondary btn-full" onClick={() => { setCartItems([]); setCustomerName(''); setCustomerPhone(''); setDiscount(0) }}>
                <FaTimes /> Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billing