import { Link } from "react-router";

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: "Why Customer Reviews Drive Service Quality",
      desc: "Discover how honest user feedback helps businesses grow and customers make smarter decisions.",
      image:
        "https://img.freepik.com/free-photo/customer-experience-positive-feedback-user-rating-online-evaluation-form-businessman-pressing-virtual-screen_616485-23.jpg", // use your own if needed
    },
    {
      id: 2,
      title: "Top 5 IT Services That Are Changing the Game",
      desc: "Explore the most innovative IT services getting high user ratings in 2025.",
      image:
        "https://img.freepik.com/free-photo/it-professional-working-modern-office-with-multiple-computer-screens_482257-43775.jpg",
    },
    {
      id: 3,
      title: "How to Choose the Right Service Provider",
      desc: "Tips and tricks on selecting reliable services using our platform's reviews and ratings.",
      image:
        "https://img.freepik.com/free-photo/business-people-meeting_53876-101882.jpg",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-base-content">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 text-center">
        Latest from Our Blog
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="card shadow-md bg-base-100 hover:shadow-xl transition"
          >
            <figure>
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-600">{blog.desc}</p>
              <div className="mt-4">
                <Link
                  to="/blog"
                  className="text-primary font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
