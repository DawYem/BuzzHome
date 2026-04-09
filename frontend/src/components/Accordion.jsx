import { useState } from 'react';

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-150"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-navy text-sm sm:text-base pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-gold-bright shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items, allowMultiple = false }) {
  const [openIndices, setOpenIndices] = useState(new Set());

  function toggle(index) {
    setOpenIndices((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          question={item.question}
          answer={item.answer}
          isOpen={openIndices.has(i)}
          onToggle={() => toggle(i)}
        />
      ))}
    </div>
  );
}
