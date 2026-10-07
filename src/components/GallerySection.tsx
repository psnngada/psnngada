import React, { useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GalleryItem } from '../data/clubData';

interface GallerySectionProps {
  gallery: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery }) => {
  const [filter, setFilter] = useState<string>('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['Semua', 'Pertandingan', 'Latihan', 'Pemain', 'Supporter'];

  const filteredGallery = filter === 'Semua'
    ? gallery
    : gallery.filter((item) => item.category === filter);

  const currentItem = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : filteredGallery.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex < filteredGallery.length - 1 ? lightboxIndex + 1 : 0);
    }
  };

  return (
    <section id="galeri" className="py-20 bg-zinc-900/40 border-t border-zinc-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-red-500 mb-2">
            MOMEN & DOKUMENTASI
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase">
            GALERI PSN NGADA
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-4 rounded-full" />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                filter === cat
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid or Empty State */}
        {filteredGallery.length === 0 ? (
          <div className="text-center py-16 px-4 bg-zinc-950/60 rounded-2xl border border-zinc-800 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-zinc-500" />
            </div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Belum Ada Foto Dokumentasi
            </h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
              Dokumentasi foto pertandingan, latihan, dan suporter PSN Ngada akan diunggah melalui Panel Kelola Data.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 cursor-pointer aspect-[4/3] shadow-lg hover:border-zinc-700 transition-all duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Caption Card */}
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="flex items-center justify-between text-xs text-zinc-300 mb-1">
                    <span className="text-red-400 font-bold uppercase">{item.category}</span>
                    <span className="text-zinc-400">{item.date}</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-white group-hover:text-red-400 transition-colors line-clamp-2">
                    {item.title}
                  </h4>

                  <div className="mt-2 flex items-center gap-1 text-[11px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5 text-red-500" />
                    <span>Klik untuk perbesar</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {currentItem && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Tutup Galeri"
              className="absolute top-4 right-4 z-10 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Lightbox Image Viewport */}
            <div className="relative aspect-video max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={currentItem.imageUrl}
                alt={currentItem.title}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                aria-label="Foto Sebelumnya"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Foto Selanjutnya"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Information Bar */}
            <div className="p-5 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1">
                  <span className="text-red-400 font-bold uppercase">{currentItem.category}</span>
                  <span>·</span>
                  <span>{currentItem.date}</span>
                </div>
                <h3 className="font-display font-bold text-base text-white">
                  {currentItem.title}
                </h3>
                <p className="text-xs text-zinc-300 mt-1">{currentItem.caption}</p>
              </div>

              <div className="text-xs text-zinc-500 font-mono-nums whitespace-nowrap self-end sm:self-center">
                {lightboxIndex !== null ? lightboxIndex + 1 : 1} / {filteredGallery.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
