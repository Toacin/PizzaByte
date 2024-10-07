import { useEffect, useState } from "react";
import auth from "../../utils/auth";
import { useGlobalState } from "../../GlobalStateProvider";
import toast from "react-hot-toast";

export default function Toppings() {
  const [toppings, setToppings] = useState([]);
  const [role, setRole] = useState("user");
  const [newTopping, setNewTopping] = useState("");
  const [toppingModified, setToppingModified] = useState(0);
  const { dispatch } = useGlobalState();

  useEffect(() => {
    if (auth.loggedIn()) {
      setRole(auth.getProfile().data.role);
    }
    (async function () {
      try {
        const response = await fetch("/api/toppings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
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
        const allToppings = data.toppings.map((topping) => topping.toppingName);
        setToppings(allToppings);
        dispatch({ type: "SET_TOPPINGS", payload: allToppings });
      } catch (err) {
        console.error(err.toString());
        toast("Something went wrong. Please try again later.");
      }
    })();
  }, [toppingModified]);

  const deleteTopping = async (topping) => {
    try {
      const response = await fetch(`/api/toppings/${topping}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth.getToken()}`,
        },
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
      setToppingModified(toppingModified + 1);
    } catch (err) {
      console.error(err.toString());
      toast("Something went wrong. Please try again later.");
    }
  };

  const handleAddTopping = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/toppings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify({ toppingName: newTopping }),
      });
      if (!response.ok) {
        console.error("Failed to add topping");
        if (response.status !== 500) {
          const errorData = await response.json();
          toast(errorData.message);
        } else {
          toast("Something went wrong. Please try again later.");
        }
        return;
      }
      setToppingModified(toppingModified + 1);
      setNewTopping("");
    } catch (err) {
      console.error(err.toString());
      toast("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex min-w-full px-20 py-40 justify-center items-center font-semibold flex-col">
      <h1 className="text-7xl">Toppings</h1>
      <h2 className="text-3xl text-gray-400 my-4">
        Choose your favorite toppings. Made with real and fresh ingredients
      </h2>
      <div className="min-w-[50%] border rounded bg-zinc-100 mt-4 p-20">
        {toppings.map((topping) => (
          <div key={topping} className="flex items-center justify-between mt-2">
            <p className="text-3xl">
              {topping[0].toUpperCase() + topping.substring(1)}
            </p>
            <button
              className={`${
                role === "owner"
                  ? "bg-red-500 cursor-pointer"
                  : "bg-gray-500 cursor-not-allowed"
              } text-white rounded p-2`}
              disabled={role !== "owner"}
              onClick={() => deleteTopping(topping)}
            >
              Delete
            </button>
          </div>
        ))}

        <form
          onSubmit={handleAddTopping}
          className="min-w-full flex justify-between items-center mt-6"
        >
          <input
            className="border p-2 rounded mt-4 min-w-[80%]"
            type="text"
            name="topping"
            value={newTopping}
            onChange={(e) => setNewTopping(e.target.value)}
            placeholder={
              role === "owner"
                ? "Enter a new topping"
                : "Sign in as an owner to add a new topping"
            }
            required
            disabled={role !== "owner"}
          />
          <button
            type="submit"
            className={`${
              role === "owner"
                ? "bg-green-500 cursor-pointer"
                : "bg-gray-500 cursor-not-allowed"
            } text-white p-2 rounded mt-4`}
            disabled={role !== "owner"}
            onClick={handleAddTopping}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
