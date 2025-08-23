const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="mb-4">We’d love to hear from you! Please reach out to us using the details below:</p>
      <ul className="space-y-2">
        <li><strong>Email:</strong> support@tripassistant.com</li>
        <li><strong>Phone:</strong> +1-800-555-0123</li>
        <li><strong>Address:</strong> 123 Travel Lane, Wanderlust City</li>
      </ul>
      <p className="mt-4 text-gray-500">We aim to respond within 24 hours. Thank you!</p>
    </div>
  );
};

export default Contact;