import { useContext } from "react";
import logo from "../assets/images/logo.svg";
import googleLogo from "../assets/images/icon-google.svg";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { useForm } from "../hooks/useForm";

const formValidations = {
  email: [(value) => value.includes("@"), "The email should have @"],
  password: [
    (value) => value.length >= 6,
    "The password should have at least 6 characters",
  ],
  name: [(value) => value.length >= 1, "The name is mandatory"],
};

const init = {
  name: "",
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { startGoogleSignIn, startLoginEmailPassword, errorMessage } =
    useContext(AuthContext);
  const {
    handleChange,
    formData,
    isFormValid,
    nameValid,
    emailValid,
    passwordValid,
  } = useForm(init, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    startLoginEmailPassword({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="bg-indigo-50 h-screen grid place-content-center ">
      <form className="bg-white p-7 w-2xl" onSubmit={onSubmit}>
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
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="email">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="border border-gray-200 rounded p-2"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            className="block w-full bg-indigo-600 text-white  py-2 mt-3 rounded cursor-pointer mb-2"
            type="submit"
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
            <Link to={`/sign-up`} className="font-bold">
              Sign Up
            </Link>
          </p>
        </div>
        {errorMessage && (
          <div className="bg-red-300 text-center rounded py-2">
            <p>{errorMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
};
