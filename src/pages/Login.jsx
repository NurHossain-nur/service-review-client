import React from 'react';
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../contexts/AuthContexts/AuthContexts';

const Login = () => {
  const { signIn, googleLogin, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const location = useLocation();
  const from = location.state || '/';

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

  const handleGoogle = () => {
    googleLogin()
      .then(() => {
        toast.success("Logged in with Google");
        navigate(from);
      })
      .catch(() => toast.error("Google login failed"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <form onSubmit={handleLogin} className="card w-full max-w-md shadow-lg bg-base-100 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full mb-4" required />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full mb-4" required />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button type="submit" className="btn btn-primary w-full">Login</button>

        <div className="divider">OR</div>

        <button type="button" onClick={handleGoogle} className="btn btn-outline w-full flex items-center gap-2">
          <FcGoogle className="text-xl" /> Login with Google
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account? <Link className="text-primary font-medium" to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;