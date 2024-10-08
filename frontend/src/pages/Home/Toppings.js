import { useEffect, useState } from "react";
import auth from "../../utils/auth";
import { useGlobalState } from "../../GlobalStateProvider";
import toast from "react-hot-toast";
import ToppingsNetworkServices from "./ToppingsNetworkServices";
import scrollToSection from "../../utils/scrollToSection";

export default function Toppings() {
  const [toppings, setToppings] = useState([]);
  const [role, setRole] = useState("user");
  const [newTopping, setNewTopping] = useState("");
  const [toppingModified, setToppingModified] = useState(0);
  const { dispatch } = useGlobalState();
  const [editedTopping, setEditedTopping] = useState("");
  const [updatedTopping, setUpdatedTopping] = useState("");

  // Fetch existing toppings
  useEffect(() => {
    if (auth.loggedIn()) {
      setRole(auth.getProfile().data.role);
    }
    (async function () {
      await ToppingsNetworkServices.getAllToppings(
        toast,
        setToppings,
        dispatch,
      );
    })();
  }, [toppingModified]);

  // scroll to the update form when a classic is edited
  useEffect(() => {
    if (editedTopping) {
      scrollToSection("update-topping");
    }
  }, [editedTopping]);

  // add topping
  const addTopping = async (e) => {
    await ToppingsNetworkServices.addToppings(
      e,
      auth,
      newTopping,
      toast,
      setToppingModified,
      toppingModified,
      setNewTopping,
    );
  };

  // initiate topping update
  const initiateToppingUpdate = async (originalTopping) => {
    setEditedTopping(originalTopping);
    setUpdatedTopping(originalTopping);
  };

  // update topping
  const updateTopping = async (e) => {
    await ToppingsNetworkServices.updateToppings(
      e,
      auth,
      updatedTopping,
      editedTopping,
      toast,
      setToppingModified,
      toppingModified,
      setUpdatedTopping,
      setEditedTopping,
    );
  };

  // delete topping
  const deleteTopping = async (topping) => {
    await ToppingsNetworkServices.deleteToppings(
      topping,
      auth,
      toast,
      setToppingModified,
      toppingModified,
    );
  };

  return (
    <div className="flex min-w-full md:px-5 lg:px-20 py-40 justify-center items-center font-semibold flex-col">
      <h1 className="text-7xl">Toppings</h1>
      <h2 className="text-3xl text-gray-400 my-4 text-center">
        Choose your favorite toppings. Made with real and fresh ingredients
      </h2>
      <div className="min-w-[100%] md:min-w-[80%] lg:min-w-[70%] xl:min-w-[60%] border rounded bg-zinc-100 mt-4 p-5 lg:p-20">
        <MapExisingToppings
          {...{ toppings, role, initiateToppingUpdate, deleteTopping }}
        />

        <AddToppingForm {...{ addTopping, newTopping, setNewTopping, role }} />

        <UpdateToppingForm
          {...{
            editedTopping,
            updateTopping,
            updatedTopping,
            setUpdatedTopping,
            role,
            setEditedTopping,
          }}
        />
      </div>
    </div>
  );
}

function MapExisingToppings({
  toppings,
  role,
  initiateToppingUpdate,
  deleteTopping,
}) {
  return (
    <>
      {toppings.map((topping) => (
        <div
          key={topping}
          className="flex items-center justify-between mt-2 border-b border-gray-300 pb-3"
        >
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
    </>
  );
}

function AddToppingForm({ addTopping, newTopping, setNewTopping, role }) {
  return (
    <form
      onSubmit={addTopping}
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
      >
        Add
      </button>
    </form>
  );
}

function UpdateToppingForm({
  editedTopping,
  updateTopping,
  updatedTopping,
  setUpdatedTopping,
  role,
  setEditedTopping,
}) {
  return (
    <>
      {editedTopping && (
        <div className="border-t border-gray-300 mt-6" id="update-topping">
          <form
            onSubmit={updateTopping}
            className="min-w-full flex justify-between items-center"
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
    </>
  );
}
