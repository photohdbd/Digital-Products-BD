
import React, { useState } from 'react';

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-base-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4"
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        <span className="text-accent text-2xl">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && <div className="pb-4 text-gray-300">{children}</div>}
    </div>
  );
};

const FAQPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h1>
      <div className="bg-base-200 p-8 rounded-2xl shadow-3d">
        <FaqItem question="How will I receive my product after purchase?">
          <p>
            All our products are delivered digitally. After your payment is confirmed, you will receive an email containing your product details, such as license keys, account information, or download links. This is usually done within 5-30 minutes of payment confirmation.
          </p>
        </FaqItem>
        <FaqItem question="What payment methods do you accept?">
          <p>
            We accept payments through popular mobile financial services in Bangladesh, including bKash, Nagad, and Rocket. We also accept bank transfers. All payment details are provided on the checkout page.
          </p>
        </FaqItem>
        <FaqItem question="Are the products you sell authentic?">
          <p>
            Yes, absolutely. We guarantee that all our products, including software licenses, subscriptions, and gift cards, are 100% authentic and sourced from official distributors.
          </p>
        </FaqItem>
        <FaqItem question="What is your refund policy?">
          <p>
            Due to the digital nature of our products, all sales are generally final. However, if a product is not delivered or is not working as described, please contact our support team immediately. We will investigate the issue and provide a replacement or a refund if the issue cannot be resolved. Please see our full <a href="#/refund-policy" className="text-primary underline">Refund Policy</a> page for details.
          </p>
        </FaqItem>
        <FaqItem question="How can I contact customer support?">
          <p>
            You can reach our customer support team through the contact form on our <a href="#/contact" className="text-primary underline">Contact Us</a> page or by emailing us directly at support@digitalproductsbd.com. We are available from Saturday to Thursday, 10 AM to 8 PM.
          </p>
        </FaqItem>
      </div>
    </div>
  );
};

export default FAQPage;
