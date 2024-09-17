import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="bg-zinc-100 w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="bg-white md:w-fit w-[full] m-auto  p-4 text-bold rounded shadow-md shadow-pink-50 flex flex-col  gap-y-2">
        <div className=" md:text-7xl text-3xl">Hello Beautiful✨</div>
        <div className=" md:text-3xl">A Notes App</div>
        <div className=" md:text-3xl">Created with ❤️</div>
        <Link className="w-fit mx-auto" href={"/api/auth/signin"}>
          <button className="mr-5 md:px-6 p-3 md:py-4 md:text-2xl  bg-pink-500 rounded mx-auto w-fit text-center mt-2 text-white text-semibold">
            {" "}
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
