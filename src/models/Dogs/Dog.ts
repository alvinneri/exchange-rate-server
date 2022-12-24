import { Document, model, Model, Schema, Types } from "mongoose";

export interface DogDocument extends Document {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  name: String;
  photo: String;
}

export interface DogModel extends Model<DogDocument> {}
const DogSchema = new Schema<DogDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Dog = model<DogDocument, DogModel>("Dog", DogSchema);
