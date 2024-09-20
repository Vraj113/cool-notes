import connectDb from "@/app/middleware/db";
import Note from "@/app/models/Note";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request) => {
  await connectDb();
  let notes = await Note.find({});
  return NextResponse.json({ notes });
};
