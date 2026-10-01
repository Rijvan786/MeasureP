import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: function () {
        return !this.googleId;
      },
    },
    role: {
      type: String,
      enum: ["customer", "technician"],
      default: "customer",
    },

    experienceYears: {
      type: Number,
      required: function () {
        return this.role === "technician";
      },
    },
    isVerifiedTech: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function () {
  if(!this.isModified("password")) return ;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});
userSchema.method.comparePassword = async function (password) {
  console.log(password, this.password, "hash");
  return await bcrypt.compare(password, this.password);
};
const UserModel = mongoose.model("user", userSchema);

export default UserModel;
