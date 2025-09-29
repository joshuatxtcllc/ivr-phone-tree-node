const twilio = require('twilio');
require('dotenv').config();

// Log environment variables (without exposing sensitive data)
console.log('=== TWILIO CONFIGURATION CHECK ===');
console.log('Account SID:', process.env.TWILIO_ACCOUNT_SID ? `${process.env.TWILIO_ACCOUNT_SID.substring(0, 10)}...` : 'NOT SET');
console.log('Auth Token:', process.env.TWILIO_AUTH_TOKEN ? 'SET (hidden)' : 'NOT SET');
console.log('Phone Number:', process.env.TWILIO_PHONE_NUMBER || 'NOT SET');
console.log('=====================================');

// Initialize Twilio client
let client;
try {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.error('❌ Twilio credentials missing! Please check your .env file.');
    console.error('Required variables: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER');
    console.error('Current values:');
    console.error('- TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID ? `${process.env.TWILIO_ACCOUNT_SID.substring(0, 10)}...` : 'undefined');
    console.error('- TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN ? 'SET (hidden)' : 'undefined');
    console.error('- TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER || 'undefined');
  } else {
    client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    console.log('✅ Twilio client initialized successfully');
    console.log('✅ Using phone number:', process.env.TWILIO_PHONE_NUMBER);
  }
} catch (error) {
  console.error('❌ Failed to initialize Twilio client:', error.message);
  console.error('❌ Full error:', error);
}

module.exports = {
  client,
  
  // Make an outbound call
  async makeCall(to, from, url) {
    try {
      console.log('=== TWILIO MAKECALL FUNCTION ===');
      console.log('Parameters:', { to, from, url });
      
      if (!client) {
        console.error('❌ Twilio client not initialized');
        throw new Error('Twilio credentials not configured. Please check your .env file.');
      }
      
      if (!from || !from.startsWith('+')) {
        console.error('Invalid from number:', from);
        throw new Error('From number must be a valid Twilio phone number in E.164 format');
      }
      
      console.log('Creating Twilio call...');
      const call = await client.calls.create({
        to,
        from,
        url,
        method: 'POST',
        timeout: 30,
        record: false,
        statusCallback: url.replace('/welcome', '/status'),
        statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
        statusCallbackMethod: 'POST'
      });
      
      console.log('✅ Twilio call created:', call.sid);
      return { success: true, callSid: call.sid };
    } catch (error) {
      console.error('❌ === TWILIO ERROR ===');
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      console.error('Error status:', error.status);
      console.error('More info:', error.moreInfo);
      return { 
        success: false, 
        error: error.message,
        code: error.code,
        moreInfo: error.moreInfo,
        details: error.details
      };
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