const { check, validationResult } = require('express-validator');
const express = require('express');
const auth = require('../middleware/auth');
const Tech = require('../models/Tech');

const router = express.Router();

// @route     GET api/techs
// @descr     Get all user's technicians
// @access    Private

router.get('/', auth, async (req, res) => {
  try {
    const techs = await Tech.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(techs);
  } catch (err) {
    res.status(500).json({error: 'Server error'});
  }
});

// @route     POST api/techs
// @desc      Add new tech
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('firstName', 'Tech first name is required').not().isEmpty(),
      check('lastName', 'Tech last name is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ error: errors.array() });
    }

    const { firstName, lastName } = req.body;

    try {
      const newTech = new Tech({
        firstName,
        lastName,
        user: req.user.id,
      });
      const tech = await newTech.save();
      res.json(tech);
    } catch (err) {
      res.status(500).json({error: 'Error saving tech'});
    }
  }
);

// @route     PUT api/techs/:id
// @desc      Update tech
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { firstName, lastName} = req.body;

  // Build tech object
  const techFields = { firstName, lastName };

  try {
    let tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ error: 'Tech not found' });

    // Make sure user owns tech
    if (tech.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    tech = await Tech.findByIdAndUpdate(
      req.params.id,
      { $set: techFields },
      { new: true }
    );

    res.json(tech);
  } catch (err) {
    res.status(500).json({error: 'Error saving tech'});
  }
});

// @route     GET api/techs/:id
// @desc      Delete a tech
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ error: 'Tech not found' });

    // Make sure user owns tech
    if (tech.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    await Tech.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Tech removed' });
  } catch (err) {
    res.status(500).json({error: 'Error deleting tech'});
  }
});

module.exports = router;