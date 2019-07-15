const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  emailId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String
  },
  password: {
    type: String
  },
  gender: {
    type: String
  },
  dob: {
    type: Date
  },
  qualification: {
    type: String
  },
  role: {
    type: String,
    required: true
  },
  address: {//World
    type: String
  },
  pinCode: {//World
    type: Number
  },
  city: {//World
    type: String
  },
  state: {//World
    type: String
  },
  country: { //World
    type: String
  },

  verified: {
    type: Boolean
  },
  uploads: {
    type: Number,
    default: 0
  },
  access: {
    type: Boolean,
    default: true
  },
  otpKey: {
    type: String
  },
  downloads: [{ //World
    id: {
      type: String
    },
    times: {
      type: Number,
      default: 0
    }
  }],
  time: {
    type: Date,
    default: Date.now()
  }
});
module.exports = User = mongoose.model('users',UserSchema);

