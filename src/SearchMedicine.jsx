import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { FaSearch, FaShoppingCart } from 'react-icons/fa'

const SearchMedicine = () => {
  const { medicines } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchBy, setSearchBy] = useState('name')

  const results = searchTerm.trim()
    ? medicines.filter(med => {
        const term = searchTerm.toLowerCase()
        switch (searchBy) {
          case 'name': return med.name.toLowerCase().includes(term)
          case 'brand': return med.brand.toLowerCase().includes(term)
          case 'category': return med.category.toLowerCase().includes(term)
          case 'supplier': return med.supplier.toLowerCase().includes(term)
          case 'batchNo': return med.batchNo.toLowerCase().includes(term)
          default: return false
        }
      })
    : []

  return (
    <div className="search-page">
      <div className="page-header"><h1>🔍 Search Medicines</h1></div>
      <div className="search-container">
        <div className="search-controls">
          <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
            <option value="name">By Name</option>
            <option value="brand">By Brand</option>
            <option value="category">By Category</option>
            <option value="supplier">By Supplier</option>
            <option value="batchNo">By Batch No</option>
          </select>
          <div className="search-input-wrapper">
            <FaSearch />
            <input type="text" placeholder={`Search by ${searchBy}...`} value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} autoFocus />
          </div>
        </div>

        {searchTerm.trim() && <p className="search-results-count">Found {results.length} result(s) for "{searchTerm}"</p>}

        {results.length > 0 && (
          <div className="search-results">
            {results.map(med => {
              const isExpired = new Date(med.expDate) <= new Date()
              return (
                <div key={med.id} className={`search-result-card ${isExpired ? 'expired' : ''}`}>
                  <div className="result-header">
                    <h3>{med.name}</h3>
                    <span className={`badge ${isExpired ? 'badge-danger' : med.quantity <= 10 ? 'badge-warning' : 'badge-success'}`}>
                      {isExpired ? 'Expired' : med.quantity <= 10 ? 'Low Stock' : 'Available'}
                    </span>
                  </div>
                  <div className="result-details">
                    <div><strong>Brand:</strong> {med.brand}</div>
                    <div><strong>Category:</strong> {med.category}</div>
                    <div><strong>Price:</strong> ₹{med.price.toFixed(2)}</div>
                    <div><strong>Stock:</strong> {med.quantity}</div>
                    <div><strong>Batch:</strong> {med.batchNo}</div>
                    <div><strong>Expiry:</strong> {med.expDate}</div>
                    <div><strong>Supplier:</strong> {med.supplier}</div>
                  </div>
                  <div className="result-actions">
                    <Link to={`/edit-medicine/${med.id}`} className="btn btn-sm btn-info">Edit</Link>
                    {!isExpired && med.quantity > 0 && (
                      <Link to="/billing" className="btn btn-sm btn-success"><FaShoppingCart /> Add to Bill</Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {searchTerm.trim() && results.length === 0 && <div className="no-data"><p>No medicines found matching "{searchTerm}"</p></div>}
      </div>
    </div>
  )
}

export default SearchMedicine