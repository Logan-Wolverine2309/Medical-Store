import React from 'react'
import { useStore } from '../context/StoreContext.jsx'
import { toast } from 'react-toastify'
import { FaTrash, FaExclamationTriangle } from 'react-icons/fa'

const ExpiredMedicines = () => {
  const { medicines, deleteMedicine } = useStore()
  const today = new Date()
  const threeMonths = new Date()
  threeMonths.setMonth(threeMonths.getMonth() + 3)

  const expiredMedicines = medicines.filter(med => new Date(med.expDate) <= today)
  const expiringSoonMedicines = medicines.filter(
    med => new Date(med.expDate) > today && new Date(med.expDate) <= threeMonths
  )

  const handleRemove = (id, name) => {
    if (globalThis.confirm(`Remove expired medicine "${name}"?`)) {
      deleteMedicine(id)
      toast.success(`${name} removed!`)
    }
  }

  return (
    <div className="expired-page">
      <div className="page-header"><h1>⚠️ Expired & Expiring Medicines</h1></div>

      <div className="section">
        <h2 className="section-title danger"><FaExclamationTriangle /> Expired Medicines ({expiredMedicines.length})</h2>
        {expiredMedicines.length === 0 ? (
          <div className="no-data success-msg"><p>✅ No expired medicines!</p></div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead><tr><th>#</th><th>Name</th><th>Brand</th><th>Batch</th><th>Exp Date</th><th>Stock</th><th>Value</th><th>Action</th></tr></thead>
              <tbody>
                {expiredMedicines.map((med, index) => (
                  <tr key={med.id} className="row-expired">
                    <td>{index + 1}</td><td><strong>{med.name}</strong></td><td>{med.brand}</td>
                    <td>{med.batchNo}</td><td className="text-danger">{med.expDate}</td>
                    <td>{med.quantity}</td><td>₹{(med.price * med.quantity).toFixed(2)}</td>
                    <td><button className="btn btn-danger btn-sm" onClick={() => handleRemove(med.id, med.name)}><FaTrash /> Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-loss">
              <strong>Total Loss: ₹{expiredMedicines.reduce((sum, med) => sum + (med.price * med.quantity), 0).toFixed(2)}</strong>
            </div>
          </div>
        )}
      </div>

      <div className="section">
        <h2 className="section-title warning"><FaExclamationTriangle /> Expiring Soon ({expiringSoonMedicines.length})</h2>
        {expiringSoonMedicines.length === 0 ? (
          <div className="no-data"><p>No medicines expiring within 3 months</p></div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead><tr><th>#</th><th>Name</th><th>Brand</th><th>Batch</th><th>Exp Date</th><th>Days Left</th><th>Stock</th></tr></thead>
              <tbody>
                {expiringSoonMedicines.map((med, index) => {
                  const daysLeft = Math.ceil((new Date(med.expDate) - today) / (1000 * 60 * 60 * 24))
                  return (
                    <tr key={med.id}>
                      <td>{index + 1}</td><td><strong>{med.name}</strong></td><td>{med.brand}</td>
                      <td>{med.batchNo}</td><td className="text-warning">{med.expDate}</td>
                      <td><span className={`badge ${daysLeft <= 30 ? 'badge-danger' : 'badge-warning'}`}>{daysLeft} days</span></td>
                      <td>{med.quantity}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpiredMedicines