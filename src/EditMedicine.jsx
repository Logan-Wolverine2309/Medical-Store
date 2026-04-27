import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { toast } from 'react-toastify'
import { FaSave, FaTimes } from 'react-icons/fa'

const EditMedicine = () => {
  const { id } = useParams()
  const { medicines, updateMedicine } = useStore()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(null)
  const [errors, setErrors] = useState({})

  const categories = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Drops', 'Inhaler', 'Powder', 'Other']

  useEffect(() => {
    const medicine = medicines.find(m => m.id === parseInt(id))
    if (medicine) {
      setFormData({ ...medicine })
    } else {
      toast.error('Medicine not found!')
      navigate('/medicines')
    }
  }, [id, medicines, navigate])

  if (!formData) return <div className="loading">Loading...</div>

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Required'
    if (!formData.brand.trim()) newErrors.brand = 'Required'
    if (!formData.price || formData.price <= 0) newErrors.price = 'Invalid'
    if (!formData.quantity || formData.quantity < 0) newErrors.quantity = 'Invalid'
    if (!formData.batchNo.trim()) newErrors.batchNo = 'Required'
    if (!formData.mfgDate) newErrors.mfgDate = 'Required'
    if (!formData.expDate) newErrors.expDate = 'Required'
    if (!formData.supplier.trim()) newErrors.supplier = 'Required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      updateMedicine(parseInt(id), {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      })
      toast.success(`${formData.name} updated successfully! ✅`)
      navigate('/medicines')
    }
  }

  return (
    <div className="form-page">
      <div className="page-header"><h1>✏️ Edit Medicine</h1></div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-grid">
          <div className="form-group">
            <label>Medicine Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Brand *</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} className={errors.brand ? 'error' : ''} />
            {errors.brand && <span className="error-text">{errors.brand}</span>}
          </div>
          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Price (₹) *</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" min="0" className={errors.price ? 'error' : ''} />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>
          <div className="form-group">
            <label>Quantity *</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="0" className={errors.quantity ? 'error' : ''} />
            {errors.quantity && <span className="error-text">{errors.quantity}</span>}
          </div>
          <div className="form-group">
            <label>Batch Number *</label>
            <input type="text" name="batchNo" value={formData.batchNo} onChange={handleChange} className={errors.batchNo ? 'error' : ''} />
            {errors.batchNo && <span className="error-text">{errors.batchNo}</span>}
          </div>
          <div className="form-group">
            <label>Mfg Date *</label>
            <input type="date" name="mfgDate" value={formData.mfgDate} onChange={handleChange} className={errors.mfgDate ? 'error' : ''} />
            {errors.mfgDate && <span className="error-text">{errors.mfgDate}</span>}
          </div>
          <div className="form-group">
            <label>Exp Date *</label>
            <input type="date" name="expDate" value={formData.expDate} onChange={handleChange} className={errors.expDate ? 'error' : ''} />
            {errors.expDate && <span className="error-text">{errors.expDate}</span>}
          </div>
          <div className="form-group">
            <label>Supplier *</label>
            <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} className={errors.supplier ? 'error' : ''} />
            {errors.supplier && <span className="error-text">{errors.supplier}</span>}
          </div>
          <div className="form-group full-width">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary"><FaSave /> Update Medicine</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/medicines')}><FaTimes /> Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditMedicine