import mongoose from "mongoose";
import dns from "node:dns";

// Some networks (often Windows) refuse SRV lookups on system DNS; public resolvers fix Atlas +srv URIs.
if (process.env.MONGODB_USE_PUBLIC_DNS !== "false") {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
}

const connectDb = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    bufferCommands: false,
  });
};

export default connectDb;
