import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      <div className="prose prose-lg text-gray-300 space-y-4 prose-headings:text-white prose-strong:text-white">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>
          DigiBD ("us", "we", or "our") operates the DigiBD website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </p>
        
        <h2 className="text-2xl text-white">Information Collection and Use</h2>
        <p>
          We collect several different types of information for various purposes to provide and improve our Service to you. This includes your Full Name, Email, and Mobile Number for order processing and account management.
        </p>
        
        <h2 className="text-2xl text-white">Use of Data</h2>
        <p>
          DigiBD uses the collected data for various purposes:
        </p>
        <ul>
          <li>To provide and maintain the Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To process your orders and manage your account</li>
          <li>To provide customer care and support</li>
          <li>To provide analysis or valuable information so that we can improve the Service</li>
        </ul>

        <h2 className="text-2xl text-white">Security of Data</h2>
        <p>
          The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </p>

        <h2 className="text-2xl text-white">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
        
        <h2 className="text-2xl text-white">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us via our contact page.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;