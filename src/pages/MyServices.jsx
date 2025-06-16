import { useContext, useEffect, useState } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContexts/AuthContexts";

const MyServices = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  //   console.log("Token in the context ", user.accessToken);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/my-services?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          setServices(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/services/${id}`, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          })
          .then(() => {
            setServices(services.filter((s) => s._id !== id));
            Swal.fire("Deleted!", "Your service has been deleted.", "success");
          });
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      title: form.title.value,
      company: form.company.value,
      website: form.website.value,
      description: form.description.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
    };

    axios
      .patch(`http://localhost:5000/services/${selectedService._id}`, updated, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then(() => {
        const updatedServices = services.map((s) =>
          s._id === selectedService._id ? { ...s, ...updated } : s
        );
        setServices(updatedServices);
        setSelectedService(null);
        Swal.fire("Updated!", "Service has been updated.", "success");
      });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">My Services</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>{service.title}</td>
                <td>{service.company}</td>
                <td>{service.category}</td>
                <td>${service.price}</td>
                <td>
                  <button
                    className="btn btn-xs btn-warning mr-2"
                    onClick={() => setSelectedService(service)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(service._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {selectedService && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Service</h3>
            <form onSubmit={handleUpdate} className="space-y-2">
              <input
                name="title"
                defaultValue={selectedService.title}
                className="input input-bordered w-full"
              />
              <input
                name="company"
                defaultValue={selectedService.company}
                className="input input-bordered w-full"
              />
              <input
                name="website"
                defaultValue={selectedService.website}
                className="input input-bordered w-full"
              />
              <input
                name="category"
                defaultValue={selectedService.category}
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="price"
                defaultValue={selectedService.price}
                className="input input-bordered w-full"
              />
              <textarea
                name="description"
                defaultValue={selectedService.description}
                className="textarea textarea-bordered w-full"
              ></textarea>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setSelectedService(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyServices;
