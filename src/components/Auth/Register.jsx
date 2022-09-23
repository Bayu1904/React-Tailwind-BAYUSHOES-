import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { kontenbase } from "../../config/base";

function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  console.log(form);

  const { email, password, firstName } = form;
  const handleChangeLog = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const { user } = await kontenbase.auth.register({
        firstName,
        email,
        password,
      });
      const alert = (
        <div className="w-full bg-blue-500 text-center py-1 rounded-lg text-white">
          Selamat bergabung dengan kami {user.firstName}, Silahkan Login
        </div>
      );
      setMessage(alert);
      await delay(3000);
      navigate("/Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="md:w-1/4 m-auto mt-8 ">
      <form
        onSubmit={(e) => handleSubmitLogin(e)}
        className="flex flex-col gap-4 w-auto bg-white m-auto px-10 py-7  rounded-lg shadow-xl"
      >
        {message}
        <h1 className="font-bold text-3xl text-orange-500">Register</h1>
        <input
          id="firstName"
          type="text"
          name="firstName"
          placeholder="Input Your Name"
          onChange={handleChangeLog}
          value={firstName}
          className="w-full  bg-slate-200 rounded-xl p-2 border-slate-400 border-1"
        />
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your Email/Username"
          onChange={handleChangeLog}
          value={email}
          className="w-full  bg-slate-200 rounded-xl border-slate-400 border-1"
        />
        <input
          id="password"
          name="password"
          placeholder="Your Password"
          onChange={handleChangeLog}
          value={password}
          type="password"
          className="w-full  bg-slate-200 rounded-xl border-slate-400 border-1"
        />
        <div className="flex items-center gap-2">
          <p>
            Dont Have an Account? Register
            {/* <Link href="/Register">Here</Link>{" "} */}
          </p>
        </div>
        <div className="m-auto">
          <button
            type="submit"
            className="px-7 py-2 bg-orange-600 rounded-lg text-white font-bold hover:bg-orange-500 hover:shadow-md "
            color="light"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
