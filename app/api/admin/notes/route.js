import connectDb from "@/app/middleware/db";
import Note from "@/app/models/Note";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GET = async () => {
  await connectDb();
  const notes = await Note.find({});
  return NextResponse.json(notes);
};
export { GET };
