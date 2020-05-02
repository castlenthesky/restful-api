import * as mongoose from "mongoose";
import * as uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema(
  {
    username: {
      required: true,
      unique: true,
      type: String,
      lowercase: true,
    },
    password: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      unique: true,
      lowercase: true,
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    role: {
      lowercase: true,
      required: true,
      type: String,
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

// userSchema.virtual("id").get(() => {
//   return this._id.toHexString();
// });

userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
  virtuals: true,
});

const User = mongoose.model("Users", userSchema);

export async function list (query: object = {}) {
  return await User.find(query, (err, users) => {
    if (err) {
      return err
    } 
    return users
  })
};

export async function findByUsername (targetUser) {
  return await User.find({ username: targetUser }, (err, foundUser) => {
    if (err) { return err }
    return foundUser;
  })
};

export let findByID = async (id) => {
  return User.findById(id).then((result) => {
    result = result.toJSON();
    delete result.__id;
    delete result.__v;
    return result;
  });
};

export let findByEmail = async (email) => {
  return User.find({ email: email });
};

export async function createUser (userData) {
  const user = new User(userData);
  return user.save().then((result) => {
    delete result.__id;
    delete result.__v;
    delete result.password;
    return result;
  });
};

export let patchUser = async (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
      if (err) reject(err);
      for (let i in userData) {
        user[i] = userData[i];
      }
      user.save((err, updatedUser) => {
        if (err) return reject(err);
        resolve(updatedUser);
      });
    });
  });
};

export let putUser = async (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
      if (err) reject(err);
      for (let i in userData) {
        user[i] = userData[i];
      }
      user.save((err, updatedUser) => {
        if (err) return reject(err);
        resolve(updatedUser);
      });
    });
  });
};

export let removeById = async (id) => {
  return new Promise((resolve, reject) => {
    User.remove({ _id: id }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
