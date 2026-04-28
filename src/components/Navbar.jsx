import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import {
  FaCapsules, FaBell, FaUser, FaSearch,
  FaExclamationTriangle, FaInfoCircle, FaTimesCircle
} from 'react-icons/fa'

const Navbar = () => {
  const { notifications } = useStore()
  const [showNotifications, setShowNotifications] = useState(false)

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'danger': return <FaTimesCircle className="notif-icon danger" />
      case 'warning': return <FaExclamationTriangle className="notif-icon warning" />
      case 'info': return <FaInfoCircle className="notif-icon info" />
      default: return <FaInfoCircle className="notif-icon" />
    }
  }

  return (
    <nav className="navbar" style={{ position: 'relative' }}>
      
      {/* LEFT SIDE (UNCHANGED) */}
      <div className="navbar-brand">
        <Link to="/">
          <FaCapsules className="brand-icon" />
          <span className="brand-text">MedStore Pro</span>
        </Link>
      </div>

      {/* ✅ CENTER TITLE FIXED */}
      {/* <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontWeight: 'bold',
          fontSize: '20px',
          pointerEvents: 'none'
        }}
      >
        MedStore Pro
      </div> */}

      {/* SEARCH (UNCHANGED) */}
      <div className="navbar-search">
        <Link to="/search" className="search-link">
          <FaSearch />
          <span>Search Medicines...</span>
        </Link>
      </div>

      {/* RIGHT SIDE (UNCHANGED) */}
      <div className="navbar-actions">
        <div className="notification-wrapper">
          <button
            className="nav-btn notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <h4>Notifications ({notifications.length})</h4>
              {notifications.length === 0 ? (
                <p className="no-notifications">No notifications</p>
              ) : (
                <div className="notification-list">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`notification-item ${notif.type}`}>
                      {getNotificationIcon(notif.type)}
                      <span>{notif.message}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="user-info">
          <FaUser />
          <span>Admin</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar