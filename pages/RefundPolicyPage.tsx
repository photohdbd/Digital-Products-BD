import React from 'react';

const RefundPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-8">Refund Policy</h1>
      <div className="prose prose-lg text-gray-300 space-y-4 prose-headings:text-white prose-strong:text-white">
        <p>Thank you for shopping at DigiBD.</p>
        <p>If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns.</p>
        
        <h2 className="text-2xl text-white">General Policy</h2>
        <p>
          Due to the digital nature of our products (software licenses, subscriptions, gift cards, etc.), all sales are final once the product has been delivered to you via email. We do not offer refunds or exchanges for digital products if you change your mind or purchase the wrong product.
        </p>
        <p>
          We strongly encourage you to review the product descriptions and ensure compatibility with your system before making a purchase. If you have any questions, please contact our support team before you buy.
        </p>
        
        <h2 className="text-2xl text-white">Conditions for Refunds</h2>
        <p>
          Refunds will only be considered under the following exceptional circumstances:
        </p>
        <ul>
          <li>If the product key or account details provided are invalid and we are unable to provide a functional replacement within a reasonable time.</li>
          <li>In the case of a verified duplicate purchase of the exact same product.</li>
        </ul>
        <p>
          To be eligible for a refund under these conditions, you must contact us within 24 hours of your purchase with your order details and clear evidence of the issue (e.g., screenshots). Each case will be reviewed individually by our support team.
        </p>

        <h2 className="text-2xl text-white">Contact Us</h2>
        <p>If you have any questions about our Returns and Refunds Policy, please contact us.</p>
      </div>
    </div>
  );
};

export default RefundPolicyPage;