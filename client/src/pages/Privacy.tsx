const Privacy = () => {
  return (
    <div className="full-width-container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="card-title text-center mb-4">Privacy Policy</h2>
        <p className="card-text">
          At Trip_assistant, we value your privacy. This Privacy Policy explains how we collect, use, and protect your information:
        </p>
        <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item">
            <strong>1. Data Collection</strong><br />
            We collect your email and trip preferences to personalize your experience.
          </li>
          <li className="list-group-item">
            <strong>2. Data Usage</strong><br />
            Your data is used solely to enhance our services and is not shared with third parties.
          </li>
          <li className="list-group-item">
            <strong>3. Data Security</strong><br />
            We implement measures to protect your information from unauthorized access.
          </li>
          <li className="list-group-item">
            <strong>4. Your Rights</strong><br />
            You can request access to or deletion of your data by contacting us.
          </li>
        </ul>
        <p className="card-text mt-3 text-muted">
          For the latest updates, please check back periodically. Last updated: August 25, 2025.
        </p>
      </div>
      <style jsx>{`
        .full-width-container {
          width: 100%;
          padding: 0 15px;
          background-color: #ffffff;
          color: #333333;
        }

        .dark-mode .full-width-container {
          background-color: #232946;
          color: #ffffff;
        }

        .card {
          background-color: #ffffff;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .dark-mode .card {
          background-color: #232946;
          color: #ffffff;
          border: 1px solid #444444;
        }

        .list-group-item {
          background-color: #ffffff;
          border-color: #ddd;
        }

        .dark-mode .list-group-item {
          background-color: #232946;
          color: #ffffff;
          border-color: #444444;
        }

        .card-text.text-muted {
          color: #6c757d;
        }

        .dark-mode .card-text.text-muted {
          color: #aaaaaa !important;
        }

        /* Ensure full-width content */
        @media (min-width: 576px) {
          .full-width-container {
            padding: 0 30px;
          }
        }
        @media (min-width: 768px) {
          .full-width-container {
            padding: 0 50px;
          }
        }
        @media (min-width: 992px) {
          .full-width-container {
            padding: 0 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default Privacy;
