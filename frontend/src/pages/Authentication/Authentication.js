import LoginContainer from "./LoginContainer";
import SignupContainer from "./SignupContainer";

export default function Authentication() {
  return (
    <div className="pt-40">
      <h1 className="text-center text-7xl pt-10 mb-8">Authentication</h1>
      <div className="flex justify-center items-start">
        <LoginContainer />
        <SignupContainer />
      </div>
    </div>
  );
}
