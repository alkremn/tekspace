const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    GET all users
// @route   /api/users/
// @access  Private

exports.getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error');
  }
});

// @desc    create User
// @route   /api/users/
// @access  Private

exports.createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email } = req.body;
  console.log(firstName, lastName);
  const mailer = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API_KEY,
      },
    })
  );

  const emailTemplate = {
    from: 'noreplay@tekteamspace.com',
    to: email,
    subject: 'Hello',
    html: `<h1>Hello  Testing</h1>
        <p>Get more info <a style="background-color: 'black; color: 'white';" href="https://www.tekteamspace.com">Team Space</a></p>
    `,
  };
  mailer.sendMail(emailTemplate, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Message sent ${info.response}`);
    }
  });
});
