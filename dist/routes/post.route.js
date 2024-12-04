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
postRouter.post("/add", storage_1.default.single("file"), add_post_validator_1.AddPostValidator, post_controller_1.addPost);
postRouter.get("/list", post_controller_1.listAllPosts);
postRouter.get("/byTagId/:tagId", post_controller_1.listPostByTagId);
exports.default = postRouter;
