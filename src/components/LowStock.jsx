import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { FaBoxOpen, FaEdit } from 'react-icons/fa'

const LowStock = () => {
  const { medicines } = useStore()

  const outOfStock = medicines.filter(med => med.quantity === 0)
  const criticalStock = medicines.filter(med => med.quantity > 0 && med.quantity <= 5)
  const lowStock = medicines.filter(med => med.quantity > 5 && med.quantity <= 10)

  const StockSection = ({ title, icon, items, type }) => (
    <div className="section">
      <h2 className="section-title {type}">{icon} {title} ({items.length})</h2>
      {items.length === 0 ? (
        <div className="no-data success-msg"><p>✅ No items in this category!</p></div>
      ) : (
        <div className="stock-cards">
          {items.map(med => (
            <div key={med.id} className={`stock-card ${type}`}>
              <h4>{med.name}</h4>
              <p className="brand">{med.brand}</p>
              <div className="stock-info">
                <span className={`stock-qty ${type === 'danger' || type === 'critical' ? 'critical-text' : 'warning-text'}`}>
                  {med.quantity} units
                </span>
                <span className="stock-price">₹{med.price}</span>
              </div>
              <p className="supplier">Supplier: {med.supplier}</p>
              <Link to={`/edit-medicine/${med.id}`} className="btn btn-sm btn-warning">
                <FaEdit /> {med.quantity === 0 ? 'Restock' : 'Update Stock'}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="low-stock-page">
      <div className="page-header"><h1>📦 Stock Alerts</h1></div>
      <StockSection title="Out of Stock" icon={<FaBoxOpen />} items={outOfStock} type="danger" />
      <StockSection title="Critical Stock (≤5)" icon="🔴" items={criticalStock} type="critical" />
      <StockSection title="Low Stock (6-10)" icon="🟡" items={lowStock} type="warning" />
    </div>
  )
}

export default LowStock