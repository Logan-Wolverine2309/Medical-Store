import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { toast } from 'react-toastify'
import { FaSave, FaTimes } from 'react-icons/fa'

const AddMedicine = () => {
  const { addMedicine } = useStore()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '', brand: '', category: 'Tablet', price: '',
    quantity: '', batchNo: '', mfgDate: '', expDate: '',
    supplier: '', description: ''
  })

  const [errors, setErrors] = useState({})

  const categories = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops', 'Inhaler', 'Powder', 'Other']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Medicine name is required'
    if (!formData.brand.trim()) newErrors.brand = 'Brand name is required'
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required'
    if (!formData.quantity || formData.quantity < 0) newErrors.quantity = 'Valid quantity is required'
    if (!formData.batchNo.trim()) newErrors.batchNo = 'Batch number is required'
    if (!formData.mfgDate) newErrors.mfgDate = 'Manufacturing date is required'
    if (!formData.expDate) newErrors.expDate = 'Expiry date is required'
    if (formData.mfgDate && formData.expDate && formData.expDate <= formData.mfgDate) {
      newErrors.expDate = 'Expiry date must be after manufacturing date'
    }
    if (!formData.supplier.trim()) newErrors.supplier = 'Supplier name is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      addMedicine({
        ...formData,
        price: Number.parseFloat(formData.price),
        quantity: Number.parseInt(formData.quantity)
      })
      toast.success(`${formData.name} added successfully! 🎉`)
      navigate('/medicines')
    }
  }

  return (
    <div className="form-page">
      <div className="page-header">
        <h1>➕ Add New Medicine</h1>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Medicine Name *</label>
            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange}
              placeholder="e.g., Paracetamol 500mg" className={errors.name ? 'error' : ''} />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="brand">Brand *</label>
            <input id="brand" type="text" name="brand" value={formData.brand} onChange={handleChange}
              placeholder="e.g., Crocin" className={errors.brand ? 'error' : ''} />
            {errors.brand && <span className="error-text">{errors.brand}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (₹) *</label>
            <input id="price" type="number" name="price" value={formData.price} onChange={handleChange}
              placeholder="0.00" step="0.01" min="0" className={errors.price ? 'error' : ''} />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input id="quantity" type="number" name="quantity" value={formData.quantity} onChange={handleChange}
              placeholder="0" min="0" className={errors.quantity ? 'error' : ''} />
            {errors.quantity && <span className="error-text">{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="batchNo">Batch Number *</label>
            <input id="batchNo" type="text" name="batchNo" value={formData.batchNo} onChange={handleChange}
              placeholder="e.g., BT2024011" className={errors.batchNo ? 'error' : ''} />
            {errors.batchNo && <span className="error-text">{errors.batchNo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mfgDate">Manufacturing Date *</label>
            <input id="mfgDate" type="date" name="mfgDate" value={formData.mfgDate} onChange={handleChange}
              className={errors.mfgDate ? 'error' : ''} />
            {errors.mfgDate && <span className="error-text">{errors.mfgDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="expDate">Expiry Date *</label>
            <input id="expDate" type="date" name="expDate" value={formData.expDate} onChange={handleChange}
              className={errors.expDate ? 'error' : ''} />
            {errors.expDate && <span className="error-text">{errors.expDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="supplier">Supplier *</label>
            <input id="supplier" type="text" name="supplier" value={formData.supplier} onChange={handleChange}
              placeholder="e.g., Cipla Ltd" className={errors.supplier ? 'error' : ''} />
            {errors.supplier && <span className="error-text">{errors.supplier}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange}
              placeholder="Brief description..." rows="3" />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary"><FaSave /> Save Medicine</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/medicines')}>
            <FaTimes /> Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddMedicine