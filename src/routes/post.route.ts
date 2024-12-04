import { Router } from "express";
import { addPost, listAllPosts } from "../controllers/post.controller";
import upload from "../utils/storage";
import { AddPostValidator } from "../utils/validators/add-post.validator";

const postRouter = Router();

/**
 * This API endpoint allows users to create a new post with a title,
 * description, associated tags, and an uploaded file
 * The file is stored in an S3 bucket, and the file URL is linked to the post.
 * We are valdatinfg requst body as well using Joi
 */
postRouter.post("/add", upload.single("file"), AddPostValidator, addPost);

/**
 * Endpoint to list all the post with associated tag info
 * page, limit, sortBy, sortOrder, keyword, tagId
 * Accepting above parameters in req.query
 * All the parameters are optional
 * page: pageIndex => Deault: 1
 * limit: no of records => Default : 10
 * sortBy: key name on which you want to apply sorting =>  Default : createdAt
 * sortOrder: sorting order => asc | desc = Default: desc
 * keyword: case-insensitive search if that keyword exist either in name or description
 * tagId: return all the posts associated with that tag only
 */
postRouter.get("/list", listAllPosts);

export default postRouter;
