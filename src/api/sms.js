const express = require('express');
const { sendSMS, getMessageLogs } = require('./twilio');
const router = express.Router();

// Send SMS
router.post('/send', async (req, res) => {
  const { to, from, body } = req.body;
  
  if (!to || !from || !body) {
    return res.status(400).json({ error: 'Missing required fields: to, from, body' });
  }

  const result = await sendSMS(to, from, body);
  
  if (result.success) {
    res.json({ success: true, messageSid: result.messageSid });
  } else {
    res.status(500).json({ error: result.error });
  }
});

// Get message history
router.get('/history', async (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const result = await getMessageLogs(limit);
  
  if (result.success) {
    res.json({ messages: result.messages });
  } else {
    res.status(500).json({ error: result.error });
  }
});

// Handle incoming SMS webhooks
router.post('/webhook', (req, res) => {
  const { From, Body, MessageSid } = req.body;
  
  console.log('Received SMS:', {
    from: From,
    body: Body,
    messageSid: MessageSid
  });
  
  // Here you can add logic to handle incoming messages
  // For example, auto-responses, logging, etc.
  
  res.status(200).send('OK');
});

module.exports = router;