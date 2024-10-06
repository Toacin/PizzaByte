import { useEffect, useState } from "react";
import Pizza from "../../assets/Pizza.jpg";

export default function Classics() {
  const [classics, setClassics] = useState([]);

  useEffect(() => {
    (async function () {
      try {
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
        setClassics(data.classics);
      } catch (err) {
        console.error(err.toString());
      }
    })();
  }, []);

  return (
    <div className="flex min-w-full px-20 py-40 justify-center items-center bg-black font-semibold flex-col">
      <h1 className="text-white text-7xl">Classics</h1>
      <h2 className="text-3xl text-gray-400 my-4">
        Classic pizzas that never go out of style.
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-24 max-w-[50%]">
        {classics.map((classic) => (
          <div
            key={classic.id}
            className="bg-red-600 p-4 rounded shadow-lg flex flex-col text-center"
          >
            <h3 className="text-3xl font-semibold text-white">
              {classic.name}
            </h3>
            <p className="mt-4 text-2xl text-gray-300">Toppings:</p>
            <ul className="text-gray-300">
              {Object.keys(JSON.parse(classic.toppingsStringified)).map(
                (topping) => (
                  <li key={topping}>
                    {" "}
                    {topping[0].toUpperCase() + topping.substring(1)}{" "}
                  </li>
                ),
              )}
            </ul>
            <div className="flex justify-center items-center mt-5">
              <button className="bg-white rounded p-2 mr-2">Add to Cart</button>
              <button className="bg-white rounded p-2 ml-2">
                Delete Classic
              </button>
            </div>
            <div className="flex items-center justify-center min-w-full mt-8">
              <img className="max-w-[80%] rounded" src={Pizza} alt="Pizza" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
