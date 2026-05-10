import React, { useState } from 'react';
import { ArrowRight, Users, Sparkles, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function RoomsSelector() {
  const { t } = useTranslation();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [expandedIncluded, setExpandedIncluded] = useState<Record<string, boolean>>({});

  const rooms = [
    {
      id: 'open',
      name: t('menorcaPage.rooms.openRetreat.name'),
      tag: t('menorcaPage.rooms.openRetreat.tag'),
      tagColor: 'bg-brand-gold text-brand-dark',
      priceFrom: t('menorcaPage.rooms.openRetreat.priceFrom'),
      priceShared: t('menorcaPage.rooms.openRetreat.priceShared'),
      priceSingle: t('menorcaPage.rooms.openRetreat.priceSingle'),
      description: t('menorcaPage.rooms.openRetreat.description'),
      amenities: t('menorcaPage.rooms.openRetreat.amenities', { returnObjects: true }) as string[],
      capacity: t('menorcaPage.rooms.openRetreat.capacity'),
      images: ['/imagenes/154A8505.JPG', '/imagenes/154A8605.JPG', '/imagenes/154A8631.JPG'],
    },
    {
      id: 'private',
      name: t('menorcaPage.rooms.privateRetreat.name'),
      tag: t('menorcaPage.rooms.privateRetreat.tag'),
      tagColor: 'bg-brand-gold text-brand-dark',
      priceFrom: t('menorcaPage.rooms.privateRetreat.priceFrom'),
      description: t('menorcaPage.rooms.privateRetreat.description'),
      amenities: t('menorcaPage.rooms.privateRetreat.amenities', { returnObjects: true }) as string[],
      capacity: t('menorcaPage.rooms.privateRetreat.capacity'),
      images: ['/imagenes/binifadet.jpeg', '/imagenes/IMG_2448.JPG', '/imagenes/154A8644.JPG'],
    },
    {
      id: 'corporate',
      name: t('menorcaPage.rooms.corporateRetreat.name'),
      tag: t('menorcaPage.rooms.corporateRetreat.tag'),
      tagColor: 'bg-white/10 text-white',
      priceFrom: t('menorcaPage.rooms.corporateRetreat.priceFrom'),
      description: t('menorcaPage.rooms.corporateRetreat.description'),
      amenities: t('menorcaPage.rooms.corporateRetreat.amenities', { returnObjects: true }) as string[],
      capacity: t('menorcaPage.rooms.corporateRetreat.capacity'),
      images: ['/imagenes/EM-22.jpg', '/imagenes/EM-4.jpg', '/imagenes/EM-38.jpg'],
    },
  ];

  const room = rooms[selectedIdx];

  const handleSelect = (idx: number) => {
    if (idx === selectedIdx) return;
    setSelectedIdx(idx);
    setActiveImage(0);
  };

  const toggleIncluded = (id: string) => {
    setExpandedIncluded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const prevImage = () => setActiveImage((p) => (p - 1 + room.images.length) % room.images.length);
  const nextImage = () => setActiveImage((p) => (p + 1) % room.images.length);

  return (
    <section
      id="rooms"
      aria-label={t('menorcaPage.rooms.sectionTag')}
      className="bg-[#f7f5f2] py-24 md:py-32 px-4 md:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold mb-3">
            {t('menorcaPage.rooms.sectionTag')}
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-brand-dark tracking-wide">
            {t('menorcaPage.rooms.title')}
          </h2>
          <p className="text-brand-dark/45 mt-4 text-lg max-w-md mx-auto">
            {t('menorcaPage.rooms.subtitle')}
          </p>
        </div>

        {/* Room type selector — pill tabs */}
        <div role="tablist" aria-label={t('menorcaPage.rooms.title')} className="flex justify-center gap-3 mb-10 flex-wrap">
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
                      {(r.priceShared || r.priceFrom) && (
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-brand-dark/40 uppercase tracking-widest mb-1">
                            {t('menorcaPage.rooms.priceLabel')}
                          </p>
                          {r.priceShared && r.priceSingle ? (
                            <div className="flex flex-col items-end gap-1">
                              <p className="text-sm font-semibold text-brand-dark">{r.priceSingle}</p>
                              <p className="text-sm font-semibold text-brand-dark">{r.priceShared}</p>
                            </div>
                          ) : (
                            <p className="text-xl font-semibold text-brand-dark">{r.priceFrom}</p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="h-px bg-brand-dark/8 mb-6" />

                    <p className="text-brand-dark/60 text-base leading-relaxed mb-8">
                      {r.description}
                    </p>

                    <div className="mb-8">
                      <button
                        onClick={() => toggleIncluded(r.id)}
                        className="w-full flex items-center justify-between py-2 group"
                        aria-expanded={expandedIncluded[r.id]}
                      >
                        <p className="text-xs uppercase tracking-[0.2em] text-brand-dark/60 font-semibold m-0 group-hover:text-brand-dark transition-colors">
                          {t('menorcaPage.rooms.whatsIncluded')}
                        </p>
                        <ChevronDown
                          className={`w-4 h-4 text-brand-dark/50 transition-all duration-200 group-hover:text-brand-dark ${
                            expandedIncluded[r.id] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          expandedIncluded[r.id] ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="flex flex-wrap gap-2 pb-2">
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
                    </div>
                  </div>

                  <a
                    href="#book"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-brand-dark text-white font-semibold text-sm uppercase tracking-widest hover:bg-brand-gold hover:text-brand-dark transition-colors duration-150 group"
                    aria-label={`Book ${r.name} at CourtSide Menorca`}
                  >
                    {t('menorcaPage.rooms.securePlace')}
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
