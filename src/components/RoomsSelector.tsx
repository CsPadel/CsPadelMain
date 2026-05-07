import React, { useState } from 'react';
import { ArrowRight, Users, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  priceFrom: string;
  description: string;
  amenities: string[];
  images: string[];
  capacity: string;
}

const rooms: Room[] = [
  {
    id: 'suite',
    name: 'Personal Suite',
    tag: 'Most Popular',
    tagColor: 'bg-brand-gold text-brand-dark',
    priceFrom: '£120 / night',
    description:
      'Your private sanctuary within the estate. Designed for absolute focus and recovery — a curated space where performance meets tranquility.',
    amenities: ['King bed', 'En-suite bathroom', 'Pool access', 'Wellness kit', 'Concierge 24h'],
    images: ['/imagenes/154A8505.JPG', '/imagenes/154A8605.JPG', '/imagenes/154A8631.JPG'],
    capacity: '1 – 2 guests',
  },
  {
    id: 'villa',
    name: 'Full Villa',
    tag: 'Ultimate Privacy',
    tagColor: 'bg-white/10 text-white',
    priceFrom: '£200 / night',
    description:
      'Lock the entire estate exclusively for your inner circle. True luxury is never shared. Every court, pool, and table is yours alone.',
    amenities: ['Private courts', 'Full exclusivity', 'Private chef', 'Yacht access', 'Concierge team'],
    images: ['/imagenes/binifadet.jpeg', '/imagenes/IMG_2448.JPG', '/imagenes/154A8644.JPG'],
    capacity: '8 – 20 guests',
  },
  {
    id: 'executive',
    name: 'Executive Retreat',
    tag: 'C-Suite',
    tagColor: 'bg-white/10 text-white',
    priceFrom: '£100 / night',
    description:
      'Strategic clarity is best found away from the office. High-performance environment with absolute discretion, curated for decision-makers.',
    amenities: ['Private meeting room', 'Executive suite', 'Business concierge', 'Strategy sessions', 'Priority courts'],
    capacity: '2 – 6 executives',
    images: ['/imagenes/EM-22.jpg', '/imagenes/EM-4.jpg', '/imagenes/EM-38.jpg'],
  },
];

export default function RoomsSelector() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  const room = rooms[selectedIdx];

  const handleSelect = (idx: number) => {
    if (idx === selectedIdx) return;
    setSelectedIdx(idx);
    setActiveImage(0);
  };

  const prevImage = () => setActiveImage((p) => (p - 1 + room.images.length) % room.images.length);
  const nextImage = () => setActiveImage((p) => (p + 1) % room.images.length);

  return (
    <section
      id="rooms"
      aria-label="Accommodation options at CourtSide Menorca"
      className="bg-[#f7f5f2] py-24 md:py-32 px-4 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-3">
            Accommodation
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-brand-dark tracking-wide">
            Discover our rooms
          </h2>
          <p className="text-brand-dark/45 mt-4 text-lg max-w-md mx-auto">
            Connect, play, and unwind in our private suites.
          </p>
        </div>

        {/* Room type selector — pill tabs */}
        <div role="tablist" aria-label="Accommodation types" className="flex justify-center gap-3 mb-10 flex-wrap">
          {rooms.map((r, idx) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={selectedIdx === idx}
              aria-controls={`room-panel-${r.id}`}
              id={`room-tab-${r.id}`}
              onClick={() => handleSelect(idx)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium tracking-wide transition-colors duration-150 ${
                selectedIdx === idx
                  ? 'bg-brand-dark text-white shadow-lg shadow-brand-dark/20'
                  : 'bg-white text-brand-dark/60 hover:text-brand-dark border border-brand-dark/10 hover:border-brand-dark/30'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Main card — all rooms rendered, toggle visibility to avoid remount */}
        <div className="relative">
          {rooms.map((r, rIdx) => (
            <div
              key={r.id}
              role="tabpanel"
              id={`room-panel-${r.id}`}
              aria-labelledby={`room-tab-${r.id}`}
              aria-hidden={selectedIdx !== rIdx}
              className={`bg-white rounded-3xl overflow-hidden shadow-xl shadow-brand-dark/8 transition-opacity duration-200 ${
                selectedIdx === rIdx ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'
              }`}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image panel — all images stacked, CSS crossfade */}
                <div className="relative w-full lg:w-[55%] aspect-[4/3] lg:aspect-auto lg:min-h-[520px] overflow-hidden bg-brand-dark/10">
                  {r.images.map((img, iIdx) => (
                    <img
                      key={img}
                      src={img}
                      alt={`${r.name} — CourtSide Menorca`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 will-change-[opacity] ${
                        selectedIdx === rIdx && activeImage === iIdx ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading={rIdx === 0 && iIdx === 0 ? 'eager' : 'lazy'}
                      width={800}
                      height={600}
                    />
                  ))}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent pointer-events-none" />

                  {/* Tag badge */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide backdrop-blur-sm ${r.tagColor}`}>
                      <Sparkles className="w-3 h-3" />
                      {r.tag}
                    </span>
                  </div>

                  {/* Prev/Next arrows */}
                  {r.images.length > 1 && (
                    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-10 pointer-events-none">
                      <button
                        onClick={prevImage}
                        className="pointer-events-auto w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-150"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="pointer-events-auto w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-150"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Dot indicators */}
                  <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-1.5 z-10">
                    {r.images.map((img, iIdx) => (
                      <button
                        key={img}
                        onClick={() => setActiveImage(iIdx)}
                        className={`transition-all duration-150 rounded-full ${
                          selectedIdx === rIdx && activeImage === iIdx
                            ? 'w-5 h-1.5 bg-brand-gold'
                            : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                        }`}
                        aria-label={`${r.name} — photo ${iIdx + 1} of ${r.images.length}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Info panel */}
                <div className="flex flex-col justify-between p-8 md:p-10 lg:p-12 w-full lg:w-[45%]">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-light text-brand-dark leading-tight">
                          {r.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <Users className="w-3.5 h-3.5 text-brand-gold/70" />
                          <span className="text-xs text-brand-dark/50 uppercase tracking-widest">
                            {r.capacity}
                          </span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-brand-dark/40 uppercase tracking-widest mb-1">From</p>
                        <p className="text-xl font-semibold text-brand-dark">{r.priceFrom}</p>
                      </div>
                    </div>

                    <div className="h-px bg-brand-dark/8 mb-6" />

                    <p className="text-brand-dark/60 text-base leading-relaxed mb-8">
                      {r.description}
                    </p>

                    <div className="mb-8">
                      <p className="text-xs uppercase tracking-[0.2em] text-brand-dark/35 mb-4 font-semibold">
                        What's included
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {r.amenities.map((a) => (
                          <span
                            key={a}
                            className="px-3 py-1.5 rounded-full bg-[#f7f5f2] text-brand-dark/70 text-xs font-medium border border-brand-dark/8"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a
                    href="#book"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-brand-dark text-white font-semibold text-sm uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-colors duration-150 group"
                    aria-label={`Book ${r.name} at CourtSide Menorca`}
                  >
                    Secure Your Place
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
