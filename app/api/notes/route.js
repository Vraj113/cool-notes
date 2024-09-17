import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDb from "@/app/middleware/db";
import Note from "@/app/models/Note";

// GET request handler
export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  await connectDb();
  // Find notes by email (adjust if needed)
  let notes = await Note.find({ postedBy: session.user?.email }).sort({
    postedOn: -1,
  });
  return NextResponse.json({ notes });
};

// POST request handler
export async function POST(req) {
  await connectDb();
  const body = await req.json(); // Fix the parameter here
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  // Create a new note
  const newNote = new Note({
    title: body.title,
    content: body.content,
    mood: body.mood,
    theme: body.theme,
    postedBy: session.user?.email,
  });

  await newNote.save();

  return NextResponse.json({ message: "Note Saved successfully" });
}

export const DELETE = async (request) => {
  const session = await getServerSession(authOptions);
  const body = await request.json();
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  await connectDb();
  // Find notes by email (adjust if needed)
  console.log(body);
  let notes = await Note.findOneAndDelete({ _id: body.id });
  return NextResponse.json({ notes });
};
