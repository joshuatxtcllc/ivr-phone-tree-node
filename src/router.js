const twilio = require('twilio');
const Router = require('express').Router;
const ivrRouter = require('./ivr/router');
const callsRouter = require('./api/calls');
const smsRouter = require('./api/sms');

const router = new Router();

// GET: / - home page
router.get('/', (req, res) => {
  res.render('index');
});

router.use('/ivr', twilio.webhook({validate: false}), ivrRouter);
router.use('/api/calls', callsRouter);
router.use('/api/sms', smsRouter);

module.exports = router;
