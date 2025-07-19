import React from 'react';

export default function TermsAndConditions() {
  const Section = ({ title, children }) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-green-700 mb-2 border-b border-gray-300 pb-1">{title}</h2>
      <p className="text-gray-700 text-sm leading-relaxed">{children}</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-900 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">Terms and Conditions</h1>
      <p className="text-center text-sm text-gray-500 mb-10">
        Effective Date: 7/12/2025 · Last Updated: 7/12/2025
      </p>

      <p className="mb-8 text-sm text-gray-700">
        Welcome to <span className="font-semibold">RecallKing™</span> (“we,” “our,” or “us”). These Terms and Conditions (“Terms”) govern your access to and use of the RecallKing™ mobile application, website, and services (collectively, the “Service”). Please read these Terms carefully before using our Service.
        <br /><br />
        By accessing or using RecallKing™, you agree to be bound by these Terms. If you do not agree, you may not use the Service.
      </p>

      <Section title="1. Eligibility">
        You must be at least 18 years old or the age of majority in your jurisdiction to use the Service. By using the Service, you represent and warrant that you meet these requirements.
      </Section>

      <Section title="2. Description of Service">
        RecallKing™ provides notifications and information about product recalls based on your preferences and/or scanned products. The information provided through the Service is sourced from publicly available government and third-party databases and is for informational purposes only.
      </Section>

      <Section title="3. Account Registration">
        We may allow you to use the Service without creating an account or require you to register for an account. When registering, you agree to provide accurate, complete, and up-to-date information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
      </Section>

      <Section title="4. Privacy">
        We respect your privacy. Please refer to our Privacy Policy on the application to understand how we collect, use, and protect your personal information.
      </Section>

      <Section title="5. Acceptable Use">
        You agree to use the Service only for lawful purposes. You may not:
        <ul className="list-disc ml-6 mt-2">
          <li>Use the Service for any illegal or unauthorized purpose;</li>
          <li>Attempt to gain unauthorized access to the Service or other users’ accounts;</li>
          <li>Interfere with or disrupt the operation of the Service;</li>
          <li>Scrape, crawl, or otherwise extract data from the Service without our permission.</li>
        </ul>
      </Section>

      <Section title="6. Intellectual Property">
        All content, trademarks, logos, and intellectual property on the Service are owned by or licensed to RecallKing™. You may not reproduce, distribute, or create derivative works without our express written consent.
      </Section>

      <Section title="7. Disclaimers">
        The Service and the information provided are offered “as is” and “as available” without warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or timeliness of the recall information provided. You use the Service at your own risk.
      </Section>

      <Section title="8. Limitation of Liability">
        To the maximum extent permitted by law, RecallKing™ and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising from your use of or inability to use the Service.
      </Section>

      <Section title="9. Third-Party Links">
        The Service may include links to third-party websites or resources. We are not responsible for the content or practices of any third parties.
      </Section>

      <Section title="10. Termination">
        We reserve the right to suspend or terminate your access to the Service at any time and without notice if you violate these Terms or engage in conduct that we deem harmful to the Service or other users.
      </Section>

      <Section title="11. Changes to Terms">
        We may update these Terms from time to time. We will notify you of significant changes by posting a notice on our Service or by other appropriate means. Your continued use of the Service after changes take effect constitutes acceptance of the updated Terms.
      </Section>

      <Section title="12. Governing Law">
        These Terms are governed by and construed in accordance with the laws of the State of Florida, USA, without regard to its conflict of laws principles.
      </Section>

      <Section title="13. Contact Us">
        If you have any questions about these Terms, please contact us at:
        <br />📧 Email: <a href="mailto:therecallking@gmail.com" className="text-green-700 underline">therecallking@gmail.com</a>
        <br />📍 Address: 16931 93rd Road North, Loxahatchee, Florida 33470, USA
      </Section>

      <p className="text-sm text-gray-600 mt-10">
        By using RecallKing™, you acknowledge that you have read, understood, and agreed to these Terms.
      </p>
    </div>
  );
}