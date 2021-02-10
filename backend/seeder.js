const User = require('./models/User');
const { users } = require('./data/users');

const seedDB = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
  } catch (error) {
    console.log(`Unable to save data ${error.message}`);
  }
};

module.exports = seedDB;
