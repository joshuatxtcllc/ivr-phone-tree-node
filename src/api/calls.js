const express = require('express');
const { makeCall, getCallLogs } = require('./twilio');
const router = express.Router();

// Make a new call
router.post('/make', async (req, res) => {
  const { to, from, url } = req.body;
  
  console.log('Call request received:', { to, from, url });
  
  if (!to || !from) {
    return res.status(400).json({ error: 'Missing required fields: to, from' });
  }

  // Construct webhook URL - for development, you'll need ngrok or similar
  const host = req.get('host');
  const protocol = req.get('x-forwarded-proto') || req.protocol;
  const webhookUrl = url || `${protocol}://${host}/ivr/welcome`;
  
  console.log('Using webhook URL:', webhookUrl);
  
  // Validate phone number format
  if (!to.startsWith('+')) {
    return res.status(400).json({ error: 'Phone number must be in E.164 format (e.g., +1234567890)' });
  }
  
  const result = await makeCall(to, from, webhookUrl);
  
  if (result.success) {
    console.log('Call successful:', result.callSid);
    res.json({ success: true, callSid: result.callSid });
  } else {
    console.error('Call error:', result.error);
    res.status(500).json({ 
      error: result.error,
      code: result.code,
      moreInfo: result.moreInfo 
    });
  }
});

// Get call history
router.get('/history', async (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const result = await getCallLogs(limit);
  
  if (result.success) {
    res.json({ calls: result.calls });
  } else {
    res.status(500).json({ error: result.error });
  }
});

// Get call analytics
router.get('/analytics', async (req, res) => {
  try {
    const result = await getCallLogs(1000); // Get more data for analytics
    
    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    const calls = result.calls;
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Filter calls from the last week
    const recentCalls = calls.filter(call => 
      new Date(call.dateCreated) >= weekAgo
    );

    // Calculate metrics
    const totalCalls = recentCalls.length;
    const completedCalls = recentCalls.filter(call => call.status === 'completed').length;
    const answerRate = totalCalls > 0 ? (completedCalls / totalCalls * 100).toFixed(1) : 0;
    
    // Calculate average duration
    const durations = recentCalls
      .filter(call => call.duration)
      .map(call => parseInt(call.duration));
    const avgDuration = durations.length > 0 
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
      : 0;

    res.json({
      totalCalls,
      answerRate: parseFloat(answerRate),
      avgDuration,
      recentCalls: recentCalls.slice(0, 10) // Return 10 most recent
    });
  } catch (error) {
    console.error('Error calculating analytics:', error);
    res.status(500).json({ error: 'Failed to calculate analytics' });
  }
});

module.exports = router;