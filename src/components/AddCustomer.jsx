import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { toast } from 'react-toastify'
import { FaSave, FaTimes } from 'react-icons/fa'

const AddCustomer = () => {
  const { addCustomer } = useStore()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Enter valid 10-digit phone'
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter valid email'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      addCustomer(formData)
      toast.success(`Customer ${formData.name} added! 🎉`)
      navigate('/customers')
    }
  }

  return (
    <div className="form-page">
      <div className="page-header"><h1>👤 Add New Customer</h1></div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Customer Name *</label>
            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" className={errors.name ? 'error' : ''} />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit phone" className={errors.phone ? 'error' : ''} />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" className={errors.email ? 'error' : ''} />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group full-width">
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Full address" rows="3" />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary"><FaSave /> Save Customer</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/customers')}><FaTimes /> Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddCustomer