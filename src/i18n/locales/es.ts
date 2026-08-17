const es = {
      navbar: {
        ourStory: "Nuestra Historia",
        experience: "La Experiencia",
        destinations: "Destinos",
        upcomingRetreats: "Próximos Retiros",
        menorca: "Menorca",
        bali: "Bali",
        dubai: "Dubái",
        mykonos: "Mykonos"
      },
      experiencePage: {
        heroEyebrow: "La Experiencia",
        heroTitle: "Más allá de la pista.",
        heroSubtitle: "No se trata solo del pádel. Se trata de dónde juegas, con quién juegas y de todo lo que ocurre alrededor del juego.",
        apartTitle: "Lo que nos distingue.",
        apart: [
          {
            title: "Verdadera Experiencia en Pádel",
            desc: "Más de diez años jugando y entrenando a alto nivel, incluidos jugadores de competición en nuestro propio equipo. Conocemos el juego, no solo la industria que lo rodea."
          },
          {
            title: "De Principio a Fin, Por Nosotros",
            desc: "Entrenamiento, hospitalidad, logística y gastronomía, todo gestionado directamente por nuestro equipo. Nada subcontratado, nada genérico."
          },
          {
            title: "Personal, Sea Cual Sea el Formato",
            desc: "Todos los niveles son bienvenidos en cada retiro, con un entrenamiento adaptado jugador por jugador. Para grupos privados y ejecutivos, el itinerario completo se construye a tu medida."
          }
        ],
        offCourtEyebrow: "Fuera de la Pista",
        offCourtTitle: "No termina en el último punto.",
        offCourtText: "Salidas en barco por calas escondidas. Catas de vino y queso en bodegas locales. Atardeceres sobre los acantilados. Rutas por la montaña y la playa. Restaurantes escogidos uno a uno que reflejan cada destino, no un bufé de hotel. La pista es donde empieza. No es donde termina.",
        quoteEyebrow: "En Sus Palabras",
        quote: "Siempre nos ha apasionado el pádel, viajar y la experiencia de descubrir lugares nuevos y conocer gente nueva. Nos dimos cuenta de la facilidad con la que este juego crea conexión, sea cual sea tu nivel o tu procedencia. A través de experiencias compartidas dentro y fuera de la pista, queremos reunir a la gente en lugares hermosos y crear momentos que van mucho más allá de jugar al pádel.",
        quoteAuthor: "Alexi y Oliver Watelet, Co-Fundadores",
        ctaTitle: "¿Listo para vivirlo?",
        ctaText: "Cada retiro CourtSide empieza con una conversación."
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
          headlineLine1: "Retiros de Pádel",
          headlineLine2: "Exclusivos",
          discoverBtn: "Descubre las Experiencias",
          scroll: "Desliza",
          slogan: "Más allá de la pista. Hacia una experiencia.",
          subtitle: "Bienestar, descanso y networking a través del pádel.",
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
      pageLoader: {
        tagline: "Retiros de Pádel de Lujo"
      },
      footer: {
        ariaLabel: "Pie de página",
        quote: "El pádel nos lleva a la pista.<br/>La experiencia lo hace inolvidable.",
        companyLabel: "Compañía",
        corporate: "Corporativo y Ejecutivo",
        contactLabel: "Contacto",
        whatsappConcierge: "Concierge por WhatsApp",
        messageTeam: "Escribe al Equipo",
        whatsappMessage: "Hola, me gustaría informarme sobre un retiro de CourtSide Padel.",
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
        label: "Escríbenos",
        ariaLabel: "Chatea con el equipo de CourtSide por WhatsApp",
        prefillMessage: "Hola, me gustaría hablar con el equipo de CourtSide."
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
        eyebrow: "Retiros Privados a Medida",
        title: "¿Ya Tienes Tus Propias Fechas?",
        description: "¿Ya tienes tu grupo y tus fechas? Cuéntanos tus planes y construiremos el retiro a su alrededor — cualquier semana del año, en Menorca.",
        features: [
          "Mínimo 6 invitados",
          "Cualquier semana del año",
          "Totalmente a medida",
          "Dos meses de antelación"
        ],
        cta: "Planifica Tu Retiro"
      },
      baliPage: {
        heroTitle: "BALI",
        heroTagline: "Lujo en la Jungla. Pádel de Élite.",
        heroLocation: "Uluwatu · Bali",
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
          { tag: "Villas de Lujo", title: "Piscinas infinitas. Pabellones al aire libre.", desc: "Villas boutique sobre los acantilados de Uluwatu con personal propio, piscinas privadas y total privacidad en el trópico." },
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
        ctaSecondaryBtn: "Habla con el Concierge",
        landing: {
          heroAlt: "Piscina infinita al atardecer — finca CourtSide en Bali",
          heroTitle: "Una Escapada a Bali.",
          heroSubtitle: "Una finca privada sobre el acantilado en la península de Bukit, hogar de las únicas pistas de pádel reconocidas por la WPT en la isla. A Mandarin Oriental Home.",
          stayEyebrow: "Dónde te Alojas",
          stayTitle: "Dos formas de vivir Bali.",
          estateTitle: "La Finca",
          estateText: "La finca entera sobre el acantilado, con 8 suites, en exclusiva para ti. Chef privado, mayordomo y concierge, una piscina infinita con vistas al Océano Índico y un pabellón de spa privado. Experiencias incluidas en la propiedad: tratamientos de spa, yoga, clases de cocina, entrenamiento personal y más. Este es el retiro de Bali completo, pensado para grupos que lo quieren todo en una sola propiedad.",
          estateImageAlts: [
            "Vista aérea de la finca de Bali y su piscina infinita",
            "Pabellón de estar al aire libre en la finca de Bali",
            "Suite de la finca de Bali con bañera exterior"
          ],
          studiosTitle: "Los Estudios",
          studiosText: "Habitaciones modernas y cómodas a pocos pasos de las pistas de pádel, ideales para quienes viajan solos, en pareja o para quien prefiera pasar la semana explorando Bali. Con aire acondicionado, baño privado y cocina office. Los extras de la propiedad, como el spa o las clases de cocina, no están incluidos aquí, pero pueden organizarse con socios locales bajo petición.",
          studiosImageAlt: "Los Estudios — habitación interior",
          courtsEyebrow: "Las Pistas",
          courtsTitle: "Las únicas pistas reconocidas por la WPT en Bali.",
          courtsText: "Dos pistas construidas a medida por Padel Galis, proveedor oficial del World Padel Tour. Situadas dentro de la finca, con vistas al Océano Índico. Es la única instalación de este tipo en la isla.",
          courtsImageAlt: "Pistas de Padel Galis en la finca de Bali, con vistas al Océano Índico",
          beyondEyebrow: "Fuera de la Pista",
          beyondTitle: "Bali, más allá de la finca.",
          beyondText: "Surf, buceo, parapente, visitas a templos, ciclismo, sound healing y mucho más, todo organizado por un coordinador local de actividades que conoce la isla al detalle. Sea lo que sea lo tuyo, está a tu alcance.",
          beyondImageAlt: "La costa de Uluwatu, más allá de la finca de Bali",
          closingImageAlt: "El chef privado y el equipo de cocina de la finca de Bali",
          ctaTitle: "¿Listo para Vivir Uluwatu?",
          ctaText: "Las fechas y los precios se confirman en cuanto conocemos tu grupo y tus planes. Itinerario completo disponible bajo petición.",
          ctaBtn: "Consulta sobre Bali"
        }
      },
      dubaiPage: {
        heroTitle: "DUBÁI",
        heroTagline: "Prestigio Urbano. Pistas del Desierto.",
        heroLocation: "Próximamente",
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
        ctaSecondaryBtn: "Habla con el Concierge",
        landing: {
          heroAlt: "El skyline de Dubái a la hora dorada",
          title: "Dubái.<br/>Próximamente.",
          text: "Estamos preparando algo especial para Dubái. Escríbenos si quieres ser de los primeros en saberlo cuando esté listo.",
          ctaBtn: "Contacta con Nosotros"
        }
      },
      mykonosPage: {
        heroTitle: "MYKONOS",
        heroTagline: "Elegancia del Egeo. Pádel de Élite.",
        heroLocation: "Mykonos · Grecia",
        heroDate: "Temporada 2027 · 5 Días · Todo Incluido",
        heroSubtitle: "Pueblos encalados, un Egeo interminable y pádel de élite a la hora dorada. Cinco días de entrenamiento y lujo bañado por el sol en una de las islas más icónicas de Europa.",
        sectionTag: "El Destino",
        sectionTitle: "El Retiro en Mykonos",
        bookBtn: "Reserva tu Plaza",
        enquireBtn: "Habla con el Concierge",
        whatsappMessage: "Hola, quiero información sobre el retiro de pádel en Mykonos.",
        galleryLabel: "Galería",
        galleryNote: "Fotografía próximamente",
        stats: {
          duration: { value: "5", label: "Días" },
          group: { value: "8–16", label: "Huéspedes Máx." },
          rating: { value: "5★", label: "Villas Cicládicas" },
          privacy: { value: "100%", label: "Privado" }
        },
        pillars: [
          { tag: "Entrenamiento de Élite", title: "Sesiones matinales. Partidas a la hora dorada.", desc: "Entrenamiento dirigido y partidos competitivos con el Egeo de fondo, adaptado a cada nivel." },
          { tag: "Villas Cicládicas", title: "Muros encalados. Vistas infinitas al mar.", desc: "Villas selectas sobre el acantilado con piscina privada, vistas al Egeo y total privacidad frente al mar." },
          { tag: "Bienestar del Egeo", title: "Recuperación, al estilo isleño.", desc: "Baños en el mar, yoga al atardecer, rituales de spa mediterráneo y largas comidas pensadas para la recuperación total." },
          { tag: "Alma Isleña", title: "El Mykonos auténtico, curado para ti.", desc: "Salidas privadas en barco a calas escondidas, atardeceres en Little Venice, el casco antiguo de Chora y noches de beach club en las Cícladas." }
        ],
        datesTitle: "Retiros Disponibles",
        dates: [
          { label: "Temporada 2027", desc: "5 días · 4 noches · Retiro Abierto", spots: "Fechas por confirmar" }
        ],
        ctaTitle: "Mykonos. Tu pista sobre el Egeo.",
        ctaDesc: "Un grupo íntimo. Una villa privada. Cinco días frente al mar.",
        ctaBtn: "Reserva tu Plaza",
        ctaSecondaryBtn: "Habla con el Concierge"
      },
      upcomingRetreatsPage: {
        eyebrow: "Próximos 12–18 Meses",
        heroTitle: "Próximos Retiros.",
        heroSubtitle: "Pádel de élite, compañía excepcional y todo lo que rodea al juego cuidado al detalle — en cada destino CourtSide.",
        bespokeNote: "Fechas a medida disponibles bajo petición.",
        destinations: {
          menorca: {
            name: "Menorca",
            location: "Islas Baleares · España",
            dates: ["Octubre 2026", "Abril 2027", "Mayo 2027", "Junio 2027", "Septiembre 2027", "Octubre 2027"],
            cta: "Descubre Menorca"
          },
          bali: {
            name: "Bali",
            location: "Uluwatu · Bali",
            dates: ["Marzo 2027", "Julio 2027", "Agosto 2027"],
            cta: "Descubre Bali"
          }
        },
        ctaTitle: "¿Tienes tus propias fechas en mente?",
        ctaText: "Cuéntanos tus planes y construiremos el retiro a tu medida.",
        ctaBtn: "Planifica tu Retiro"
      },
      homePage: {
        retreatTypes: {
          ariaLabel: "Tipos de retiro",
          eyebrow: "Formatos de Retiro",
          title: "Elige tu Retiro.",
          explore: "Descubrir",
          viewDetails: "ver detalles",
          items: {
            open: {
              tag: "Solo o con Amigos",
              name: "Retiro Abierto",
              desc: "Únete a un grupo selecto de jugadores afines para cinco días inmersivos de pádel, alta gastronomía y vida mediterránea."
            },
            private: {
              tag: "Privacidad Absoluta",
              name: "Retiro Privado",
              desc: "Reserva la finca entera en exclusiva para tu grupo. Privacidad total, horario a medida e inmersión completa."
            },
            executive: {
              tag: "Alta Dirección",
              name: "Corporativo y Ejecutivo",
              desc: "Estrategia en silencio. Liderazgo de alto rendimiento y networking en el entorno de pádel más exclusivo."
            }
          }
        },
        destinations: {
          eyebrow: "Confirmado 2026",
          title: "Nuestro Destino",
          location: "Islas Baleares · España",
          tagline: "Santuario Mediterráneo",
          dates: "30 Sep – 4 Oct, 2026",
          spots: "Pocas Plazas Disponibles",
          explore: "Descubrir"
        },
        upcoming: {
          eyebrow: "Fechas por Confirmar",
          title: "Próximos Retiros",
          subtitle: "Nuevos destinos en desarrollo para nuestro calendario de 2027. Regístrate y sé el primero en saberlo.",
          viewAll: "Ver todos",
          explore: "Descubrir",
          items: {
            bali: { tagline: "Una finca privada sobre el acantilado. Pádel de élite.", location: "Uluwatu · Bali" },
            dubai: { tagline: "Próximamente.", location: "Próximamente" }
          }
        },
        partners: {
          ariaLabel: "Nuestros socios",
          eyebrow: "Nuestros Socios",
          title: "En alianza con los mejores."
        }
      },
      ourStoryPage: {
        heroAlt: "CourtSide Padel — Nuestra Historia",
        heroEyebrow: "Los Fundadores",
        heroTitle: "Nuestra Historia.",
        heroSubtitle: "Hermanos gemelos. Caminos distintos. El pádel lo cambió todo.",
        beganEyebrow: "Cómo Empezó",
        beganTitle: "Nacido de una<br/>obsesión compartida.",
        beganParagraphs: [
          "Somos hermanos gemelos, nacidos en Nueva York y criados en Londres. De niños lo hacíamos todo juntos: entrenar, competir, viajar, siempre persiguiendo la siguiente oportunidad que el deporte podía darnos. A los 15 años eso cambió. Alexi se marchó al sur de Francia para intentar ser tenista profesional. Oliver se quedó en Londres, atraído por el fútbol. Los deportes de raqueta siempre habían formado parte de quienes éramos, pero durante unos años la vida nos llevó por caminos distintos.",
          "Viajando por Menorca en 2019 cogimos una pala por primera vez y nos enganchamos al instante, no solo por el juego, sino por todo lo que lo rodea: salir de la pista a tomar algo, conocer gente nueva, tirarse a la piscina después de un partido. Competitivo, pero social. Sobre esa combinación está construido CourtSide.",
          "La idea fue tomando forma poco a poco. Los dos habíamos crecido viajando, expuestos desde pequeños a nuevos lugares y culturas, un amor que nunca nos abandonó. A medida que el pádel se convertía en uno de los deportes que más rápido crecen del mundo, encajó todo: unir un destino precioso con pádel de primer nivel, reunir a la gente y construir algo alrededor de la sensación que encontramos por primera vez en Menorca.",
          "Menorca no fue una elección al azar. Es la isla donde nos enamoramos de este deporte, y a la que hemos vuelto ocho años seguidos. Era el lugar obvio para construir el primer retiro CourtSide."
        ],
        foundersEyebrow: "Las Personas Detrás",
        foundersTitle: "Conoce a los fundadores.",
        founderRole: "Cofundador",
        founderAlt: "Cofundador, CourtSide Padel",
        foundersQuote: "Alexi creció persiguiendo el tenis. Oliver creció persiguiendo el fútbol. El pádel nos dio exactamente la misma obsesión, solo que con otro juego.",
        believeEyebrow: "En Qué Creemos",
        believeQuote: "El pádel nos lleva a la pista.<br/>La experiencia lo hace inolvidable.",
        believeText: "Los mejores retiros no se sienten como eventos. Se sienten como esa semana de la que sigues hablando tres años después.",
        ctaTitle: "¿Listo para escribir tu propia historia?",
        ctaText: "Cada retiro CourtSide empieza con una conversación."
      },
      executivePage: {
        heroAlt: "Grupo reducido en pleno punto — retiro de pádel Corporativo y Ejecutivo",
        heroTitle: "Retiros Corporativos y Ejecutivos.",
        heroSubtitle: "Desde offsites de liderazgo y team building hasta viajes de incentivo y retiros de consejo, diseñamos retiros de pádel cerrados y a medida para empresas de todo tipo.",
        quote: "El pádel es social por naturaleza. Es competitivo, pero nunca demasiado serio: se juega en dobles, en una pista pequeña que mantiene a todos lo bastante cerca para hablar entre puntos. De algún modo consigue que la gente se comunique y trabaje en equipo sin apenas proponérselo.",
        formatEyebrow: "El Formato",
        formatTitle: "Un retiro cerrado.<br/>Tu agenda.",
        formatText: "El Retiro Ejecutivo es una experiencia totalmente cerrada y a medida para equipos directivos, consejos y grupos de empresa de cualquier tipo. Tu grupo dispone de todo nuestro equipo durante el retiro. Puede organizarse una privatización total, ya sea de una finca entera o de una villa privada, según el destino.",
        formatImageAlt: "Pista de pádel vacía, privada y tranquila",
        pillars: [
          {
            number: "01",
            title: "Exclusividad Total",
            desc: "Una privatización completa, ya sea de una finca entera o de una villa privada, puede organizarse bajo petición según el destino."
          },
          {
            number: "02",
            title: "Programa a Medida",
            desc: "Desde la intensidad del entrenamiento hasta sesiones de trabajo, días de spa y cenas privadas, cada elemento se construye a partir de tu brief."
          },
          {
            number: "03",
            title: "Discreción Absoluta",
            desc: "Acuerdos de confidencialidad, coordinación de traslados privados y total confidencialidad por parte de nuestro equipo, en cada retiro que organizamos."
          }
        ],
        ctaEyebrow: "Empieza la Conversación",
        ctaTitle: "Todo retiro corporativo<br/>empieza con un brief.",
        ctaText: "Cuéntanos tus objetivos, el tamaño del grupo y las fechas preferidas. Construiremos el programa a tu medida.",
        ctaBtn: "Consulta sobre un Retiro Corporativo"
      },
      testimonials: {
        label: "Lo Que Dicen Nuestros Invitados",
        title: "Recordado mucho después.",
        subtitle: "Los invitados llegan como jugadores. Se van formando parte de la comunidad CourtSide.",
        // Testimonios reales de invitados con fotos reales, fechados en 2026
        // (posterior a "Est. 2025").
        items: [
          {
            name: "Dylan Sweidan",
            role: "Invitado · Menorca",
            text: "Menorca fue el escenario perfecto para un retiro de pádel. El equilibrio entre el tiempo en pista, la buena comida, explorar la isla y relajarse junto al mar hizo que se sintiera como mucho más que un simple viaje de entrenamiento.",
            initials: "D",
            image: "/imagenes/cms/testimonial-dylan-sweidan.jpg"
          },
          {
            name: "Katja Bonnavion",
            role: "Invitada · Menorca",
            text: "Pasé unos 5 días increíbles. El hotel, los restaurantes y las actividades fueron excelentes, y el coaching se adaptó al nivel de cada uno, lo que hizo que cada sesión fuera disfrutable.",
            initials: "K",
            image: "/imagenes/cms/testimonial-katja-bonnavion.jpg"
          },
          {
            name: "Anatole Levy",
            role: "Invitado · Menorca",
            text: "Lo que más destacó fue lo completa que fue la experiencia. Jugamos mucho al pádel, pero también conocimos lo mejor de Menorca, comimos en lugares fantásticos y conocimos a gente estupenda. Volvería a reservar sin dudarlo.",
            initials: "A",
            image: "/imagenes/cms/testimonial-anatole-levy.jpg"
          },
          {
            name: "Sergi Pons",
            role: "Invitado · Menorca",
            text: "Si buscas mejorar tu pádel, lo recomiendo sin duda. El coaching fue de gran calidad, las sesiones eran dinámicas y salí sintiéndome mucho más seguro en la pista.",
            initials: "S",
            image: "/imagenes/cms/testimonial-sergi-pons.jpg"
          }
        ]
      },
      enquiryForm: {
        triggerLabel: "Consultar Sobre un Retiro",
        eyebrow: "Consulta de Retiro",
        title: "Construyamos tu retiro.",
        close: "Cerrar formulario de consulta",
        back: "Atrás",
        next: "Continuar",
        submit: "Enviar consulta",
        sending: "Enviando…",
        emailSubject: "Consulta de retiro CourtSide",
        steps: {
          destination: {
            question: "¿Dónde te gustaría jugar?",
            help: "Elige un destino, o dinos que aún lo estás decidiendo.",
            options: {
              menorca: "Menorca",
              bali: "Bali",
              dubai: "Dubái",
              undecided: "Aún lo estoy decidiendo"
            }
          },
          dates: {
            question: "¿Cuándo estás pensando en viajar?",
            help: "Los retiros privados se organizan cualquier semana del año, con dos meses de antelación.",
            monthLabel: "Mes",
            yearLabel: "Año",
            months: {
              january: "Enero",
              february: "Febrero",
              march: "Marzo",
              april: "Abril",
              may: "Mayo",
              june: "Junio",
              july: "Julio",
              august: "Agosto",
              september: "Septiembre",
              october: "Octubre",
              november: "Noviembre",
              december: "Diciembre",
              flexible: "Flexible"
            }
          },
          group: {
            question: "¿Cuántos vais a viajar?",
            help: "Incluyendo a los acompañantes que no vayan a jugar.",
            label: "Tamaño del grupo",
            placeholder: "p. ej. 8",
            note: "Los retiros privados se organizan con un mínimo de 6 invitados. ¿Viajas solo o en pareja? Nuestros retiros abiertos son la opción perfecta."
          },
          priorities: {
            question: "¿Qué es lo que más te importa?",
            help: "Elige tantas opciones como quieras — nos ayuda a diseñar la semana en torno a tu grupo.",
            options: {
              coaching: "Entrenamiento y mejora",
              matchplay: "Partidos competitivos",
              wellness: "Bienestar y recuperación",
              dining: "Gastronomía y vino",
              boatAndSea: "Días de barco y mar",
              culture: "Cultura local y explorar",
              celebration: "Un cumpleaños o celebración",
              corporate: "Un offsite de empresa o de liderazgo"
            },
            notesLabel: "¿Algo más que debamos saber?",
            notesPlaceholder: "La ocasión, los niveles de juego, imprescindibles…"
          },
          contact: {
            question: "¿Cómo podemos contactarte?",
            help: "Uno de los fundadores te responderá personalmente, normalmente en menos de 24 horas.",
            firstName: "Nombre",
            lastName: "Apellidos",
            email: "Correo electrónico",
            phone: "Teléfono",
            phoneOptional: "Opcional",
            consent: "Acepto que CourtSide Padel use estos datos para responder a mi consulta."
          }
        },
        errors: {
          destination: "Elige un destino para continuar.",
          dates: "Elige un mes y un año.",
          group: "Dinos cuántos invitados vais a viajar.",
          name: "Introduce tu nombre y apellidos.",
          email: "Introduce una dirección de correo válida.",
          consent: "Acepta el uso de tus datos para que podamos responderte.",
          submit: "Algo ha fallado al enviar tu consulta. Escríbenos a executive@courtsidepadel.com y la atenderemos de inmediato."
        },
        success: {
          title: "Gracias.",
          body: "Hemos recibido tu consulta. Uno de los fundadores se pondrá en contacto personalmente para empezar a dar forma a tu retiro."
        }
      }
    } as const;

export default es;
