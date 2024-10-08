import { useEffect, useState } from "react";
import Pizza from "../../assets/Pizza.jpg";
import { useGlobalState } from "../../GlobalStateProvider";
import auth from "../../utils/auth";
import toast from "react-hot-toast";
import ClassicsNetworkServices from "./ClassicsNetworkServices";
import scrollToSection from "../../utils/scrollToSection";

export default function Classics() {
  const [classics, setClassics] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [role, setRole] = useState("user");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [newClassic, setNewClassic] = useState("");
  const { state } = useGlobalState();
  const [classicsModified, setClassicsModified] = useState(0);
  const [editedClassic, setEditedClassic] = useState("");
  const [updatedClassicName, setUpdatedClasicName] = useState("");
  const [updatedToppings, setUpdatedToppings] = useState([]);

  useEffect(() => {
    if (auth.loggedIn()) {
      setRole(auth.getProfile().data.role);
    }
    (async function () {
      await ClassicsNetworkServices.getAllClassics(toast, setClassics);
    })();
  }, [classicsModified]);

  useEffect(() => {
    setToppings(state.toppings);
  }, [state]);

  // scroll to the update form when a classic is edited
  useEffect(() => {
    if (editedClassic) {
      scrollToSection("update-classic");
    }
  }, [editedClassic]);

  // Handle checkbox change
  const handleCheckboxChange = (topping, formType) => {
    const updateState =
      formType === "update" ? setUpdatedToppings : setSelectedToppings;
    const readState =
      formType === "update" ? updatedToppings : selectedToppings;

    if (readState.includes(topping)) {
      // Remove topping if it's already selected
      updateState((prev) => prev.filter((item) => item !== topping));
    } else {
      // Add topping if it's not selected
      updateState((prev) => [...prev, topping]);
    }
  };

  const addClassic = async (e) => {
    await ClassicsNetworkServices.addClassic(
      e,
      selectedToppings,
      auth,
      newClassic,
      toast,
      setNewClassic,
      setSelectedToppings,
      setClassicsModified,
      classicsModified,
    );
  };

  const initiateUpdate = (classic) => {
    setEditedClassic(classic.id);
    setUpdatedClasicName(classic.name);

    // Add smooth scroll with an offset for the fixed header
    const element = document.getElementById("update-classic");

    // add all toppings from classic.toppingsStringified to updatedToppings
    const toppingsObject = JSON.parse(classic.toppingsStringified);
    const toppingsArray = Object.keys(toppingsObject);
    setUpdatedToppings(toppingsArray);

    if (element) {
      window.scrollTo({
        behavior: "smooth",
      });
    }
  };

  const updateClassic = async (e) => {
    await ClassicsNetworkServices.updateClassic(
      e,
      updatedToppings,
      editedClassic,
      auth,
      updatedClassicName,
      toast,
      setEditedClassic,
      setClassicsModified,
      classicsModified,
    );
  };

  const deleteClassic = async (classicId) => {
    await ClassicsNetworkServices.deleteClassic(
      classicId,
      auth,
      toast,
      setClassicsModified,
      classicsModified,
    );
  };

  const cancelUpdate = () => {
    setEditedClassic("");
    setUpdatedClasicName("");
    setUpdatedToppings([]);
  };

  return (
    <div className="flex min-w-full px-2 md:px-20 pt-28 pb-40 justify-center items-center bg-black font-semibold flex-col">
      <h1 className="text-white text-7xl text-center" id="classic-title">
        Classics
      </h1>
      <h2 className="text-3xl text-gray-400 my-4 text-center">
        Classic pizzas that never go out of style.
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-24 max-w-[90%] md:max-w-[50%]">
        <MapExistingToppings
          {...{ classics, role, initiateUpdate, deleteClassic }}
        />
      </div>

      {/* update form */}
      <UpdateClassicForm
        {...{
          editedClassic,
          updateClassic,
          role,
          updatedClassicName,
          setUpdatedClasicName,
          toppings,
          updatedToppings,
          handleCheckboxChange,
          cancelUpdate,
        }}
      />

      {/* add form */}
      <AddClassicForm
        {...{
          addClassic,
          role,
          newClassic,
          setNewClassic,
          toppings,
          selectedToppings,
          handleCheckboxChange,
        }}
      />
    </div>
  );
}

// map existing toppings
function MapExistingToppings({
  classics,
  role,
  initiateUpdate,
  deleteClassic,
}) {
  return (
    <>
      {classics.map((classic) => (
        <div
          key={classic.id}
          className="bg-red-600 p-4 rounded shadow-lg flex flex-col text-center"
        >
          <h3 className="text-3xl font-semibold text-white">
            {classic.name[0].toUpperCase() + classic.name.substring(1)}
          </h3>
          <p className="mt-4 text-2xl text-gray-300 underline">Toppings:</p>
          <ul className="text-gray-300 flex flex-wrap justify-center mt-2 max-w-full">
            {Object.keys(JSON.parse(classic.toppingsStringified)).map(
              (topping) => (
                <li
                  key={topping}
                  className="px-2 py-1 bg-red-200 text-black border-2 border-black min-w-fit text-center my-1 mx-1 rounded-full"
                >
                  {topping[0].toUpperCase() + topping.substring(1)}
                </li>
              ),
            )}
          </ul>
          <div className="flex justify-center items-center mt-5">
            <button
              className={`rounded p-2 ml-2 ${role === "chef" ? "cursor-pointer bg-white" : "cursor-not-allowed bg-gray-500"}`}
              disabled={role !== "chef"}
              onClick={() => initiateUpdate(classic)}
            >
              Edit
            </button>
            <button
              className={`rounded p-2 ml-2  ${role === "chef" ? "cursor-pointer bg-red-200 text-red-500" : "cursor-not-allowed bg-gray-500"}`}
              onClick={() => deleteClassic(classic.id)}
              disabled={role !== "chef"}
            >
              Delete
            </button>
          </div>
          <div className="flex items-center justify-center min-w-full mt-8">
            <img className="max-w-[80%] rounded" src={Pizza} alt="Pizza" />
          </div>
        </div>
      ))}
    </>
  );
}

// update classic form
function UpdateClassicForm({
  editedClassic,
  updateClassic,
  role,
  updatedClassicName,
  setUpdatedClasicName,
  toppings,
  updatedToppings,
  handleCheckboxChange,
  cancelUpdate,
}) {
  return (
    <>
      {editedClassic && (
        <form
          className={`rounded border w-[100%] md:w-[80%] lg:w-[50%] bg-zinc-100 p-4 mt-10`}
          id="update-classic"
          onSubmit={updateClassic}
        >
          <h1 className="text-4xl text-center">Update Classic Creation</h1>
          <input
            className="border p-2 rounded my-6 min-w-full"
            type="text"
            placeholder={
              role === "chef"
                ? "Enter updated classic name"
                : "Sign in as a chef to update classic"
            }
            value={updatedClassicName}
            onChange={(e) => setUpdatedClasicName(e.target.value)}
            required
            disabled={role !== "chef"}
          />
          <h2 className="text-2xl text-center">Update Toppings</h2>

          <div className="flex flex-wrap items-center mt-5">
            {toppings.map((topping) => (
              <label key={topping} className="flex items-center my-2">
                <input
                  type="checkbox"
                  className="ml-5 mr-1"
                  checked={updatedToppings.includes(topping)}
                  onChange={() => handleCheckboxChange(topping, "update")}
                  disabled={role !== "chef"}
                />
                {topping[0].toUpperCase() + topping.substring(1)}
              </label>
            ))}
          </div>
          <button
            type="submit"
            className={`${role === "chef" ? "bg-black cursor-pointer" : "bg-gray-200 cursor-not-allowed"}  text-white p-2 rounded mt-8 min-w-full`}
            disabled={role !== "chef"}
          >
            Update Classic
          </button>
          <button
            className={`${role === "chef" ? "bg-red-500 cursor-pointer" : "bg-gray-200 cursor-not-allowed"}  text-white p-2 rounded mt-2 min-w-full`}
            onClick={cancelUpdate}
            disabled={role !== "chef"}
          >
            Cancel Update
          </button>
        </form>
      )}
    </>
  );
}

// add classic form
function AddClassicForm({
  addClassic,
  role,
  newClassic,
  setNewClassic,
  toppings,
  selectedToppings,
  handleCheckboxChange,
}) {
  return (
    <form
      className="rounded border w-[100%] md:w-[80%] lg:w-[50%] bg-zinc-100 p-4 mt-10"
      onSubmit={addClassic}
    >
      <h1 className="text-4xl text-center">New Classic Creation</h1>
      <input
        className="border p-2 rounded my-6 min-w-full"
        type="text"
        placeholder={
          role === "chef"
            ? "Enter a new classic"
            : "Sign in as a chef to add a new classic"
        }
        value={newClassic}
        onChange={(e) => setNewClassic(e.target.value)}
        required
        disabled={role !== "chef"}
      />
      <h2 className="text-2xl text-center">Add Toppings</h2>

      <div className="flex flex-wrap items-center mt-5">
        {toppings.map((topping) => (
          <label key={topping} className="flex items-center my-2">
            <input
              type="checkbox"
              className="ml-5 mr-1"
              checked={selectedToppings.includes(topping)}
              onChange={() => handleCheckboxChange(topping, "add")}
              disabled={role !== "chef"}
            />
            {topping[0].toUpperCase() + topping.substring(1)}
          </label>
        ))}
      </div>
      <button
        type="submit"
        className={`${role === "chef" ? "bg-red-500 cursor-pointer" : "bg-gray-200 cursor-not-allowed"}  text-white p-2 rounded mt-8 min-w-full`}
        disabled={role !== "chef"}
      >
        Add Classic
      </button>
    </form>
  );
}
