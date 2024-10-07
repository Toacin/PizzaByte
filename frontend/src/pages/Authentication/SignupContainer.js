import { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../utils/auth";
import toast from "react-hot-toast";

export default function SignupContainer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    role: "user",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
    <div className="rounded border min-w-[40%] bg-zinc-100 p-4 ml-2">
      <h1 className="text-center text-2xl">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col p-10">
        <input
          className="border p-2 rounded mb-2"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded mb-2"
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded mb-2"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="mb-4">
          <h2 className="mb-2">Select Role</h2>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="user"
              name="role"
              value="user"
              checked={formData.role === "user"}
              onChange={handleChange}
            />
            <label htmlFor="user">User</label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="chef"
              name="role"
              value="chef"
              checked={formData.role === "chef"}
              onChange={handleChange}
            />
            <label htmlFor="chef">Chef</label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="owner"
              name="role"
              value="owner"
              checked={formData.role === "owner"}
              onChange={handleChange}
            />
            <label htmlFor="owner">Owner</label>
          </div>
        </div>

        <button type="submit" className="bg-red-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
