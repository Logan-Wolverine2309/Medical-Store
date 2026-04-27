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
    const medicine = medicines.find(m => m.id === Number.parseInt(id))
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
      updateMedicine(Number.parseInt(id), {
        ...formData,
        price: Number.parseFloat(formData.price),
        quantity: Number.parseInt(formData.quantity)
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
            <label>
              Medicine Name *
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
            </label>
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>
              Brand *
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} className={errors.brand ? 'error' : ''} />
            </label>
            {errors.brand && <span className="error-text">{errors.brand}</span>}
          </div>
          <div className="form-group">
            <label>
              Category *
              <select name="category" value={formData.category} onChange={handleChange}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Price (₹) *
              <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" min="0" className={errors.price ? 'error' : ''} />
            </label>
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>
          <div className="form-group">
            <label>
              Quantity *
            <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                className={errors.quantity ? 'error' : ''}
              />
            </label>
            {errors.quantity && <span className="error-text">{errors.quantity}</span>}
          </div>
          <div className="form-group">
            <label>
              Batch Number *
              <input type="text" name="batchNo" value={formData.batchNo} onChange={handleChange} className={errors.batchNo ? 'error' : ''} />
            </label>
            {errors.batchNo && <span className="error-text">{errors.batchNo}</span>}
          </div>
          <div className="form-group">
            <label>
              Mfg Date *
              <input type="date" name="mfgDate" value={formData.mfgDate} onChange={handleChange} className={errors.mfgDate ? 'error' : ''} />
            </label>
            {errors.mfgDate && <span className="error-text">{errors.mfgDate}</span>}
          </div>
          <div className="form-group">
            <label>
              Exp Date *
              <input type="date" name="expDate" value={formData.expDate} onChange={handleChange} className={errors.expDate ? 'error' : ''} />
            </label>
            {errors.expDate && <span className="error-text">{errors.expDate}</span>}
          </div>
          <div className="form-group">
            <label>
              Supplier *
              <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} className={errors.supplier ? 'error' : ''} />
            </label>
            {errors.supplier && <span className="error-text">{errors.supplier}</span>}
          </div>
          <div className="form-group full-width">
            <label>
              Description
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" />
            </label>
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