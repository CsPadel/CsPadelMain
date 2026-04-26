import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Star } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  subtitle: string;
  priceFrom: string;
  priceUnit: string;
  description: string;
  amenities: string[];
  images: string[];
  capacity: string;
  highlight: string;
}

const rooms: Room[] = [
  {
    id: 'suite',
    name: 'Personal Suite',
    subtitle: 'Ideal for individuals or couples',
    priceFrom: '£120',
    priceUnit: '/night',
    description: 'Your private sanctuary within the estate. Each suite is designed for absolute focus and recovery — a curated space where performance meets tranquility.',
    amenities: ['King bed', 'En-suite bathroom', 'Pool access', 'Daily wellness kit', 'Concierge service'],
    images: [
      '/imagenes/154A8505.JPG',
      '/imagenes/154A8605.JPG',
      '/imagenes/154A8631.JPG',
    ],
    capacity: '1–2 guests',
    highlight: 'Most popular choice',
  },
  {
    id: 'villa',
    name: 'Full Villa',
    subtitle: 'Exclusive for groups of 8–20 guests',
    priceFrom: '£200',
    priceUnit: '/night',
    description: 'Lock the entire estate exclusively for your inner circle. True luxury is never shared. Full villa access means every court, pool, and dining table is yours alone.',
    amenities: ['Private padel courts', 'Full villa exclusivity', 'Private chef', 'Yacht access', 'Dedicated concierge team'],
    images: [
      '/imagenes/binifadet.jpeg',
      '/imagenes/IMG_2448.JPG',
      '/imagenes/154A8644.JPG',
    ],
    capacity: '8–20 guests',
    highlight: 'Ultimate privacy',
  },
  {
    id: 'executive',
    name: 'Executive Retreat',
    subtitle: 'C-suite level privacy & focus',
    priceFrom: '£100',
    priceUnit: '/night',
    description: 'Designed for executives who understand that strategic clarity is best found away from the office. High-performance environment, absolute discretion, curated for the C-suite.',
    amenities: ['Private meeting room', 'Executive suite', 'Business concierge', 'Strategy sessions', 'Priority court booking'],
    images: [
      '/imagenes/EM-22.jpg',
      '/imagenes/EM-4.jpg',
      '/imagenes/EM-38.jpg',
    ],
    capacity: '2–6 executives',
    highlight: 'Corporate focused',
  },
];

export default function RoomsSelector() {
  const [selected, setSelected] = useState<Room>(rooms[0]);
  const [activeImage, setActiveImage] = useState(0);

  const handleSelect = (room: Room) => {
    setSelected(room);
    setActiveImage(0);
  };

  return (
    <section
      id="rooms"
      aria-label="Accommodation options at CourtSide Menorca"
      className="bg-white py-24 md:py-32 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-center text-brand-dark mb-4 tracking-wide">
          Discover our rooms
        </h2>
        <p className="text-brand-dark/50 text-center text-lg mb-16 max-w-xl mx-auto">
          Effortless performance. Connect, play, and unwind in our private suites.
        </p>

        <div className="flex flex-col lg:flex-row gap-0 border border-brand-dark/10">
          {/* Left: room selector list */}
          <div className="w-full lg:w-2/5 flex flex-col border-r border-brand-dark/10">
            {rooms.map((room) => {
              const isActive = selected.id === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => handleSelect(room)}
                  className={`text-left px-8 py-7 border-b border-brand-dark/10 last:border-b-0 transition-all duration-300 relative group ${
                    isActive ? 'bg-brand-dark' : 'bg-white hover:bg-brand-dark/5'
                  }`}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <motion.div
                      layoutId="roomActiveBar"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gold"
                    />
                  )}
                  <div className="flex justify-between items-center">
                    <div>
                      <p
                        className={`text-xl font-semibold transition-colors ${
                          isActive ? 'text-brand-gold' : 'text-brand-dark group-hover:text-brand-gold'
                        }`}
                      >
                        {room.name}
                      </p>
                      <p
                        className={`text-sm mt-1 transition-colors ${
                          isActive ? 'text-white/50' : 'text-brand-dark/50'
                        }`}
                      >
                        {room.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-sm font-medium transition-colors ${
                          isActive ? 'text-white/70' : 'text-brand-dark/60'
                        }`}
                      >
                        Starting {room.priceFrom}
                        <span className="text-xs">{room.priceUnit}</span>
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 flex items-center gap-2"
                    >
                      <Users className="w-3.5 h-3.5 text-brand-gold/70" />
                      <span className="text-xs text-white/40 uppercase tracking-widest">{room.capacity}</span>
                      <span className="text-white/20 mx-1">·</span>
                      <Star className="w-3.5 h-3.5 text-brand-gold/70" />
                      <span className="text-xs text-white/40 uppercase tracking-widest">{room.highlight}</span>
                    </motion.div>
                  )}
                </button>
              );
            })}

            {/* CTA */}
            <div className="p-8 bg-brand-dark mt-auto">
              <a
                href="#book"
                className="flex items-center justify-center gap-3 w-full py-4 bg-brand-gold text-brand-dark font-semibold text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300"
                aria-label={`Book ${selected.name} at CourtSide Menorca`}
              >
                Secure Your Place
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: room detail */}
          <div className="w-full lg:w-3/5 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col h-full"
              >
                {/* Main image */}
                <div className="relative overflow-hidden h-72 md:h-96">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${selected.id}-${activeImage}`}
                      src={selected.images[activeImage]}
                      alt={`${selected.name} at CourtSide Menorca luxury padel retreat`}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      loading="lazy"
                      width={900}
                      height={600}
                    />
                  </AnimatePresence>

                  {/* Image thumbnails */}
                  <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                    {selected.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`w-14 h-10 overflow-hidden border-2 transition-all duration-200 ${
                          activeImage === idx ? 'border-brand-gold opacity-100' : 'border-white/40 opacity-60 hover:opacity-90'
                        }`}
                        aria-label={`View image ${idx + 1} of ${selected.name}`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Room details */}
                <div className="p-8 md:p-10 flex-1 bg-white">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-light text-brand-dark">{selected.name}</h3>
                      <p className="text-brand-gold text-sm uppercase tracking-widest mt-1 font-semibold">{selected.highlight}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-light text-brand-dark">{selected.priceFrom}</p>
                      <p className="text-brand-dark/40 text-sm">{selected.priceUnit} · per person</p>
                    </div>
                  </div>

                  <p className="text-brand-dark/60 text-base leading-relaxed mb-8">
                    {selected.description}
                  </p>

                  {/* Amenities */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-dark/40 mb-4 font-semibold">Included</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {selected.amenities.map((amenity) => (
                        <li key={amenity} className="flex items-center gap-2 text-sm text-brand-dark/70">
                          <span className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
