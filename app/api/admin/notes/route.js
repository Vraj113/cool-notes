import connectDb from "@/app/middleware/db";
import Note from "@/app/models/Note";
import { NextResponse } from "next/server";

const GET = async () => {
  await connectDb();
  const notes = await Note.find({});
  return NextResponse.json(notes);
};
export { GET };
