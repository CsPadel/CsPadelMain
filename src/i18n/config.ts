import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    translation: {
      hero: {
        title: "COURTSIDE",
        subtitle: "Effortless performance. Connect, play, and unwind in our private suites.",
        bookBtn: "Book a Suite"
      },
      sidebar: {
        selectDateInfo: "Select a Date",
        yourExperience: "Your Experience",
        chooseHow: "Choose how you wish to proceed with your booking.",
        desiredDate: "Desired Date",
        mockDate: "14 - 16 November, 2026",
        changeBtn: "Change",
        directCheckoutBtn: "Proceed to Checkout",
        conciergeBtn: "Speak with my Concierge"
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
      hero: {
        title: "COURTSIDE",
        subtitle: "Un esfuerzo sin desgaste. Conecta, juega y descansa en nuestras suites privadas.",
        bookBtn: "Reservar Suite"
      },
      sidebar: {
        selectDateInfo: "Selecciona tu fecha",
        yourExperience: "Tu Experiencia",
        chooseHow: "Elige cómo deseas proceder con tu reserva.",
        desiredDate: "Fecha Deseada",
        mockDate: "Noviembre 14 - 16, 2026",
        changeBtn: "Cambiar",
        directCheckoutBtn: "Pasar al pago directo",
        conciergeBtn: "Hablar con mi Concierge"
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
    lng: "es", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
