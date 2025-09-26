require('dotenv').config();

const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.welcome = function welcome() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/ivr/menu',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
    'Thank you for calling Jay\'s Frames, your premier custom framing shop in Houston Heights. ' +
    'Press 1 for our business hours and location. ' +
    'Press 2 for information about our custom framing services. ' +
    'Press 3 to speak with one of our framing specialists.',
    {loop: 3}
  );

  return voiceResponse.toString();
};

exports.menu = function menu(digit) {
  const optionActions = {
    '1': giveBusinessHoursAndLocation,
    '2': listFramingServices,
    '3': connectToLiveRepresentative,
  };

  return (optionActions[digit])
    ? optionActions[digit]()
    : redirectWelcome();
};

/**
 * Provides business hours and location information
 * @return {String}
 */
function giveBusinessHoursAndLocation() {
  const twiml = new VoiceResponse();

  twiml.say(
    'Jay\'s Frames is located in the heart of Houston Heights. ' +
    'We are open Monday through Friday from 9 AM to 6 PM, ' +
    'and Saturday from 10 AM to 4 PM. We are closed on Sundays. ' +
    'Visit us for all your custom framing needs. ' +
    'You can find us easily with plenty of parking available.',
    {voice: 'Polly.Joanna', language: 'en-US'}
  );

  twiml.say('Returning to the main menu.');

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}

/**
 * Lists custom framing services offered
 * @return {String}
 */
function listFramingServices() {
  const twiml = new VoiceResponse();

  twiml.say(
    'At Jay\'s Frames, we specialize in custom framing for artwork, photographs, ' +
    'diplomas, memorabilia, and collectibles. We offer a wide selection of frame styles, ' +
    'professional matting options, UV-protective glass, and museum-quality materials. ' +
    'Our experienced team provides expert consultation to preserve and showcase your ' +
    'treasured items beautifully. We also offer shadow boxes for three-dimensional pieces.',
    {voice: 'Polly.Joanna', language: 'en-US'}
  );

  twiml.say('Returning to the main menu.');

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}

/**
 * Connects caller to a live representative
 * @return {String}
 */
function connectToLiveRepresentative() {
  const twiml = new VoiceResponse();

  twiml.say(
    'Please hold while we connect you to one of our framing specialists. ' +
    'They will be happy to assist you with your custom framing needs.',
    {voice: 'Polly.Joanna', language: 'en-US'}
  );

  // Use the configured Twilio phone number or a forwarding number
  twiml.dial(process.env.TWILIO_PHONE_NUMBER || '+17135551234');

  return twiml.toString();
}

/**
 * Returns an xml with the redirect to welcome menu
 * @return {String}
 */
function redirectWelcome() {
  const twiml = new VoiceResponse();

  twiml.say('I\'m sorry, that\'s not a valid option. Returning to the main menu.', {
    voice: 'Polly.Joanna',
    language: 'en-US',
  });

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}