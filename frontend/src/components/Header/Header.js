import pizzaByteSmallWhite from "../../assets/PizzaByteSmallWhite.png";
import auth from "../../utils/auth";

export default function Header() {
  // since header is not within the Router, we will navigate here with window.location
  const navigateHome = () => {
    window.location.href = "/";
  };

  const navigateAuthentication = () => {
    window.location.href = "/authentication";
  };

  const logout = () => {
    auth.logout();
  };

  console.log(auth.loggedIn());

  return (
    <div className="fixed bg-black py-6 px-10 md:px-24 min-w-full z-10">
      <div className="flex justify-between items-center">
        <img
          className="w-[40%] md:w-[25%] lg:w-[15%] xl:w-[10%] cursor-pointer"
          src={pizzaByteSmallWhite}
          alt="PizzaByte Logo"
          onClick={navigateHome}
        />
        <div>
          {auth.loggedIn() ? (
            <button className="bg-red-500 rounded p-2" onClick={logout}>
              Log Out
            </button>
          ) : (
            <button
              className="bg-white rounded p-2"
              onClick={navigateAuthentication}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
