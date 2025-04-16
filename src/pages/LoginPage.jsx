import { useContext } from "react";
import logo from "../assets/images/logo.svg";
import googleLogo from "../assets/images/icon-google.svg";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
  const { startGoogleSignIn } = useContext(AuthContext);

  return (
    <div className="bg-indigo-50 h-screen grid place-content-center ">
      <form className="bg-white p-7 w-2xl">
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="Logo" />
          <div className="py-2">
            <h1 className="text-xl font-bold">Welcome to Note</h1>
            <p className="text-slate-500 text-sm">Please log in to continue</p>
          </div>
        </div>

        <div className="mt-3 border-b border-b-slate-200 pb-2">
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="email">
              Email Address
            </label>
            <input
              type="text"
              id="email"
              placeholder="email@example.com"
              className="border border-gray-200 rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="email">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="email@example.com"
              className="border border-gray-200 rounded p-2"
            />
          </div>

          <button
            className="block w-full bg-indigo-600 text-white  py-2 mt-3 rounded cursor-pointer mb-2"
            type="button"
          >
            Login
          </button>
        </div>

        <div className="text-center border-b border-b-slate-200 pb-4">
          <p className="text-slate-400 py-3">Or log in with:</p>
          <button
            onClick={() => startGoogleSignIn()}
            type="button"
            className="flex gap-2 items-center justify-center cursor-pointer w-full py-2 text-gray-800 rounded border border-slate-500"
          >
            <img src={googleLogo} alt="Google Icon" />
            Google
          </button>
        </div>

        <div className="border-t border-t-slate-200 text-center">
          <p className="py-2">
            Not account yet?{" "}
            <button type="button" className="font-bold">
              Sign Up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};
