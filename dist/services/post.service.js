"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToS3 = exports.getPostByTagId = exports.getAllPosts = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const tag_model_1 = __importDefault(require("../models/tag.model"));
const AWS = __importStar(require("aws-sdk"));
const fs = __importStar(require("fs"));
let s3;
if (process.env.NODE_ENV === "PRODUCTION") {
    s3 = new AWS.S3({});
}
else {
    s3 = new AWS.S3({
        region: "ap-south-1",
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });
}
const createPost = (title, description, imageUrl, tagIds, key) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new post_model_1.default({
        title,
        description,
        imageUrl,
        tags: tagIds,
        key,
    });
    yield post.save();
    return post;
});
exports.createPost = createPost;
const getAllPosts = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", keyword, tagId) {
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
    const records = yield post_model_1.default.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .populate("tags")
        .exec();
    return records.map((it) => {
        const signedUrl = it.key ? generateSignedUrl(it.key) : "";
        return Object.assign(Object.assign({}, it.toObject()), { signedUrl });
    });
});
exports.getAllPosts = getAllPosts;
const getPostByTagId = (tagId) => __awaiter(void 0, void 0, void 0, function* () {
    const validateTagId = yield tag_model_1.default.findById(tagId);
    if (!validateTagId)
        throw new Error("Invalid Tag ID");
    const records = yield post_model_1.default.find({
        tags: tagId,
    });
    return records.map((it) => {
        const signedUrl = it.key ? generateSignedUrl(it.key) : "";
        return Object.assign(Object.assign({}, it.toObject()), { signedUrl });
    });
});
exports.getPostByTagId = getPostByTagId;
const uploadFileToS3 = (file) => {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(file.path);
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: file.filename,
            Body: fileStream,
        };
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
                fs.unlink(file.path, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error("Error deleting the local file:", unlinkErr);
                    }
                    else {
                        console.log("Local file deleted after upload");
                    }
                });
            }
        });
    });
};
exports.uploadFileToS3 = uploadFileToS3;
const generateSignedUrl = (key) => {
    try {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: key,
            Expires: process.env.URL_EXPIRES_IN ? +process.env.URL_EXPIRES_IN : 3600, // time in seconds the signed URL will be valid
        };
        const signedUrl = s3.getSignedUrl("getObject", params);
        return signedUrl || "";
    }
    catch (error) {
        console.log(error);
    }
};
