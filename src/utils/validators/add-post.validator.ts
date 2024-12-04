import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ResponseFormatter } from "../responseFormatter";
import { HttpStatusCode } from "../httpStatusCodes";

export const AddPostValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void | any => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    tagIds: Joi.array().items().min(1).required(),
  });

  if (!req.file) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(
        ResponseFormatter.failure(
          "File is missing",
          HttpStatusCode.BAD_REQUEST,
          "File is missing"
        )
      );
  }
  const { title, description, tagIds } = req.body;
  console.log(tagIds);
  const { error, value } = schema.validate({ title, description, tagIds });
  if (error) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(
        ResponseFormatter.failure(
          "Required parameters are missing",
          HttpStatusCode.BAD_REQUEST,
          error.details
        )
      );
  }
  next();
};
