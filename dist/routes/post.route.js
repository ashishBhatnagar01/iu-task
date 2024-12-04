"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const storage_1 = __importDefault(require("../utils/storage"));
const add_post_validator_1 = require("../utils/validators/add-post.validator");
const postRouter = (0, express_1.Router)();
/**
 * This API endpoint allows users to create a new post with a title,
 * description, associated tags, and an uploaded file
 * The file is stored in an S3 bucket, and the file URL is linked to the post.
 * We are valdatinfg requst body as well using Joi
 */
postRouter.post("/add", storage_1.default.single("file"), add_post_validator_1.AddPostValidator, post_controller_1.addPost);
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
postRouter.get("/list", post_controller_1.listAllPosts);
exports.default = postRouter;
