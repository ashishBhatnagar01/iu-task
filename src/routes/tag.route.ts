import { Router } from "express";
import { AddTagValidator } from "../utils/validators/add-tag.validator";
import { addTag, listTags } from "../controllers/tag.controller";

const tagRouter = Router();

/**
 * This endpoint allows end user to add new tag
 * We are validating req.body in the middleware
 */
tagRouter.post("/add", AddTagValidator, addTag);

/**
 * Endpoint to list all the tags
 */
tagRouter.get("/list", listTags);

export default tagRouter;
