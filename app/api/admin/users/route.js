import connectDb from "@/app/middleware/db";
import Note from "@/app/models/Note";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  await connectDb();
  let notes = await Note.find({});
  // Fetch all notes from the database
  let users = notes.map((note) => {
    return { email: note.postedBy };
  });

  // Remove duplicates based on the 'email' field
  let uniqueUsers = Array.from(new Set(users.map((user) => user.email))).map(
    (email) => {
      return {
        email: email,
      };
    }
  );
  // console.log(Array.from(uniqueUsers));
  // Convert the Set back to an array if needed for the response
  return NextResponse.json({ users: Array.from(uniqueUsers) });
};
