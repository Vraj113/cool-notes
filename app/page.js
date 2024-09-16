"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [notes, setnotes] = useState([]);
  const [data, setData] = useState({ title: "", content: "" });

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
    setnotes(notes);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // if (data.title == "" || data.content === "") {
    //   return;
    // }
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "First ntoe",
        content: "Heyy",
      }),
    });
    let response = await res.json();
    console.log(response);
    // setData({ title: "", content: "" });
    getNotes();
  };
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <>
      {" "}
      {/* {session ? <h1>Hello {session.user?.name}</h1> : <h1>Hello Guest</h1>} */}
      <div>Login</div>
      <div>
        <input type="text" />
      </div>
      <div>
        <input type="text" />
      </div>
      <div>
        <input type="text" />
      </div>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </>
  );
}
