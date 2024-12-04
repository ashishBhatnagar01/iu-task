import { Request } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req: any, file: Express.Multer.File, cb: Function) => {
    // Set a custom filename to prevent overwriting files
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ext); // Custom filename to avoid collision
  },
});

const upload = multer({ storage });

export default upload;
