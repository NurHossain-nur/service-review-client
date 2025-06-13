import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";     //.... use framer-motion here 😊😊

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/services");
        const data = await res.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">All Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div
            key={service._id}
            className="card bg-base-100 shadow-xl border border-base-200"
            whileHover={{ scale: 1.05 }}
          >
            <figure>
              <img src={service.image} alt={service.title} className="h-52 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold text-primary">{service.title}</h2>
              <p className="text-sm text-base-content">{service.description.slice(0, 100)}...</p>
              <p className="text-sm">Category: <span className="font-medium text-secondary">{service.category}</span></p>
              <p className="text-sm">Price: <span className="font-medium">${service.price}</span></p>
              <div className="card-actions justify-end">
                <Link to={`/service/${service._id}`} className="btn btn-sm btn-accent">See Details</Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;