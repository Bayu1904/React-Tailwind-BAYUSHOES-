import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListProduct from "./pages/ListProduct";
import { setAuthToken } from "./config/API";
import { useContext, useEffect } from "react";
import { UserContext } from "./utils/UserContext";
import { API } from "./config/API";

import "./index.css";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  // const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await API.post("/auth/verify-token");

        // If the token incorrect
        if (response.status === 404) {
          return dispatch({
            type: "AUTH_ERROR",
          });
        }
        console.log(response);

        // Get user data
        let payload = response.data;
        // Get token from local storage
        payload.token = localStorage.token;

        if (response.status === 200) {
          if (response?.data.user.role[0] === "admin") {
            return dispatch({
              type: "ADMIN",
              payload,
            });
          }
          dispatch({
            type: "LOGIN_SUCCESS",
            payload,
          });
        }
        // Send data to useContext
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/ListProduct" element={<ListProduct />} />
    </Routes>
  );
}

export default App;
