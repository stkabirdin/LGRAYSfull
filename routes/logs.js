const { check, validationResult } = require('express-validator');
const express = require('express');
const auth = require('../middleware/auth');
const Log = require('../models/Log');

const router = express.Router();

// @route     GET api/logs
// @desc      Get all user's logs
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const logs = await Log.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({error: 'Server error'});
  }
});

// @route     POST api/logs
// @desc      Add new log
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('message', 'Log message is required').not().isEmpty(),
      check('tech', 'Tech is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ error: errors.array() });
    }

    const { message, tech, attention } = req.body;

    try {
      const newLog = new Log({
        message,
        tech,
        attention,
        user: req.user.id,
      });
      const log = await newLog.save();
      res.json(log);
    } catch (err) {
      res.status(500).json( {error: 'Error saving log'});
    }
  }
);

// @route     PUT api/logs/:id
// @desc      Update log
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { message, tech, attention } = req.body;

  // Build log object
  const logFields = { message, tech, attention };

  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ error: 'Log not found' });

    // Make sure user owns log
    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    res.status(500).json({error: 'Error saving log'});
  }
});

// @route     GET api/logs/:id
// @desc      Delete a log
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ error: 'Log not found' });

    // Make sure user owns log
    if (log.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    await Log.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Log removed' });
  } catch (err) {
    res.status(500).json({error: 'Error saving log'});
  }
});

module.exports = router;
