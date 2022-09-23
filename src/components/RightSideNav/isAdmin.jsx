import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { UserContext } from "../../utils/UserContext";
import { useNavigate } from "react-router-dom";

export default function IsAdmin() {
  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/Login");
  };
  return (
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <div class="flex flex-row p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row space-x-3 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white items-center">
        <Dropdown label={"Hello " + state.user?.user?.firstName} inline={true}>
          <Dropdown.Item>
            {" "}
            <Link to={"/ListProduct"}>List Product</Link>{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleLogOut()}>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
}
