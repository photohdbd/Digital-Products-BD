import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border-b border-base-300">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-4"
      >
        <span className="text-lg font-semibold text-gray-800">{title}</span>
        <svg
          className={`w-6 h-6 text-primary transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="py-4 text-gray-600 prose">{children}</div>
      </div>
    </div>
  );
};

interface AccordionProps {
    sections: { [key: string]: string | string[] };
}

const Accordion: React.FC<AccordionProps> = ({ sections }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-base-100 p-6 rounded-xl shadow-subtle border border-base-300">
            {Object.entries(sections).map(([title, content], index) => (
                <AccordionItem
                    key={index}
                    title={title}
                    isOpen={openIndex === index}
                    onClick={() => handleClick(index)}
                >
                    {Array.isArray(content) ? (
                        <ul>
                            {content.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    ) : (
                        <p>{content}</p>
                    )}
                </AccordionItem>
            ))}
        </div>
    );
}

export default Accordion;
