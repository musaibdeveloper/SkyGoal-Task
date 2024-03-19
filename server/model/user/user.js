import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: false,
  },

  firstName: {
    type: String,
    required: true,
    // maxlength: 15,
    // minlength: 2,
  },
  lastName: {
    type: String,
    required: true,

  },
  phone: {
    type: String,
    required: true,
    // unique: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    // maxlength: 100,
    // minlength: 4,
  }
}, 
  {
    timestamps: true
  });

export default mongoose.model("Users", userSchema, "users");
