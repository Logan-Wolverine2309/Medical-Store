import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { toast } from 'react-toastify'
import { FaUserPlus, FaTrash, FaEdit, FaSearch } from 'react-icons/fa'

const Customers = () => {
  const { customers, deleteCustomer, updateCustomer } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [editForm, setEditForm] = useState({})

  const filteredCustomers = customers.filter(cust =>
    cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cust.phone.includes(searchTerm) ||
    cust.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete customer "${name}"?`)) {
      deleteCustomer(id)
      toast.success(`${name} deleted!`)
    }
  }

  const handleEdit = (customer) => { setEditingCustomer(customer.id); setEditForm({ ...customer }) }

  const handleSaveEdit = () => {
    updateCustomer(editingCustomer, editForm)
    setEditingCustomer(null)
    toast.success('Customer updated!')
  }

  return (
    <div className="customers-page">
      <div className="page-header">
        <h1>👥 Customer Management</h1>
        <Link to="/add-customer" className="btn btn-primary"><FaUserPlus /> Add Customer</Link>
      </div>

      <div className="search-bar">
        <FaSearch />
        <input type="text" placeholder="Search by name, phone, or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr><th>#</th><th>Name</th><th>Phone</th><th>Email</th><th>Address</th><th>Total Purchases</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={customer.id}>
                {editingCustomer === customer.id ? (
                  <>
                    <td>{index + 1}</td>
                    <td><input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="edit-input" /></td>
                    <td><input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="edit-input" /></td>
                    <td><input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="edit-input" /></td>
                    <td><input value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} className="edit-input" /></td>
                    <td>₹{customer.totalPurchases.toFixed(2)}</td>
                    <td>
                      <button className="btn btn-sm btn-success" onClick={handleSaveEdit}>Save</button>
                      <button className="btn btn-sm btn-secondary" onClick={() => setEditingCustomer(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{index + 1}</td>
                    <td><strong>{customer.name}</strong></td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                    <td>{customer.address}</td>
                    <td>₹{customer.totalPurchases.toFixed(2)}</td>
                    <td>
                      <div className="action-btns">
                        <button className="btn-icon btn-edit" onClick={() => handleEdit(customer)}><FaEdit /></button>
                        <button className="btn-icon btn-delete" onClick={() => handleDelete(customer.id, customer.name)}><FaTrash /></button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCustomers.length === 0 && <div className="no-data"><p>No customers found</p></div>}
      </div>
    </div>
  )
}

export default Customers