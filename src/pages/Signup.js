import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "../firebase";
import { useForm } from "react-hook-form";

function Signup() {
  const [errorCode, setErrorCode] = useState(null);
  let navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const submitForm = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigate("/");
        }
      })
      .catch((error) => {
        setErrorCode(error.code);
      });
  };

  return (
    <div className="min-h-screen w-full flex items-center">
      <div
        className="min-h-96 h-full px-1/20 flex flex-col sm:mx-auto m-4 rounded-lg
         border-2 border-gray1 border-opacity-20 2xl:max-w-lg sm:max-w-md max-w-none w-full"
      >
        <h1 className="text-center font-bold text-3xl">Sign Up</h1>
        <div>
          <div className="mb-12 px-5 py-3">
        <h2 className="text-gray1 my-2">Welcome!</h2>
            {errorCode ? (
              <div className="mb-4 text-yellow-500 rounded leading-4">
                {errorCode === "auth/email-already-in-use"
                  ? "Looks like that account already exists. "
                  : "Sorry, we can't find an account with this email address. Please try again "}
                <Link className="underline" to="/">
                  {errorCode === "auth/wrong-password"
                    ? ""
                    : "create a new account."}
                </Link>
              </div>
            ) : null}
            <form
              className="flex flex-col items-center"
              onSubmit={handleSubmit(submitForm)}
            >
              <input
                type="email"
                className="text-gray-700 w-full my-3 p-2 rounded-lg border bg-gray-light
                 focus:outline-none focus:ring-1"
                placeholder="Your email adress"
                onChange={(event, { name, value }) => {
                  setValue(name, value);
                }}
                {...register("email", { required: true, maxLength: 50 })}
                id="email"
              />
              {errors.email?.type === "required" && (
                <span className="text-red-500">Email is required</span>
              )}
              <input
                type="password"
                className="text-gray-700 w-full p-2 rounded-lg border bg-gray-light
                 focus:outline-none focus:ring-1"
                placeholder="Password"
                onChange={(event, { name, value }) => {
                  setValue(name, value);
                }}
                {...register("password", {
                  required: true,
                  maxLength: 60,
                  minLength: 6,
                })}
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500">Password is required</span>
              )}
              <button className="my-3 w-full rounded-lg bg-primary py-3 text-white hover:bg-blue-600">
                Sign Up
              </button>
            </form>
          </div>
          <div>
            <div className="mt-4 text-base text-center">
              <Link
                className="text-gray1 font-medium hover:underline text-base"
                to="/"
              >
                Login.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
