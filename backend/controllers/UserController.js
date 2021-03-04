const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')
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
  const { name, email, gmail, password, isSecond, isAdmin } = req.body;
  console.log(name);

  const hashedPassword  = await bcrypt.hash(password, 10)

  const user = new User({name, email, gmail, password: hashedPassword, isAdmin, isSecond})
  
  await user.save();
  res.json(user);
  // const mailer = nodemailer.createTransport(
  //   sgTransport({
  //     auth: {
  //       api_key: process.env.SENDGRID_API_KEY,
  //     },
  //   })
  // );

  // const emailTemplate = {
  //   from: 'noreplay@tekteamspace.com',
  //   to: email,
  //   subject: 'Hello',
  //   html: `<h1>Hello  Testing</h1>
  //       <p>Get more info <a style="background-color: 'black; color: 'white';" href="https://www.tekteamspace.com">Team Space</a></p>
  //   `,
  // };
  // mailer.sendMail(emailTemplate, (err, info) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(`Message sent ${info.response}`);
  //   }
  // });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  delete req.body.userId;
  try {
    await User.findByIdAndUpdate(userId, req.body);
    res.status(201).json({ message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error);
  }
});
