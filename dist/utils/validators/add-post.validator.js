"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPostValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const responseFormatter_1 = require("../responseFormatter");
const httpStatusCodes_1 = require("../httpStatusCodes");
const AddPostValidator = (req, res, next) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        tagIds: joi_1.default.array().items().min(1).required(),
    });
    if (!req.file) {
        return res
            .status(httpStatusCodes_1.HttpStatusCode.BAD_REQUEST)
            .json(responseFormatter_1.ResponseFormatter.failure("File is missing", httpStatusCodes_1.HttpStatusCode.BAD_REQUEST, "File is missing"));
    }
    const { title, description, tagIds } = req.body;
    console.log(tagIds);
    const { error, value } = schema.validate({ title, description, tagIds });
    if (error) {
        return res
            .status(httpStatusCodes_1.HttpStatusCode.BAD_REQUEST)
            .json(responseFormatter_1.ResponseFormatter.failure("Required parameters are missing", httpStatusCodes_1.HttpStatusCode.BAD_REQUEST, error.details));
    }
    next();
};
exports.AddPostValidator = AddPostValidator;
