import mongoose from "mongoose";
export const connectToDB = async (): Promise<void> => {
  try {
    //@ts-ignore
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
