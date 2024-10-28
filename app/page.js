"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
export default function Home() {
  const [notes, setNotes] = useState(null);
  const [data, setData] = useState({
    title: "",
    content: "",
    mood: "🙂",
    theme: "white",
  });
  const [deleteBox, setDeleteBox] = useState(false); // State to control delete popup
  const [noteIdToDelete, setNoteIdToDelete] = useState(null); // Store the ID of the note to delete
  const [deleteLoading, setDeleteLoading] = useState(false); // Store the ID of the note to delete

  const onChange = async (e) => {
    e.preventDefault();
    if (e.target.name === "title") {
      setData({ ...data, title: e.target.value });
    }
    if (e.target.name === "content") {
      setData({ ...data, content: e.target.value });
    }
    if (e.target.name === "mood") {
      setData({ ...data, mood: e.target.value });
    }
    if (e.target.name === "theme") {
      setData({ ...data, theme: e.target.value });
    }
  };
  const getNotes = async () => {
    const response = await fetch("/api/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    });

    const notes = await response.json();

    setNotes(notes);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (data.title == "" || data.content === "") {
      return;
    }
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    getNotes();
    setData({ ...data, title: "", content: "" });
  };
  const handleDelete = async (id) => {
    setDeleteLoading(true);
    const res = await fetch("/api/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    document.body.style.overflow = "auto";
    let ress = await res.json();

    if (ress.success) {
      setDeleteBox(false);
      setDeleteLoading(false);
      getNotes();
    }
  };
  const showPopUp = (id) => {
    setNoteIdToDelete(id); // Store the note's ID
    setDeleteBox(true); // Show the delete popup
    document.body.style.overflow = "hidden";
  };
  const confirmDelete = () => {
    handleDelete(noteIdToDelete); // Call the delete function with the stored ID
  };
  useEffect(() => {
    getNotes();
  }, []);
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
    <motion.div
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      {deleteBox && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this note?</p>
            <div className="flex justify-center">
              <button
                className={`bg-pink-500 text-white px-4 py-2 rounded mr-2 h-10 w-20 flex justify-center items-center ${
                  data.theme === "red"
                    ? "bg-red-500"
                    : data.theme === "blue"
                    ? "bg-blue-500"
                    : data.theme === "green"
                    ? "bg-green-500"
                    : data.theme === "pink"
                    ? "bg-pink-500"
                    : data.theme === "white"
                    ? "bg-zinc-600"
                    : data.theme === "yellow"
                    ? "bg-yellow-500"
                    : ""
                }`}
                onClick={confirmDelete}
              >
                {!deleteLoading && "Delete"}

                {deleteLoading && (
                  <img src="/loading.gif" className="w-auto  h-8 " />
                )}
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded h-10"
                onClick={() => {
                  setDeleteBox(false), (document.body.style.overflow = "auto");
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
      <img
        className="h-36  w-auto rotate-45 absolute top-40 right-10 -z-10"
        src="./bunny.png"
      />
      <img
        className="h-36  w-auto -rotate-45 absolute top-80 left-16 -z-10"
        src="./chick.png"
      />
      <div
        className={`md:w-[80vw] relative md:mx-auto mx-2 border-2 p-4 text-xl my-10 border-pink-600  rounded   shadow-lg z-20 ${
          data.theme === "red"
            ? "bg-red-300"
            : data.theme === "blue"
            ? "bg-blue-300"
            : data.theme === "green"
            ? "bg-green-300"
            : data.theme === "pink"
            ? "bg-pink-300"
            : data.theme === "white"
            ? "bg-white"
            : data.theme === "yellow"
            ? "bg-yellow-300"
            : ""
        }`}
      >
        <img
          className="  h-36  w-auto hidden md:block  absolute -top-12 left-[45%]  -z-10"
          src="./penguin.png"
        />
        <img
          className="md:hidden h-36  w-auto -rotate-90  absolute top-[40%] -left-[12%] -z-10"
          src="./penguin.png"
        />
        <img
          className="  h-36  w-auto hidden md:block  absolute -top-16 left-[20%]  -z-10"
          src="./puppy.png"
        />
        <img
          className="md:hidden h-36  w-auto   absolute -top-[20%] left-[30%] -z-10"
          src="./puppy.png"
        />

        <img
          className="md:hidden h-20  w-auto   absolute -top-8  left-[10%] -z-10"
          src="./bunny.png"
        />
        <img
          className="md:hidden h-20  w-auto   absolute -top-4 left-[70%] -z-10"
          src="./chick.png"
        />
        <div className="my-2 flex items-center ">
          <input
            className="w-[80%] outline-pink-300 p-2 placeholder-black bg-pink-100 text-lg md:text-xl  playpen-sans-v "
            type="text"
            placeholder="Your Title"
            name="title"
            value={data.title}
            onChange={onChange}
          />
          <select
            name="mood"
            value={data.mood}
            onChange={onChange}
            className="text-3xl cursor-pointer  rounded-lg mx-3 h-full"
          >
            <option
              value={"🙂"}
              className="text-3xl cursor-pointer  rounded-lg"
            >
              🙂
            </option>
            <option
              value={"😄"}
              className="text-3xl cursor-pointer  rounded-lg"
            >
              😄
            </option>
            <option
              value={"😔"}
              className="text-3xl cursor-pointer  rounded-lg"
            >
              😔
            </option>
            <option
              value={"🥰"}
              className="text-3xl cursor-pointer  rounded-lg"
            >
              🥰
            </option>
            <option
              value={"😂"}
              className="text-3xl cursor-pointer  rounded-lg"
            >
              😂
            </option>
            <option
              value={"😭"}
              className="text-3xl cursor-pointer  rounded-lg"
            >
              😭
            </option>
            <option
              value={"😠"}
              className="text-3xl cursor-pointer  rounded-lg"
            >
              😠
            </option>
            <option
              value={"🤬"}
              className="text-3xl cursor-pointer  rounded-lg"
            >
              🤬
            </option>
          </select>
          <select
            name="theme"
            value={data.theme}
            onChange={onChange}
            className="text-xl cursor-pointer hover:bg-zinc-200   rounded mx-3 h-full bg-zinc-100"
          >
            <option
              value={"white"}
              className="text-xl cursor-pointer hover:bg-zinc-200  rounded-lg"
            >
              White
            </option>
            <option
              value={"pink"}
              className="text-xl cursor-pointer hover:bg-zinc-200 rounded-lg"
            >
              Pink
            </option>
            <option
              value={"red"}
              className="text-xl cursor-pointer hover:bg-zinc-200  rounded-lg"
            >
              Red
            </option>
            <option
              value={"blue"}
              className="text-xl cursor-pointer hover:bg-zinc-200  rounded-lg"
            >
              Blue
            </option>
            <option
              value={"green"}
              className="text-xl cursor-pointer hover:bg-zinc-200 rounded-lg"
            >
              Green
            </option>
            <option
              value={"yellow"}
              className="text-xl cursor-pointer hover:bg-zinc-200 rounded-lg"
            >
              Yellow
            </option>
          </select>
        </div>
        <div className="my-2 ">
          <textarea
            className="w-full outline-pink-300 p-2 placeholder-black h-[300px] bg-pink-100 text-lg md:text-xl  playpen-sans-v "
            placeholder="Today's Note"
            name="content"
            value={data.content}
            onChange={onChange}
          />
        </div>
        <div>
          <button
            className="bg-gray-900 rounded text-white  p-2 text-lg'"
            onClick={onSubmit}
          >
            Post the note
          </button>
        </div>
      </div>
      <div className=" md:w-[80vw] md:m-auto mx-2   m-auto">
        {notes &&
          notes.notes.map((note) => {
            return (
              <motion.div
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.2 }}
                className={` border-2 border-pink-400 rounded shadow p-2 my-2  cursor-pointer " ${
                  note.theme === "red"
                    ? "bg-red-300"
                    : note.theme === "blue"
                    ? "bg-blue-300"
                    : note.theme === "green"
                    ? "bg-green-300"
                    : note.theme === "pink"
                    ? "bg-pink-300"
                    : note.theme === "white"
                    ? "bg-white"
                    : note.theme === "yellow"
                    ? "bg-yellow-300"
                    : ""
                }`}
                key={note.id}
              >
                <div className="flex justify-between">
                  <div className="font-bold text-pink-700 bg-blue-50 text-lg rounded w-fit px-1">
                    {formatDate(note.postedOn)}
                  </div>
                  <div>
                    <img
                      className="w-6 h-6"
                      src="/delete.png"
                      onClick={() => showPopUp(note._id)}
                    />
                  </div>
                </div>

                <div className="font-semibold  inline text-3xl break-words ">
                  {note.title}
                </div>
                <div className="font-semibold text-2xl inline ml-2 ">
                  {note.mood}
                </div>
                <div className="whitespace-pre-wrap text-lg break-words ">
                  {note.content}
                </div>
              </motion.div>
            );
          })}
      </div>
    </motion.div>
  );
}
