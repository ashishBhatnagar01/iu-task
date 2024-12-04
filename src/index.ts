import express from "express";
import postRouter from "./routes/post.route";
import { configDotenv } from "dotenv";
import { connectToDB } from "./db";
import tagRouter from "./routes/tag.route";

const app = express();

//Middleware to parse JSON
app.use(express.json());

//Enable to access enviroment variable
configDotenv();

//Coonnect to DB
connectToDB();

app.use("/api/post", postRouter);
app.use("/api/tag", tagRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App is running on PORT : ${PORT}`);
});
