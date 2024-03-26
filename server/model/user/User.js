import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true // Ensure uniqueness
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
},
  {
    timestamps: true
  });

// Function to generate a unique ID
async function generateUniqueID() {
  let found = false;
  let id;
  do {
    id = Math.floor(Math.random() * 1000000); // Generate a random number
    // Check if the generated ID already exists in the database
    const existingUser = await Users.findOne({ id: id });
    if (!existingUser) {
      found = true;
    }
  } while (!found);
  return id;
}

userSchema.pre("save", async function (next) {
  if (!this.id) {
    // Generate unique ID if not provided
    this.id = await generateUniqueID();
  }
  next();
});

const Users = mongoose.model("Users", userSchema, "users");

export default Users;