const {welcome, menu} = require('../../src/ivr/handler');

describe('IvrHandler#Welcome', () => {
  it('should serve TwiML with gather for Jay\'s Frames', () => {
    const twiml = welcome();
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Gather')).toBe(2);
    expect(count('Say')).toBe(2);

    // TwiML options
    expect(twiml).toContain('action="/ivr/menu"');
    expect(twiml).toContain('numDigits="1"');
    expect(twiml).toContain('loop="3"');

    // TwiML content
    expect(twiml).toContain('Thank you for calling Jay\'s Frames');
    expect(twiml).toContain('Houston Heights');
  });
});

describe('IvrHandler#Menu', () => {
  it('should redirect to welcome with invalid digits', () => {
    const twiml = menu('9');
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Say')).toBe(2);
    expect(count('Redirect')).toBe(2);

    // TwiML content
    expect(twiml).toContain('welcome');
    expect(twiml).toContain('not a valid option');
  });

  it('should provide business hours and location for option 1', () => {
    const twiml = menu('1');
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Say')).toBe(4);
    expect(count('Redirect')).toBe(2);

    // TwiML content
    expect(twiml).toContain('Houston Heights');
    expect(twiml).toContain('Monday through Friday');
    expect(twiml).toContain('9 AM to 6 PM');
  });

  it('should provide framing services info for option 2', () => {
    const twiml = menu('2');
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Say')).toBe(4);
    expect(count('Redirect')).toBe(2);

    // TwiML content
    expect(twiml).toContain('custom framing');
    expect(twiml).toContain('artwork, photographs');
    expect(twiml).toContain('UV-protective glass');
  });

  it('should connect to representative for option 3', () => {
    const twiml = menu('3');

    // TwiML verbs
    expect(twiml).toContain('Say');
    expect(twiml).toContain('Dial');

    // TwiML content
    expect(twiml).toContain('framing specialists');
    expect(twiml).toContain('+17135551234');
  });
});

/**
 * Counts how many times a word is repeated
 * @param {String} paragraph
 * @return {String[]}
 */
function countWord(paragraph) {
  return (word) => {
    const regex = new RegExp(`\<${word}[ | \/?\>]|\<\/${word}?\>`);
    return (paragraph.split(regex).length - 1);
  };
}