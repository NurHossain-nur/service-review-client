import React from 'react';
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
    return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-100 text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2 text-base-content">Page Not Found</h2>
      <p className="text-base-content text-sm mb-6 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn btn-primary flex items-center gap-2"
      >
        <FaArrowLeft /> Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;