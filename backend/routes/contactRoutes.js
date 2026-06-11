const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Resend } = require('resend');
const Contact = require('../models/Contact');

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

if (!resend) {
  console.warn('WARNING: RESEND_API_KEY is not defined in environment variables. Contact emails will not be sent.');
}

// Validation errors middleware handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name, email and message are required')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('Name, email and message are required')
    .isEmail().withMessage('Please enter a valid email address')
    .escape(),
  body('subject')
    .trim()
    .escape(),
  body('message')
    .trim()
    .notEmpty().withMessage('Name, email and message are required')
    .escape()
];

// POST /api/contact - save a contact form submission
router.post('/', contactValidation, handleValidationErrors, async function(req, res) {
  const { name, email, subject, message } = req.body;

  try {
    const contact = await Contact.create({ name, email, subject, message });

    // Send email notification via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'kams.offi.018@gmail.com',
          subject: `New Contact Submission: ${subject || 'General Inquiry'}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });
        console.log(`Contact email sent successfully via Resend for: ${email}`);
      } catch (emailErr) {
        console.error('Error sending contact email via Resend:', emailErr.message || emailErr);
      }
    }

    res.status(201).json({ message: 'Message received, we will get back to you soon!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
