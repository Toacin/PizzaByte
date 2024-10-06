import { useEffect, useState } from "react";

export default function Toppings() {
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
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
        }
        const data = await response.json();
        console.log(data);
        setToppings(data.toppings.map((topping) => topping.toppingName));
      } catch (err) {
        console.error(err.toString());
      }
    })();
  }, []);

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
            <button className="bg-red-600 text-white rounded p-2">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
