"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTagValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const httpStatusCodes_1 = require("../httpStatusCodes");
const responseFormatter_1 = require("../responseFormatter");
const AddTagValidator = (req, res, next) => {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
    });
    const { name } = req.body;
    const { error, value } = schema.validate({ name });
    if (error) {
        return res
            .status(httpStatusCodes_1.HttpStatusCode.BAD_REQUEST)
            .json(responseFormatter_1.ResponseFormatter.failure("Required parameters are missing", httpStatusCodes_1.HttpStatusCode.BAD_REQUEST, error.details));
    }
    next();
};
exports.AddTagValidator = AddTagValidator;
