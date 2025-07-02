import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion"; //.... use framer-motion here 😊😊
import axios from "axios";
import { toast } from "react-toastify";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [sortOption, setSortOption] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          "https://service-review-server-blush-nine.vercel.app/services"
        );
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

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://service-review-server-blush-nine.vercel.app/services?search=${searchTerm}`
      );
      setServices(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to search services");
    }
    setSortOption("");
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    try {
      const res = await axios.get(
        `https://service-review-server-blush-nine.vercel.app/services?category=${category}`
      );
      setServices(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to filter services");
    }
    setSortOption("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-10">
        All Services
      </h2>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {/* search */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Search by title, category, company..."
            className="input input-bordered w-full max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* filter */}
        <div className="mb-6">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">Filter by Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="IT">IT</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Finance">Finance</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Travel">Travel</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* sort */}
<div className="mb-6">
  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)} // 🔧 ADDED
    className="select select-bordered w-full max-w-xs"
  >
    <option value="">Sort by</option>
    <option value="priceAsc">Price: Low to High</option>
    <option value="priceDesc">Price: High to Low</option>
    <option value="titleAsc">Title: A-Z</option>
    <option value="titleDesc">Title: Z-A</option>
  </select>
</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...services]
  .sort((a, b) => {
    if (sortOption === "priceAsc") return a.price - b.price;
    if (sortOption === "priceDesc") return b.price - a.price;
    if (sortOption === "titleAsc")
      return a.title.localeCompare(b.title);
    if (sortOption === "titleDesc")
      return b.title.localeCompare(a.title);
    return 0;
  })
  .map((service) => (
          <motion.div
            key={service._id}
            className="card bg-base-100 shadow-xl border border-base-200"
            whileHover={{ scale: 1.05 }}
          >
            <figure>
              <img
                src={service.image}
                alt={service.title}
                className="h-52 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold text-primary">
                {service.title}
              </h2>
              <p className="text-sm text-base-content">
                {service.description.slice(0, 100)}...
              </p>
              <p className="text-sm">
                Category:{" "}
                <span className="font-medium text-secondary">
                  {service.category}
                </span>
              </p>
              <p className="text-sm">
                Price: <span className="font-medium">${service.price}</span>
              </p>
              <div className="card-actions justify-end">
                <Link
                  to={`/service/${service._id}`}
                  className="btn btn-sm btn-primary"
                >
                  See Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;
