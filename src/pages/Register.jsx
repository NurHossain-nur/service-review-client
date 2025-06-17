import React from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContexts/AuthContexts";
import axios from "axios";

const Register = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return (
      /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 6
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters and contain uppercase and lowercase letters."
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(result.user);

        updateUser({ displayName: name, photoURL: photo }).then(() => {
          setUser({ ...user, displayName: name, photoURL: photo });
          // toast.success("Registration Successful");
          // navigate("/");

          const newUser = {
            name,
            email,
            photoURL: photo,
            createdAt: new Date(),
          };

          // POST user to your backend
          axios
            .post(
              "https://service-review-server-blush-nine.vercel.app/users",
              newUser
            )
            .then(() => {
              toast.success("Registration successful");
              navigate("/");
            })
            .catch((err) => {
              console.error("User save failed:", err);
              toast.error("User created but saving to DB failed.");
            });
        });
      })
      .catch(() => setError("Registration failed. Try a different email."));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <form
        onSubmit={handleRegister}
        className="card w-full max-w-md shadow-lg bg-base-100 p-6"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full mb-4"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-4"
          required
        />
        <input
          name="photo"
          type="text"
          placeholder="Photo URL"
          className="input input-bordered w-full mb-4"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-4"
          required
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link className="text-primary font-medium" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
