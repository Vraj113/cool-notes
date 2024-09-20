import { motion } from "framer-motion";
import React from "react";
import connectDb from "@/app/middleware/db";
import Note from "@/app/models/Note";
const Admin = async () => {
  await connectDb();
  let notes = await Note.find({});

  let usersData = notes.map((note) => {
    return { email: note.postedBy };
  });

  let uniqueUsers = Array.from(
    new Set(usersData.map((user) => user.email))
  ).map((email) => {
    return {
      email: email,
    };
  });

  const users = Array.from(uniqueUsers); // Fetch the full API response

  const formatDate = (isoString) => {
    const options = {
      // year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="text-3xl font-semibold bg-zinc-100 px-10 pt-10">
        All Users
      </div>
      <div className="bg-zinc-100 flex flex-wrap gap-10 p-10 text-lg">
        {users ? (
          users.map((user) => (
            <div
              className="bg-yellow-50 p-4 border-2 w-fit font-semibold rounded"
              key={user.email}
            >
              <div className="flex flex-col">
                <div>{"Username : " + user.email}</div>
              </div>
            </div>
          ))
        ) : (
          <div>No users available</div>
        )}
      </div>

      <div className="text-3xl font-semibold bg-zinc-100 px-10 pt-10">
        All Posts
      </div>
      <div className="bg-zinc-100 flex flex-wrap gap-10 p-10 text-lg">
        {notes ? (
          notes.map((note) => (
            <div
              className="bg-yellow-50 p-4 border-2 w-fit font-semibold rounded"
              key={note.id}
            >
              <div className="flex flex-col">
                <div>{"Posted By : " + note.postedBy}</div>
                <div>{"Theme :  " + note.theme}</div>
                <div>{"Posted On : " + formatDate(note.postedOn)}</div>
                <div>{"Title: " + note.title}</div>
                <div>{"Content : " + note.content}</div>
                <div>{"Mood : " + note.mood}</div>
              </div>
            </div>
          ))
        ) : (
          <div>No notes available</div>
        )}
      </div>
    </>
  );
};

export default Admin;
