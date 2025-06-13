import React from 'react';
import CountUp from "react-countup";

const PlatformStats = () => {
  return (
    <div className="my-16 bg-base-200 py-10 text-center">
      <h2 className="text-3xl font-bold mb-8">Trusted by Thousands</h2>
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <p className="text-5xl font-bold text-primary">
            <CountUp end={1200} duration={3} />+
          </p>
          <p className="text-lg font-medium mt-2">Happy Users</p>
        </div>
        <div>
          <p className="text-5xl font-bold text-secondary">
            <CountUp end={400} duration={3} />+
          </p>
          <p className="text-lg font-medium mt-2">Services Listed</p>
        </div>
        <div>
          <p className="text-5xl font-bold text-accent">
            <CountUp end={800} duration={3} />+
          </p>
          <p className="text-lg font-medium mt-2">Reviews Posted</p>
        </div>
      </div>
    </div>
  );
};

export default PlatformStats;
