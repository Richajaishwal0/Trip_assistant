
const Contact = () => {
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="card-title text-center mb-4">Contact Us</h2>
        <p className="card-text">
          We’d love to hear from you! Please reach out to us with any questions or feedback.
        </p>
        <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item">
            <strong>Email:</strong><br />
            support@tripassistant.com
          </li>
          <li className="list-group-item">
            <strong>Phone:</strong><br />
            +1-800-TRIP-HELP
          </li>
          <li className="list-group-item">
            <strong>Address:</strong><br />
            123 Travel Lane, Wanderlust City, WW 12345
          </li>
        </ul>
        <p className="card-text mt-3 text-muted">
          Our team responds within 24-48 hours. Last updated: August 24, 2025.
        </p>
      </div>
    </div>
  );
};

export default Contact;