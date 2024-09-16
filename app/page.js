"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [notes, setNotes] = useState(null);
  const [data, setData] = useState({ title: "", content: "" });

  const onChange = async (e) => {
    e.preventDefault();
    if (e.target.name === "title") {
      setData({ ...data, title: e.target.value });
    }
    if (e.target.name === "content") {
      setData({ ...data, content: e.target.value });
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
    console.log(notes);
    setNotes(notes);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    console.log(response);
    getNotes();
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div>Notes</div>
      <div className="w-[80vw] m-auto">
        <div className="border-2">
          <input
            className="w-full"
            type="text"
            placeholder="Your Title"
            name="title"
            value={data.title}
            onChange={onChange}
          />
        </div>
        <div className="border-2">
          <textarea
            className="w-full"
            placeholder="Today's Note"
            name="content"
            value={data.content}
            onChange={onChange}
          />
        </div>
        <div>
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
      {notes &&
        notes.notes.map((note) => {
          return <div key={note.id}>{note.title}</div>;
        })}
    </>
  );
}
