const twilio = require('twilio');

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = {
  client,
  
  // Make an outbound call
  async makeCall(to, from, url) {
    try {
      const call = await client.calls.create({
        to,
        from,
        url,
      });
      return { success: true, callSid: call.sid };
    } catch (error) {
      console.error('Error making call:', error);
      return { success: false, error: error.message };
    }
  },

  // Send SMS
  async sendSMS(to, from, body) {
    try {
      const message = await client.messages.create({
        to,
        from,
        body,
      });
      return { success: true, messageSid: message.sid };
    } catch (error) {
      console.error('Error sending SMS:', error);
      return { success: false, error: error.message };
    }
  },

  // Get call logs
  async getCallLogs(limit = 50) {
    try {
      const calls = await client.calls.list({ limit });
      return { success: true, calls };
    } catch (error) {
      console.error('Error fetching call logs:', error);
      return { success: false, error: error.message };
    }
  },

  // Get message logs
  async getMessageLogs(limit = 50) {
    try {
      const messages = await client.messages.list({ limit });
      return { success: true, messages };
    } catch (error) {
      console.error('Error fetching message logs:', error);
      return { success: false, error: error.message };
    }
  }
};