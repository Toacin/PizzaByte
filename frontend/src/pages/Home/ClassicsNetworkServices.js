export default {
  getAllClassics: async function (toast, setClassics) {
    try {
      const response = await fetch("/api/classics", {
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
      setClassics(data.classics);
    } catch (err) {
      console.error(err.toString());
      toast.error("Something went wrong. Please try again later.");
    }
  },

  addClassic: async function (
    e,
    selectedToppings,
    auth,
    newClassic,
    toast,
    setNewClassic,
    setSelectedToppings,
    setClassicsModified,
    classicsModified,
  ) {
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
        if (response.status !== 500) {
          const errorData = await response.json();
          toast.error(errorData.message);
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
        return;
      }
      setNewClassic("");
      setSelectedToppings([]);
      setClassicsModified(classicsModified + 1);
      toast.success("Classic added successfully");
    } catch (err) {
      console.error(err.toString());
      toast.error("Something went wrong. Please try again later.");
    }
  },

  updateClassic: async function (
    e,
    updatedToppings,
    editedClassic,
    auth,
    updatedClassicName,
    toast,
    setEditedClassic,
    setClassicsModified,
    classicsModified,
  ) {
    e.preventDefault();
    try {
      const toppingsObject = {};
      for (const topping of updatedToppings) {
        toppingsObject[topping] = true;
      }

      const toppingsStringified = JSON.stringify(toppingsObject);
      const response = await fetch(`/api/classics/${editedClassic}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify({
          name: updatedClassicName,
          toppingsStringified,
        }),
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
      setClassicsModified(classicsModified + 1);
      setEditedClassic("");
      toast.success("Classic updated successfully");
    } catch (err) {
      console.error(err.toString());
      toast.error("Something went wrong. Please try again later.");
    }
  },

  deleteClassic: async function (
    classicId,
    auth,
    toast,
    setClassicsModified,
    classicsModified,
  ) {
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
        if (response.status !== 500) {
          const errorData = await response.json();
          toast.error(errorData.message);
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
        return;
      }
      setClassicsModified(classicsModified + 1);
      toast.success("Classic deleted successfully");
    } catch (err) {
      console.error(err.toString());
      toast.error("Something went wrong. Please try again later.");
    }
  },
};
