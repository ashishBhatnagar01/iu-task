import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/httpStatusCodes";
import { ResponseFormatter } from "../utils/responseFormatter";
import {
  createPost,
  getAllPosts,
  getPostByTagId,
  uploadFileToS3,
} from "../services/post.service";

export const addPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const upload: any = await uploadFileToS3(req.file as Express.Multer.File);
    console.log(upload);
    const { title, description, tagIds } = req.body;
    const data = await createPost(
      title,
      description,
      upload.Location,
      tagIds,
      upload.Key
    );
    return res
      .status(HttpStatusCode.CREATED)
      .json(
        ResponseFormatter.success(
          data,
          "Post created successfully",
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

export const listAllPosts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { page, limit, sortBy, sortOrder, keyword, tagId } = req.query;
    const data = await getAllPosts(
      parseInt(page as string),
      parseInt(limit as string),
      sortBy as string,
      sortOrder as "asc" | "desc",
      keyword as string,
      tagId as string
    );
    return res
      .status(HttpStatusCode.OK)
      .json(
        ResponseFormatter.success(
          data,
          "Records fetched successfully",
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

export const listPostByTagId = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { tagId } = req.params;
    const data = await getPostByTagId(tagId as string);
    return res
      .status(HttpStatusCode.OK)
      .json(
        ResponseFormatter.success(
          data,
          "Records fetched successfully",
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
