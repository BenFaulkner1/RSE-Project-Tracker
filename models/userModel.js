import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "Edinburgh",
  },
  role: {
    type: String,
    enum: ["user", "manager", "admin"],
    default: "user",
  },
});

// toJSON is just a made up name
UserSchema.methods.toJSON = function () {
  // you want to convert this user to an object then delete the password from the object then return the new object

  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
