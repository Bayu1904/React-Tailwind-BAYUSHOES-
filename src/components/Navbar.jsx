import React, { useContext } from "react";
import { Link } from "react-router-dom";
import RightSideNav from "./RightSideNav/RightSideNav";
import IsLogin from "./RightSideNav/isLogin";
import { UserContext } from "../utils/UserContext";
import IsAdmin from "../components/RightSideNav/isAdmin";

export default function Navbar() {
  const [state, dispatch] = useContext(UserContext);

  return (
    <nav class="bg-white border-gray-200 px-2 sm:px-4 dark:bg-gray-900 shadow-md z-10 sticky top-0 rounded-b-sm">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <Link to={"/"}>
          <span class="self-center text-2xl font-bold whitespace-nowrap text-orange-700">
            BayuSHOES.
          </span>
        </Link>
        {state.isAdmin ? (
          <IsAdmin state={state} />
        ) : state.isLogin ? (
          <IsLogin state={state} />
        ) : (
          <RightSideNav />
        )}
      </div>
    </nav>
  );
}
