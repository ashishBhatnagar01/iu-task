import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/httpStatusCodes";
import { ResponseFormatter } from "../utils/responseFormatter";
import { createTag, listAllTags } from "../services/tag.service";

export const addTag = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name } = req.body;
    const data = await createTag(name);
    console.log(data);
    return res
      .status(HttpStatusCode.CREATED)
      .json(
        ResponseFormatter.success(
          data,
          "Tag created successfully",
          HttpStatusCode.CREATED
        )
      );
  } catch (error: any) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(
        ResponseFormatter.failure(
          "Something went wrong",
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          error.message
        )
      );
  }
};

export const listTags = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await listAllTags();
    return res
      .status(HttpStatusCode.OK)
      .json(
        ResponseFormatter.success(
          data,
          "Tags fetched successfully",
          HttpStatusCode.OK
        )
      );
  } catch (error: any) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(
        ResponseFormatter.failure(
          "Something went wrong",
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          error.message
        )
      );
  }
};
