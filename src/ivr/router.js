const Router = require('express').Router;
const {welcome, menu} = require('./handler');

const router = new Router();

// POST: /ivr/welcome
router.post('/welcome', (req, res) => {
  res.send(welcome());
});

// POST: /ivr/menu
router.post('/menu', (req, res) => {
  const digit = req.body.Digits;
  return res.send(menu(digit));
});

// POST: /ivr/status - Handle call status callbacks
router.post('/status', (req, res) => {
  const { CallSid, CallStatus, From, To } = req.body;
  console.log('Call status update:', { CallSid, CallStatus, From, To });
  res.status(200).send('OK');
});

module.exports = router;