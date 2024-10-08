import { useState } from "react";
import auth from "../../utils/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthenticationNetworkServices from "./AuthenticationNetworkServices";

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
    await AuthenticationNetworkServices.login(
      e,
      loginData,
      toast,
      auth,
      navigate,
    );
  };

  return (
    <div className="rounded border min-w-[80%] md:min-w-[40%] bg-zinc-100 p-4 md:mr-2 mt-4 md:mt-0">
      <h1 className="text-center text-2xl">Log In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col p-10">
        <input
          className="border p-2 rounded mb-2"
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded mb-2"
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-red-500 text-white p-2 rounded">
          Log In
        </button>
      </form>
    </div>
  );
}
