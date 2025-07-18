import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContexts/AuthContexts";
// import axios from "axios";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddService = async (e) => {
    e.preventDefault();
    const form = e.target;

    const service = {
      image: form.image.value,
      title: form.title.value,
      company: form.company.value,
      website: form.website.value,
      description: form.description.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      date: new Date(),
      userEmail: user?.email,
    };

    try {
      setLoading(true);
      const res = await fetch(
        "https://service-review-server-blush-nine.vercel.app/services",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(service),
        }
      );
      const data = await res.json();
      if (data.insertedId) {
        toast.success("Service added successfully!");
        form.reset();
        navigate("/my-services");
      } else {
        toast.error("Failed to add service.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding service.");
    } finally {
      setLoading(false);
    }

    // axios.post('https://service-review-server-blush-nine.vercel.app/services', service)
    // .then( res => {
    //     console.log(res.data)
    // })
    // .catch(error => {
    //     console.log(error)
    // })
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-base-100 rounded-xl shadow-xl mt-10">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">
        Add New Service
      </h2>
      <form onSubmit={handleAddService} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <input
            name="image"
            type="url"
            placeholder="Service Image URL"
            className="input input-bordered w-full"
            required
          />
          <input
            name="title"
            type="text"
            placeholder="Service Title"
            className="input input-bordered w-full"
            required
          />
          <input
            name="company"
            type="text"
            placeholder="Company Name"
            className="input input-bordered w-full"
            required
          />
          <input
            name="website"
            type="url"
            placeholder="Company Website"
            className="input input-bordered w-full"
            required
          />
          {/* <input
            name="category"
            type="text"
            placeholder="Category (e.g., IT, Food)"
            className="input input-bordered w-full"
            required
          /> */}
          <select
            name="category"
            // defaultValue="Select a category"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select a category</option>
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
          <input
            name="price"
            type="number"
            step="0.01"
            placeholder="Price (USD)"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="w-full">
          <textarea
            name="description"
            className="textarea textarea-bordered md:col-span-2 w-full"
            placeholder="Description"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <input
            type="text"
            className="input input-bordered w-full"
            value={user?.email || ""}
            readOnly
          />
          <input
            type="text"
            className="input input-bordered w-full"
            value={new Date().toLocaleDateString()}
            readOnly
          />
        </div>

        <input
          type="submit"
          value={loading ? "Adding..." : "Add Service"}
          className="btn btn-primary md:col-span-2 w-full"
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default AddService;
