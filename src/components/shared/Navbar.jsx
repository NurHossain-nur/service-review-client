import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContexts/AuthContexts";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // const user = true;

  const handleLogout = () => {
  Swal.fire({
    title: 'Are you sure you want to log out?',
    text: "You will need to log in again to continue.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#6C63FF', 
    cancelButtonColor: '#FF6B6B', 
    confirmButtonText: 'Yes, log me out!',
    cancelButtonText: 'Cancel',
    background: '#F8F9FA', 
    color: '#2E2E2E', 
  }).then((result) => {
    if (result.isConfirmed) {
      logOut()
        .then(() => {
          toast.success('Logged out successfully!');
        })
        .catch((error) => {
          console.log(error);
          toast.error('Logout failed. Please try again.');
        });
    }
  });
};
  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="font-semibold">Home</NavLink>
      </li>
      <li>
        <NavLink to="/services" className="font-semibold">Services</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/add-service" className="font-semibold">Add Service</NavLink>
          </li>
          <li>
            <NavLink to="/my-services" className="font-semibold">My Services</NavLink>
          </li>
          <li>
            <NavLink to="/my-reviews" className="font-semibold">My Reviews</NavLink>
          </li>
        </>
      )}
      {!user && (
        <>
          <li>
            <NavLink to="/login" className="font-semibold">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register" className="font-semibold">Register</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 max-w-6xl mx-auto">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
        <Link to="/" className="text-2xl font-bold text-primary">
          ServiceHub
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
            <button onClick={handleLogout} className="btn btn-sm btn-outline btn-error">
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
