import mongoose from "mongoose";
import Post from "../models/post.model";
import Tag from "../models/tag.model";
import * as AWS from "aws-sdk";
import * as fs from "fs";

let s3;
if (process.env.NODE_ENV === "PRODUCTION") {
  s3 = new AWS.S3({});
} else {
  s3 = new AWS.S3({
    region: "ap-south-1",
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });
}

export const createPost = async (
  title: string,
  description: string,
  imageUrl: string,
  tagIds: mongoose.Types.ObjectId[],
  key: string
) => {
  const post = new Post({
    title,
    description,
    imageUrl,
    tags: tagIds,
    key,
  });
  await post.save();
  return post;
};

export const getAllPosts = async (
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder: "asc" | "desc" = "desc",
  keyword: string,
  tagId: string
) => {
  const skip = (page - 1) * limit;

  const query = {
    $or: [
      { title: { $regex: keyword || "", $options: "i" } },
      { description: { $regex: keyword || "", $options: "i" } },
    ],
  };

  if (tagId) {
    //@ts-ignore
    query.tags = tagId;
  }
  const records = await Post.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .populate("tags")
    .exec();

  return records.map((it) => {
    const signedUrl = it.key ? generateSignedUrl(it.key as string) : "";
    return {
      ...it.toObject(),
      signedUrl,
    };
  });
};

export const getPostByTagId = async (tagId: string) => {
  const validateTagId = await Tag.findById(tagId);
  if (!validateTagId) throw new Error("Invalid Tag ID");
  const records = await Post.find({
    tags: tagId,
  });
  return records.map((it) => {
    const signedUrl = it.key ? generateSignedUrl(it.key as string) : "";
    return {
      ...it.toObject(),
      signedUrl,
    };
  });
};

export const uploadFileToS3 = (file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(file.path);
    const params = {
      Bucket: process.env.BUCKET_NAME as string,
      Key: file.filename,
      Body: fileStream,
    };
    s3.upload(params, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
        fs.unlink(file.path, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting the local file:", unlinkErr);
          } else {
            console.log("Local file deleted after upload");
          }
        });
      }
    });
  });
};

const generateSignedUrl = (key: string) => {
  try {
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
      Expires: process.env.URL_EXPIRES_IN ? +process.env.URL_EXPIRES_IN : 3600, // time in seconds the signed URL will be valid
    };
    const signedUrl = s3.getSignedUrl("getObject", params);
    return signedUrl || "";
  } catch (error) {
    console.log(error);
  }
};
