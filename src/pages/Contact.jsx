const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-base-content">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Contact Us</h2>
      <p className="mb-6 text-lg">Have questions, feedback, or partnership inquiries? We’d love to hear from you!</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p className="mb-4">support@servicehub.com</p>

          <h3 className="text-xl font-semibold mb-2">Phone</h3>
          <p className="mb-4">+880-1701-593102</p>

          <h3 className="text-xl font-semibold mb-2">Location</h3>
          <p>Dinajpur, Bangladesh</p>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            required
          />
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Your Message"
            rows="4"
            required
          ></textarea>
          <button className="btn btn-primary w-full">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
