import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, username, password, role } = req.body

    const exists = await User.findOne({ username })
    if (exists) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      username,
      password: hashed,
      role
    })

    res.json({ msg: 'User registered', user })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
}

// LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ msg: 'Invalid username' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Wrong password' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({
      token,
      user: {
        name: user.name,
        role: user.role
      }
    })
  } catch (err) {
    res.status(500).json({ msg: 'Server error' })
  }
}