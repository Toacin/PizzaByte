import { useState } from "react";
import auth from "../../utils/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginContainer() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        console.error("Request Failed");
        if (response.status !== 500) {
          const errorData = await response.json();
          toast(errorData.message);
        } else {
          toast("Something went wrong. Please try again later.");
        }
        return;
      }
      const data = await response.json();
      auth.login(data.token);
      navigate("/");
    } catch (error) {
      console.error(error.toString());
      toast("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="rounded border min-w-[80%] md:min-w-[40%] bg-zinc-100 p-4 md:mr-2 mt-4 md:mt-0">
      <h1 className="text-center text-2xl">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col p-10">
        <input
          className="border p-2 rounded mb-2"
          type="text"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
        />
        <input
          className="border p-2 rounded mb-2"
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
        />
        <button type="submit" className="bg-red-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
