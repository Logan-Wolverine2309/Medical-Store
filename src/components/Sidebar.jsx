import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

// MUI
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Toolbar
} from '@mui/material'

// Icons
import {
  Menu,
  ChevronLeft,
  Home,
  LocalPharmacy,
  AddCircle,
  ShoppingCart,
  People,
  Warning,
  Inventory2,
  Search
} from '@mui/icons-material'

const drawerWidth = 220
const collapsedWidth = 70

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { path: '/', icon: <Home />, label: 'Dashboard' },
    { path: '/medicines', icon: <LocalPharmacy />, label: 'Medicines' },
    { path: '/add-medicine', icon: <AddCircle />, label: 'Add Medicine' },
    { path: '/billing', icon: <ShoppingCart />, label: 'Billing' },
    { path: '/customers', icon: <People />, label: 'Customers' },
    // { path: '/search', icon: <Search />, label: 'Search' },
    { path: '/expired', icon: <Warning />, label: 'Expired' },
    { path: '/low-stock', icon: <Inventory2 />, label: 'Low Stock' }
  ]

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? collapsedWidth : drawerWidth,
          boxSizing: 'border-box',
          transition: '0.3s'
        }
      }}
    >
      {/* Toggle Button */}
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: collapsed ? 'center' : 'flex-end'
        }}
      >
        <IconButton onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <Menu /> : <ChevronLeft />}
        </IconButton>
      </Toolbar>

      {/* Menu */}
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              sx={{
                '&.active': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>

              {!collapsed && (
                <ListItemText primary={item.label} />
              )}
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default Sidebar