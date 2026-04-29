const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// ✅ REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body

    // check existing user
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      password: hashedPassword,
      role
    })

    await newUser.save()

    res.json({ message: 'User registered successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router