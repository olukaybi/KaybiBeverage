'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-kayora-mist border-t border-kayora-mist">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-btn-${item.id}`;

        return (
          <div key={item.id} id={item.id}>
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  const next = isOpen ? null : item.id;
                  setOpenId(next);
                  if (next) track('faq_expand', { faq_id: item.id, question: item.question });
                }}
                className="w-full flex items-start justify-between gap-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 rounded-sm group"
              >
                <span className="font-sans font-semibold text-kayora-ink text-base leading-snug group-hover:text-kayora-blue-700 transition-colors">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`flex-shrink-0 mt-0.5 w-5 h-5 text-kayora-gold-500 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                >
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5"
            >
              <p className="text-kayora-graphite leading-relaxed max-w-[65ch]">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
