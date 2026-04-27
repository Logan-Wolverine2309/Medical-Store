import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import {
  FaPills, FaBoxes, FaExclamationTriangle, FaTimesCircle,
  FaMoneyBillWave, FaUsers, FaReceipt, FaChartLine
} from 'react-icons/fa'

const Dashboard = () => {
  const { getStats, bills, medicines } = useStore()
  const stats = getStats()

  const recentBills = [...bills].reverse().slice(0, 5)
  const topMedicines = [...medicines].sort((a, b) => a.quantity - b.quantity).slice(0, 5)

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>📊 Dashboard</h1>
        <p>Welcome to MedStore Pro Management System</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon"><FaPills /></div>
          <div className="stat-info">
            <h3>{stats.totalMedicines}</h3>
            <p>Total Medicines</p>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon"><FaBoxes /></div>
          <div className="stat-info">
            <h3>{stats.totalStock}</h3>
            <p>Total Stock</p>
          </div>
        </div>

        <div className="stat-card orange">
          <div className="stat-icon"><FaExclamationTriangle /></div>
          <div className="stat-info">
            <h3>{stats.lowStockCount}</h3>
            <p>Low Stock Items</p>
          </div>
        </div>

        <div className="stat-card red">
          <div className="stat-icon"><FaTimesCircle /></div>
          <div className="stat-info">
            <h3>{stats.expiredCount}</h3>
            <p>Expired Items</p>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon"><FaMoneyBillWave /></div>
          <div className="stat-info">
            <h3>₹{stats.totalRevenue.toFixed(2)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="stat-card teal">
          <div className="stat-icon"><FaUsers /></div>
          <div className="stat-info">
            <h3>{stats.totalCustomers}</h3>
            <p>Total Customers</p>
          </div>
        </div>

        <div className="stat-card indigo">
          <div className="stat-icon"><FaReceipt /></div>
          <div className="stat-info">
            <h3>{stats.totalBills}</h3>
            <p>Total Bills</p>
          </div>
        </div>

        <div className="stat-card pink">
          <div className="stat-icon"><FaChartLine /></div>
          <div className="stat-info">
            <h3>₹{stats.todayRevenue.toFixed(2)}</h3>
            <p>Today's Revenue</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>⚡ Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/add-medicine" className="action-btn btn-primary">
            <FaPills /> Add Medicine
          </Link>
          <Link to="/billing" className="action-btn btn-success">
            <FaReceipt /> New Bill
          </Link>
          <Link to="/add-customer" className="action-btn btn-info">
            <FaUsers /> Add Customer
          </Link>
          <Link to="/search" className="action-btn btn-warning">
            <FaChartLine /> Search
          </Link>
        </div>
      </div>

      <div className="dashboard-tables">
        <div className="dashboard-card">
          <h2>🧾 Recent Bills</h2>
          {recentBills.length === 0 ? (
            <p className="no-data">No bills yet</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Bill No</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentBills.map(bill => (
                  <tr key={bill.id}>
                    <td>{bill.billNo}</td>
                    <td>{bill.customerName}</td>
                    <td>₹{bill.grandTotal.toFixed(2)}</td>
                    <td>{bill.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="dashboard-card">
          <h2>⚠️ Stock Alerts</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {topMedicines.map(med => (
                <tr key={med.id}>
                  <td>{med.name}</td>
                  <td>{med.quantity}</td>
                  <td>
                    <span className={`badge ${
                      med.quantity <= 5 ? 'badge-danger' :
                      med.quantity <= 10 ? 'badge-warning' : 'badge-success'
                    }`}>
                      {med.quantity <= 5 ? 'Critical' :
                       med.quantity <= 10 ? 'Low' : 'OK'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-card categories-overview">
        <h2>📂 Categories</h2>
        <div className="categories-grid">
          {stats.categories.map((cat, index) => {
            const count = medicines.filter(m => m.category === cat).length
            return (
              <div key={index} className="category-card">
                <h4>{cat}</h4>
                <p>{count} items</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard