import React from "react";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../contexts/AuthContexts/AuthContexts";

const Login = () => {
  const { signIn, googleLogin, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const location = useLocation();
  const from = location.state || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;

        setUser(user);

        toast.success("Login Successful");
        navigate(from);
      })
      .catch(() => setError("Invalid email or password"));
  };

  // const handleGoogle = () => {
  //   googleLogin()
  //     .then(() => {
  //       toast.success("Logged in with Google");
  //       navigate(from);
  //     })
  //     .catch(() => toast.error("Google login failed"));
  // };

  const handleGoogle = () => {
    googleLogin()
      .then(async (result) => {
        const user = result.user;

        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: "user", // or default role
        };

        try {
          // Step 1: Check if user already exists
          const res = await fetch(
            `http://localhost:5000/users?email=${user.email}`
          );
          const data = await res.json();

          // Step 2: If user not found, add them
          if (!data?.exists) {
            await fetch("http://localhost:5000/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userInfo),
            });
          }

          toast.success("Logged in with Google");
          navigate(from);
        } catch (err) {
          console.error("Error saving Google user:", err);
          toast.error("Login succeeded, but failed to save user.");
        }
      })
      .catch(() => toast.error("Google login failed"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <form
        onSubmit={handleLogin}
        className="card w-full max-w-md shadow-lg bg-base-100 p-6"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-4"
          required
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
          Login
        </button>

        <div className="divider">OR</div>

        <button
          type="button"
          onClick={handleGoogle}
          className="btn btn-outline w-full flex items-center gap-2"
        >
          <FcGoogle className="text-xl" /> Login with Google
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link className="text-primary font-medium" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
