import axios from "axios";

const REG_URL = "/users/register";
const LOG_URL = "/users/login";


// Register USER
const register = async (userData) => {
  const response = await axios.post(REG_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// logout USER
const logout = () => {
  localStorage.removeItem("user");
};

//login USER
const login = async (userData) => {
  const response = await axios.post(LOG_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
