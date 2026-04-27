import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  FaHome, FaPills, FaPlusCircle, FaShoppingCart,
  FaUsers, FaExclamationTriangle, FaBoxOpen,
  FaBars, FaTimes, FaSearch
} from 'react-icons/fa'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: 'dashboard', path: '/', icon: <FaHome />, label: 'Dashboard' },
    { id: 'medicines', path: '/medicines', icon: <FaPills />, label: 'Medicines' },
    { id: 'add-medicine', path: '/add-medicine', icon: <FaPlusCircle />, label: 'Add Medicine' },
    { id: 'billing', path: '/billing', icon: <FaShoppingCart />, label: 'Billing' },
    { id: 'customers', path: '/customers', icon: <FaUsers />, label: 'Customers' },
    { id: 'search', path: '/search', icon: <FaSearch />, label: 'Search' },
    { id: 'expired', path: '/expired', icon: <FaExclamationTriangle />, label: 'Expired' },
    { id: 'low-stock', path: '/low-stock', icon: <FaBoxOpen />, label: 'Low Stock' },
  ]

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button
        className="sidebar-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <FaBars /> : <FaTimes />}
      </button>

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
              end={item.path === '/'}
            >
              <span className="menu-icon">{item.icon}</span>
              {!isCollapsed && <span className="menu-label">{item.label}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar