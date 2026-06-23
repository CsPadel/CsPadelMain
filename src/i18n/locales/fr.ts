const fr = {
      navbar: {
        about: "À Propos",
        services: "Services",
        destinations: "Destinations",
        menorca: "Menorca",
        bali: "Bali",
        dubai: "Dubai"
      },
      aboutPage: {
        heroTitle: "AU-DELÀ DU COURT",
        heroSubtitle: "Oliver et Alexy Watellet ont pour mission d'élever l'expérience padel à l'échelle mondiale, en fusionnant performance athlétique de premier plan et luxe sans compromis.",
        teamTitle: "Les Esprits Créateurs",
        team: [
          { name: "Oliver Watellet", role: "Co-fondateur & Vision stratégique", photo: "/imagenes/about-us/oli.webp" },
          { name: "Alexy Watellet", role: "Co-fondateur & Directeur sportif", photo: "/imagenes/about-us/alex.webp" },
          { name: "Carlos M.", role: "Entraîneur principal (Menorca)", photo: "/team/carlos.jpg" },
          { name: "Elena R.", role: "Concierge en chef", photo: "/team/elena.jpg" }
        ]
      },
      servicesPage: {
        heroTitle: "SÉLECTIONNÉ POUR L'EXCELLENCE",
        heroSubtitle: "Que vous recherchiez un raffinement personnel, un sanctuaire privé pour votre cercle intime ou un lieu stratégique pour votre conseil d'administration, nos services s'adaptent à vos ambitions.",
        individual: {
          title: "Suites Privées",
          desc: "Idéal pour la personne exigeante ou les couples. Connectez-vous, jouez et détendez-vous dans un luxe privé tout en profitant de nos programmes padel de classe mondiale.",
          action: "Découvrir les Suites"
        },
        group: {
          title: "Exclusivité Villa Intégrale",
          desc: "Intimité absolue pour votre cercle de confiance de 8 à 20 convives. Le véritable luxe, c'est de disposer de l'ensemble du domaine rien que pour vous.",
          action: "Réserver une Villa"
        },
        corporate: {
          title: "Stratégie Dirigeants",
          desc: "Éloignez-vous du tumulte. Retraites exécutives conçues pour une concentration absolue, un réseautage de haut vol et un team building au plus haut niveau.",
          action: "Télécharger le Dossier"
        }
      },
      hero: {
        title: "COURTSIDE",
        subtitle: "Performance sans effort. Connectez-vous, jouez et détendez-vous dans nos suites privées.",
        bookBtn: "Réserver une Suite"
      },
      sidebar: {
        selectDateInfo: "Choisir une date",
        selectRetreatInfo: "Choisir une retraite",
        yourExperience: "Votre expérience",
        chooseHow: "Choisissez comment vous souhaitez poursuivre votre réservation.",
        chooseRetreat: "Choisissez votre retraite destination.",
        selectedRetreat: "Destination",
        retreats: {
          menorca: "Menorca",
          bali: "Bali",
          dubai: "Dubai"
        },
        availableDatesInfo: "Dates disponibles",
        dates: {
          menorca: {
            date1: "8 - 11 octobre 2026",
            date2: "21 - 25 octobre 2026"
          },
          bali: {
            date1: "8 - 12 juillet 2026",
            date2: "22 - 26 juillet 2026"
          },
          dubai: {
            date1: "19 - 22 novembre 2026"
          }
        },
        desiredDate: "Date souhaitée",
        mockDate: "14 - 16 novembre 2026",
        changeBtn: "Modifier",
        viewDetailsBtn: "Voir les détails de la destination",
        directCheckoutBtn: "Procéder au paiement",
        conciergeBtn: "Parler à mon concierge"
      },
      menorcaPage: {
        heroTitle: "MENORCA",
        heroSubtitle: "Un sanctuaire méditerranéen. Cinq jours. Padel, art de vivre, sérénité.",
        heroMeta: "30 sept. – 4 oct. 2026 · Menorca · Tout compris",
        bookBtn: "Découvrir l'expérience",
        agendaTitle: "Le Programme",
        itineraryEyebrow: "Programme",
        itineraryTitle: "Le Programme",
        faqTitle: "Questions fréquentes",
        faqViewLess: "Voir moins",
        faqViewAll: "Voir toutes les questions",
        whatsIncluded: {
          title: "Que comprend la formule ?",
          subtitle: "De votre arrivée à votre départ, chaque détail de votre retraite est pris en charge — coaching, gastronomie, transport, activités, le tout inclus.",
          pillars: [
            {
              tag: "Coaching d'élite",
              title: "Coaching et matchplay adaptés à tous les niveaux.",
              desc: "Animé par d'anciens professionnels dans l'un des établissements padel les plus prestigieux de Menorca — club d'attache de l'un des meilleurs joueurs mondiaux."
            },
            {
              tag: "Séjour de luxe",
              title: "Confort 5 étoiles au Barceló Nura.",
              desc: "Chambres lumineuses avec terrasses privées ou piscines semi-privées, spa complet et cuisine méditerranéenne."
            },
            {
              tag: "Gastronomie raffinée",
              title: "Un voyage culinaire soigneusement orchestré.",
              desc: "Entre les petits-déjeuners au Barceló Nura et une sélection de restaurants locaux, dont une adresse reconnue par le guide Michelin."
            },
            {
              tag: "Expériences sur mesure",
              title: "Des escapades insulaires sélectionnées avec soin.",
              desc: "Croisières privées, expériences au coucher du soleil, visites de vignobles avec dégustations de vins et fromages, et soins au spa."
            }
          ]
        },
        // agenda: each activity has an `image` field — a standalone path string (e.g. "/imagenes/filename.jpg")
        // Update any image by changing only its path here; no component code changes needed.
        agenda: [
          {
            dayStr: 'Jour 01',
            date: 'Mar 30 sept.',
            label: 'Arrivée & Accueil',
            activities: [
              {
                time: 'Matin',
                title: 'Arrivée & Enregistrement',
                desc: 'Transferts privés depuis l\'aéroport vers le Barceló Nura. Cocktails de bienvenue à l\'arrivée et coffrets d\'accueil dans les chambres.',
                image: '/imagenes/IMG_2914.JPG',
              },
              {
                time: '14:00 – 16:30',
                title: 'Déjeuner en bord de mer',
                desc: 'Savourez un déjeuner relaxant au bord de mer pour lancer la retraite et faire connaissance avec les autres convives.',
                image: '/imagenes/Cala en porter.jpg',
              },
              {
                time: '17:00 – 18:30',
                title: 'Session padel d\'échauffement',
                desc: 'Session introductive décontractée au Padelin. Mixers pour échauffer le groupe dans un format convivial et détendu.',
                image: '/imagenes/EM-4.jpg',
              },
              {
                time: '20:00',
                title: 'Dîner de bienvenue',
                desc: 'Dîner d\'ouverture au restaurant Ses Forquilles à Mahón. Réservation de groupe confirmée.',
                image: '/imagenes/bambu.jpg',
              },
            ],
          },
          {
            dayStr: 'Jour 02',
            date: 'Mer 1 oct.',
            label: 'Padel & Croisière',
            activities: [
              {
                time: '08:30 – 09:15',
                title: 'Petit-déjeuner — Barceló Nura',
                desc: 'Petit-déjeuner en groupe avec places réservées à l\'hôtel. Rechargez vos batteries avant une matinée complète sur le court.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '10:00 – 12:00',
                title: 'Coaching padel & matchplay',
                desc: 'Sessions sur court au Padelin avec exercices dirigés par le coach et matchplay compétitif.',
                image: '/imagenes/EM-22.jpg',
              },
              {
                time: '13:45 – 17:30',
                title: 'Déjeuner & Croisière — Sa Punta',
                desc: 'Déjeuner au restaurant Sa Punta suivi d\'une croisière privée au départ d\'Es Castell.',
                image: '/imagenes/Cala en porter.jpg',
              },
              {
                time: '20:00',
                title: 'Dîner — Hôtel / Soirée libre',
                desc: 'Repas à l\'hôtel inclus. Le concierge est à votre disposition pour vous conseiller en matière de restaurants.',
                image: '/imagenes/2313 copy.jpg',
              },
            ],
          },
          {
            dayStr: 'Jour 03',
            date: 'Jeu 2 oct.',
            label: 'Padel & Vignoble',
            activities: [
              {
                time: '08:30 – 09:15',
                title: 'Petit-déjeuner — Barceló Nura',
                desc: 'Petit-déjeuner en groupe avec places réservées. Présentation des sessions par niveau autour de la table.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '10:00 – 12:00',
                title: 'Coaching padel & matchs',
                desc: 'Sessions par niveau au Padelin. Perfectionnement technique et jeu compétitif.',
                image: '/imagenes/EM-53.jpg',
              },
              {
                time: '13:30 – 16:30',
                title: 'Visite du vignoble & Déjeuner — Binifadet',
                desc: 'Visite et déjeuner au domaine Binifadet. Dégustation de vins et fromages incluse.',
                image: '/imagenes/binifadet.jpeg',
              },
              {
                time: '20:00',
                title: 'Dîner — La Calita',
                desc: 'Dîner au restaurant La Calita. Repas à l\'hôtel inclus.',
                image: '/imagenes/2313 copy.jpg',
              },
            ],
          },
          {
            dayStr: 'Jour 04',
            date: 'Ven 3 oct.',
            label: 'Tournoi & Coucher de soleil',
            activities: [
              {
                time: '07:30 – 08:15',
                title: 'Petit-déjeuner matinal — Barceló Nura',
                desc: 'Journée de tournoi qui commence tôt. Packs d\'hydratation prêts et places réservées pour le groupe.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '09:00 – 13:00',
                title: 'Tournoi padel — Padelin',
                desc: 'Tournoi round-robin en double mixte au Padelin. Trophée et prix confirmés avec l\'établissement.',
                image: '/imagenes/JOPS-1071.JPG',
              },
              {
                time: '13:00 – 14:30',
                title: 'Déjeuner du tournoi & Remise des prix',
                desc: 'Déjeuner sur place au Padelin suivi de la cérémonie de remise des trophées et des prix.',
                image: '/imagenes/2808 copy.jpg',
              },
              {
                time: '17:00 – 19:00',
                title: "Coucher de soleil & Tapas — Cova d'en Xoroi",
                desc: "Musique live, tapas et cocktails au mythique Cova d'en Xoroi. Coucher du soleil vers 19h30.",
                image: '/imagenes/cap roig.jpg',
              },
            ],
          },
          {
            dayStr: 'Jour 05',
            date: 'Sam 4 oct.',
            label: 'Dernière session & Adieux',
            activities: [
              {
                time: '08:30 – 09:15',
                title: 'Dernier petit-déjeuner — Barceló Nura',
                desc: 'Dernier petit-déjeuner en groupe. Bagages à sortir avant 11h00.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '10:30 – 13:00',
                title: 'Session padel optionnelle — Padelin',
                desc: 'Session décontractée en accès libre pour ceux dont le vol le permet. Entièrement optionnelle.',
                image: '/imagenes/EM-81.jpg',
              },
              {
                time: 'À partir de 11h00',
                title: 'Départ & Transferts vers l\'aéroport',
                desc: 'Transferts privés selon l\'horaire de vol de chacun. Départ tardif disponible sur demande.',
                image: '/imagenes/IMG_2914.JPG',
              },
            ],
          }
        ],
        faq: [
          { q: "Faut-il avoir une expérience du padel ?", a: "Non. Nos retraites accueillent tous les niveaux — le coaching est adapté, des débutants qui posent leurs bases aux joueurs confirmés qui affinent leur stratégie." },
          { q: "La formule est-elle tout compris ?", a: "Oui. Tout ce qui figure au programme est inclus — hébergement, tous les repas, coaching, matchplay, transport local et activités. Vous êtes libre de ne pas participer à certaines activités. Toute réservation en dehors du programme est à votre charge." },
          { q: "Les vols et transferts aéroport sont-ils inclus ?", a: "Les transferts vers et depuis l'aéroport de Mahón sont inclus. Les vols ne le sont pas — notre concierge peut vous conseiller sur les itinéraires ou organiser un vol privé sur demande." },
          { q: "Un accompagnateur non-joueur peut-il participer ?", a: "Oui. Les accompagnateurs non-joueurs paient le même tarif retraite, et leur programme peut être personnalisé selon leurs envies." },
          { q: "Et les régimes alimentaires ?", a: "Notre chef privé sur place élabore des menus sur mesure à partir d'un questionnaire bien-être et alimentaire envoyé avant votre arrivée." },
          { q: "Combien de convives par retraite ?", a: "Chaque retraite ouverte est limitée en effectif pour préserver l'exclusivité. Les retraites privées accueillent un minimum de 6 convives." },
          { q: "Puis-je prolonger mon séjour avant ou après la retraite ?", a: "Oui — nous pouvons organiser des nuits supplémentaires au Barceló Nura sur demande." },
          { q: "Puis-je réserver une retraite privée à d'autres dates ?", a: "Oui. Nous organisons des retraites privées entièrement sur mesure toute l'année, avec un minimum de 6 convives et un préavis de 2 mois." },
          { q: "Quand a lieu la prochaine retraite à Menorca ?", a: "Du 30 septembre au 4 octobre 2026 (4 nuits, 5 jours). Places limitées — réservation anticipée recommandée." },
          { q: "Quel est l'acompte et quand le solde est-il dû ?", a: "Un acompte de 40 % garantit votre place. Le solde restant est dû 6 semaines avant la date de début de la retraite." },
          { q: "Quelle est la politique d'annulation ?", a: "Les annulations effectuées plus de 10 semaines avant la date de début de la retraite donnent droit au remboursement intégral de l'acompte. Dans les 10 semaines précédant le début, l'acompte de 40 % devient non remboursable." }
        ],
        rooms: {
          sectionTag: "Hébergement",
          title: "Options de réservation",
          subtitle: "Connectez-vous, jouez et détendez-vous dans nos suites privées.",
          priceLabel: "Prix total de la retraite",
          whatsIncluded: "Ce qui est inclus",
          securePlace: "Réserver votre place",
          openRetreat: {
            name: "Retraite Ouverte",
            tag: "Seul ou entre amis",
            priceFrom: "",
            priceShared: "à partir de 2 400 £ (occupation partagée)",
            priceSingle: "à partir de 1 750 £ (occupation simple)",
            description: "Seul ou avec un ami. Partagez la retraite avec un groupe sélectionné de joueurs partageant les mêmes aspirations. Dates ouvertes, groupe mixte.",
            capacity: "1 à 2 convives par suite",
            amenities: ["Hébergement", "Tous les repas", "Coaching", "Matchplay", "Transport local", "Activités"]
          },
          privateRetreat: {
            name: "Retraite Privée",
            tag: "Intimité absolue",
            priceFrom: "",
            description: "Réservez l'intégralité de la retraite exclusivement pour votre groupe d'amis ou de famille.",
            capacity: "8 à 20 convives",
            amenities: ["4 nuits tout compris", "Exclusivité totale", "Courts privés", "Programme personnalisé"]
          },
          corporateRetreat: {
            name: "Retraite Corporate / Executive",
            tag: "Comité de direction",
            priceFrom: "",
            description: "Une retraite fermée conçue pour les séminaires d'entreprise, les équipes dirigeantes ou l'hospitalité client. Programme sur mesure disponible.",
            capacity: "Jusqu'à 20 dirigeants",
            amenities: ["4 nuits tout compris", "Salle de réunion privée", "Concierge affaires"]
          }
        }
      },
      checkout: {
        title: "Paiement direct",
        placeholderTitle: "Espace réservé à l'intégration JotForm",
        placeholderDesc: "Espace réservé à l'iframe Jotform connecté à Stripe.",
        backBtn: "← Retour"
      },
      concierge: {
        title: "Concierge personnel",
        desc: "Laissez vos coordonnées ; un spécialiste personnalisera votre retraite.",
        nameLabel: "Nom complet",
        namePlaceholder: "Ex. Richard Branson",
        emailLabel: "E-mail de contact",
        emailPlaceholder: "richard@company.co.uk",
        submitBtn: "Demander un appel"
      },
      groupVilla: {
        sideTitle: "LE SANCTUAIRE PRIVÉ",
        sideDesc: "Réservation exclusive de villa entière. La véritable intimité ne se partage pas.",
        formTitle: "Groupe exclusif",
        formDesc: "Réservez l'intégralité de la villa pour votre cercle intime. Conçu pour 8 à 20 convives.",
        guestsLabel: "Nombre de convives (8-20)",
        investment: "Investissement",
        priceHint: "À partir de 12 500 $ USD",
        submitBtn: "Finaliser la réservation et payer",
        finaliseTitle: "Finaliser la réservation",
        simulatingCheckout: "Simulation du parcours de paiement Stripe en mode test pour {{count}} convives.",
        backToForm: "← Retour au formulaire",
        alertMinGuests: "Le groupe doit compter entre 8 et 20 convives."
      },
      corporate: {
        title: "STRATÉGIE <br/> DANS LE SILENCE",
        desc: "Retraites pour comité de direction conçues pour une concentration absolue. Explorez nos options en toute autonomie. Un dossier exécutif détaillé, sans intermédiaires.",
        downloadLabel: "Télécharger le dossier",
        emailLabel: "E-mail professionnel",
        emailPlaceholder: "executive@corporation.co.uk",
        verticalLabel: "Secteur d'intérêt",
        verticalValues: {
          leadership: "Leadership",
          teamBuilding: "Team building",
          cSuite: "Comité de direction"
        },
        getDossierBtn: "Obtenir le dossier",
        generatingPdf: "Génération du PDF...",
        downloadComplete: "Téléchargement terminé : "
      },
      gateway: {
        hero: {
          introLine1: "Retraites d'exception,",
          introLine2: "orchestrées avec soin.",
          intro: "Des retraites padel d'exception, orchestrées avec soin.",
          subtitle: "Retraites ultra-luxe. Bien-être, repos et réseautage stratégique autour du padel.",
          intent: "Composez votre séjour. Que recherchez-vous aujourd'hui ?",
          individual: "Suite personnelle",
          individualSub: "Pour vous connecter et vous détendre",
          group: "Villa entière",
          groupSub: "Pour votre cercle de confiance",
          corporate: "Retraite executive",
          corporateSub: "De haut vol pour votre entreprise",
          individualDescriptor: "Un court privé. Vos règles.",
          groupDescriptor: "Un domaine exclusif pour votre cercle.",
          corporateDescriptor: "Stratégie. Sur et en dehors du court."
        },
        luxuryStrip: {
          destinations: "Destinations exclusives",
          privateAccess: "Accès privé",
          curatedProperties: "Propriétés sélectionnées",
          conciergeService: "Service concierge"
        },
        individual: {
          title: "Votre suite personnelle.",
          desc: "Connectez-vous, reposez-vous et jouez au plus haut niveau dans un espace réservé à votre sérénité.",
          directPay: "Procéder au paiement direct",
          talkConcierge: "Parler à mon concierge",
          simPayTitle: "Simulation de paiement direct",
          simPayDesc: "C'est ici que le formulaire Jotform connecté à Stripe (mode test) serait intégré.",
          loadingCheckout: "Chargement du paiement sécurisé",
          backOpts: "← Retour aux options",
          nameHolder: "Votre nom",
          phoneHolder: "Téléphone (WhatsApp)",
          reqCall: "Demander un appel"
        },
        group: {
          title: "Un espace privé pour votre cercle intime.",
          desc: "Réservez une villa entière exclusivement pour vous et votre cercle de confiance.",
          sizeLabel: "Taille du groupe",
          guests: "Convives",
          min: "Min",
          max: "Max",
          bookBtn: "Réserver la villa exclusive",
          securingFor: "Réservation de la villa pour {{count}} personnes",
          redirectDesc: "Redirection vers votre environnement sécurisé pour bloquer les dates de votre groupe (simulation Stripe Checkout).",
          back: "← Retour"
        },
        corporate: {
          title: "Vision corporate.",
          desc: "Téléchargez en toute autonomie le dossier exécutif conçu pour les besoins de votre entreprise.",
          emailLabel: "E-mail professionnel",
          objectiveLabel: "Objectif de la retraite",
          selectFocus: "Sélectionnez l'axe stratégique...",
          optLeadership: "Développement du leadership",
          optTeamBuilding: "Team building comité de direction",
          optCLevel: "Conseil d'administration (dirigeants)",
          processingFile: "Traitement du fichier sécurisé",
          downloadDossier: "Télécharger le dossier PDF",
          dossierDownloaded: "Dossier téléchargé",
          downloadSuccessDesc: "Le fichier PDF a été transmis en toute sécurité. Consultez votre dossier de téléchargements local.",
          backHome: "Retour à l'accueil"
        }
      },
      footer: {
        rights: "© 2026 CourtSide Padel. Tous droits réservés.",
        privacy: "Politique de confidentialité",
        terms: "Conditions d'utilisation",
        cookies: "Politique de cookies"
      },
      cookieConsent: {
        title: "Nous utilisons des cookies",
        description: "Nous utilisons des cookies essentiels pour faire fonctionner ce site et des cookies optionnels pour comprendre son utilisation. Vous pouvez accepter tous les cookies ou refuser ceux qui ne sont pas essentiels.",
        policyLink: "En savoir plus",
        accept: "Tout accepter",
        reject: "Refuser les non essentiels"
      },
      whatsappConcierge: {
        label: "Concierge 24/7",
        ariaLabel: "Discutez avec notre concierge sur WhatsApp",
        prefillMessage: "Bonjour, je souhaiterais parler avec le concierge CourtSide."
      },
      cookiePolicy: {
        title: "Politique de cookies",
        intro: "Cette politique explique comment CourtSide Padel utilise les cookies et technologies similaires sur courtsidepadel.com.",
        sections: [
          {
            title: "Que sont les cookies ?",
            body: "Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web. Ils permettent au site de mémoriser vos préférences et de comprendre comment vous l'utilisez."
          },
          {
            title: "Cookies essentiels",
            body: "Ces cookies sont indispensables au fonctionnement du site. Ils incluent votre préférence linguistique et votre choix de consentement aux cookies. Ils ne peuvent pas être désactivés."
          },
          {
            title: "Cookies analytiques",
            body: "Si vous acceptez les cookies non essentiels, nous pouvons utiliser des outils d'analyse pour mesurer le trafic et améliorer nos services. Ces cookies ne sont activés qu'après votre consentement."
          },
          {
            title: "Gérer vos préférences",
            body: "Vous pouvez accepter ou refuser les cookies non essentiels via la bannière affichée lors de votre première visite. Pour modifier votre choix ultérieurement, effacez les données de votre navigateur pour ce site ou contactez-nous à hello@courtsidepadel.com."
          },
          {
            title: "Mises à jour",
            body: "Nous pouvons mettre à jour cette politique de temps à autre. La version la plus récente sera toujours disponible sur cette page."
          }
        ]
      },
      bespokeRetreats: {
        title: "Vous souhaitez vos propres dates ?",
        description: "Au-delà de nos retraites ouvertes, nous organisons des retraites privées sur mesure à Menorca pour groupes fermés, entièrement personnalisables selon vos dates, votre groupe et vos priorités — de l'intensité du coaching aux préférences gastronomiques en passant par les expériences hors court.",
        features: [
          "Minimum 6 convives",
          "Toutes les semaines de l'année",
          "Entièrement personnalisé"
        ],
        cta: "Demander une retraite privée sur mesure →",
        modalTitle: "Demande sur mesure",
        modalDesc: "Laissez vos coordonnées ; un spécialiste vous contactera pour personnaliser votre retraite privée.",
        nameLabel: "Nom complet",
        emailLabel: "Adresse e-mail",
        datesLabel: "Dates souhaitées (facultatif)",
        guestsLabel: "Nombre de convives (min. 6)",
        submitBtn: "Demander une proposition",
        successMsg: "Merci. Notre équipe concierge vous contactera prochainement."
      },
      baliPage: {
        heroTitle: "BALI",
        heroTagline: "Luxe Tropical. Padel d'Élite.",
        heroLocation: "Canggu · Bali",
        heroDate: "Juillet 2026 · 5 Jours · Tout Compris",
        heroSubtitle: "Là où le rythme de Bali rencontre le padel d'élite. Cinq jours de coaching, bien-être et immersion culturelle enveloppés dans un luxe tropical cinq étoiles.",
        sectionTag: "La Destination",
        sectionTitle: "La Retraite à Bali",
        bookBtn: "Réserver votre Place",
        enquireBtn: "Parler au Concierge",
        whatsappMessage: "Bonjour, je souhaite des informations sur la retraite padel à Bali.",
        galleryLabel: "Galerie",
        galleryNote: "Photographies à venir",
        stats: {
          duration: { value: "5", label: "Jours" },
          group: { value: "8–16", label: "Convives max." },
          rating: { value: "5★", label: "Villas de luxe" },
          privacy: { value: "100%", label: "Privé" }
        },
        pillars: [
          { tag: "Coaching d'élite", title: "Sessions au lever du soleil. Matchplay au crépuscule.", desc: "Entraînement dirigé et matchplay compétitif sur des courts privés, adapté à tous les niveaux." },
          { tag: "Villas de luxe", title: "Piscines à débordement. Pavillons en plein air.", desc: "Villas boutique sélectionnées à Canggu avec personnel dédié, piscines privées et isolement total en milieu tropical." },
          { tag: "Bien-être balinais", title: "Récupération holistique au paradis.", desc: "Soins spa balinais, yoga au lever du soleil, méditation guidée et bains de glace — l'expérience de récupération ultime." },
          { tag: "Âme culturelle", title: "Le vrai Bali, orchestré pour vous.", desc: "Treks aux temples au lever du soleil, cérémonies traditionnelles, balades en rizières et cours de cuisine privés." }
        ],
        datesTitle: "Retraites Disponibles",
        dates: [
          { label: "8 – 12 juillet 2026", desc: "5 jours · 4 nuits · Retraite ouverte", spots: "Places limitées" },
          { label: "22 – 26 juillet 2026", desc: "5 jours · 4 nuits · Retraite ouverte", spots: "Places limitées" }
        ],
        ctaTitle: "Votre suite à Bali vous attend.",
        ctaDesc: "Un groupe intime. Une villa privée. Cinq jours extraordinaires.",
        ctaBtn: "Réserver votre Place",
        ctaSecondaryBtn: "Parler au Concierge"
      },
      dubaiPage: {
        heroTitle: "DUBAI",
        heroTagline: "Prestige Urbain. Courts du Désert.",
        heroLocation: "Dubaï · ÉAU",
        heroDate: "Novembre 2026 · 4 Jours · Tout Compris",
        heroSubtitle: "La ville la plus prestigieuse du monde comme toile de fond. Courts éclairés, suites penthouse et réseautage d'exception dans la capitale mondiale du luxe.",
        sectionTag: "La Destination",
        sectionTitle: "La Retraite à Dubaï",
        bookBtn: "Réserver votre Place",
        enquireBtn: "Parler au Concierge",
        whatsappMessage: "Bonjour, je souhaite des informations sur la retraite padel à Dubaï.",
        galleryLabel: "Galerie",
        galleryNote: "Photographies à venir",
        stats: {
          duration: { value: "4", label: "Jours" },
          group: { value: "8–14", label: "Convives max." },
          rating: { value: "5★", label: "Propriétés" },
          privacy: { value: "100%", label: "Privé" }
        },
        pillars: [
          { tag: "Courts premium", title: "Courts éclairés avec vue sur les toits.", desc: "Des courts de padel d'exception face au skyline de Dubaï. Sessions matinales et nocturnes dans des conditions parfaites." },
          { tag: "Suites penthouse", title: "Icônes du luxe urbain.", desc: "Les meilleures propriétés cinq étoiles de Dubaï — du centre-ville à Palm Jumeirah — pour les convives les plus exigeants." },
          { tag: "Réseau d'élite", title: "La meilleure compagnie qui soit.", desc: "Listes d'invités curatées. Conversations au niveau du conseil. Expériences hors court conçues pour l'élite mondiale." },
          { tag: "Expériences du désert", title: "Au-delà du court.", desc: "Safaris privés, survols en hélicoptère, gastronomie étoilée Michelin et expériences en yacht dans le Golfe Arabo-Persique." }
        ],
        datesTitle: "Retraites Disponibles",
        dates: [
          { label: "19 – 22 novembre 2026", desc: "4 jours · 3 nuits · Retraite ouverte", spots: "Places limitées" }
        ],
        ctaTitle: "Dubaï. Votre court est prêt.",
        ctaDesc: "Quatre jours. Une ville hors du commun. La meilleure compagnie.",
        ctaBtn: "Réserver votre Place",
        ctaSecondaryBtn: "Parler au Concierge"
      },
      testimonials: {
        label: "Témoignages",
        title: "Ce que nos convives en disent",
        subtitle: "Des convives arrivés en joueurs. Repartis membres de la communauté Courtside.",
        items: [
          {
            name: "Tomasz Campbell",
            role: "Directeur senior, Londres",
            text: "Une expérience qui m'a véritablement transformé. Les sessions de coaching ont élevé mon jeu, tandis que la journée en yacht et les dîners gastronomiques en ont fait une évasion de luxe absolue. Déjà réservé pour l'année prochaine.",
            initials: "T",
            image: "/imagenes/IMG_2167.jpeg"
          },
          {
            name: "Ana Martínez",
            role: "PDG, Madrid",
            text: "L'attention portée aux moindres détails est remarquable. Du transfert aéroport au dîner d'adieu, chaque instant semblait pensé pour nous. Voilà comment une retraite padel devrait se vivre.",
            initials: "A",
            image: "/imagenes/JOPS-721.JPG"
          },
          {
            name: "James Whitfield",
            role: "Associé directeur, Édimbourg",
            text: "Je suis venu pour le padel et je suis resté pour l'expérience. Le déjeuner au vignoble, la journée de tournoi, le coucher de soleil au Cova d'en Xoroi — chaque journée a été extraordinaire.",
            initials: "J",
            image: "/imagenes/Cala en porter.jpg"
          }
        ]
      }
    } as const;

export default fr;
