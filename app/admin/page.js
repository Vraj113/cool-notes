import { motion } from "framer-motion";
import React from "react";

const Admin = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/notes`,
    {
      method: "GET",
    }
  );
  const notes = await response.json();

  const userResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const users = await userResponse.json(); // Fetch the full API response

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
        {users?.users && users.users.length > 0 ? (
          users.users.map((user) => (
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
          notes.notes.map((note) => (
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