const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const path = require('path'); // To handle file paths
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve the HTML file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Adjust path if your HTML file is named differently
});

// Configure SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Handle form submission
app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  const msg = {
    to: 'mrhess25@gmail.com', // Your email address
    from: 'mrhess25@gmail.com', // Must match a verified sender in SendGrid
    subject: subject || 'No Subject Provided',
    text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    html: `<strong>You have received a new message from ${name} (${email}):</strong><p>${message}</p>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      res.status(200).send('Email sent successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Failed to send email');
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
