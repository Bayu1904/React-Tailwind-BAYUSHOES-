import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import Navbar from "../components/Navbar";

export default function Login() {
  return (
    <>
      <Navbar />
      <div className="px-8 flex flex-row justify-between bg-white h-screen">
        <div>
          <img
            src="https://img.freepik.com/free-photo/pair-trainers_144627-3799.jpg?w=740&t=st=1663718308~exp=1663718908~hmac=00d7d0aee005ee265939671893628e90e62bbc16343dffe025d68eed61318637"
            alt=""
          />
        </div>
        <LoginForm />
      </div>
    </>
  );
}
