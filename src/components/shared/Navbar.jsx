// src/components/shared/Navbar.jsx
import { Link, NavLink } from "react-router";
// import { useContext } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
import { FiLogIn, FiLogOut, FiUserPlus } from "react-icons/fi";

const Navbar = () => {
  // const { user, logout } = useContext(AuthContext);

  const user = true;

  const navLinks = (
    <>
      <NavLink to="/" className="btn btn-ghost text-lg">Home</NavLink>
      <NavLink to="/services" className="btn btn-ghost text-lg">Services</NavLink>
      {user && (
        <>
          <NavLink to="/add-service" className="btn btn-ghost text-lg">Add Service</NavLink>
          <NavLink to="/my-services" className="btn btn-ghost text-lg">My Services</NavLink>
          <NavLink to="/my-reviews" className="btn btn-ghost text-lg">My Reviews</NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-10">
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold text-primary">ServiceReview</Link>
      </div>

      <div className="navbar-center hidden md:flex gap-2">
        {navLinks}
      </div>

      <div className="navbar-end space-x-2">
        {user ? (
          <>
            <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
              <img
                src={user.photoURL || "/avatar.png"}
                className="w-10 h-10 rounded-full border-2 border-primary"
                alt="User Avatar"
              />
            </div>
            <button  className="btn btn-sm btn-outline btn-error">
              <FiLogOut className="mr-1" /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-outline btn-primary">
              <FiLogIn className="mr-1" /> Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-outline btn-secondary">
              <FiUserPlus className="mr-1" /> Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
