export default {
  getAllToppings: async function (toast, setToppings, dispatch) {
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
  },

  addToppings: async function (
    e,
    auth,
    newTopping,
    toast,
    setToppingModified,
    toppingModified,
    setNewTopping,
  ) {
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
      toast.success("Topping added successfully.");
    } catch (err) {
      console.error(err.toString());
      toast.error("Something went wrong. Please try again later.");
    }
  },

  updateToppings: async function (
    e,
    auth,
    updatedTopping,
    editedTopping,
    toast,
    setToppingModified,
    toppingModified,
    setUpdatedTopping,
    setEditedTopping,
  ) {
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
      toast.success("Topping updated successfully.");
    } catch (err) {
      console.error(err.toString());
      toast.error("Something went wrong. Please try again later.");
    }
  },

  deleteToppings: async function (
    topping,
    auth,
    toast,
    setToppingModified,
    toppingModified,
  ) {
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
  },
};
