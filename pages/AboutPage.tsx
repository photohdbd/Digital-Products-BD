import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">About Digi<span className="text-primary">BD</span></h1>
        <p className="mt-4 text-xl text-gray-300">Your Trusted Partner for Digital Goods in Bangladesh</p>
      </div>

      <div className="mt-16 max-w-4xl mx-auto bg-base-200 p-8 md:p-12 rounded-2xl shadow-lifted border border-base-300">
        <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
          <p>
            Welcome to DigiBD, the premier destination for digital products tailored for the Bangladeshi market. We understand the growing need for reliable and accessible digital tools, subscriptions, and licenses. Our mission is to bridge the gap, providing authentic digital goods with fast, secure, and convenient service.
          </p>
          <p>
            We specialize in a wide range of products, including software licenses, educational tool subscriptions, VPNs, marketing tools, and popular gift cards. Our platform is designed to be user-friendly, ensuring a smooth purchasing experience from start to finish.
          </p>
          <div className="border-l-4 border-primary pl-6">
            <h3 className="text-2xl font-semibold text-white mb-2">Our Commitment</h3>
            <p>
              We are committed to three core principles: <strong>Authenticity</strong>, <strong>Speed</strong>, and <strong>Security</strong>. Every product we sell is guaranteed to be authentic. We pride ourselves on our fast digital delivery system, and we ensure every transaction is secure.
            </p>
          </div>
          <p>
            Our team consists of tech enthusiasts passionate about helping Bangladeshis thrive in the digital world. We are dedicated to providing excellent customer support and curating a selection of the best digital products available.
          </p>
          <p>
            Thank you for choosing DigiBD. We look forward to serving you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;