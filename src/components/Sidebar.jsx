import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import {
  Drawer, List, ListItemButton, ListItemIcon,
  ListItemText, IconButton, Toolbar
} from '@mui/material'

import {
  Menu, ChevronLeft, Home, LocalPharmacy,
  AddCircle, ShoppingCart, People,
  Warning, Inventory2
} from '@mui/icons-material'

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuth()

  const menu = [
    { path:'/dashboard', label:'Dashboard', icon:<Home/>, roles:['admin','staff','customer'] },
    { path:'/medicines', label:'Medicines', icon:<LocalPharmacy/>, roles:['admin','staff'] },
    { path:'/add-medicine', label:'Add Medicine', icon:<AddCircle/>, roles:['admin'] },
    { path:'/billing', label:'Billing', icon:<ShoppingCart/>, roles:['admin','staff'] },
    { path:'/customers', label:'Customers', icon:<People/>, roles:['admin','staff'] },
    { path:'/expired', label:'Expired', icon:<Warning/>, roles:['admin','staff'] },
    { path:'/low-stock', label:'Low Stock', icon:<Inventory2/>, roles:['admin','staff'] }
  ]

  return (
    <Drawer variant="permanent">
      <Toolbar>
        <IconButton onClick={()=>setCollapsed(!collapsed)}>
          {collapsed ? <Menu/> : <ChevronLeft/>}
        </IconButton>
      </Toolbar>

      <List>
        {menu
          .filter(m => m.roles.includes(user?.role))
          .map(m => (
            <ListItemButton key={m.path} component={NavLink} to={m.path}>
              <ListItemIcon>{m.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={m.label} />}
            </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar