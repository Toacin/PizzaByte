import "./App.css";
import { useEffect } from "react";
import { GlobalStateProvider } from "./GlobalStateProvider";
import Header from "./components/Header/Header";

function App() {
  useEffect(() => {
    (async function () {
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
      console.log(data);
    })();
  }, []);

  return (
    <GlobalStateProvider>
      <Header />
    </GlobalStateProvider>
  );
}

export default App;
