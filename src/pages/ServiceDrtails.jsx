import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContexts/AuthContexts";
import { auth } from "../firebase/firebase.init";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();

  // console.log(user);

  // useEffect(() => {
  //   fetch(`https://service-review-server-blush-nine.vercel.app/services/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setService(data));

  //   fetch(`https://service-review-server-blush-nine.vercel.app/reviews/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setReviews(data));
  // }, [id]);

  useEffect(() => {
    // if (loading || !user) return;

    if (loading) return; // wait for loading to finish

    if (!user) {
      // Redirect to login page if not logged in
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      const token = await auth.currentUser?.getIdToken();

      try {
        // Fetch service (if protected, add token)
        const serviceRes = await fetch(
          `https://service-review-server-blush-nine.vercel.app/services/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const serviceData = await serviceRes.json();
        setService(serviceData);

        // Fetch reviews (if protected, add token)
        const reviewRes = await fetch(
          `https://service-review-server-blush-nine.vercel.app/reviews/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const reviewData = await reviewRes.json();
        setReviews(reviewData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [id, user, loading]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to post a review");
      return;
    }

    const newReview = {
      serviceId: id,
      serviceTitle: service.title,
      userName: user.displayName,
      userPhoto: user.photoURL,
      userEmail: user.email,
      text: reviewText,
      rating,
      date: new Date().toISOString(),
    };

    fetch("https://service-review-server-blush-nine.vercel.app/reviews", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Review added successfully");
          setReviews([...reviews, newReview]);
          setReviewText("");
          setRating(0);
        }
      });
  };

  if (!service) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-80 object-cover rounded-lg"
        />
        <h2 className="text-3xl font-bold text-primary mt-4">
          {service.title}
        </h2>
        <p className="text-sm text-gray-500 mb-2">
          Category: {service.category}
        </p>
        <p className="text-lg font-semibold">Price: ${service.price}</p>
        <p className="mt-2 text-gray-500">{service.description}</p>
        <p className="text-sm mt-2">Company: {service.company}</p>
        <p className="text-sm">
          Website:{" "}
          <a href={service.website} className="text-blue-500 underline">
            {service.website}
          </a>
        </p>
        <p className="text-sm">Added By: {service.userEmail}</p>
        <p className="text-sm">
          Date: {new Date(service.date).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-primary mb-4">
          Reviews ({reviews.length})
        </h3>
        <div className="space-y-4 mb-10">
          {reviews.map((rev, idx) => (
            <div key={idx} className="p-4 border border-base-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={rev.userPhoto}
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{rev.userName}</p>
                  <p className="text-xs text-gray-500">{rev.date}</p>
                </div>
              </div>
              <p className="text-sm mb-1">{rev.text}</p>
              <Rating
                readonly
                initialRating={rev.rating}
                emptySymbol={<FaRegStar className="text-yellow-400" />}
                fullSymbol={<FaStar className="text-yellow-500" />}
              />
            </div>
          ))}
        </div>

        <div className="p-6 bg-base-100 border border-base-200 rounded-lg">
          <h4 className="text-xl font-bold mb-4">Add a Review</h4>
          <form onSubmit={handleReviewSubmit}>
            <textarea
              className="textarea textarea-bordered w-full mb-4"
              placeholder="Write your review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            ></textarea>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-medium">Your Rating:</span>
              <Rating
                initialRating={rating}
                emptySymbol={<FaRegStar className="text-2xl text-yellow-400" />}
                fullSymbol={<FaStar className="text-2xl text-yellow-500" />}
                onChange={(rate) => setRating(rate)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
