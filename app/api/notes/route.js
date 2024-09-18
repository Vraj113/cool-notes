import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDb from "@/app/middleware/db";
import Note from "@/app/models/Note";
import { cookies } from "next/headers";
const crypto = require("crypto");

// Generate a consistent encryption key using token and server-side secret
async function generateEncryptionKey(token) {
  const secret = process.env.SECRET_KEY; // This is a server-side secret
  return crypto
    .createHmac("sha256", secret)
    .update(token)
    .digest("base64")
    .slice(0, 32); // Ensure the key is 32 characters long
}

const algorithm = "aes-256-ctr"; // AES algorithm with 256-bit key

// Encrypt the note
function encryptText(text, key) {
  const iv = crypto.randomBytes(16); // Create a 16-byte IV (required for AES)
  const cipher = crypto.createCipheriv(algorithm, key, iv); // Pass the IV as a Buffer, not a hex string
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Return IV (in hex) and encrypted text (IV is needed for decryption)
  return iv.toString("hex") + ":" + encrypted;
}

// Decrypt the note
function decryptText(encryptedText, key) {
  const [ivHex, encrypted] = encryptedText.split(":"); // Split the IV and encrypted data
  const iv = Buffer.from(ivHex, "hex"); // Convert IV back to buffer
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const cookieStore = cookies();
  const token = cookieStore.get("next-auth.session-token")?.value;

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  await connectDb();
  // Find notes by email (adjust if needed)
  let notes = await Note.find({ postedBy: session.user?.email }).sort({
    postedOn: -1,
  });

  // const key = await generateEncryptionKey(token);
  // let newDecryptedNotes = notes.map((note) => ({
  //   ...note._doc, // Spread note properties
  //   content: decryptText(note.content, key), // Correct decryption
  // }));

  return NextResponse.json({ notes });
};

// POST request handler
export async function POST(req) {
  const cookieStore = cookies();
  const token = String(cookieStore.get("next-auth.session-token")?.value);

  await connectDb();
  const body = await req.json();

  // Ensure content is a string
  const contentToEncrypt = String(body.content);

  const key = await generateEncryptionKey(token);

  // Log to check key type
  console.log("Encryption Key Type:", typeof token);

  const encryptedText = encryptText(contentToEncrypt, key); // Encrypt the content

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  // Create a new note
  const newNote = new Note({
    title: body.title,
    content: encryptedText, // Store encrypted content
    mood: body.mood,
    theme: body.theme,
    postedBy: session.user?.email,
  });

  await newNote.save();

  return NextResponse.json({ message: "Note Saved successfully" });
}

// DELETE request handler
export const DELETE = async (request) => {
  const session = await getServerSession(authOptions);
  const body = await request.json();

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  await connectDb();
  // Delete the note by ID
  await Note.findOneAndDelete({ _id: body.id });

  return NextResponse.json({ message: "Note deleted successfully" });
};
