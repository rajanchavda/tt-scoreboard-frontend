import React, { useState } from "react";
import { onlogin } from "../../APIs/users";

export default function Login({ setIsLoggedIn }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = (event) => {
    event.preventDefault();
    let credentials = {
      username: userName,
      password,
    };
    onlogin(credentials)
      .then((res) => localStorage.setItem("token", res.token))
      .then(setIsLoggedIn(true));
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold mb-5 mt-[-40px] text-center text-blue-700">
        Sign in
      </h1>
      <form className="mt-6 w-[50%]" onSubmit={onClickLogin}>
        <div className="mb-2">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-800"
          >
            Username
          </label>
          <input
            type="username"
            onChange={(e) => setUserName(e.target.value)}
            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-800"
          >
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            required
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
