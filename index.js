const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
  res.send("Welcome to Portfolio backend")
})

// POST route to send email
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }
  
  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'trlaleth@gmail.com', 
      pass: 'jfxkyfhoyjugdhve' 
    }
  });

  // Email content
  const mailOptions = {
    from: email,
    to: 'trlaleth@gmail.com', 
    subject: 'New Message from Portfolio Contact Form',
    html: `
      <h2>New Message Details:</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
