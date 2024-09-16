import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div>
      <Link className="mr-5" href={"/api/auth/signin"}>
        Login
      </Link>
    </div>
  );
};

export default Login;
