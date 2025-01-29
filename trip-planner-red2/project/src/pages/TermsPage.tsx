import React from 'react';

export function TermsPage() {
  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing or using Wanderlust's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Use License</h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily access and use our services for personal, non-commercial purposes. This license does not include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Modifying or copying our materials</li>
              <li>Using materials for commercial purposes</li>
              <li>Attempting to reverse engineer our software</li>
              <li>Removing any copyright or proprietary notations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts</h2>
            <p className="text-gray-600 mb-4">
              When creating an account, you must provide accurate and complete information. You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking and Payments</h2>
            <p className="text-gray-600 mb-4">
              When making a booking through our platform:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>All payments must be made in full at time of booking</li>
              <li>Cancellation policies vary by service provider</li>
              <li>We are not responsible for service provider changes</li>
              <li>Refunds are subject to provider policies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              Wanderlust shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Use or inability to use our services</li>
              <li>Third-party provider services</li>
              <li>Unauthorized access to your data</li>
              <li>Service interruptions or errors</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of these changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-4">
              Questions about the Terms of Service should be sent to:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">
                Email: legal@wanderlust.com<br />
                Phone: +1 (555) 123-4567<br />
                Address: 123 Travel Street, Adventure City, AC 12345
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}