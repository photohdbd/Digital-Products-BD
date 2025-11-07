import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-8">Terms & Conditions</h1>
      <div className="prose prose-lg text-gray-300 space-y-4 prose-headings:text-white prose-strong:text-white">
        <p>Please read these terms and conditions carefully before using Our Service.</p>
        
        <h2 className="text-2xl text-white">Interpretation and Definitions</h2>
        <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>

        <h2 className="text-2xl text-white">Acknowledgment</h2>
        <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
        <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>

        <h2 className="text-2xl text-white">Placing Orders for Goods</h2>
        <p>By placing an Order for Goods through the Service, You warrant that You are legally capable of entering into binding contracts.</p>

        <h2 className="text-2xl text-white">Termination</h2>
        <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.</p>

        <h2 className="text-2xl text-white">Governing Law</h2>
        <p>The laws of Bangladesh, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>

        <h2 className="text-2xl text-white">Contact Us</h2>
        <p>If you have any questions about these Terms and Conditions, You can contact us.</p>
      </div>
    </div>
  );
};

export default TermsPage;