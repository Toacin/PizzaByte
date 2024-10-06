import pizzaByteSmallWhite from "../../assets/PizzaByteSmallWhite.png";

export default function Header() {
  return (
    <div className="fixed bg-black py-6 px-10 md:px-24 min-w-full z-10">
      <div className="flex justify-between items-center">
        <img
          className="w-[40%] md:w-[25%] lg:w-[15%] xl:w-[10%]"
          src={pizzaByteSmallWhite}
          alt="PizzaByte Logo"
        />
        <div>
          <button className="bg-white rounded p-2">Sign In</button>
        </div>
      </div>
    </div>
  );
}
