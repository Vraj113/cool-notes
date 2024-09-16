import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  mongoose
    .connect(
      "mongodb+srv://admin:m57QwD7tl5KLLrcM@cluster0.3o51ig0.mongodb.net/Notes"
    )
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
};
export default connectDb;
