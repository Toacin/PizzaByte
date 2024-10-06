import { FaPizzaSlice } from "react-icons/fa6";

export default function () {
  return (
    <div className="flex min-w-full px-20 py-40 justify-center items-center bg-black font-semibold flex-col">
      <h1 className="text-7xl text-white flex justify-normal text-center">
        {" "}
        <FaPizzaSlice className="text-red-600 mr-4" /> Welcome to PizzaByte!
      </h1>
      <p className="text-white text-center mt-24 text-3xl w-[60%]">
        {" "}
        Welcome to PizzaByte! This demo application is a simple pizza ordering
        app. You can view the menu, add items to your cart, and place an order.{" "}
        On top of that, PizzaByte chefs can add new classic pizzas to the menu,
        and owners can add new toppings. New toppings can be used by chefs for
        their classic creations, or by customers for custom pizza orders. Orders
        can be viewed under the orders tab in the dashboard. Enjoy your stay!
      </p>
    </div>
  );
}
