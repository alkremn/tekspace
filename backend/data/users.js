const bcrypt = require('bcrypt');

const users = [
  {
    name: 'Ben Gold',
    email: 'ben49@gmail.com',
    password: bcrypt.hashSync('12345', 10),
    photoUrl: '',
    isAdmin: false,
    isSecond: false,
  },
  {
    name: 'Alexey Kremnev',
    email: 'alkremn@gmail.com',
    gmail: 'alkremn@gmail.com',
    password: bcrypt.hashSync('12345', 10),
    photoUrl:
      'https://avatars.githubusercontent.com/u/15260156?s=460&u=315a29ed6f1c17b22c7d96f929d2c878e4ea7bfc&v=4',
    isAdmin: true,
    isSecond: true,
  },
  {
    name: 'John Bowe',
    email: 'bowej@gmail.com',
    password: bcrypt.hashSync('12345', 10),
    photoUrl:
      'https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg',
    isAdmin: false,
    isSecond: true,
  },
];

module.exports = {
  users,
};
