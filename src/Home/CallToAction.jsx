import React from 'react';

const CallToAction = () => {
  return (
    <div className="my-16 py-10 bg-primary text-white text-center rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Got a Service to Share?</h2>
      <p className="mb-6 text-lg">Join our growing community and list your service today!</p>
      <a href="/add-service" className="btn btn-secondary">Add Your Service</a>
    </div>
  );
};

export default CallToAction;
