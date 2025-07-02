import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContexts/AuthContexts";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

// Reusable Flip Link Component
const FlipLink = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `font-semibold group transition-all duration-300 ease-in-out ${
        isActive ? "text-primary" : ""
      }`
    }
  >
    <span className="flex gap-0">
      {label.split("").map((char, idx) => (
        <span
          key={idx}
          className="transition-all duration-300 group-[.active-link]:text-primary"
          style={{ transitionDelay: `${idx * 30}ms` }}
        >
          {char}
        </span>
      ))}
    </span>
  </NavLink>
);

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // const user = true;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      text: "You will need to log in again to continue.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6C63FF",
      cancelButtonColor: "#FF6B6B",
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "Cancel",
      background: "#F8F9FA",
      color: "#2E2E2E",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            toast.success("Logged out successfully!");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Logout failed. Please try again.");
          });
      }
    });
  };
  const navLinks = (
    <>
      <li><FlipLink to="/" label="Home" /></li>
      <li><FlipLink to="/services" label="Services" /></li>
      
      {user && (
        <>
          <li><FlipLink to="/add-service" label="Add Service" /></li>
          <li><FlipLink to="/my-services" label="My Services" /></li>
          <li><FlipLink to="/my-reviews" label="My Reviews" /></li>
        </>
      )}
      {!user && (
        <>
          <li><FlipLink to="/about" label="About" /></li>
          <li><FlipLink to="/contact" label="Contact" /></li>
          <li><FlipLink to="/login" label="Login" /></li>
          <li><FlipLink to="/register" label="Register" /></li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow-md w-full mx-auto sticky top-0 z-50">
      <div className="navbar px-4  max-w-6xl mx-auto">
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>

          {/* Logo or App Name */}
          <Link
            to="/"
            className="text-2xl font-bold text-primary hidden sm:block"
          >
            Service<span className="text-secondary">Review</span>
          </Link>
          <Link to="/" className="text-2xl font-bold text-primary sm:hidden">
            S<span className="text-secondary">R</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border border-primary"
                />
              ) : (
                <FaUserCircle className="text-3xl text-neutral" />
              )}
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline btn-error"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
