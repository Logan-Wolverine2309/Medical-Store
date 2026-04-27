import React from 'react'
import { FaHeart, FaCapsules } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          <FaCapsules /> MedStore Pro &copy; {new Date().getFullYear()} |
          Made with <FaHeart className="heart" /> for Better Healthcare Management
        </p>
      </div>
    </footer>
  )
}

export default Footer