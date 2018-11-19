const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../configuration');
const { transporter, createMailOptions } = require('../helpers/emailHelper');

signToken = user => {
  return JWT.sign({
    iss: 'walter3019',
    sub: user.id, // user id
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) { 
      return res.status(403).json({ error: 'Email is already in use'});
    }

    // Create a new user
    const newUser = new User({ 
      method: 'local',
      local: {
        email: email, 
        password: password
      }
    });

    await newUser.save();

    // Generate the token
    const token = signToken(newUser);

    // send email.
    const url = `http://localhost:5000/users/confirmation/${token}`;
    const mailOptions = {
      from: 'yourtable <tz883019@gmail.com>',
      to: 'menglingchen3019@gmail.com',
      subject: 'test email',
      text: url
    };

    transporter().sendMail(mailOptions, (err, res) => {
      console.log(err);
      console.log('---------------');
      console.log(res);
    });

    // Respond with token
    res.status(200).json({ token });
  },

  confirmUser: async (req, res, next) => {
    try {
      const id = JWT.verify(req.params.token, JWT_SECRET).sub;
      console.log(id);
      await User.findByIdAndUpdate({ _id: id }, {confirmed: true});
    } catch (error) {
      
    }
  },

  signIn: async (req, res, next) => {
    if(req.user.confirmed === false) {
      return res.status(401).json({ message: 'User does not confirmed.'});
    }

    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  facebookOAuth: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log('I managed to get here!');
    res.json({ secret: "resource" });
  }
}