'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { galleryData } from '@/data/gallery';
import { GalleryPhoto } from '@/types';
import { trackEvent } from '@/lib/analytics';

export function GalleryGrid() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const filters = [
    { id: 'all', label: 'Todo' }, { id: 'habitaciones', label: 'Habitaciones' },
    { id: 'pileta', label: 'Pileta' }, { id: 'parque', label: 'Parque' },
    { id: 'desayuno', label: 'Desayuno' }, { id: 'espacios', label: 'Espacios' },
    { id: 'destino', label: 'La Lucila' },
  ];
  const photos = selectedFilter === 'all' ? galleryData : galleryData.filter(photo => photo.category === selectedFilter);

  useEffect(() => {
    if (!activePhoto) return;
    const previousOverflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      trigger.current?.focus();
    };
  }, [activePhoto]);

  return (
    <>
      <div className="gallery-filters" role="group" aria-label="Filtrar fotografías">
        {filters.map(filter => (
          <button key={filter.id} type="button" aria-pressed={selectedFilter === filter.id} onClick={() => setSelectedFilter(filter.id)} className="gallery-filter">{filter.label}</button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{photos.length} fotografías</p>
      <div className="photo-grid">
        {photos.map(photo => (
          <button key={photo.id} type="button" className="gallery-photo" aria-label={'Ampliar: ' + photo.title}
            onClick={event => {
              trigger.current = event.currentTarget;
              setActivePhoto(photo);
              trackEvent('gallery_view', { photo_id: photo.id });
            }}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
            <span className="gallery-caption"><span>{photo.title}</span><ZoomIn size={20} /></span>
          </button>
        ))}
      </div>
      {activePhoto && (
        <dialog ref={dialog} className="photo-dialog" aria-labelledby="photo-title"
          onClose={() => setActivePhoto(null)}
          onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
          <div className="photo-dialog-content">
            <button className="photo-close" type="button" aria-label="Cerrar fotografía" autoFocus onClick={() => dialog.current?.close()}><X size={22} /></button>
            <div className="photo-dialog-image">
              <Image src={activePhoto.src} alt={activePhoto.alt} fill sizes="(max-width: 1000px) 95vw, 1000px" style={{ objectFit: 'contain' }} />
            </div>
            <div className="photo-dialog-caption">
              <h2 id="photo-title">{activePhoto.title}</h2><p>{activePhoto.alt}</p>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
