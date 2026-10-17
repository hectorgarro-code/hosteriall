'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { galleryData } from '@/data/gallery';

interface RoomGalleryProps {
  images: string[];
  roomName: string;
}

export function RoomGallery({ images, roomName }: RoomGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <div>
      {/* Imagen Principal con contador */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/10',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '1rem',
          backgroundColor: 'var(--color-sand-100)',
        }}
      >
        <Image
          src={images[selectedIdx] || images[0]}
          alt={galleryData.find(photo => photo.src === images[selectedIdx])?.alt || `${roomName} - Foto ${selectedIdx + 1}`}
          fill
          preload
          sizes="(max-width: 768px) 100vw, 65vw"
          style={{ objectFit: 'contain' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            backgroundColor: 'rgba(8, 30, 43, 0.75)',
            color: 'var(--color-white)',
            fontSize: '0.82rem',
            fontWeight: 600,
            padding: '0.3rem 0.75rem',
            borderRadius: 'var(--radius-pill)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {selectedIdx + 1} / {images.length}
        </div>
      </div>

      {/* Miniaturas */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${images.length}, 1fr)`,
          gap: '0.75rem',
        }}
      >
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            style={{
              position: 'relative',
              aspectRatio: '4/3',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              cursor: 'pointer',
              border: selectedIdx === idx ? '2px solid var(--color-ocean-600)' : '2px solid transparent',
              padding: 0,
              backgroundColor: 'transparent',
              opacity: selectedIdx === idx ? 1 : 0.75,
              transition: 'opacity var(--transition-fast), border-color var(--transition-fast)',
            }}
            aria-label={`Ver foto ${idx + 1}`}
            aria-pressed={selectedIdx === idx}
          >
            <Image
              src={img}
              alt={`${roomName} miniatura ${idx + 1}`}
              fill
              sizes="120px"
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
