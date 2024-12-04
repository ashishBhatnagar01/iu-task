"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const add_tag_validator_1 = require("../utils/validators/add-tag.validator");
const tag_controller_1 = require("../controllers/tag.controller");
const tagRouter = (0, express_1.Router)();
tagRouter.post("/add", add_tag_validator_1.AddTagValidator, tag_controller_1.addTag);
tagRouter.get("/list", tag_controller_1.listTags);
exports.default = tagRouter;
