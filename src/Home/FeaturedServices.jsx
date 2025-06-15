import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";    //.... use framer-motion here 😊😊

const FeaturedServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/services?limit=6")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <section className="my-16 px-4 md:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
        Featured Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-base-100 shadow-xl rounded-lg overflow-hidden"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-base-content mb-3">
                {service.description.length > 100
                  ? service.description.slice(0, 100) + "..."
                  : service.description}
              </p>
              <p className="font-bold text-secondary mb-3">
                Price: ${service.price}
              </p>
              <Link to={`/service/${service._id}`} className="btn btn-primary">
                See Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedServices;
