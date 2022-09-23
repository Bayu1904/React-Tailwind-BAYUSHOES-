import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/API";
import { UserContext } from "../../utils/UserContext";
import { Link } from "react-router-dom";

function LoginForm() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState(false);

  const [formLog, setFormLog] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formLog;
  const handleChangeLog = (e) => {
    setFormLog({
      ...formLog,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const reqBody = JSON.stringify(formLog);

      // Insert data user to database
      const response = await API.post("/auth/login", reqBody, config);
      console.log(response);
      // const { status, name, email, token } = response.data.data
      if (response?.status === 200) {
        if (response?.data.user.role[0] === "authenticated") {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data,
          });
          navigate("/");
        } else if (response?.data.user.role[0] === "admin") {
          dispatch({
            type: "ADMIN",
            payload: response.data,
          });
          navigate("/ListProduct");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      const alert = (
        <div className="w-full bg-red-500 text-center py-1 rounded-lg text-white">
          Email atau Password anda salah!
        </div>
      );
      setMessage(alert);
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
        <h1 className="font-bold text-3xl text-orange-500">LOGIN</h1>
        <div>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your Email/Username"
            onChange={handleChangeLog}
            value={email}
            className="w-full bg bg-slate-200 rounded-xl border-slate-400 border-1"
          />
        </div>
        <div>
          <input
            id="password"
            name="password"
            placeholder="Your Password"
            onChange={handleChangeLog}
            value={password}
            type="password"
            className="w-full bg bg-slate-200 rounded-xl border-slate-400 border-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <p>
            Dont Have an Account? Register <Link to={"/Register"}> Here</Link>
          </p>
        </div>
        <div className="m-auto">
          <button
            type="submit"
            className="px-7 py-2 bg-orange-600 rounded-lg text-white font-bold hover:bg-orange-500 hover:shadow-md "
            color="light"
          >
            LOGIN
          </button>
        </div>
        <hr />
        <button
          type="button"
          className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55"
        >
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="facebook-f"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
            ></path>
          </svg>
          Sign in with Facebook
        </button>
        <button
          type="button"
          className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
        >
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
