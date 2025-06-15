import CountUp from "react-countup";
import { useEffect, useState } from "react";
import axios from "axios";

const PlatformStats = () => {
  const [counts, setCounts] = useState({
    users: 0,
    services: 0,
    reviews: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:5000/stats")
      .then(res => {
        setCounts(res.data);
      })
      .catch(() => {
        console.error("Failed to load stats");
      });
  }, []);

  return (
    <div className="py-12 bg-base-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Platform Statistics</h2>
        <p className="text-base-content mt-2">Live platform metrics</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-base-100 p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Happy Users</h3>
          <CountUp end={counts.users} duration={2} className="text-4xl font-bold text-primary" />
        </div>
        <div className="bg-base-100 p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Services Listed</h3>
          <CountUp end={counts.services} duration={2} className="text-4xl font-bold text-secondary" />
        </div>
        <div className="bg-base-100 p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Reviews Posted</h3>
          <CountUp end={counts.reviews} duration={2} className="text-4xl font-bold text-accent" />
        </div>
      </div>
    </div>
  );
};

export default PlatformStats;
