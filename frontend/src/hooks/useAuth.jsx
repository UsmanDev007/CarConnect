import { useState, useEffect } from "react";
import API from "../api/axios";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // LOGIN (role is passed dynamically)
  const login = async (role, email, password) => {
    try {
      const res = await API.post(`/${role}/login`, { email, password });

      // Store token and role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // Store user object
      const userData = res.data.user;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return res.data; // Full response (message, token, user)
    } catch (err) {
      throw err; // Let the calling component handle errors
    }
  };

  // REGISTER (role is passed dynamically)
  const register = async (role, name, email, password, phone) => {
    try {
      const res = await API.post(`/${role}/register`, {
        name,
        email,
        password,
        phone,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      const userData = res.data.user;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return res.data;
    } catch (err) {
      throw err;
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return { user, login, register, logout };
};
