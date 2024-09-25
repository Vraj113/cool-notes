"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();

  const [quote, setQuote] = useState({ text: "", author: "" });
  const router = useRouter();
  const getMyQuote = async () => {
    const response = await fetch("/api/quotes", {
      method: "GET",
    });
    const quote = await response.json();
    setQuote(quote);
  };
  const handleSignOut = async () => {
    await signOut({ redirect: false }); // This prevents the default redirect behavior
    router.push("login");
  };
  useEffect(() => {
    getMyQuote();
  }, []);
  return (
    <div className="sticky py-4   z-0 bg-zinc-100 shadow overflow-hidden ">
      <img
        src="/bg.png"
        className="absolute -top-80 right-0 opacity-40 bg-repeat-x -z-10"
      />
      <div className="flex z-50 opacity-100 justify-around text-bold items-center font -semibold text-lg   md:w-[90vw] m-auto px-4">
        {quote.text && (
          <div className="relative  hidden md:block   bg-gradient-to-r  rounded-lg  text-center overflow-hidden w-[60vw] max-w-[80%]">
            <p className="text-xl font-semibold text-gray-800  great-vibes-regular">
              ✨{quote.text}✨
            </p>
            <footer className="mt-2  text-sm great-vibes-regular">
              - {quote.author}
            </footer>
          </div>
        )}
        <div className="flex justify-around items-center w-full md:w-80 md:block ">
          <div className="text-lg">{session?.user.name}</div>
          <div className="flex gap-x-2 ">
            {/* <img className="w-8 h-8 rounded-full" src={session?.user.image} /> */}
            <div className="flex-col">
              {/* <div>{session?.user.email}</div> */}
              <button
                className="text-zinc-100 font-semibold bg-red-600 p-1 rounded my-1 text-lg cursor-pointer"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
