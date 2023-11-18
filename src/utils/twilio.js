const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Check if the environment variables are set
if (!accountSid || !authToken) {
  console.error(
    "Twilio credentials are missing. Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variables."
  );
  process.exit(1); // Exit the process or handle the error appropriately
}

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const client = require("twilio")(accountSid, authToken);

console.log(process.env.TWILIO_NO);

function format(recipient, text) {
  recipient = "+91" + recipient;
  return { from: [process.env.TWILIO_NO], body: text, to: recipient };
}

module.exports = { client, format };
