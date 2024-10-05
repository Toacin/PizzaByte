import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    (async function () {
      const response = await fetch("/api/testRoute", {
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
    <div className="text-center">
      <h1 className="text-6xl mb-2 pt-2">Pizza Byte</h1>
      <p className="text-3xl underline">
        Applying Various Styles to Test Tailwind
      </p>
    </div>
  );
}

export default App;
