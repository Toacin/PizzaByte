export default {
  login: async function (e, loginData, toast, auth, navigate) {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
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
      auth.login(data.token);
      navigate("/");
    } catch (error) {
      console.error(error.toString());
      toast.error("Something went wrong. Please try again later.");
    }
  },

  signup: async function (e, formData, toast, auth, navigate) {
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
          toast.error(errorData.message);
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
        return;
      }
      const data = await response.json();
      auth.login(data.token);
      navigate("/");
    } catch (error) {
      console.error(error.toString());
      toast.error("Something went wrong. Please try again later.");
    }
  },
};
