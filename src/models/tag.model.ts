import mongoose, { Schema } from "mongoose";

const TagSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Tag = mongoose.model("tags", TagSchema);
export default Tag;
