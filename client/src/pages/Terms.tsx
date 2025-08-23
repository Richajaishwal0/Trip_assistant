import React from "react";

const Terms = () => {
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="card-title text-center mb-4">Terms and Conditions</h2>
        <p className="card-text">
          Welcome to Trip_assistant! By using our app, you agree to the following terms:
        </p>
        <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item">
            <strong>1. Acceptance of Terms</strong><br />
            By accessing or using Trip_assistant, you agree to be bound by these Terms and Conditions.
          </li>
          <li className="list-group-item">
            <strong>2. Use of Service</strong><br />
            You may use Trip_assistant for personal, non-commercial purposes only.
          </li>
          <li className="list-group-item">
            <strong>3. Privacy</strong><br />
            We collect and use your information in accordance with our Privacy Policy.
          </li>
          <li className="list-group-item">
            <strong>4. Limitation of Liability</strong><br />
            Trip_assistant is provided "as is" without warranties of any kind.
          </li>
        </ul>
        <p className="card-text mt-3 text-muted">
          For the latest updates, please check back periodically. Last updated: August 24, 2025.
        </p>
      </div>
    </div>
  );
};

export default Terms;