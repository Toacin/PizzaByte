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
  const [editedTopping, setEditedTopping] = useState("");
  const [updatedTopping, setUpdatedTopping] = useState("");

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
            toast.error(errorData.message);
          } else {
            toast.error("Something went wrong. Please try again later.");
          }
          return;
        }
        const data = await response.json();
        const allToppings = data.toppings.map((topping) => topping.toppingName);
        setToppings(allToppings);
        dispatch({ type: "SET_TOPPINGS", payload: allToppings });
      } catch (err) {
        console.error(err.toString());
        toast.error("Something went wrong. Please try again later.");
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
          toast.error(errorData.message);
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
        return;
      }
      setToppingModified(toppingModified + 1);
    } catch (err) {
      console.error(err.toString());
      toast.error("Something went wrong. Please try again later.");
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
          toast.error(errorData.message);
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
        return;
      }
      setToppingModified(toppingModified + 1);
      setNewTopping("");
    } catch (err) {
      console.error(err.toString());
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const initiateToppingUpdate = async (originalTopping) => {
    setEditedTopping(originalTopping);
    setUpdatedTopping(originalTopping);
  };

  const updateTopping = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/toppings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify({
          toppingName: updatedTopping,
          originalToppingName: editedTopping,
        }),
      });
      if (!response.ok) {
        console.error("Failed to update topping");
        if (response.status !== 500) {
          const errorData = await response.json();
          toast.error(errorData.message);
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
        return;
      }
      setToppingModified(toppingModified + 1);
      setUpdatedTopping("");
      setEditedTopping("");
    } catch (err) {
      console.error(err.toString());
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex min-w-full md:px-5 lg:px-20 py-40 justify-center items-center font-semibold flex-col">
      <h1 className="text-7xl">Toppings</h1>
      <h2 className="text-3xl text-gray-400 my-4 text-center">
        Choose your favorite toppings. Made with real and fresh ingredients
      </h2>
      <div className="min-w-[100%] md:min-w-[80%] lg:min-w-[70%] xl:min-w-[60%] border rounded bg-zinc-100 mt-4 p-5 lg:p-20">
        {toppings.map((topping) => (
          <div key={topping} className="flex items-center justify-between mt-2">
            <p className="text-xl md:text-3xl">
              {topping[0].toUpperCase() + topping.substring(1)}
            </p>
            <div>
              <button
                className={`${
                  role === "owner"
                    ? "bg-black cursor-pointer text-white"
                    : "bg-gray-500 cursor-not-allowed"
                } text-white rounded p-2 mr-2`}
                disabled={role !== "owner"}
                onClick={() => initiateToppingUpdate(topping)}
              >
                Edit
              </button>
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
                ? "bg-black cursor-pointer"
                : "bg-gray-500 cursor-not-allowed"
            } text-white p-2 rounded mt-4`}
            disabled={role !== "owner"}
            onClick={handleAddTopping}
          >
            Add
          </button>
        </form>

        {editedTopping && (
          <div>
            <form
              onSubmit={updateTopping}
              className="min-w-full flex justify-between items-center mt-6"
            >
              <input
                className="border p-2 rounded mt-4 min-w-[80%]"
                type="text"
                name="updatedTopping"
                value={updatedTopping}
                onChange={(e) => setUpdatedTopping(e.target.value)}
                placeholder={
                  role === "owner"
                    ? "Update Topping Name"
                    : "Sign in as an owner to add a new topping"
                }
                required
                disabled={role !== "owner"}
              />
              <button
                type="submit"
                className={`${
                  role === "owner"
                    ? "bg-black cursor-pointer"
                    : "bg-gray-500 cursor-not-allowed"
                } text-white p-2 rounded mt-4`}
                disabled={role !== "owner"}
                onClick={updateTopping}
              >
                Update
              </button>
            </form>
            <button
              className={`${
                role === "owner"
                  ? "bg-red-500 cursor-pointer"
                  : "bg-gray-500 cursor-not-allowed"
              } text-white p-2 rounded mt-4 min-w-full`}
              disabled={role !== "owner"}
              onClick={() => setEditedTopping("")}
            >
              Cancel Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
