import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: {
      navbar: {
        about: "About Us",
        services: "Services",
        destinations: "Destinations",
        menorca: "Menorca",
        bali: "Bali",
        dubai: "Dubai"
      },
      aboutPage: {
        heroTitle: "BEYOND THE COURT",
        heroSubtitle: "Oliver and Alexy Watellet are on a mission to elevate the global padel experience, fusing world-class athletic performance with uncompromising luxury.",
        teamTitle: "The Masterminds",
        team: [
          { name: "Oliver Watellet", role: "Co-Founder & Strategic Vision" },
          { name: "Alexy Watellet", role: "Co-Founder & Athletic Director" },
          { name: "Carlos M.", role: "Head Coach (Menorca)" },
          { name: "Elena R.", role: "Lead Concierge" }
        ]
      },
      servicesPage: {
        heroTitle: "CURATED FOR EXCELLENCE",
        heroSubtitle: "Whether you seek personal refinement, a private sanctuary for your inner circle, or a strategic venue for your board, our services adapt to your ambition.",
        individual: {
          title: "Personal Suites",
          desc: "Perfect for the focused individual or couples. Connect, play, and unwind in private luxury while engaging with our world-class padel programs.",
          action: "Explore Suites"
        },
        group: {
          title: "Full Villa Exclusivity",
          desc: "Uncompromised privacy for your trusted group of 8-20 guests. True luxury is having the entire estate to yourselves.",
          action: "Reserve a Villa"
        },
        corporate: {
          title: "C-Level Strategy",
          desc: "Silence the noise. Executive retreats designed for absolute focus, high-stakes networking, and team building at the highest level.",
          action: "Download Dossier"
        }
      },
      hero: {
        title: "COURTSIDE",
        subtitle: "Effortless performance. Connect, play, and unwind in our private suites.",
        bookBtn: "Book a Suite"
      },
      sidebar: {
        selectDateInfo: "Select a Date",
        selectRetreatInfo: "Select a Retreat",
        yourExperience: "Your Experience",
        chooseHow: "Choose how you wish to proceed with your booking.",
        chooseRetreat: "Choose your destination retreat.",
        selectedRetreat: "Destination",
        retreats: {
          menorca: "Menorca",
          bali: "Bali",
          dubai: "Dubai"
        },
        availableDatesInfo: "Available Dates",
        dates: {
          menorca: {
            date1: "October 8 - 11, 2026",
            date2: "October 21 - 25, 2026"
          },
          bali: {
            date1: "July 8 - 12, 2026",
            date2: "July 22 - 26, 2026"
          },
          dubai: {
            date1: "November 19 - 22, 2026"
          }
        },
        desiredDate: "Desired Date",
        mockDate: "14 - 16 November, 2026",
        changeBtn: "Change",
        viewDetailsBtn: "View Destination Details",
        directCheckoutBtn: "Proceed to Checkout",
        conciergeBtn: "Speak with my Concierge"
      },
      menorcaPage: {
        heroTitle: "MENORCA",
        heroSubtitle: "A Mediterranean Sanctuary. Five days. Padel, lifestyle, tranquility.",
        heroMeta: "30 Sep – 4 Oct 2026 · Menorca · All-Inclusive",
        bookBtn: "View the experience",
        agendaTitle: "The Itinerary",
        itineraryEyebrow: "Programme",
        itineraryTitle: "The Itinerary",
        faqTitle: "Frequently Asked Questions",
        whatsIncluded: {
          title: "What's included?",
          subtitle: "From arrival to departure, every detail of your retreat is taken care of - coaching, dining, transport, activities, all included.",
          pillars: [
            {
              tag: "Elite Coaching",
              title: "Coaching and matchplay tailored to all levels.",
              desc: "Led by former professionals at one of Menorca's premier padel venues — home club of one of the world's top players."
            },
            {
              tag: "Luxury Stay",
              title: "5-star comfort at Barceló Nura.",
              desc: "Light-filled rooms with private terraces or semi-private pools, full-service spa, and Mediterranean cuisine."
            },
            {
              tag: "Fine Dining",
              title: "A curated culinary journey.",
              desc: "Across daily breakfasts at Barceló Nura and hand-picked local restaurants, including Michelin-recognised dining."
            },
            {
              tag: "Bespoke Experiences",
              title: "Curated island adventures.",
              desc: "Private boat tours, signature sunset experiences, vineyard visits with wine and cheese tastings, and spa treatments."
            }
          ]
        },
        // agenda: each activity has an `image` field — a standalone path string (e.g. "/imagenes/filename.jpg")
        // Update any image by changing only its path here; no component code changes needed.
        agenda: [
          {
            dayStr: 'Day 01',
            date: 'Tue 30 Sep',
            label: 'Arrival & Welcome',
            activities: [
              {
                time: 'Morning',
                title: 'Arrival & Check-In',
                desc: 'Private transfers from the airport to Barceló Nura. Welcome drinks on arrival and welcome packs in rooms.',
                image: '/imagenes/IMG_2914.JPG',
              },
              {
                time: '14:00 – 16:30',
                title: 'Seaside Lunch',
                desc: 'Enjoy a relaxing seaside lunch to kick off the retreat and connect with fellow guests.',
                image: '/imagenes/Cala en porter.jpg',
              },
              {
                time: '17:00 – 18:30',
                title: 'Warm-Up Padel Session',
                desc: 'Easy intro session at Padelin. Mixers to warm up the group in a relaxed, social format.',
                image: '/imagenes/EM-4.jpg',
              },
              {
                time: '20:00',
                title: 'Welcome Dinner',
                desc: 'Opening dinner at Ses Forquilles restaurant in Mahón. Group reservation confirmed.',
                image: '/imagenes/bambu.jpg',
              },
            ],
          },
          {
            dayStr: 'Day 02',
            date: 'Wed 1 Oct',
            label: 'Padel & Boat Tour',
            activities: [
              {
                time: '08:30 – 09:15',
                title: 'Breakfast — Barceló Nura',
                desc: 'Group breakfast with reserved seating at the hotel. Fuel up before a full morning on court.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '10:00 – 12:00',
                title: 'Padel Coaching & Matchplay',
                desc: 'Court sessions at Padelin with coach-led drills and competitive matchplay.',
                image: '/imagenes/EM-22.jpg',
              },
              {
                time: '13:45 – 17:30',
                title: 'Lunch & Boat Tour — Sa Punta',
                desc: 'Lunch at Sa Punta restaurant followed by a charter boat tour from Es Castell.',
                image: '/imagenes/Cala en porter.jpg',
              },
              {
                time: '20:00',
                title: 'Dinner — Hotel / Free Evening',
                desc: 'Hotel meal included. Concierge available to assist with restaurant recommendations.',
                image: '/imagenes/2313 copy.jpg',
              },
            ],
          },
          {
            dayStr: 'Day 03',
            date: 'Thu 2 Oct',
            label: 'Padel & Vineyard',
            activities: [
              {
                time: '08:30 – 09:15',
                title: 'Breakfast — Barceló Nura',
                desc: 'Group breakfast with reserved seating. Skill-grouped sessions briefed at the table.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '10:00 – 12:00',
                title: 'Padel Coaching & Matches',
                desc: 'Skill-grouped sessions at Padelin. Technical improvement and competitive play.',
                image: '/imagenes/EM-53.jpg',
              },
              {
                time: '13:30 – 16:30',
                title: 'Vineyard Tour & Lunch — Binifadet',
                desc: 'Tour and lunch at Binifadet winery. Wine & cheese tasting included.',
                image: '/imagenes/binifadet.jpeg',
              },
              {
                time: '20:00',
                title: 'Dinner — La Calita',
                desc: 'Dinner at La Calita restaurant. Hotel meal included.',
                image: '/imagenes/2313 copy.jpg',
              },
            ],
          },
          {
            dayStr: 'Day 04',
            date: 'Fri 3 Oct',
            label: 'Tournament & Sunset',
            activities: [
              {
                time: '07:30 – 08:15',
                title: 'Early Breakfast — Barceló Nura',
                desc: 'Tournament day starts early. Hydration packs ready and group seating reserved.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '09:00 – 13:00',
                title: 'Padel Tournament — Padelin',
                desc: 'Mixed doubles round-robin tournament at Padelin. Trophy and prizes confirmed with venue.',
                image: '/imagenes/JOPS-1071.JPG',
              },
              {
                time: '13:00 – 14:30',
                title: 'Tournament Lunch & Awards',
                desc: 'On-site lunch at Padelin followed by the awards and trophy presentation ceremony.',
                image: '/imagenes/2808 copy.jpg',
              },
              {
                time: '17:00 – 19:00',
                title: "Sunset & Tapas — Cova d'en Xoroi",
                desc: "Live music, tapas and cocktails at the iconic Cova d'en Xoroi. Sunset at ~19:30.",
                image: '/imagenes/cap roig.jpg',
              },
            ],
          },
          {
            dayStr: 'Day 05',
            date: 'Sat 4 Oct',
            label: 'Final Session & Farewell',
            activities: [
              {
                time: '08:30 – 09:15',
                title: 'Final Breakfast — Barceló Nura',
                desc: 'Last group breakfast together. Luggage out by 11:00.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '10:30 – 13:00',
                title: 'Optional Padel Session — Padelin',
                desc: 'Casual open-court session for those whose flights allow. Entirely optional.',
                image: '/imagenes/EM-81.jpg',
              },
              {
                time: 'From 11:00',
                title: 'Check-Out & Transfers to Airport',
                desc: 'Private transfers per individual flight time. Late checkout available on request.',
                image: '/imagenes/IMG_2914.JPG',
              },
            ],
          }
        ],
        faq: [
          { q: "Do I need padel experience?", a: "No. Our retreats welcome all levels — coaching is tailored from beginners building foundations to advanced players refining strategy." },
          { q: "Is everything included?", a: "Yes. Everything in the itinerary is included — accommodation, all meals, coaching, matchplay, local transport, and activities. Guests are welcome to skip any activity. Anything booked outside the itinerary is at the guest's own cost." },
          { q: "Are flights and airport transfers included?", a: "Transfers to and from Mahón Airport are included. Flights are not — our concierge can advise on routes or arrange a private charter on request." },
          { q: "Can a non-playing partner come along?", a: "Yes. Non-playing partners pay the same retreat price, and their programme can be customised around their preferences." },
          { q: "What about dietary requirements?", a: "Our on-site private chef builds bespoke menus around a wellness and dietary questionnaire sent before arrival." },
          { q: "How many guests per retreat?", a: "Each open retreat is capped to preserve exclusivity. Private retreats run for a minimum of 6 guests." },
          { q: "Can I extend my stay before or after the retreat?", a: "Yes — we can arrange additional nights at Barceló Nura on request." },
          { q: "Can I book a private retreat on different dates?", a: "Yes. We run fully bespoke private retreats on any week of the year, with a minimum of 6 guests and 2 months' lead time." },
          { q: "When is the next Menorca retreat?", a: "30 September – 4 October 2026 (4 nights, 5 days). Places are limited — early booking is advised." },
          { q: "What's the deposit and when is the balance due?", a: "A 40% deposit secures your place. The remaining balance is due 6 weeks before the retreat start date." },
          { q: "What's the cancellation policy?", a: "Cancellations made more than 10 weeks before the retreat start date are eligible for a full deposit refund. Within 10 weeks of the start date, the 40% deposit becomes non-refundable." }
        ],
        rooms: {
          sectionTag: "Accommodation",
          title: "Booking options",
          subtitle: "Connect, play, and unwind in our private suites.",
          priceLabel: "Total Retreat Price",
          whatsIncluded: "What's included",
          securePlace: "Secure Your Place",
          openRetreat: {
            name: "Open Retreat",
            tag: "Solo or Friends",
            priceFrom: "",
            priceShared: "from £2,400 (shared occupancy)",
            priceSingle: "from £1,750 (single occupancy)",
            description: "Solo or with a friend. Share the retreat with a curated group of like-minded players. Open dates, mixed group.",
            capacity: "1 - 2 guests per suite",
            amenities: ["Accommodation", "All meals", "Coaching", "Matchplay", "Local transport", "Activities"]
          },
          privateRetreat: {
            name: "Private Retreat",
            tag: "Ultimate Privacy",
            priceFrom: "",
            description: "Reserve the entire retreat exclusively for your group of friends or family.",
            capacity: "8 - 20 guests",
            amenities: ["All-inclusive 4 Nights", "Full exclusivity", "Private courts", "Custom schedule"]
          },
          corporateRetreat: {
            name: "Corporate / Executive Retreat",
            tag: "C-Suite",
            priceFrom: "",
            description: "A closed retreat designed for company offsites, leadership teams, or client hospitality. Bespoke programme available.",
            capacity: "Up to 20 executives",
            amenities: ["All-inclusive 4 Nights", "Private meeting room", "Business concierge"]
          }
        }
      },
      checkout: {
        title: "Direct Checkout",
        placeholderTitle: "JotForm Embed Placeholder",
        placeholderDesc: "Placeholder space for the Jotform iframe connected to Stripe.",
        backBtn: "← Go Back"
      },
      concierge: {
        title: "Personal Concierge",
        desc: "Leave your details and a specialist will tailor your retreat.",
        nameLabel: "Full Name",
        namePlaceholder: "E.g. Richard Branson",
        emailLabel: "Preferred Email",
        emailPlaceholder: "richard@company.co.uk",
        submitBtn: "Request a Call"
      },
      groupVilla: {
        sideTitle: "THE PRIVATE SANCTUARY",
        sideDesc: "Exclusive full villa booking. True privacy is never shared.",
        formTitle: "Exclusive Group",
        formDesc: "Secure the entire villa for your inner circle. Designed for 8 to 20 guests.",
        guestsLabel: "Number of Guests (8-20)",
        investment: "Investment",
        priceHint: "From $12,500 USD",
        submitBtn: "Complete Booking and Pay",
        finaliseTitle: "Finalise Booking",
        simulatingCheckout: "Simulating Stripe checkout flow in test mode for {{count}} guests.",
        backToForm: "← Back to form",
        alertMinGuests: "The group must be between 8 and 20 guests."
      },
      corporate: {
        title: "STRATEGY <br/> IN SILENCE",
        desc: "C-Suite retreats designed for absolute focus. Explore our options autonomously. A detailed executive dossier, with no middlemen.",
        downloadLabel: "Download Dossier",
        emailLabel: "Corporate Email",
        emailPlaceholder: "executive@corporation.co.uk",
        verticalLabel: "Vertical of Interest",
        verticalValues: {
          leadership: "Leadership",
          teamBuilding: "Team Building",
          cSuite: "C-Suite"
        },
        getDossierBtn: "Get Dossier",
        generatingPdf: "Generating PDF...",
        downloadComplete: "Download completed: "
      },
      gateway: {
        hero: {
          intro: "Curating World-Class Padel Retreats.",
          subtitle: "Ultra-luxury retreats. Wellness, rest, and strategic networking through padel.",
          intent: "Design your stay. What are you looking for today?",
          individual: "Personal Suite",
          individualSub: "To connect and unwind",
          group: "Full Villa",
          groupSub: "For your trusted group",
          corporate: "Executive Retreat",
          corporateSub: "High level for your company"
        },
        individual: {
          title: "Your personal suite.",
          desc: "Connect, rest, and play at the highest level in a space reserved for your tranquility.",
          directPay: "Proceed to direct payment",
          talkConcierge: "Speak with my Concierge",
          simPayTitle: "Direct Payment Simulation",
          simPayDesc: "This is where the Jotform connected to Stripe (Test Mode) would be embedded.",
          loadingCheckout: "Loading Secure Checkout",
          backOpts: "← Back to options",
          nameHolder: "Your name",
          phoneHolder: "Phone (WhatsApp)",
          reqCall: "Request Call"
        },
        group: {
          title: "A private space for your inner circle.",
          desc: "Lock an entire villa exclusively for you and your trusted group.",
          sizeLabel: "Group Size",
          guests: "Guests",
          min: "Min",
          max: "Max",
          bookBtn: "Book Exclusive Villa",
          securingFor: "Securing the Villa for {{count}}",
          redirectDesc: "Redirecting to your secure corporate environment to lock your group dates (Stripe Checkout Simulation).",
          back: "← Back"
        },
        corporate: {
          title: "Corporate vision.",
          desc: "Autonomously download the executive dossier designed for your company's needs.",
          emailLabel: "Corporate Email",
          objectiveLabel: "Retreat Objective",
          selectFocus: "Select the strategic focus...",
          optLeadership: "Leadership Development",
          optTeamBuilding: "C-Suite Team Building",
          optCLevel: "Board of Directors (C-Level)",
          processingFile: "Processing Secure File",
          downloadDossier: "Download PDF Dossier",
          dossierDownloaded: "Dossier Downloaded",
          downloadSuccessDesc: "The PDF file has been sent securely. Check your local downloads folder.",
          backHome: "Back to Home"
        }
      },
      footer: {
        rights: "© 2026 CourtSide Padel. All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
      },
      bespokeRetreats: {
        title: "Want it on your dates?",
        description: "Beyond our open retreats, we run bespoke private retreats at Menorca for closed groups, fully customisable around your dates, your group, and your priorities — from coaching intensity to dining preferences to off-court experiences.",
        features: [
          "Minimum 6 guests",
          "Any week of the year",
          "Fully tailored"
        ],
        cta: "Enquire about a bespoke private retreat →",
        modalTitle: "Bespoke Enquiry",
        modalDesc: "Leave your details and a specialist will reach out to tailor your private retreat.",
        nameLabel: "Full Name",
        emailLabel: "Email Address",
        datesLabel: "Desired Dates (Optional)",
        guestsLabel: "Number of Guests (Min 6)",
        submitBtn: "Request Proposal",
        successMsg: "Thank you. Our concierge team will contact you shortly."
      },
      testimonials: {
        label: "Reviews",
        title: "What guests have to say",
        subtitle: "Guests who arrived as players. Left a part of the Courtside community.",
        items: [
          {
            name: "Tomasz Campbell",
            role: "Senior Director, London",
            text: "Truly life-changing. The coaching sessions elevated my game, but the yacht day and gourmet dinners made it a complete luxury escape. Already booked for next year.",
            initials: "T",
            image: "/imagenes/IMG_2167.jpeg"
          },
          {
            name: "Ana Martínez",
            role: "CEO, Madrid",
            text: "The attention to detail is unreal. From the airport transfer to the farewell dinner, every moment felt tailored. This is how a padel retreat should be.",
            initials: "A",
            image: "/imagenes/JOPS-721.JPG"
          },
          {
            name: "James Whitfield",
            role: "Managing Partner, Edinburgh",
            text: "I came for the padel and stayed for the experience. The vineyard lunch, the tournament day, the sunset at Cova d'en Xoroi — every single day was extraordinary.",
            initials: "J",
            image: "/imagenes/Cala en porter.jpg"
          }
        ]
      }
    }
  },
  es: {
    translation: {
      navbar: {
        about: "Nuestra Historia",
        services: "Servicios",
        destinations: "Destinos",
        menorca: "Menorca",
        bali: "Bali",
        dubai: "Dubái"
      },
      aboutPage: {
        heroTitle: "MÁS ALLÁ DE LA PISTA",
        heroSubtitle: "Oliver y Alexy Watellet tienen la misión de elevar la experiencia global del pádel, fusionando el rendimiento atlético de clase mundial con el lujo absoluto.",
        teamTitle: "Las Mentes Maestras",
        team: [
          { name: "Oliver Watellet", role: "Co-Fundador y Visión Estratégica" },
          { name: "Alexy Watellet", role: "Co-Fundador y Director Atlético" },
          { name: "Carlos M.", role: "Head Coach (Menorca)" },
          { name: "Elena R.", role: "Lead Concierge" }
        ]
      },
      servicesPage: {
        heroTitle: "DISEÑADO PARA LA EXCELENCIA",
        heroSubtitle: "Ya sea que busque perfeccionamiento personal, un santuario privado para su círculo, o una sede estratégica para su junta, nos adaptamos a su ambición.",
        individual: {
          title: "Suites Personales",
          desc: "Ideal para individuos enfocados o parejas. Conecte, juegue y descanse en lujo privado mientras participa en nuestro programa de clase mundial.",
          action: "Explorar Suites"
        },
        group: {
          title: "Exclusividad en Villa",
          desc: "Privacidad absoluta para su grupo de confianza (8-20 invitados). El verdadero lujo es tener toda la finca entera a su disposición.",
          action: "Reservar la Villa"
        },
        corporate: {
          title: "Estrategia C-Level",
          desc: "Silencie el ruido. Retiros ejecutivos diseñados para el enfoque absoluto, networking de alto nivel y team building directivo.",
          action: "Descargar Dossier"
        }
      },
      hero: {
        title: "COURTSIDE",
        subtitle: "Un esfuerzo sin desgaste. Conecta, juega y descansa en nuestras suites privadas.",
        bookBtn: "Reservar Suite"
      },
      sidebar: {
        selectDateInfo: "Selecciona tu fecha",
        selectRetreatInfo: "Selecciona tu destino",
        yourExperience: "Tu Experiencia",
        chooseHow: "Elige cómo deseas proceder con tu reserva.",
        chooseRetreat: "Elige tu retiro de destino.",
        selectedRetreat: "Destino",
        retreats: {
          menorca: "Menorca",
          bali: "Bali",
          dubai: "Dubái"
        },
        availableDatesInfo: "Fechas Disponibles",
        dates: {
          menorca: {
            date1: "Octubre 8 - 11, 2026",
            date2: "Octubre 21 - 25, 2026"
          },
          bali: {
            date1: "Julio 8 - 12, 2026",
            date2: "Julio 22 - 26, 2026"
          },
          dubai: {
            date1: "Noviembre 19 - 22, 2026"
          }
        },
        desiredDate: "Fecha Deseada",
        mockDate: "Noviembre 14 - 16, 2026",
        changeBtn: "Cambiar",
        viewDetailsBtn: "Ver Detalles del Destino",
        directCheckoutBtn: "Pasar al pago directo",
        conciergeBtn: "Hablar con mi Concierge"
      },
      menorcaPage: {
        heroTitle: "MENORCA",
        heroSubtitle: "Un santuario mediterráneo. Cinco días. Pádel, estilo de vida, tranquilidad.",
        heroMeta: "30 Sep – 4 Oct 2026 · Menorca · Todo Incluido",
        bookBtn: "Ver la experiencia",
        agendaTitle: "El Itinerario",
        itineraryEyebrow: "Programa",
        itineraryTitle: "El Itinerario",
        faqTitle: "Preguntas Frecuentes",
        whatsIncluded: {
          title: "¿Qué incluye?",
          subtitle: "Desde la llegada hasta la salida, cada detalle de tu retiro está cubierto: entrenamiento, gastronomía, transporte, actividades; todo incluido.",
          pillars: [
            {
              tag: "Entrenamiento Élite",
              title: "Entrenamiento y partidos adaptados a todos los niveles.",
              desc: "Dirigidos por exprofesionales en uno de los mejores clubes de pádel de Menorca, hogar de una de las mejores jugadoras del mundo."
            },
            {
              tag: "Estancia de Lujo",
              title: "Confort 5 estrellas en Barceló Nura.",
              desc: "Habitaciones luminosas con terrazas privadas o piscinas semiprivadas, spa de servicio completo y cocina mediterránea."
            },
            {
              tag: "Alta Gastronomía",
              title: "Un viaje culinario cuidadosamente seleccionado.",
              desc: "Desde desayunos diarios en Barceló Nura hasta restaurantes locales elegidos a mano, incluyendo opciones reconocidas por la guía Michelin."
            },
            {
              tag: "Experiencias a Medida",
              title: "Aventuras en la isla y paseos en barco privados.",
              desc: "Experiencias de atardecer exclusivas, visitas a viñedos con cata de vinos y quesos, y tratamientos de spa."
            }
          ]
        },
        // agenda: each activity has an `image` field — a standalone path string (e.g. "/imagenes/filename.jpg")
        // Update any image by changing only its path here; no component code changes needed.
        agenda: [
          {
            dayStr: 'Día 01',
            date: 'Mar 30 Sep',
            label: 'Llegada & Bienvenida',
            activities: [
              {
                time: 'Mañana',
                title: 'Llegada & Check-In',
                desc: 'Traslados privados desde el aeropuerto al Barceló Nura. Bebidas de bienvenida y packs en las habitaciones.',
                image: '/imagenes/IMG_2914.JPG',
              },
              {
                time: '14:00 – 16:30',
                title: 'Almuerzo frente al mar',
                desc: 'Disfruta de un relajante almuerzo frente al mar para iniciar el retiro y conectar con otros invitados.',
                image: '/imagenes/Cala en porter.jpg',
              },
              {
                time: '17:00 – 18:30',
                title: 'Sesión de Pádel (Calentamiento)',
                desc: 'Sesión introductoria en Padelin. Formato relajado y social para entrar en calor.',
                image: '/imagenes/EM-4.jpg',
              },
              {
                time: '20:00',
                title: 'Cena de Bienvenida',
                desc: 'Cena de apertura en el restaurante Ses Forquilles en Mahón. Reserva de grupo confirmada.',
                image: '/imagenes/bambu.jpg',
              },
            ],
          },
          {
            dayStr: 'Día 02',
            date: 'Mié 1 Oct',
            label: 'Pádel & Paseo en Barco',
            activities: [
              {
                time: '08:30 – 09:15',
                title: 'Desayuno — Barceló Nura',
                desc: 'Desayuno de grupo con zona reservada en el hotel para recargar energías.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '10:00 – 12:00',
                title: 'Pádel (Entrenamiento y Partidos)',
                desc: 'Sesiones en Padelin dirigidas por entrenadores y partidos competitivos.',
                image: '/imagenes/EM-22.jpg',
              },
              {
                time: '13:45 – 17:30',
                title: 'Almuerzo & Barco — Sa Punta',
                desc: 'Almuerzo en el restaurante Sa Punta seguido de un paseo en barco desde Es Castell.',
                image: '/imagenes/Cala en porter.jpg',
              },
              {
                time: '20:00',
                title: 'Cena — Hotel / Tarde Libre',
                desc: 'Cena en el hotel incluida. Concierge disponible para recomendar restaurantes.',
                image: '/imagenes/2313 copy.jpg',
              },
            ],
          },
          {
            dayStr: 'Día 03',
            date: 'Jue 2 Oct',
            label: 'Pádel & Viñedo',
            activities: [
              {
                time: '08:30 – 09:15',
                title: 'Desayuno — Barceló Nura',
                desc: 'Desayuno de grupo. Resumen de las sesiones por nivel durante el desayuno.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '10:00 – 12:00',
                title: 'Pádel (Técnica y Partidos)',
                desc: 'Sesiones por grupos de habilidad en Padelin. Mejora técnica y juego competitivo.',
                image: '/imagenes/EM-53.jpg',
              },
              {
                time: '13:30 – 16:30',
                title: 'Visita a Viñedo y Almuerzo — Binifadet',
                desc: 'Tour y almuerzo en la bodega Binifadet. Incluye cata de vinos y quesos.',
                image: '/imagenes/binifadet.jpeg',
              },
              {
                time: '20:00',
                title: 'Cena — La Calita',
                desc: 'Cena en el restaurante La Calita. Menú incluido.',
                image: '/imagenes/2313 copy.jpg',
              },
            ],
          },
          {
            dayStr: 'Día 04',
            date: 'Vie 3 Oct',
            label: 'Torneo & Atardecer',
            activities: [
              {
                time: '07:30 – 08:15',
                title: 'Desayuno Temprano — Barceló Nura',
                desc: 'El día del torneo empieza pronto. Packs de hidratación listos.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '09:00 – 13:00',
                title: 'Torneo de Pádel — Padelin',
                desc: 'Torneo round-robin de dobles mixtos en Padelin. Trofeo y premios confirmados.',
                image: '/imagenes/JOPS-1071.JPG',
              },
              {
                time: '13:00 – 14:30',
                title: 'Almuerzo & Entrega de Premios',
                desc: 'Almuerzo en las instalaciones de Padelin seguido de la ceremonia de trofeos.',
                image: '/imagenes/2808 copy.jpg',
              },
              {
                time: '17:00 – 19:00',
                title: "Atardecer & Tapas — Cova d'en Xoroi",
                desc: "Música en vivo, tapas y cócteles en la icónica Cova d'en Xoroi. Atardecer ~19:30.",
                image: '/imagenes/cap roig.jpg',
              },
            ],
          },
          {
            dayStr: 'Día 05',
            date: 'Sáb 4 Oct',
            label: 'Sesión Final & Despedida',
            activities: [
              {
                time: '08:30 – 09:15',
                title: 'Desayuno Final — Barceló Nura',
                desc: 'Último desayuno en grupo. Equipaje listo para las 11:00.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '10:30 – 13:00',
                title: 'Sesión de Pádel Opcional — Padelin',
                desc: 'Sesión informal en pista abierta para quienes sus vuelos lo permitan. Opcional.',
                image: '/imagenes/EM-81.jpg',
              },
              {
                time: 'Desde 11:00',
                title: 'Check-Out & Traslados al Aeropuerto',
                desc: 'Traslados privados según horario de vuelo. Late checkout bajo petición.',
                image: '/imagenes/IMG_2914.JPG',
              },
            ],
          }
        ],
        faq: [
          { q: "¿Necesito experiencia en pádel?", a: "No. Nuestros retiros son para todos los niveles; el entrenamiento se adapta desde principiantes que buscan construir una base sólida, hasta jugadores avanzados que desean refinar su estrategia." },
          { q: "¿Está todo incluido?", a: "Sí. Todo lo descrito en el itinerario está incluido: alojamiento, todas las comidas, entrenamiento, partidos, transporte local y actividades. Los huéspedes pueden decidir no participar en alguna actividad si lo desean. Cualquier reserva fuera del itinerario corre por cuenta del huésped." },
          { q: "¿Están incluidos los vuelos y traslados al aeropuerto?", a: "Los traslados desde y hacia el Aeropuerto de Mahón están incluidos. Los vuelos no; nuestro concierge puede asesorarle sobre las mejores rutas u organizar un vuelo chárter privado si lo solicita." },
          { q: "¿Puede acompañarme un invitado que no juegue al pádel?", a: "Sí. Los acompañantes que no jueguen abonan el mismo precio del retiro, y su programa puede personalizarse según sus preferencias." },
          { q: "¿Tenemos en cuenta los requisitos dietéticos especiales?", a: "Nuestro chef privado en el lugar diseña menús a medida en base a un cuestionario de bienestar y dietético que se envía antes de su llegada." },
          { q: "¿Cuántos invitados hay por retiro?", a: "Cada retiro abierto tiene un límite de participantes para preservar la exclusividad. Los retiros privados requieren un mínimo de 6 invitados." },
          { q: "¿Puedo extender mi estancia antes o después del retiro?", a: "Sí; podemos organizar noches adicionales en Barceló Nura previa solicitud." },
          { q: "¿Puedo reservar un retiro privado en otras fechas?", a: "Sí. Organizamos retiros privados completamente a medida en cualquier semana del año, con un mínimo de 6 invitados y al menos 2 meses de antelación." },
          { q: "¿Cuándo es el próximo retiro en Menorca?", a: "Del 30 de septiembre al 4 de octubre de 2026 (4 noches, 5 días). Las plazas son limitadas, por lo que se recomienda reservar con anticipación." },
          { q: "¿De cuánto es el depósito y cuándo se debe pagar el saldo restante?", a: "Un depósito del 40% asegura su plaza. El saldo restante debe abonarse 6 semanas antes de la fecha de inicio del retiro." },
          { q: "¿Cuál es la política de cancelación?", a: "Las cancelaciones realizadas con más de 10 semanas de antelación al inicio del retiro son elegibles para un reembolso completo del depósito. Si se cancela a menos de 10 semanas de la fecha de inicio, el depósito del 40% no será reembolsable." }
        ],
        rooms: {
          sectionTag: "Alojamiento",
          title: "Opciones de reserva",
          subtitle: "Conecta, juega y descansa en nuestras suites privadas.",
          priceLabel: "Precio Total del Retiro",
          whatsIncluded: "Qué incluye",
          securePlace: "Asegurar mi Plaza",
          openRetreat: {
            name: "Open Retreat",
            tag: "Solo o con amigos",
            priceFrom: "",
            priceShared: "desde £2,400 (habitación compartida)",
            priceSingle: "desde £1,750 (uso individual)",
            description: "Para ti solo o con un amigo. Comparte el retiro con un grupo seleccionado de jugadores afines. Fechas abiertas, grupo mixto.",
            capacity: "1 - 2 invitados por suite",
            amenities: ["Alojamiento", "Todas las comidas", "Entrenamiento", "Partidos", "Transporte local", "Actividades"]
          },
          privateRetreat: {
            name: "Retiro Privado",
            tag: "Privacidad Total",
            priceFrom: "",
            description: "Reserva el retiro completo en exclusiva para tu grupo de amigos o familiares.",
            capacity: "8 - 20 invitados",
            amenities: ["4 noches Todo Incluido", "Exclusividad total", "Pistas privadas", "Horario personalizado"]
          },
          corporateRetreat: {
            name: "Retiro Corporativo / Ejecutivo",
            tag: "C-Suite",
            priceFrom: "",
            description: "Un retiro a puerta cerrada diseñado para viajes de empresa, equipos directivos o clientes. Programa a medida disponible.",
            capacity: "Hasta 20 ejecutivos",
            amenities: ["4 noches Todo Incluido", "Sala de reuniones privada", "Concierge de negocios"]
          }
        }
      },
      checkout: {
        title: "Checkout Directo",
        placeholderTitle: "JotForm Embed Placeholder",
        placeholderDesc: "Espacio reservado para el iframe de Jotform conectado a Stripe.",
        backBtn: "← Volver"
      },
      concierge: {
        title: "Concierge Personal",
        desc: "Déjanos tus datos y un especialista diseñará tu retiro a medida.",
        nameLabel: "Nombre Completo",
        namePlaceholder: "Ej. Carlos Slim",
        emailLabel: "Email Preferido",
        emailPlaceholder: "carlos@empresa.com",
        submitBtn: "Solicitar Llamada"
      },
      groupVilla: {
        sideTitle: "EL SANTUARIO PRIVADO",
        sideDesc: "Bloqueo exclusivo de villa completa. La verdadera privacidad no se comparte.",
        formTitle: "Grupo Exclusivo",
        formDesc: "Asegure la villa completa para su círculo íntimo. Diseñado para 8 a 20 invitados.",
        guestsLabel: "Número de Invitados (8-20)",
        investment: "Inversión",
        priceHint: "Desde $12,500 USD",
        submitBtn: "Completar Bloqueo y Pagar",
        finaliseTitle: "Finalizar Reserva",
        simulatingCheckout: "Simulando flujo de carrito Stripe en modo test para {{count}} personas.",
        backToForm: "← Volver al formulario",
        alertMinGuests: "El grupo debe ser de 8 a 20 personas."
      },
      corporate: {
        title: "ESTRATEGIA <br/> EN SILENCIO",
        desc: "Retiros de alta dirección diseñados para el enfoque absoluto. Explore nuestras opciones de forma autónoma. Un dossier ejecutivo detallado, sin intermediarios.",
        downloadLabel: "Descargar Dossier",
        emailLabel: "Email Corporativo",
        emailPlaceholder: "ejecutivo@corporacion.com",
        verticalLabel: "Vertical de Interés",
        verticalValues: {
          leadership: "Liderazgo",
          teamBuilding: "Team Building",
          cSuite: "Alta Dirección"
        },
        getDossierBtn: "Obtener Dossier",
        generatingPdf: "Generando PDF...",
        downloadComplete: "Descarga completada: "
      },
      gateway: {
        hero: {
          intro: "Retiros de Pádel de Clase Mundial.",
          subtitle: "Retiros de ultra-lujo. Bienestar, descanso y networking estratégico a través del pádel.",
          intent: "Diseña tu estancia. ¿Qué buscas hoy?",
          individual: "Suite Personal",
          individualSub: "Para conectar y descansar",
          group: "Villa Completa",
          groupSub: "Para tu grupo de confianza",
          corporate: "Retiro Ejecutivo",
          corporateSub: "Alto nivel para tu empresa"
        },
        individual: {
          title: "Tu suite personal.",
          desc: "Conecta, descansa y juega al más alto nivel en un espacio reservado para tu tranquilidad.",
          directPay: "Pasar al pago directo",
          talkConcierge: "Hablar con mi Concierge",
          simPayTitle: "Simulación de Pago Directo",
          simPayDesc: "Aquí iría embebido el formulario de Jotform conectado a Stripe (Modo Test).",
          loadingCheckout: "Cargando Checkout Securo",
          backOpts: "← Volver a opciones",
          nameHolder: "Tu nombre",
          phoneHolder: "Teléfono (WhatsApp)",
          reqCall: "Solicitar Llamada"
        },
        group: {
          title: "Un espacio privado para tu círculo.",
          desc: "Bloquea una villa completa exclusivamente para ti y tu grupo de confianza.",
          sizeLabel: "Tamaño del Grupo",
          guests: "Personas",
          min: "Min",
          max: "Max",
          bookBtn: "Reservar la Villa Exclusiva",
          securingFor: "Asegurando la Villa para {{count}}",
          redirectDesc: "Redirigiendo a tu entorno corporativo seguro para bloquear las fechas de tu grupo (Simulación Stripe Checkout).",
          back: "← Volver"
        },
        corporate: {
          title: "Visión corporativa.",
          desc: "Descarga de forma autónoma el dossier ejecutivo diseñado para las necesidades de tu empresa.",
          emailLabel: "Correo Corporativo",
          objectiveLabel: "Objetivo del Retiro",
          selectFocus: "Selecciona el enfoque estratégico...",
          optLeadership: "Desarrollo de Liderazgo",
          optTeamBuilding: "Team Building Alta Gerencia",
          optCLevel: "Junta de Alta Dirección (C-Level)",
          processingFile: "Prcesando Archivo Seguro",
          downloadDossier: "Descargar Dossier PDF",
          dossierDownloaded: "Dossier Descargado",
          downloadSuccessDesc: "El archivo PDF ha sido enviado de manera segura. Revisa la carpeta local de descargas.",
          backHome: "Volver al Inicio"
        }
      },
      footer: {
        rights: "© 2026 CourtSide Padel. Todos los derechos reservados.",
        privacy: "Privacidad",
        terms: "Términos"
      },
      bespokeRetreats: {
        title: "¿Lo quieres en tus fechas?",
        description: "Más allá de nuestros retiros abiertos, organizamos retiros privados a medida en Menorca para grupos cerrados, totalmente personalizables en torno a tus fechas, tu grupo y tus prioridades: desde la intensidad del entrenamiento hasta las preferencias gastronómicas y las experiencias fuera de la pista.",
        features: [
          "Mínimo 6 invitados",
          "Cualquier semana del año",
          "Totalmente a medida"
        ],
        cta: "Solicita un retiro privado a medida →",
        modalTitle: "Consulta a Medida",
        modalDesc: "Déjanos tus datos y un especialista se pondrá en contacto para diseñar tu retiro privado.",
        nameLabel: "Nombre Completo",
        emailLabel: "Correo Electrónico",
        datesLabel: "Fechas Deseadas (Opcional)",
        guestsLabel: "Número de Invitados (Mínimo 6)",
        submitBtn: "Solicitar Propuesta",
        successMsg: "Gracias. Nuestro equipo de concierge se pondrá en contacto pronto."
      },
      testimonials: {
        label: "Reseñas",
        title: "Lo que dicen nuestros invitados",
        subtitle: "Invitados que llegaron como jugadores. Se fueron como parte de la comunidad Courtside.",
        items: [
          {
            name: "Tomasz Campbell",
            role: "Director Senior, Londres",
            text: "Realmente me cambió la vida. Las sesiones de entrenamiento elevaron mi juego, pero el día en yate y las cenas gourmet lo convirtieron en un escape de lujo total. Ya he reservado para el próximo año.",
            initials: "T",
            image: "/imagenes/IMG_2167.jpeg"
          },
          {
            name: "Ana Martínez",
            role: "CEO, Madrid",
            text: "La atención al detalle es irreal. Desde el traslado al aeropuerto hasta la cena de despedida, cada momento se sintió hecho a medida. Así es como debe ser un retiro de pádel.",
            initials: "A",
            image: "/imagenes/JOPS-721.JPG"
          },
          {
            name: "James Whitfield",
            role: "Socio Director, Edimburgo",
            text: "Vine por el pádel y me quedé por la experiencia. El almuerzo en el viñedo, el día del torneo, el atardecer en Cova d'en Xoroi — cada uno de los días fue extraordinario.",
            initials: "J",
            image: "/imagenes/Cala en porter.jpg"
          }
        ]
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "es",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
