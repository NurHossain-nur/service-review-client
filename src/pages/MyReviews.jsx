import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
// import { Rating } from "@smastrom/react-rating";
import Rating from "react-rating";
// import "@smastrom/react-rating/style.css";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContexts/AuthContexts";

import { FaStar, FaRegStar } from "react-icons/fa";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  const [editReview, setEditReview] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/reviews?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          setReviews(res.data);
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
          .delete(`http://localhost:5000/reviews/${id}`, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          })
          .then(() => {
            setReviews(reviews.filter((r) => r._id !== id));
            Swal.fire("Deleted!", "Your review has been deleted.", "success");
          });
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;
    const rating = form.rating.value;

    axios
      .patch(
        `http://localhost:5000/reviews/${editReview._id}`,
        {
          review,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then(() => {
        Swal.fire("Updated!", "Your review has been updated.", "success");
        setEditReview(null);
        axios(`http://localhost:5000/reviews?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }).then((res) => {
          setReviews(res.data);
        });
      });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">My Reviews</h2>
      <div className="space-y-6">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-base-100 p-4 rounded-xl shadow-md border border-base-300"
          >
            <h3 className="text-lg font-semibold">Service: {r.serviceTitle}</h3>
            <p className="my-2">{r.text}</p>
            <Rating
              readonly
              initialRating={r.rating}
              emptySymbol={<FaRegStar className="text-2xl text-yellow-400" />}
              fullSymbol={<FaStar className="text-2xl text-yellow-500" />}
              // onChange={(rate) => setRating(rate)}

              // style={{ maxWidth: 100 }}
              // value={parseFloat(r.rating)}
            />
            {/* <p>{r.rating}</p> */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setEditReview(r)}
                className="btn btn-sm btn-outline btn-primary"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(r._id)}
                className="btn btn-sm btn-outline btn-error"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editReview && (
        <dialog id="edit_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Update Review</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-medium">Service Title</label>
                <input
                  type="text"
                  name="serviceTitle"
                  defaultValue={editReview.serviceTitle}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Review</label>
                <textarea
                  name="review"
                  defaultValue={editReview.text}
                  required
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
              <div>
                <label className="block font-medium">Rating</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.5"
                  defaultValue={editReview.rating}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditReview(null)}
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

export default MyReviews;
