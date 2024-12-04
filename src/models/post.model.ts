import mongoose, { Schema } from "mongoose";

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    key: { type: String, required: true },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "tags",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("posts", PostSchema);
export default Post;
