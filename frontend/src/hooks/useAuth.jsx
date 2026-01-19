// import API from "../api/axios";

// export const useAuth = (rolePath) => { // rolePath would be 'admin', 'dealer', or 'user'
//     // for login dealer admin user
//     const login = async (email, password) => {
//         // Dynamically points to /api/admin/login, etc.
//         const res = await API.post(`/${rolePath}/login`, { email, password });

//         localStorage.setItem('token', res.data.token);
//         localStorage.setItem('role', rolePath); // We set the role based on which page they used
//         return res.data;
//     };
//     // for register dealer and user
//     const register=async(name,email,password,phone)=>{
//         const res=await API.post(`/${rolePath}/register`,{name,email,password,phone})
//         localStorage.setItem('token',res.data.token)
//         localStorage.setItem('role',rolePath)
//         return res.data
//     }
//     return { login,register };
// };
import { useState, useEffect } from "react";
import API from "../api/axios";

export const useAuth = (rolePath) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const res = await API.post(`/${rolePath}/login`, { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", rolePath);

    // store full admin object
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);

    return res.data;
  };

  // REGISTER
  const register = async (name, email, password, phone) => {
    const res = await API.post(`/${rolePath}/register`, {
      name,
      email,
      password,
      phone,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", rolePath);
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);

    return res.data;
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return { user, login, register, logout };
};
