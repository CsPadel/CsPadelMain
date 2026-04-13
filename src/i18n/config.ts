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
        heroSubtitle: "A Mediterranean Sanctuary. Pure focus, padel excellence, and absolute tranquility.",
        bookBtn: "Secure Your Place",
        agendaTitle: "The Itinerary",
        faqTitle: "Frequently Asked Questions",
        agenda: [
          { 
            dayStr: "Day 01", 
            label: "VIP Arrival",
            activities: [
              { time: "14:00", title: "VIP Transfer & Check-in", desc: "Private transport from Mahón Airport. Welcome mocktails and settling into suites." },
              { time: "16:00", title: "Wellness Assessment & Massage", desc: "Deep tissue sports massage to release travel tension and baseline fitness checks." },
              { time: "19:00", title: "Welcome Dinner & Networking", desc: "Opening gala featuring Mediterranean gourmet dining and program briefing by the Head Coach." }
            ]
          },
          { 
            dayStr: "Day 02", 
            label: "Foundation",
            activities: [
              { time: "08:00", title: "Technical Padel Clinic", desc: "On-court intensive focusing on stroke mechanics, positioning, and the 'bandeja'." },
              { time: "12:00", title: "Infinity Pool Recovery", desc: "Contrast bathing, saunas, and organic nutrition stations by the private pool." },
              { time: "16:00", title: "Match Strategy Session", desc: "Video analysis of the morning's performance breaking down tactical improvements." },
              { time: "20:00", title: "Leisure Evening", desc: "Free evening. Recommendations for top-tier local restaurants managed by your Concierge." }
            ]
          },
          { 
            dayStr: "Day 03", 
            label: "Pro-Am & Yacht",
            activities: [
              { time: "08:30", title: "Pro-Am Match Play", desc: "Intense, competitive tournament-style matches alongside professional players." },
              { time: "13:00", title: "Charter Yacht Escape", desc: "Afternoon sailing to secluded coves. Premium catering and ocean relaxation." },
              { time: "18:00", title: "Active Recovery", desc: "On-deck physiotherapy and stretching sessions with the sunset." }
            ]
          },
          { 
            dayStr: "Day 04", 
            label: "Departure",
            activities: [
              { time: "09:00", title: "Exhibition Matches", desc: "Open play to finalize advanced tactics in a relaxed, competitive environment." },
              { time: "13:00", title: "Farewell Banquet", desc: "Distribution of detailed performance dossiers and personalized luxury gifts." },
              { time: "15:00", title: "Executive Check-out", desc: "Private goodbyes and seamless airport transfers." }
            ]
          }
        ],
        faq: [
          { q: "What skill level is required?", a: "Our coaches tailor sessions to all levels, from beginners looking for foundation building to advanced players refining strategy." },
          { q: "Is the flight included?", a: "Flights are not included in the standard package, however our private Concierge can arrange private charters or commercial flights upon request." },
          { q: "What about dietary requirements?", a: "Our on-site private chef curates bespoke menus based on a detailed wellness questionnaire sent prior to your arrival." }
        ]
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
        heroSubtitle: "Un santuario mediterráneo. Enfoque puro, excelencia en pádel y tranquilidad absoluta.",
        bookBtn: "Solicitar Reserva",
        agendaTitle: "El Itinerario",
        faqTitle: "Preguntas Frecuentes",
        agenda: [
          { 
            dayStr: "Día 01", 
            label: "Llegada VIP",
            activities: [
              { time: "14:00", title: "Llegada VIP & Aclimatación", desc: "Traslado privado del aeropuerto a la reserva. Check-in con zumos orgánicos." },
              { time: "16:00", title: "Evaluación & Masaje de Bienvenida", desc: "Masajes deportivos de tejido profundo para liberar tensiones de viaje." },
              { time: "19:00", title: "Cena de Bienvenida & Networking", desc: "Presentación del programa guiada por el Head Coach con degustación de alta gastronomía local." }
            ]
          },
          { 
            dayStr: "Día 02", 
            label: "Fundamentos",
            activities: [
              { time: "08:00", title: "Clínica de Pádel (Técnica)", desc: "Entrenamiento en pista enfocado en mecánica de golpe, posicionamiento y la bandeja." },
              { time: "12:00", title: "Recuperación en Piscina", desc: "Baños de contraste, sauna y mixología saludable junto a la piscina infinita privada." },
              { time: "16:00", title: "Estrategia de Partido", desc: "Sesión táctica con análisis en video del juego de la mañana para optimizar decisiones." },
              { time: "20:00", title: "Cena Libre", desc: "Noche libre. Recomendaciones de alta cocina gestionadas directamente por su Concierge." }
            ]
          },
          { 
            dayStr: "Día 03", 
            label: "Pro-Am & Yate",
            activities: [
              { time: "08:30", title: "Torneo Pro-Am", desc: "Partidos competitivos intensos en formato torneo jugando con y contra profesionales." },
              { time: "13:00", title: "Tarde de Yate & Relax", desc: "Navegación exclusiva por calas vírgenes de Menorca. Catering premium a bordo." },
              { time: "18:00", title: "Recuperación Activa", desc: "Fisioterapia y estiramientos en la cubierta del yate acompañados de la brisa marina." }
            ]
          },
          { 
            dayStr: "Día 04", 
            label: "Clausura",
            activities: [
              { time: "09:00", title: "Partidos de Exhibición", desc: "Juego libre y aplicación final de las tácticas avanzadas aprendidas durante el retiro." },
              { time: "13:00", title: "Almuerzo de Clausura", desc: "Entrega de informes detallados de rendimiento deportivo y obsequios exclusivos de CourtSide." },
              { time: "15:00", title: "Check-out Ejecutivo", desc: "Despedida privada y traslados VIP de regreso al aeropuerto organizados sin fricciones." }
            ]
          }
        ],
        faq: [
          { q: "¿Qué nivel de habilidad se requiere?", a: "Nuestros entrenadores adaptan las sesiones para todos los niveles, desde principiantes que buscan construir una base sólida, hasta jugadores avanzados que desean refinar su estrategia." },
          { q: "¿Están incluidos los vuelos o traslados en el paquete principal?", a: "Los vuelos a la isla no están incluidos de base, pero nuestro Concierge cuenta con acuerdos preferenciales y puede organizar vuelos privados o en aerolíneas comerciales bajo solicitud." },
          { q: "¿Tenemos en cuenta los requisitos dietéticos especiales?", a: "Totalmente. Nuestro chef privado diseña menús a medida de alta gastronomía que responden a cualquier requerimiento, todo a partir del cuestionario de bienestar previo." }
        ]
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
