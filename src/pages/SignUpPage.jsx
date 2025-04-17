import logo from "../assets/images/logo.svg";
import googleLogo from "../assets/images/icon-google.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
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

export const SignUpPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { registerUserEmailPassword } = useContext(AuthContext);
  const {
    handleChange,
    formData,
    isFormValid,
    nameValid,
    emailValid,
    passwordValid,
  } = useForm(init, formValidations);

  console.log(nameValid, emailValid, passwordValid);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    console.log("Submitted form:", formData);
    registerUserEmailPassword(formData);
    // You can now send `formData` to Firebase or another API
  };

  return (
    <div className="bg-indigo-50 h-screen grid place-content-center ">
      <form className="bg-white p-7 w-2xl" onSubmit={handleSubmit}>
        <h1>formValid {isFormValid ? "vALIDO" : "INVALIDO"}</h1>
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="Logo" />
          <div className="py-2">
            <h1 className="text-xl font-bold">Welcome to Note</h1>
            <p className="text-slate-500 text-sm">Please log in to continue</p>
          </div>
        </div>

        <div className="mt-3 border-b border-b-slate-200 pb-2">
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="name">
              User name
            </label>
            <input
              type="text"
              id="name"
              placeholder="User name"
              className="border border-gray-200 rounded p-2"
              value={formData.username}
              onChange={handleChange}
            />
            {nameValid && <p className="pb-2 text-red-500">{nameValid}</p>}
          </div>
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
            {emailValid && <p className="pb-2 text-red-500">{emailValid}</p>}
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

            {passwordValid && (
              <p className="pb-2 text-red-500">{passwordValid}</p>
            )}
          </div>

          <button
            className="block w-full bg-indigo-600 text-white  py-2 mt-3 rounded cursor-pointer mb-2"
            type="submit"
          >
            Sign Up
          </button>
        </div>

        <div className="text-center border-b border-b-slate-200 pb-4">
          <p className="text-slate-400 py-3">Or log in with:</p>
          <button
            // onClick={() => startGoogleSignIn()}
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
