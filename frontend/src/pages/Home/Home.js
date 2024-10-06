import RedDivider from "../../components/RedDivider/RedDivider";
import RedDividerHalfHeight from "../../components/RedDivider/RedDividerHalfHeight";
import JumboTron from "./JumboTron";
import Welcome from "./Welcome";
import Classics from "./Classics";
import Toppings from "./Toppings";

export default function Home() {
  return (
    <div className="pt-10">
      <JumboTron />
      <RedDivider />
      <Welcome />
      <RedDividerHalfHeight />
      <Classics />
      <RedDividerHalfHeight />
      <Toppings />
    </div>
  );
}
