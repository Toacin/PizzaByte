import { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../utils/auth";
import toast from "react-hot-toast";
import AuthenticationNetworkServices from "./AuthenticationNetworkServices";

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
    await AuthenticationNetworkServices.signup(
      e,
      formData,
      toast,
      auth,
      navigate,
    );
  };

  return (
    <div className="rounded border min-w-[80%] md:min-w-[40%] bg-zinc-100 p-4 md:ml-2 my-4 md:my-0">
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
          type="email"
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
          <RenderRadioInputs formData={formData} handleChange={handleChange} />
        </div>

        <button type="submit" className="bg-red-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}

function RenderRadioInputs({ formData, handleChange }) {
  return (
    <>
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
    </>
  );
}
