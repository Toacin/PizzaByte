import { useEffect, useState } from "react";
import Pizza from "../../assets/Pizza.jpg";
import { useGlobalState } from "../../GlobalStateProvider";
import auth from "../../utils/auth";

export default function Classics() {
  const [classics, setClassics] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [role, setRole] = useState("user");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [newClassic, setNewClassic] = useState("");
  const { state } = useGlobalState();
  const [classicsModified, setClassicsModified] = useState(0);

  useEffect(() => {
    if (auth.loggedIn()) {
      setRole(auth.getProfile().data.role);
    }
    (async function () {
      try {
        const response = await fetch("/api/classics", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          console.error("Request Failed");
        }
        const data = await response.json();
        setClassics(data.classics);
      } catch (err) {
        console.error(err.toString());
      }
    })();
  }, [classicsModified]);

  useEffect(() => {
    setToppings(state.toppings);
  }, [state]);

  // Handle checkbox change
  const handleCheckboxChange = (topping) => {
    if (selectedToppings.includes(topping)) {
      // Remove topping if it's already selected
      setSelectedToppings((prev) => prev.filter((item) => item !== topping));
    } else {
      // Add topping if it's not selected
      setSelectedToppings((prev) => [...prev, topping]);
    }
  };

  const addClassic = async (e) => {
    e.preventDefault();
    try {
      const toppingsObject = {};
      for (const topping of selectedToppings) {
        toppingsObject[topping] = true;
      }

      const toppingsStringified = JSON.stringify(toppingsObject);
      const response = await fetch("/api/classics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify({
          name: newClassic,
          toppingsStringified,
        }),
      });
      if (!response.ok) {
        console.error("Request Failed");
        return;
      }
      setNewClassic("");
      setSelectedToppings([]);
      setClassicsModified(classicsModified + 1);
    } catch (err) {
      console.error(err.toString());
    }
  };

  const deleteClassic = async (classicId) => {
    try {
      const response = await fetch(`/api/classics/${classicId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth.getToken()}`,
        },
      });
      if (!response.ok) {
        console.error("Request Failed");
        return;
      }
      setClassicsModified(classicsModified + 1);
    } catch (err) {
      console.error(err.toString());
    }
  };

  return (
    <div className="flex min-w-full px-20 py-40 justify-center items-center bg-black font-semibold flex-col">
      <h1 className="text-white text-7xl">Classics</h1>
      <h2 className="text-3xl text-gray-400 my-4">
        Classic pizzas that never go out of style.
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-24 max-w-[50%]">
        {classics.map((classic) => (
          <div
            key={classic.id}
            className="bg-red-600 p-4 rounded shadow-lg flex flex-col text-center"
          >
            <h3 className="text-3xl font-semibold text-white">
              {classic.name}
            </h3>
            <p className="mt-4 text-2xl text-gray-300">Toppings:</p>
            <ul className="text-gray-300">
              {Object.keys(JSON.parse(classic.toppingsStringified)).map(
                (topping) => (
                  <li key={topping}>
                    {" "}
                    {topping[0].toUpperCase() + topping.substring(1)}{" "}
                  </li>
                ),
              )}
            </ul>
            <div className="flex justify-center items-center mt-5">
              <button
                className="bg-gray-500 cursor-not-allowed rounded p-2 mr-2"
                disabled
              >
                Add to Cart
              </button>
              <button
                className={`rounded p-2 ml-2 ${role === "owner" || role === "chef" ? "cursor-pointer bg-white" : "cursor-not-allowed bg-gray-500"}`}
                onClick={() => deleteClassic(classic.id)}
                disabled={role !== "owner" && role !== "chef"}
              >
                Delete Classic
              </button>
            </div>
            <div className="flex items-center justify-center min-w-full mt-8">
              <img className="max-w-[80%] rounded" src={Pizza} alt="Pizza" />
            </div>
          </div>
        ))}
      </div>

      <form className="rounded border min-w-[40%] bg-zinc-100 p-4 mt-10">
        <h1 className="text-4xl text-center">New Classic Creation</h1>
        <input
          className="border p-2 rounded my-6 min-w-full"
          type="text"
          placeholder={
            role === "owner" || role === "chef"
              ? "Enter a new classic"
              : "Sign in as an owner or chef to add a new classic"
          }
          value={newClassic}
          onChange={(e) => setNewClassic(e.target.value)}
          required
          disabled={role !== "owner" && role !== "chef"}
        />
        <h2 className="text-2xl text-center">Add Toppings</h2>

        <div className="flex flex-col items-center">
          {toppings.map((topping) => (
            <label key={topping} className="flex items-center my-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedToppings.includes(topping)}
                onChange={() => handleCheckboxChange(topping)}
                disabled={role !== "owner" && role !== "chef"}
              />
              {topping[0].toUpperCase() + topping.substring(1)}
            </label>
          ))}
        </div>
        <button
          type="submit"
          className={`${role === "owner" || role === "chef" ? "bg-red-500 cursor-pointer" : "bg-gray-200 cursor-not-allowed"}  text-white p-2 rounded mt-8 min-w-full`}
          onClick={addClassic}
          disabled={role !== "owner" && role !== "chef"}
        >
          Add Classic
        </button>
      </form>
    </div>
  );
}
