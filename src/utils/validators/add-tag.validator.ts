import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { HttpStatusCode } from "../httpStatusCodes";
import { ResponseFormatter } from "../responseFormatter";

export const AddTagValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void | any => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const { name } = req.body;
  const { error, value } = schema.validate({ name });
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
