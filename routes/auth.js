const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route     POST api/auth
// @desc      'Login' -- Auth user & get token
// @access    Public
router.post(
  '/',
  [
    check('name', 'Must enter a username.').exists(),
    check('password', 'Password must be at least 6 ]').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid Credentials' });
      // return res.status(400).json({ errors: errors.array() });
    }
    const { name, password } = req.body;
    try {
      let user = await User.findOne({ name });

      if (!user) {
        return res.status(400).json({ error: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid Credentials' });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      return res.status(500).json({ error: 'Server Error' });
    }
  }
);

module.exports = router;
