import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="py-12 bg-base-100 text-base-content">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Why Choose Our Platform?</h2>
        <p className="text-muted mt-2">
          We're trusted by hundreds of users for quality and ease.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-12">
        <div className="p-6 bg-base-200 rounded-2xl shadow hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">Verified Services</h3>
          <p>
            All listed services go through a verification process to ensure
            reliability and trust.
          </p>
        </div>
        <div className="p-6 bg-base-200 rounded-2xl shadow hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">User Reviews</h3>
          <p>
            Real reviews from real users help you decide quickly and
            confidently.
          </p>
        </div>
        <div className="p-6 bg-base-200 rounded-2xl shadow hover:shadow-xl transition">
          <h3 className="text-xl font-semibold mb-2">Smart Filtering</h3>
          <p>
            Use powerful filtering tools to find exactly what you need—fast.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
