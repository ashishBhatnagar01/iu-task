"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPostByTagId = exports.listAllPosts = exports.addPost = void 0;
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const responseFormatter_1 = require("../utils/responseFormatter");
const post_service_1 = require("../services/post.service");
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const upload = yield (0, post_service_1.uploadFileToS3)(req.file);
        console.log(upload);
        const { title, description, tagIds } = req.body;
        const data = yield (0, post_service_1.createPost)(title, description, upload.Location, tagIds, upload.Key);
        return res
            .status(httpStatusCodes_1.HttpStatusCode.CREATED)
            .json(responseFormatter_1.ResponseFormatter.success(data, "Post created successfully", httpStatusCodes_1.HttpStatusCode.CREATED));
    }
    catch (error) {
        return res
            .status(httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(responseFormatter_1.ResponseFormatter.failure("Something went wrong", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.addPost = addPost;
const listAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, sortBy, sortOrder, keyword, tagId } = req.query;
        const data = yield (0, post_service_1.getAllPosts)(parseInt(page), parseInt(limit), sortBy, sortOrder, keyword, tagId);
        return res
            .status(httpStatusCodes_1.HttpStatusCode.OK)
            .json(responseFormatter_1.ResponseFormatter.success(data, "Records fetched successfully", httpStatusCodes_1.HttpStatusCode.OK));
    }
    catch (error) {
        return res
            .status(httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(responseFormatter_1.ResponseFormatter.failure("Something went wrong", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.listAllPosts = listAllPosts;
const listPostByTagId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tagId } = req.params;
        const data = yield (0, post_service_1.getPostByTagId)(tagId);
        return res
            .status(httpStatusCodes_1.HttpStatusCode.OK)
            .json(responseFormatter_1.ResponseFormatter.success(data, "Records fetched successfully", httpStatusCodes_1.HttpStatusCode.OK));
    }
    catch (error) {
        return res
            .status(httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(responseFormatter_1.ResponseFormatter.failure("Something went wrong", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.listPostByTagId = listPostByTagId;
