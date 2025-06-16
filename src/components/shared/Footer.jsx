import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content p-10 ">
      <div className="footer max-w-6xl mx-auto grid md:grid-cols-3 px-4">
        <aside>
          <Link to="/" className="text-2xl font-bold text-primary">ServiceReview</Link>
          <p>
            A simple and professional platform to <br /> add & review any service.
          </p>
        </aside>
        <div>
          <h6 className="footer-title">Quick Links</h6>
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="/services" className="link link-hover">Services</Link>
          <Link to="/" className="link link-hover">Facebook</Link>
          <Link to="/" className="link link-hover">Linkdin</Link>
        </div>
        <div>
          <h6 className="footer-title">More</h6>
          <Link to="/add-service" className="link link-hover">Add Service</Link>
          <Link to="/my-services" className="link link-hover">My Services</Link>
          <Link to="/my-reviews" className="link link-hover">My Reviews</Link>
        </div>
      </div>
      <div className="text-center mt-8 text-sm text-muted">
        © {new Date().getFullYear()} ServiceReview. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
