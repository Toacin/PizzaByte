import { FaPizzaSlice } from "react-icons/fa6";

export default function () {
  return (
    <div className="flex min-w-full px-20 py-40 justify-center items-center bg-black font-semibold flex-col">
      <h1
        className="text-4xl md:text-7xl text-white flex justify-normal text-center"
        data-testid="welcome-h1"
      >
        {" "}
        <FaPizzaSlice
          className="text-red-600 mr-4"
          data-testid="pizzabyte-icon"
        />{" "}
        Welcome to PizzaByte!
      </h1>
      <p
        className="text-white text-center mt-24 text-3xl w-[100%] md:w-[60%]"
        data-testid="welcome-message"
      >
        {" "}
        Welcome to PizzaByte! This demo application is a pizza restaurant menu
        and toppings inventory management tool designed for both chefs and
        owners. Owners can log in to manage the toppings available at their
        restaurant, including adding, updating, and removing toppings ensuring
        that no duplicate toppings exist. Chefs can also log in to create their
        own "Classics"—customized pizzas made with unique combinations of
        toppings. They are also able to update Classics, but as with owners,
        duplicate Classics or Classics with a topping combination already on the
        menu are prohibited. Additionally, while users can log in, an ordering
        functionality is not yet implemented; however, our platform has database
        structures to support pizza orders in the future. Sign in as owner or
        chef to get started!
      </p>
    </div>
  );
}
