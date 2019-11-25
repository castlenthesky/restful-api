import * as mongoose from 'mongoose';
// var mongoseUniqueValidator = require('mongoose-unique-validator');

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter a username.'],
      index: true,
    },
    
    firstname: {
      type: String,
      required: [true, 'Please enter your first name.'],
      index: true,
    },
    
    lastname: {
      type: String,
      required: [true, 'Please enter your last name.'],
      index: true,
    },

    email: {
      type: String,
      required: [true, 'Please enter a valid email address.'],
      unique: true,
      index: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, 'Please enter a password.'],
    },

    salt: String,

    role: {
      type: String,
      default: 'user',
    },

    title: {
      type: String,
      default: 'Aspiring Programmer',
    }
  },
  { timestamps: true },
);

// User.plugin(mongoseUniqueValidator);

module.exports = mongoose.model<mongoose.Document>('User', userModel);
