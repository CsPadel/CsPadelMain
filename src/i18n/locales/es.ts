const es = {
      navbar: {
        ourStory: "Nuestra Historia",
        about: "Sobre Nosotros",
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
          { name: "Oliver Watellet", role: "Co-Fundador y Visión Estratégica", photo: "/imagenes/about-us/oli.webp" },
          { name: "Alexy Watellet", role: "Co-Fundador y Director Atlético", photo: "/imagenes/about-us/alex.webp" },
          { name: "Carlos M.", role: "Head Coach (Menorca)", photo: "/team/carlos.jpg" },
          { name: "Elena R.", role: "Lead Concierge", photo: "/team/elena.jpg" }
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
        faqViewLess: "Ver menos",
        faqViewAll: "Ver todas las preguntas",
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
          introLine1: "Retiros de Pádel",
          introLine2: "de Clase Mundial.",
          intro: "Retiros de Pádel de Clase Mundial.",
          subtitle: "Retiros de ultra-lujo. Bienestar, descanso y networking estratégico a través del pádel.",
          intent: "Diseña tu estancia. ¿Qué buscas hoy?",
          individual: "Suite Personal",
          individualSub: "Para conectar y descansar",
          group: "Villa Completa",
          groupSub: "Para tu grupo de confianza",
          corporate: "Retiro Ejecutivo",
          corporateSub: "Alto nivel para tu empresa",
          individualDescriptor: "Una pista privada. Tus reglas.",
          groupDescriptor: "Un espacio exclusivo para tu círculo.",
          corporateDescriptor: "Estrategia. Dentro y fuera de la pista."
        },
        luxuryStrip: {
          destinations: "Destinos Exclusivos",
          privateAccess: "Acceso Privado",
          curatedProperties: "Propiedades Seleccionadas",
          conciergeService: "Servicio de Concierge"
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
        terms: "Términos",
        cookies: "Política de cookies"
      },
      cookieConsent: {
        title: "Usamos cookies",
        description: "Utilizamos cookies esenciales para el funcionamiento del sitio y cookies opcionales para entender cómo se utiliza. Puedes aceptar todas o rechazar las no esenciales.",
        policyLink: "Más información",
        accept: "Aceptar todas",
        reject: "Rechazar no esenciales"
      },
      whatsappConcierge: {
        label: "Concierge 24/7",
        ariaLabel: "Chatea con nuestro concierge por WhatsApp",
        prefillMessage: "Hola, me gustaría hablar con el concierge de CourtSide."
      },
      cookiePolicy: {
        title: "Política de cookies",
        intro: "Esta política explica cómo CourtSide Padel utiliza cookies y tecnologías similares en courtsidepadel.com.",
        sections: [
          {
            title: "¿Qué son las cookies?",
            body: "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Ayudan a recordar tus preferencias y a entender cómo utilizas el sitio."
          },
          {
            title: "Cookies esenciales",
            body: "Estas cookies son necesarias para que el sitio funcione correctamente. Incluyen tu preferencia de idioma y tu elección de consentimiento de cookies. No pueden desactivarse."
          },
          {
            title: "Cookies analíticas",
            body: "Si aceptas las cookies no esenciales, podemos utilizar herramientas analíticas para medir el tráfico y mejorar nuestros servicios. Estas cookies solo se activan tras tu consentimiento."
          },
          {
            title: "Gestionar tus preferencias",
            body: "Puedes aceptar o rechazar las cookies no esenciales mediante el banner que aparece en tu primera visita. Para cambiar tu elección más adelante, borra los datos del navegador para este sitio o contáctanos en hello@courtsidepadel.com."
          },
          {
            title: "Actualizaciones",
            body: "Podemos actualizar esta política periódicamente. La versión más reciente estará siempre disponible en esta página."
          }
        ]
      },
      bespokeRetreats: {
        title: "¿Lo quieres en tus fechas?",
        description: "Retiros privados para grupos cerrados, totalmente personalizables en tus fechas y prioridades. Cualquier semana del año, en Menorca.",
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
      baliPage: {
        heroTitle: "BALI",
        heroTagline: "Lujo en la Jungla. Pádel de Élite.",
        heroLocation: "Canggu · Bali",
        heroDate: "Julio 2026 · 5 Días · Todo Incluido",
        heroSubtitle: "Donde el ritmo de Bali se funde con el pádel de élite. Cinco días de entrenamiento, bienestar e inmersión cultural en pleno lujo tropical.",
        sectionTag: "El Destino",
        sectionTitle: "El Retiro en Bali",
        bookBtn: "Reserva tu Plaza",
        enquireBtn: "Habla con el Concierge",
        whatsappMessage: "Hola, quiero información sobre el retiro de pádel en Bali.",
        galleryLabel: "Galería",
        galleryNote: "Fotografía próximamente",
        stats: {
          duration: { value: "5", label: "Días" },
          group: { value: "8–16", label: "Huéspedes Máx." },
          rating: { value: "5★", label: "Villas de Lujo" },
          privacy: { value: "100%", label: "Privado" }
        },
        pillars: [
          { tag: "Entrenamiento de Élite", title: "Sesiones al amanecer. Partidas al atardecer.", desc: "Entrenamiento dirigido y partidos competitivos en pistas privadas de pádel, adaptado a cada nivel." },
          { tag: "Villas de Lujo", title: "Piscinas infinitas. Pabellones al aire libre.", desc: "Villas boutique en Canggu con personal propio, piscinas privadas y total privacidad en el trópico." },
          { tag: "Bienestar Balinés", title: "Recuperación holística en el paraíso.", desc: "Tratamientos spa balineses, yoga al amanecer, meditación guiada y piscinas de inmersión fría." },
          { tag: "Alma Cultural", title: "El Bali auténtico, curado para ti.", desc: "Rutas a templos al amanecer, ceremonias tradicionales, paseos por terrazas de arroz y clases de cocina privadas." }
        ],
        datesTitle: "Retiros Disponibles",
        dates: [
          { label: "8 – 12 de Julio, 2026", desc: "5 días · 4 noches · Retiro Abierto", spots: "Plazas Limitadas" },
          { label: "22 – 26 de Julio, 2026", desc: "5 días · 4 noches · Retiro Abierto", spots: "Plazas Limitadas" }
        ],
        ctaTitle: "Tu suite en Bali te espera.",
        ctaDesc: "Un grupo íntimo. Una villa privada. Cinco días extraordinarios.",
        ctaBtn: "Reserva tu Plaza",
        ctaSecondaryBtn: "Habla con el Concierge"
      },
      dubaiPage: {
        heroTitle: "DUBÁI",
        heroTagline: "Prestigio Urbano. Pistas del Desierto.",
        heroLocation: "Dubái · EAU",
        heroDate: "Noviembre 2026 · 4 Días · Todo Incluido",
        heroSubtitle: "La ciudad más prestigiosa del mundo como telón de fondo. Pistas iluminadas, suites ático y networking curado en la capital del lujo.",
        sectionTag: "El Destino",
        sectionTitle: "El Retiro en Dubái",
        bookBtn: "Reserva tu Plaza",
        enquireBtn: "Habla con el Concierge",
        whatsappMessage: "Hola, quiero información sobre el retiro de pádel en Dubái.",
        galleryLabel: "Galería",
        galleryNote: "Fotografía próximamente",
        stats: {
          duration: { value: "4", label: "Días" },
          group: { value: "8–14", label: "Huéspedes Máx." },
          rating: { value: "5★", label: "Propiedades" },
          privacy: { value: "100%", label: "Privado" }
        },
        pillars: [
          { tag: "Pistas Premium", title: "Pistas iluminadas con vistas al skyline.", desc: "Pistas de pádel de primera nivel frente al horizonte de Dubái. Sesiones matutinas y nocturnas en condiciones perfectas." },
          { tag: "Suites Ático", title: "Iconos del lujo urbano.", desc: "Las mejores propiedades cinco estrellas de Dubái — del Downtown a Palm Jumeirah — para los huéspedes más exigentes." },
          { tag: "Red de Élite", title: "La mejor compañía posible.", desc: "Listas de invitados curadas. Conversaciones a nivel directivo. Experiencias off-court diseñadas para la élite global." },
          { tag: "Experiencias del Desierto", title: "Más allá de la pista.", desc: "Safaris privados, tours en helicóptero, restaurantes con estrella Michelin y experiencias en yate en el Golfo Arábigo." }
        ],
        datesTitle: "Retiros Disponibles",
        dates: [
          { label: "19 – 22 de Noviembre, 2026", desc: "4 días · 3 noches · Retiro Abierto", spots: "Plazas Limitadas" }
        ],
        ctaTitle: "Dubái. Tu pista está lista.",
        ctaDesc: "Cuatro días. Una ciudad sin igual. La mejor compañía.",
        ctaBtn: "Reserva tu Plaza",
        ctaSecondaryBtn: "Habla con el Concierge"
      },
      testimonials: {
        label: "Lo Que Dicen",
        title: "Recordado mucho después.",
        subtitle: "Invitados que llegaron como jugadores. Se fueron como parte de la comunidad CourtSide.",
        items: [
          {
            name: "M.N.",
            role: "Invitado, 2024",
            text: "Menorca tuvo ese flujo perfecto. Sesiones de pádel soleadas, tardes lentas, cenas increíbles. Cada momento se sintió intencional.",
            initials: "M",
            image: "/imagenes/Cala en porter.jpg"
          },
          {
            name: "J.H.",
            role: "Invitado, 2024",
            text: "Cada momento se sintió intencional. Me fui sintiéndome más ligero, más fuerte y genuinamente agradecido.",
            initials: "J",
            image: "/imagenes/IMG_2167.jpeg"
          },
          {
            name: "L.F.",
            role: "Invitado, 2024",
            text: "La instalación de pádel en Menorca es de primer nivel: pistas profesionales, grandes entrenadores y un ambiente relajado que hace que quieras quedarte para siempre.",
            initials: "L",
            image: "/imagenes/EM-22.jpg"
          },
          {
            name: "N.S.",
            role: "Invitado, 2024",
            text: "La atención y el cuidado en el servicio, la limpieza y la hospitalidad no tienen parangón en ningún otro lugar donde hayamos estado.",
            initials: "N",
            image: "/imagenes/JOPS-721.JPG"
          },
          {
            name: "K.L.",
            role: "Invitado, 2024",
            text: "Mañanas con pádel, yoga en el acantilado, comida de primer nivel y un servicio impecable durante todo el retiro. Así se siente el verdadero lujo.",
            initials: "K",
            image: "/imagenes/binifadet.jpeg"
          },
          {
            name: "E.M.",
            role: "Invitado, 2024",
            text: "Oliver aporta una energía increíble a la pista, combinando un entrenamiento relajado con una mejora enfocada. Una combinación poco común.",
            initials: "E",
            image: "/imagenes/cap roig.jpg"
          }
        ]
      }
    } as const;

export default es;
