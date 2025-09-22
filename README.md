# Jay's Frames IVR Phone System

A professional Interactive Voice Response (IVR) phone system for Jay's Frames custom framing shop in Houston Heights, powered by Twilio and Node.js/Express.

## Features

- **Professional Welcome Message**: Greets customers with Jay's Frames branding
- **Business Information**: Provides hours and location details
- **Service Information**: Details about custom framing services offered
- **Live Representative Connection**: Routes calls to framing specialists
- **Error Handling**: Gracefully handles invalid inputs

## Phone Menu Options

1. **Press 1**: Business hours and location information
2. **Press 2**: Information about custom framing services
3. **Press 3**: Connect to a live framing specialist

## Services Highlighted

- Custom framing for artwork and photographs
- Diploma and certificate framing
- Memorabilia and collectibles framing
- Professional matting options
- UV-protective glass
- Museum-quality materials
- Shadow boxes for 3D items
- Expert consultation services

## Local Development

This project is built using [Express](http://expressjs.com/) web framework and depends on [Twilio](https://www.twilio.com).

1. First clone this repository and `cd` into it.

   ```bash
   git clone [repository-url]
   cd jays-frames-ivr
   ```

2. Install project's dependencies.

   ```bash
   npm install
   ```

3. Make sure the tests succeed.

   ```bash
   npm test
   ```

4. Start the development server.

   ```bash
   npm start
   ```

5. Check it out at [http://localhost:3000](http://localhost:3000).

6. Expose the application to the wider Internet using [ngrok](https://ngrok.com/).

   ```bash
   ngrok http 3000
   ```

7. Configure your Twilio phone number:
   - Go to [Twilio's Manage Numbers](https://www.twilio.com/console/phone-numbers/incoming)
   - Set the voice URL to: `http://[your-ngrok-subdomain].ngrok.io/ivr/welcome`

## Configuration

### Important: Update Phone Number

Before deploying, update the phone number in `src/ivr/handler.js` in the `connectToLiveRepresentative()` function:

```javascript
// Replace with Jay's Frames actual phone number
twiml.dial('+17135551234');
```

### Business Hours

Current configuration shows:
- Monday-Friday: 9 AM to 6 PM
- Saturday: 10 AM to 4 PM  
- Sunday: Closed

Update these hours in the `giveBusinessHoursAndLocation()` function as needed.

## Customization

You can easily customize:
- Welcome message and business name
- Menu options and routing
- Business hours and location details
- Service descriptions
- Voice settings (currently using Polly.Joanna)

## Testing

The application includes comprehensive tests for all IVR functionality:

```bash
npm test
```

## Deployment

For production deployment:
1. Set up a Twilio account and phone number
2. Deploy to your preferred hosting service
3. Configure the Twilio webhook URL
4. Update the representative phone number
5. Test all menu options thoroughly

## License

MIT License - See LICENSE file for details.

## Support

For technical support or customization requests, contact your development team.