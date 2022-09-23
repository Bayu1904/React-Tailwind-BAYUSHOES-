import React from "react";
import { Link } from "react-router-dom";

export default function RightSideNav() {
  return (
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="flex flex-row p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row space-x-3 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white items-center">
        <li>
          <Link to={"/Login"}>
            <a
              href="https://flowbite.com/docs/images/logo.svg"
              class="rounded md:bg-transparent text-orange-700 md:p-0"
              aria-current="page"
            >
              Login
            </a>
          </Link>
        </li>
        <li>
          <Link to={"/Register"}>
            <button
              type="button"
              class="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            >
              Register
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
