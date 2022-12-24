import { Document, model, Model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isValidPassword: (password: String) => boolean;
}

export interface UserModel extends Model<UserDocument> {}

const UserSchema = new Schema<UserDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function save(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function check(
  password: string | Buffer
) {
  return bcrypt.compare(password, this.password);
};

export const User = model<UserDocument, UserModel>("User", UserSchema);
