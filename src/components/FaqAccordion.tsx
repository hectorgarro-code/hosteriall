'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqsData } from '@/data/faqs';

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(faqsData[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {faqsData.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            style={{
              backgroundColor: 'var(--color-white)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xs)',
              transition: 'border-color var(--transition-fast)',
            }}
          >
            <button
              onClick={() => toggle(faq.id)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '1.02rem',
                color: isOpen ? 'var(--color-ocean-700)' : 'var(--color-petrol-primary)',
              }}
            >
              <span>{faq.question}</span>
              <ChevronDown
                size={20}
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform var(--transition-normal)',
                  color: 'var(--color-ocean-600)',
                  flexShrink: 0,
                }}
              />
            </button>

            {isOpen && (
              <div
                style={{
                  padding: '0 1.5rem 1.25rem 1.5rem',
                  fontSize: '0.94rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.65,
                  borderTop: '1px solid var(--color-sand-100)',
                  paddingTop: '0.85rem',
                }}
              >
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
