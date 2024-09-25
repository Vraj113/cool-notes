"use client"; // Declare as a client-side component

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Admin = () => {
  const [notes, setNotes] = useState([]);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [inState, setInState] = useState("users");
  const [mostRepeatedStuff, setMostRepeatedStuff] = useState({
    mood: "",
    email: "",
    theme: "",
  });
  // Function to fetch notes and users data from API
  const fetchNotesAndUsers = async () => {
    try {
      const response = await fetch("/api/admin/notes", { method: "GET" }); // Assuming you have an API route for notes
      const data = await response.json();
      const notesData = data;
      facts(notesData);
      // Extract unique users from notes
      const usersData = notesData.map((note) => ({ email: note.postedBy }));
      const uniqueUsersData = Array.from(
        new Set(usersData.map((user) => user.email))
      ).map((email) => ({ email }));

      setNotes(notesData);
      setUniqueUsers(uniqueUsersData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchNotesAndUsers();
  }, []);

  // Define date formatting function
  const formatDate = (isoString) => {
    const options = {
      month: "short",
      day: "numeric",
    };
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, options);
  };
  const facts = (notes) => {
    let mood = [];
    const postedBy = [];
    const themes = [];
    for (let i = 0; i < notes.length; i++) {
      mood[i] = notes[i].mood;
      postedBy[i] = notes[i].postedBy;
      themes[i] = notes[i].theme;
    }
    const moood = mostRepeated(mood);

    setMostRepeatedStuff({
      mood: moood,
      email: mostRepeated(postedBy),
      theme: mostRepeated(themes),
    });
  };
  const mostRepeated = (string) => {
    // Step 1: Create a frequency object
    const frequency = {};

    // Step 2: Count the occurrences of each string
    string.forEach((str) => {
      frequency[str] = (frequency[str] || 0) + 1; // Increment the count
    });

    // Step 3: Find the most repeated string
    let mostRepeatedString = null;
    let maxCount = 0;

    for (const [str, count] of Object.entries(frequency)) {
      if (count > maxCount) {
        maxCount = count;
        mostRepeatedString = str;
      }
    }
    return mostRepeatedString;
  };
  return (
    <>
      <div
        className="grid grid-flow-col "
        style={{ gridTemplateColumns: "20% 80%" }}
      >
        <div> </div>
        <div className="  fixed w-[20vw]">
          <div className="font-bold text-4xl   rounded m-2 p-4 cursor-pointer">
            Admin
          </div>
          <div
            onClick={() => setInState("users")}
            className="font-semibold text-2xl bg-blue-100 hover:bg-blue-400 rounded m-2 p-4 cursor-pointer"
          >
            All users
          </div>
          <div
            onClick={() => setInState("posts")}
            className="font-semibold text-2xl bg-blue-100 hover:bg-blue-400 rounded m-2 p-4 cursor-pointer"
          >
            All Posts
          </div>
          <div
            onClick={() => setInState("facts")}
            className="font-semibold text-2xl bg-blue-100 hover:bg-blue-400 rounded m-2 p-4 cursor-pointer"
          >
            Facts
          </div>
        </div>

        <div>
          {inState === "users" && (
            <div className="h-[100vh] bg-zinc-100">
              <div className="text-3xl font-semibold bg-zinc-100 px-10 pt-10">
                All Users
              </div>

              <div className=" flex flex-wrap gap-10 p-10 text-lg">
                {uniqueUsers.length > 0 ? (
                  uniqueUsers.map((user) => (
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
            </div>
          )}
          {inState === "posts" && (
            <div className="h-[100vh] bg-zinc-100">
              <div className="text-3xl font-semibold bg-zinc-100 px-10 pt-10">
                All Posts
              </div>
              <div className="bg-zinc-100 flex flex-wrap gap-10 p-10 text-lg">
                {inState == "posts" && notes.length > 0 ? (
                  notes.map((note) => (
                    <motion.div
                      className="bg-yellow-50 p-4 border-2 w-fit font-semibold rounded"
                      key={note._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex flex-col break-words">
                        <div>{"Posted By : " + note.postedBy}</div>
                        <div>{"Theme :  " + note.theme}</div>
                        <div>{"Posted On : " + formatDate(note.postedOn)}</div>
                        <div>{"Title: " + note.title}</div>
                        <div className="break-words whitespace-pre-wrap w-fit max-w-[40vw]">
                          {"Content : " + note.content}
                        </div>
                        <div>{"Mood : " + note.mood}</div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div>No notes available</div>
                )}
              </div>
            </div>
          )}
          {inState === "facts" && (
            <div className="h-[100vh] bg-zinc-100">
              <div className="text-3xl font-semibold bg-zinc-100 px-10 pt-10">
                Facts:
              </div>
              <div className="  px-10 pt-10">
                <div className="p-4 font-semibold text-2xl bg-white rounded my-4">
                  The Most Repeated Mood is: {mostRepeatedStuff.mood}
                </div>
                <div className="p-4 font-semibold text-2xl bg-white rounded my-4">
                  The Most Repeated Email is: {mostRepeatedStuff.email}
                </div>
                <div className="p-4 font-semibold text-2xl bg-white  rounded my-4">
                  The Most Repeated Theme is: {mostRepeatedStuff.theme}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
