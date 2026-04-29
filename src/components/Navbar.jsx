import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import { useAuth } from '../context/AuthContext'

import {
  FaCapsules, FaBell, FaUser, FaSearch,
  FaExclamationTriangle, FaInfoCircle, FaTimesCircle
} from 'react-icons/fa'

const Navbar = () => {
  const { notifications = [] } = useStore()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [showNotifications, setShowNotifications] = useState(false)
  const dropdownRef = useRef()

  // 🔒 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'danger': return <FaTimesCircle className="notif-icon danger" />
      case 'warning': return <FaExclamationTriangle className="notif-icon warning" />
      case 'info': return <FaInfoCircle className="notif-icon info" />
      default: return <FaInfoCircle className="notif-icon" />
    }
  }

  // ✅ LOGOUT
  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="navbar" style={{ position: 'relative' }}>
      
      {/* LEFT */}
      <div className="navbar-brand">
        <Link to="/dashboard">
          <FaCapsules className="brand-icon" />
          <span className="brand-text">MedStore Pro</span>
        </Link>
      </div>

      {/* SEARCH */}
      <div className="navbar-search">
        <Link to="/search" className="search-link">
          <FaSearch />
          <span>Search Medicines...</span>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="navbar-actions">

        {/* 🔔 Notifications */}
        <div className="notification-wrapper" ref={dropdownRef}>
          <button
            className="nav-btn notification-btn"
            onClick={() => setShowNotifications(prev => !prev)}
          >
            <FaBell />
            {notifications.length > 0 && (
              <span className="notification-badge">
                {notifications.length}
              </span>
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

        {/* 👤 USER */}
        <div className="user-info">
          <FaUser />
          <span>
            {user ? `${user.name || 'User'} (${user.role})` : 'Guest'}
          </span>
        </div>

        {/* 🚪 LOGOUT */}
        {user && (
          <button
            className="nav-btn logout-btn"
            onClick={handleLogout}
            style={{
              marginLeft: '10px',
              background: '#d32f2f',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  )
}

export default Navbar