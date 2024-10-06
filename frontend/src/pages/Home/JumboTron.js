import HomePageBG from "../../assets/HomePageBG.jpg";
import PizzaByteBlack from "../../assets/PizzaByteSmallBlack.png";

export default function JumboTron() {
  return (
    <div>
      <div className="relative w-full" style={{ height: "75vh" }}>
        <img
          className="w-full h-full object-cover"
          src={HomePageBG}
          alt="Home Page Background, plant in cup on table"
        />

        <div className="absolute top-40 left-10 w-2/5">
          <img src={PizzaByteBlack} alt="PizzaByte Logo" />
          <p className="absolute top-80 w-full text-4xl pt-4">
            Quality Ingredients. Delicious Pizza
          </p>
        </div>
      </div>
    </div>
  );
}
