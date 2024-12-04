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
exports.listTags = exports.addTag = void 0;
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const responseFormatter_1 = require("../utils/responseFormatter");
const tag_service_1 = require("../services/tag.service");
const addTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const data = yield (0, tag_service_1.createTag)(name);
        console.log(data);
        return res
            .status(httpStatusCodes_1.HttpStatusCode.CREATED)
            .json(responseFormatter_1.ResponseFormatter.success(data, "Tag created successfully", httpStatusCodes_1.HttpStatusCode.CREATED));
    }
    catch (error) {
        return res
            .status(httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(responseFormatter_1.ResponseFormatter.failure("Something went wrong", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.addTag = addTag;
const listTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, tag_service_1.listAllTags)();
        return res
            .status(httpStatusCodes_1.HttpStatusCode.OK)
            .json(responseFormatter_1.ResponseFormatter.success(data, "Tags fetched successfully", httpStatusCodes_1.HttpStatusCode.OK));
    }
    catch (error) {
        return res
            .status(httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json(responseFormatter_1.ResponseFormatter.failure("Something went wrong", httpStatusCodes_1.HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
    }
});
exports.listTags = listTags;
