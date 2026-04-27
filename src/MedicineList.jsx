import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { toast } from 'react-toastify'
import { FaEdit, FaTrash, FaEye, FaPlusCircle, FaFilter } from 'react-icons/fa'

const MedicineList = () => {
  const { medicines, deleteMedicine } = useStore()
  const [filterCategory, setFilterCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [viewMedicine, setViewMedicine] = useState(null)

  const categories = ['All', ...new Set(medicines.map(m => m.category))]

  const filteredMedicines = medicines
    .filter(med => filterCategory === 'All' || med.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name)
        case 'price': return a.price - b.price
        case 'quantity': return a.quantity - b.quantity
        case 'expDate': return new Date(a.expDate) - new Date(b.expDate)
        default: return 0
      }
    })

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMedicine(id)
      toast.success(`${name} deleted successfully!`)
    }
  }

  const isExpired = (date) => new Date(date) <= new Date()
  const isLowStock = (qty) => qty <= 10

  return (
    <div className="medicine-list">
      <div className="page-header">
        <h1>💊 Medicine Inventory</h1>
        <Link to="/add-medicine" className="btn btn-primary">
          <FaPlusCircle /> Add Medicine
        </Link>
      </div>

      <div className="filters">
        <div className="filter-group">
          <FaFilter />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
            <option value="expDate">Expiry Date</option>
          </select>
        </div>
        <div className="filter-info">
          Showing {filteredMedicines.length} of {medicines.length} medicines
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Stock</th>
              <th>Batch No</th>
              <th>Exp Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map((med, index) => (
              <tr key={med.id} className={isExpired(med.expDate) ? 'row-expired' : ''}>
                <td>{index + 1}</td>
                <td><strong>{med.name}</strong></td>
                <td>{med.brand}</td>
                <td><span className="badge badge-info">{med.category}</span></td>
                <td>₹{med.price.toFixed(2)}</td>
                <td>
                  <span className={`stock-badge ${
                    med.quantity <= 5 ? 'critical' : med.quantity <= 10 ? 'low' : 'good'
                  }`}>{med.quantity}</span>
                </td>
                <td>{med.batchNo}</td>
                <td>{med.expDate}</td>
                <td>
                  {isExpired(med.expDate) ? (
                    <span className="badge badge-danger">Expired</span>
                  ) : isLowStock(med.quantity) ? (
                    <span className="badge badge-warning">Low Stock</span>
                  ) : (
                    <span className="badge badge-success">Available</span>
                  )}
                </td>
                <td>
                  <div className="action-btns">
                    <button className="btn-icon btn-view" onClick={() => setViewMedicine(med)} title="View">
                      <FaEye />
                    </button>
                    <Link to={`/edit-medicine/${med.id}`} className="btn-icon btn-edit" title="Edit">
                      <FaEdit />
                    </Link>
                    <button className="btn-icon btn-delete" onClick={() => handleDelete(med.id, med.name)} title="Delete">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredMedicines.length === 0 && <div className="no-data"><p>No medicines found</p></div>}
      </div>

      {viewMedicine && (
        <div className="modal-overlay" onClick={() => setViewMedicine(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>💊 Medicine Details</h2>
              <button onClick={() => setViewMedicine(null)} className="modal-close">&times;</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item"><label>Name:</label><span>{viewMedicine.name}</span></div>
                <div className="detail-item"><label>Brand:</label><span>{viewMedicine.brand}</span></div>
                <div className="detail-item"><label>Category:</label><span>{viewMedicine.category}</span></div>
                <div className="detail-item"><label>Price:</label><span>₹{viewMedicine.price.toFixed(2)}</span></div>
                <div className="detail-item"><label>Quantity:</label><span>{viewMedicine.quantity}</span></div>
                <div className="detail-item"><label>Batch No:</label><span>{viewMedicine.batchNo}</span></div>
                <div className="detail-item"><label>Mfg Date:</label><span>{viewMedicine.mfgDate}</span></div>
                <div className="detail-item"><label>Exp Date:</label><span>{viewMedicine.expDate}</span></div>
                <div className="detail-item"><label>Supplier:</label><span>{viewMedicine.supplier}</span></div>
                <div className="detail-item full-width"><label>Description:</label><span>{viewMedicine.description}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MedicineList