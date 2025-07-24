import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-6">
        Privacy Policy
      </h1>
      <p className="text-sm text-center text-gray-500 mb-10">
        Effective Date: 6/24/2025 | Last Updated: 6/15/2025
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Introduction</h2>
        <p>
          Recall King (“we”, “us”, or “our”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Personal Information:</strong> Name, email address, and location (if you allow location access).</li>
          <li><strong>Usage Data:</strong> Interactions with the app, device information, crash logs.</li>
          <li><strong>Location Data:</strong> GPS data to tailor recall alerts to your region.</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide personalized recall alerts and notifications</li>
          <li>Improve app performance and user experience</li>
          <li>Send safety updates and critical recall information</li>
          <li>Communicate with you (e.g., for support or feature updates)</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Data Sources</h2>
        <p>
          Recall King relies on publicly available government APIs and databases (such as FDA.gov, Recalls.gov, etc.) to deliver up-to-date recall information. We do not guarantee the accuracy or completeness of data from these third-party sources.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Data Sharing</h2>
        <p>We do not sell or rent your personal information. We may share data with:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Service providers (e.g., analytics tools) under strict confidentiality</li>
          <li>Law enforcement or regulators if required by law</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Security</h2>
        <p>
          We use reasonable administrative, technical, and physical safeguards to protect your personal data. However, no system is 100% secure.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Your Rights</h2>
        <p>Depending on your location, you may have rights to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access or update your data</li>
          <li>Request deletion</li>
          <li>Withdraw consent (e.g., stop location sharing)</li>
        </ul>
        <p className="mt-4">
          Email us at <a href="mailto:info@therecallking.com" className="text-blue-600 underline">info@therecallking.com</a> to make any such requests.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Children’s Privacy</h2>
        <p>
          Recall King is not intended for users under the age of 13. We do not knowingly collect data from children.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Contact</h2>
        <p>
          Questions? Email us at: <a href="mailto:info@therecallking.com" className="text-blue-600 underline">info@therecallking.com</a>
        </p>
      </section>
    </div>
  );
}
