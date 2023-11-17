// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function format (recepient, text){
    recepient = "+91"+recepient;
    return {from:[process.env.TWILIO_NO], body:text, to:recepient}
}
// client.messages
//       .create({from: '+15557122661', body: 'Hi there', to: '+15558675310'})
//       .then(message => console.log(message.sid));

module.exports = {client, format};