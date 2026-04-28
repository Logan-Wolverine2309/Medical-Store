import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RoleRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth()

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Not allowed role
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

export default RoleRoute