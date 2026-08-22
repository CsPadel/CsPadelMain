const fr = {
      navbar: {
        ourStory: "Notre Histoire",
        experience: "L'Expérience",
        destinations: "Destinations",
        upcomingRetreats: "Prochaines Retraites",
        menorca: "Menorca",
        bali: "Bali",
        dubai: "Dubai",
        mykonos: "Mykonos",
        eastSussex: "UK (East Sussex)"
      },
      experiencePage: {
        heroEyebrow: "L'Expérience",
        heroTitle: "Au-delà du court.",
        heroSubtitle: "Il ne s'agit pas seulement de padel. Il s'agit de l'endroit où vous jouez, des personnes avec qui vous jouez, et de tout ce qui se passe autour du jeu.",
        apartTitle: "Ce qui nous distingue.",
        apart: [
          {
            title: "Une Véritable Expertise Padel",
            desc: "Plus de dix ans à jouer et à entraîner au plus haut niveau, avec des joueurs de compétition au sein de notre propre équipe. Nous connaissons le jeu, pas seulement l'industrie qui l'entoure."
          },
          {
            title: "De Bout en Bout, Par Nous",
            desc: "Entraînement, hospitalité, logistique et gastronomie, tout est géré directement par notre équipe. Rien de sous-traité, rien de générique."
          },
          {
            title: "Personnel, Quel Que Soit le Format",
            desc: "Tous les niveaux sont les bienvenus sur chaque retraite, avec un coaching adapté joueur par joueur. Pour les groupes privés et exécutifs, l'itinéraire entier est construit autour de vous."
          }
        ],
        offCourtEyebrow: "En Dehors du Court",
        offCourtTitle: "Cela ne s'arrête pas au dernier point.",
        offCourtText: "Sorties en bateau le long de criques cachées. Dégustations de vins et de fromages dans les vignobles locaux. Couchers de soleil sur les falaises. Randonnées en montagne et en bord de mer. Une restauration choisie une à une qui reflète chaque destination, pas un buffet d'hôtel. Le court est le point de départ. Ce n'est pas le point d'arrivée.",
        quoteEyebrow: "Dans Leurs Mots",
        quote: "Nous avons toujours été passionnés par le padel, les voyages et l'expérience de découvrir de nouveaux endroits et de rencontrer de nouvelles personnes. Nous avons réalisé à quel point ce jeu crée facilement du lien, quel que soit votre niveau ou votre parcours. À travers des expériences partagées sur et en dehors du court, nous voulons réunir les gens dans de beaux endroits et créer des moments qui vont bien au-delà du simple fait de jouer au padel.",
        quoteAuthor: "Alexi & Oliver Watelet, Co-fondateurs",
        ctaTitle: "Prêt à le vivre ?",
        ctaText: "Chaque retraite Courtside commence par une conversation."
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
          subtitle: "De votre arrivée à votre départ, chaque détail de votre retraite est pris en charge – coaching, gastronomie, transport, activités, le tout inclus.",
          pillars: [
            {
              tag: "Coaching d'élite",
              title: "Coaching et matchplay adaptés à tous les niveaux.",
              desc: "Animé par d'anciens professionnels dans l'un des établissements padel les plus prestigieux de Menorca – club d'attache de l'un des meilleurs joueurs mondiaux."
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
        // agenda: each activity has an `image` field – a standalone path string (e.g. "/imagenes/filename.jpg")
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
                title: 'Petit-déjeuner – Barceló Nura',
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
                title: 'Déjeuner & Croisière – Sa Punta',
                desc: 'Déjeuner au restaurant Sa Punta suivi d\'une croisière privée au départ d\'Es Castell.',
                image: '/imagenes/Cala en porter.jpg',
              },
              {
                time: '20:00',
                title: 'Dîner – Hôtel / Soirée libre',
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
                title: 'Petit-déjeuner – Barceló Nura',
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
                title: 'Visite du vignoble & Déjeuner – Binifadet',
                desc: 'Visite et déjeuner au domaine Binifadet. Dégustation de vins et fromages incluse.',
                image: '/imagenes/binifadet.jpeg',
              },
              {
                time: '20:00',
                title: 'Dîner – La Calita',
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
                title: 'Petit-déjeuner matinal – Barceló Nura',
                desc: 'Journée de tournoi qui commence tôt. Packs d\'hydratation prêts et places réservées pour le groupe.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '09:00 – 13:00',
                title: 'Tournoi padel – Padelin',
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
                title: "Coucher de soleil & Tapas – Cova d'en Xoroi",
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
                title: 'Dernier petit-déjeuner – Barceló Nura',
                desc: 'Dernier petit-déjeuner en groupe. Bagages à sortir avant 11h00.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '10:30 – 13:00',
                title: 'Session padel optionnelle – Padelin',
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
          { q: "Faut-il avoir une expérience du padel ?", a: "Non. Nos retraites accueillent tous les niveaux – le coaching est adapté, des débutants qui posent leurs bases aux joueurs confirmés qui affinent leur stratégie." },
          { q: "La formule est-elle tout compris ?", a: "Oui. Tout ce qui figure au programme est inclus – hébergement, tous les repas, coaching, matchplay, transport local et activités. Vous êtes libre de ne pas participer à certaines activités. Toute réservation en dehors du programme est à votre charge." },
          { q: "Les vols et transferts aéroport sont-ils inclus ?", a: "Les transferts vers et depuis l'aéroport de Mahón sont inclus. Les vols ne le sont pas – notre concierge peut vous conseiller sur les itinéraires ou organiser un vol privé sur demande." },
          { q: "Un accompagnateur non-joueur peut-il participer ?", a: "Oui. Les accompagnateurs non-joueurs paient le même tarif retraite, et leur programme peut être personnalisé selon leurs envies." },
          { q: "Et les régimes alimentaires ?", a: "Notre chef privé sur place élabore des menus sur mesure à partir d'un questionnaire bien-être et alimentaire envoyé avant votre arrivée." },
          { q: "Combien de convives par retraite ?", a: "Chaque retraite ouverte est limitée en effectif pour préserver l'exclusivité. Les retraites privées accueillent un minimum de 6 convives." },
          { q: "Puis-je prolonger mon séjour avant ou après la retraite ?", a: "Oui – nous pouvons organiser des nuits supplémentaires au Barceló Nura sur demande." },
          { q: "Puis-je réserver une retraite privée à d'autres dates ?", a: "Oui. Nous organisons des retraites privées entièrement sur mesure toute l'année, avec un minimum de 6 convives et un préavis de 2 mois." },
          { q: "Quand a lieu la prochaine retraite à Menorca ?", a: "Du 30 septembre au 4 octobre 2026 (4 nuits, 5 jours). Places limitées – réservation anticipée recommandée." },
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
          headlineLine1: "Retraites de Padel",
          headlineLine2: "d'Exception",
          discoverBtn: "Découvrir les Expériences",
          scroll: "Faites défiler",
          slogan: "Au-delà du court. Vers une expérience.",
          subtitle: "Bien-être, repos et réseautage autour du padel.",
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
      pageLoader: {
        tagline: "Retraites de Padel de Luxe"
      },
      footer: {
        ariaLabel: "Pied de page",
        quote: "Le padel nous réunit sur le court.<br/>L'expérience le rend inoubliable.",
        companyLabel: "Société",
        corporate: "Entreprises et Dirigeants",
        contactLabel: "Nous Contacter",
        whatsappConcierge: "Concierge WhatsApp",
        messageTeam: "Écrire à l'Équipe",
        whatsappMessage: "Bonjour, je souhaiterais me renseigner sur une retraite Courtside Padel.",
        rights: "© 2026 Courtside Padel. Tous droits réservés.",
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
        label: "Écrivez-nous",
        ariaLabel: "Discutez avec l'équipe Courtside sur WhatsApp",
        prefillMessage: "Bonjour, je souhaiterais parler avec l'équipe Courtside."
      },
      cookiePolicy: {
        title: "Politique de cookies",
        intro: "Cette politique explique comment Courtside Padel utilise les cookies et technologies similaires sur courtsidepadel.com.",
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
            body: "Vous pouvez accepter ou refuser les cookies non essentiels via la bannière affichée lors de votre première visite. Pour modifier votre choix ultérieurement, effacez les données de votre navigateur pour ce site ou contactez-nous à awatelet@cspadel.com."
          },
          {
            title: "Mises à jour",
            body: "Nous pouvons mettre à jour cette politique de temps à autre. La version la plus récente sera toujours disponible sur cette page."
          }
        ]
      },
      bespokeRetreats: {
        eyebrow: "Retraites Privées Sur Mesure",
        title: "Vous Avez Déjà Vos Propres Dates ?",
        description: "Vous avez déjà votre groupe et vos dates ? Dites-nous vos projets et nous construirons la retraite autour d'eux – toutes les semaines de l'année, à Minorque.",
        features: [
          "Minimum 6 convives",
          "Toutes les semaines de l'année",
          "Entièrement personnalisé",
          "Deux mois de préavis"
        ],
        cta: "Planifiez Votre Retraite"
      },
      baliPage: {
        heroTitle: "BALI",
        heroTagline: "Luxe Tropical. Padel d'Élite.",
        heroLocation: "Uluwatu · Bali",
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
          { tag: "Villas de luxe", title: "Piscines à débordement. Pavillons en plein air.", desc: "Villas boutique sélectionnées au-dessus des falaises d'Uluwatu avec personnel dédié, piscines privées et isolement total en milieu tropical." },
          { tag: "Bien-être balinais", title: "Récupération holistique au paradis.", desc: "Soins spa balinais, yoga au lever du soleil, méditation guidée et bains de glace – l'expérience de récupération ultime." },
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
        ctaSecondaryBtn: "Parler au Concierge",
        landing: {
          heroAlt: "Piscine à débordement au crépuscule – domaine Courtside à Bali",
          heroTitle: "Une Escapade à Bali.",
          heroSubtitle: "Un domaine privé perché sur les falaises de la péninsule de Bukit, abritant les seuls courts de padel reconnus par le WPT sur l'île. A Mandarin Oriental Home.",
          stayEyebrow: "Où Vous Séjournez",
          stayTitle: "Deux façons de vivre Bali.",
          estateTitle: "Le Domaine",
          estateText: "L'intégralité du domaine en bord de falaise et ses 8 suites, rien que pour vous. Chef privé, majordome et concierge, une piscine à débordement face à l'océan Indien et un pavillon spa privé. Expériences incluses sur place : soins spa, yoga, cours de cuisine, coaching sportif et bien plus. C'est la retraite balinaise complète, pensée pour les groupes qui veulent tout réunir sur une seule propriété.",
          estateImageAlts: [
            "Vue aérienne du domaine de Bali et de sa piscine à débordement",
            "Pavillon de vie ouvert du domaine de Bali",
            "Suite du domaine de Bali avec baignoire extérieure"
          ],
          studiosTitle: "Les Studios",
          studiosText: "Des chambres modernes et confortables à quelques pas des courts de padel, idéales pour les voyageurs solos, les couples ou celles et ceux qui préfèrent passer la semaine à explorer Bali. Climatisées, avec salle de bain privative et kitchenette. Les extras du domaine, comme le spa ou les cours de cuisine, ne sont pas inclus ici, mais peuvent être organisés via nos partenaires locaux sur demande.",
          studiosImageAlt: "Les Studios – chambre intérieure",
          courtsEyebrow: "Les Courts",
          courtsTitle: "Les seuls courts reconnus par le WPT à Bali.",
          courtsText: "Deux courts construits sur mesure par Padel Galis, fournisseur officiel du World Padel Tour. Installés au cœur du domaine, face à l'océan Indien. C'est la seule installation de ce type sur l'île.",
          courtsImageAlt: "Courts Padel Galis du domaine de Bali, face à l'océan Indien",
          beyondEyebrow: "Hors du Court",
          beyondTitle: "Bali, au-delà du domaine.",
          beyondText: "Surf, plongée, parapente, visites de temples, vélo, sound healing et bien plus, le tout organisé par un coordinateur d'activités local qui connaît l'île sur le bout des doigts. Quelle que soit votre envie, elle est à portée de main.",
          beyondImageAlt: "Le littoral d'Uluwatu, au-delà du domaine de Bali",
          closingImageAlt: "Le chef privé et l'équipe culinaire du domaine de Bali",
          ctaTitle: "Prêt à Découvrir Uluwatu ?",
          ctaText: "Les dates et les tarifs sont confirmés une fois que nous connaissons votre groupe et vos projets. Itinéraire complet disponible sur demande.",
          ctaBtn: "Se Renseigner sur Bali"
        }
      },
      eastSussexPage: {
        landing: {
          heroAlt: "La maison principale de Crafted at Powdermills, vue depuis l'autre rive du lac privé à l'heure dorée",
          heroTitle: "La Campagne Anglaise, à 70 Minutes de Londres.",
          heroSubtitle: "Crafted at Powdermills est un hôtel de campagne boutique au bord d'un lac privé, avec son propre club de padel.",
          roomsEyebrow: "Où Vous Séjournez",
          roomsTitle: "Chambres et Cottages",
          roomsText: "Les chambres vont des doubles Cosy aux Suites complètes, et trois cottages privés – Ash Cottage, Oak Cottage et The Lake House – accueillent de six à dix personnes, chacun avec sa propre cuisine et son salon. The Lake House dispose en plus de sa terrasse donnant sur le lac et d'un jardin privé. Les chiens sont les bienvenus partout.",
          roomsImageAlts: [
            "Une Suite à Crafted at Powdermills, avec coin salon et canapé",
            "L'extérieur du cottage The Lake House, au bord du lac"
          ],
          padelEyebrow: "Le Padel",
          padelTitle: "Un club établi, pas un court monté pour l'occasion.",
          padelText: "Crafted Padel Club gère déjà deux courts, avec du coaching, des cours et une vraie communauté autour ; ce n'est pas quelque chose d'ajouté pour une retraite. Les clients et les membres peuvent réserver des parties, et des cours débutants et avancés ont lieu chaque semaine. C'est un endroit où les gens viennent déjà jouer.",
          padelImageAlts: [
            "Les deux courts de padel du Crafted Padel Club, dans l'East Sussex",
            "Une séance de coaching sur le court au Crafted Padel Club"
          ],
          bookEyebrow: "Comment Ça Marche",
          bookTitle: "Réservez à Votre Façon",
          bookText1: "Crafted at Powdermills accueille déjà des événements d'entreprise de grande ampleur, avec des espaces ayant réuni plus de 200 personnes pour des journées d'entreprise et des célébrations. Qu'il s'agisse d'un petit séminaire de direction ou d'une retraite d'entreprise complète, le lieu comme le club de padel s'adaptent à votre échelle.",
          bookText2: "Des retraites ouvertes et des privatisations de groupe peuvent également être organisées ici, construites autour de vos dates plutôt que de dates fixes. Restez une nuit ou une semaine. Nous construisons le programme, en travaillant directement avec l'équipe de Crafted.",
          bookImageAlt: "Un salon privé de réception à Crafted at Powdermills, dressé pour un dîner de groupe en table longue",
          beyondEyebrow: "Au-delà du Court",
          beyondTitle: "Il y a bien plus que le padel ici.",
          beyondText: "Un bain nordique chauffé au bois et un sauna au bord du lac, un bain froid, la nage en eau libre, des paddles et des kayaks sur le lac, des ateliers de poterie et d'artisanat au Craft Barn, une salle de sport complète avec son programme de cours, et un restaurant et un pub qui valent à eux seuls le détour. L'essentiel de ce qui rend cette retraite mémorable se passe en dehors du court.",
          beyondImageAlt: "Le sauna au bord du lac à Crafted at Powdermills, avec vue sur l'eau",
          closingImageAlt: "Le restaurant de Crafted at Powdermills",
          ctaEyebrow: "Entamons la Conversation",
          ctaTitle: "Prêt à Découvrir l'East Sussex ?",
          ctaText: "Les dates et les tarifs sont confirmés une fois que nous connaissons votre groupe et vos projets.",
          ctaBtn: "Se Renseigner sur l'East Sussex"
        }
      },
      dubaiPage: {
        heroTitle: "DUBAI",
        heroTagline: "Prestige Urbain. Courts du Désert.",
        heroLocation: "Bientôt Disponible",
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
          { tag: "Suites penthouse", title: "Icônes du luxe urbain.", desc: "Les meilleures propriétés cinq étoiles de Dubaï – du centre-ville à Palm Jumeirah – pour les convives les plus exigeants." },
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
        ctaSecondaryBtn: "Parler au Concierge",
        landing: {
          heroAlt: "Les gratte-ciels de Dubaï à l'heure dorée",
          title: "Dubaï.<br/>Bientôt Disponible.",
          text: "Nous préparons quelque chose de spécial pour Dubaï. Écrivez-nous si vous souhaitez être parmi les premiers informés dès que ce sera prêt.",
          ctaBtn: "Nous Contacter"
        }
      },
      mykonosPage: {
        heroTitle: "MYKONOS",
        heroTagline: "Élégance Égéenne. Padel d'Élite.",
        heroLocation: "Mykonos · Grèce",
        heroDate: "Saison 2027 · 5 Jours · Tout Compris",
        heroSubtitle: "Villages blanchis à la chaux, un Égée sans fin, et padel d'élite à l'heure dorée. Cinq jours de coaching et de luxe baigné de soleil sur l'une des îles les plus emblématiques d'Europe.",
        sectionTag: "La Destination",
        sectionTitle: "La Retraite à Mykonos",
        bookBtn: "Réserver votre Place",
        enquireBtn: "Parler au Concierge",
        whatsappMessage: "Bonjour, je souhaite des informations sur la retraite padel à Mykonos.",
        galleryLabel: "Galerie",
        galleryNote: "Photographies à venir",
        stats: {
          duration: { value: "5", label: "Jours" },
          group: { value: "8–16", label: "Convives max." },
          rating: { value: "5★", label: "Villas cycladiques" },
          privacy: { value: "100%", label: "Privé" }
        },
        pillars: [
          { tag: "Coaching d'élite", title: "Sessions matinales. Matchplay à l'heure dorée.", desc: "Entraînement dirigé et matchplay compétitif avec l'Égée en toile de fond, adapté à tous les niveaux." },
          { tag: "Villas cycladiques", title: "Murs blanchis à la chaux. Vue infinie sur la mer.", desc: "Villas sélectionnées à flanc de falaise avec piscine privée, vue sur l'Égée et isolement total face à la mer." },
          { tag: "Bien-être égéen", title: "Récupération, à l'insulaire.", desc: "Baignades en mer, yoga au coucher du soleil, rituels spa méditerranéens et longs déjeuners pensés pour la récupération totale." },
          { tag: "Âme insulaire", title: "Le vrai Mykonos, orchestré pour vous.", desc: "Sorties privées en bateau vers des criques cachées, coucher de soleil à Little Venice, la vieille ville de Chora et soirées beach club dans les Cyclades." }
        ],
        datesTitle: "Retraites Disponibles",
        dates: [
          { label: "Saison 2027", desc: "5 jours · 4 nuits · Retraite ouverte", spots: "Dates à confirmer" }
        ],
        ctaTitle: "Mykonos. Votre court au-dessus de l'Égée.",
        ctaDesc: "Un groupe intime. Une villa privée. Cinq jours face à la mer.",
        ctaBtn: "Réserver votre Place",
        ctaSecondaryBtn: "Parler au Concierge"
      },
      upcomingRetreatsPage: {
        eyebrow: "Dans les 12 à 18 Prochains Mois",
        heroTitle: "Prochaines Retraites.",
        heroSubtitle: "Padel d'élite, compagnie exceptionnelle et tout ce qui entoure le jeu pensé avec le même soin – dans chaque destination Courtside.",
        bespokeNote: "Dates sur mesure disponibles sur demande.",
        destinations: {
          menorca: {
            name: "Minorque",
            location: "Îles Baléares · Espagne",
            dates: ["Octobre 2026", "Avril 2027", "Mai 2027", "Juin 2027", "Septembre 2027", "Octobre 2027"],
            cta: "Découvrir Minorque"
          },
          bali: {
            name: "Bali",
            location: "Uluwatu · Bali",
            dates: ["Mars 2027", "Juillet 2027", "Août 2027"],
            cta: "Découvrir Bali"
          }
        },
        ctaTitle: "Vous avez déjà vos propres dates en tête ?",
        ctaText: "Dites-nous vos projets et nous construirons la retraite autour d'eux.",
        ctaBtn: "Planifier votre Retraite"
      },
      homePage: {
        retreatTypes: {
          ariaLabel: "Types de retraite",
          eyebrow: "Formats de Retraite",
          title: "Choisissez votre Retraite.",
          explore: "Découvrir",
          viewDetails: "voir les détails",
          items: {
            open: {
              tag: "Seul ou entre Amis",
              name: "Retraite Ouverte",
              desc: "Rejoignez un groupe choisi de joueurs partageant la même passion pour cinq jours immersifs de padel, de haute gastronomie et de vie méditerranéenne."
            },
            private: {
              tag: "Confidentialité Absolue",
              name: "Retraite Privée",
              desc: "Réservez l'intégralité du domaine en exclusivité pour votre groupe. Intimité totale, programme sur mesure et immersion complète."
            },
            executive: {
              tag: "Directions & Conseils",
              name: "Entreprises et Dirigeants",
              desc: "La stratégie en silence. Leadership de haut niveau et networking dans le cadre de padel le plus exclusif."
            }
          }
        },
        destinations: {
          eyebrow: "Confirmé 2026",
          title: "Notre Destination",
          location: "Îles Baléares · Espagne",
          tagline: "Sanctuaire Méditerranéen",
          dates: "30 sep – 4 oct 2026",
          spots: "Il Reste Peu de Places",
          explore: "Découvrir"
        },
        upcoming: {
          eyebrow: "Dates à Confirmer",
          title: "Prochaines Retraites",
          subtitle: "De nouvelles destinations en préparation pour notre calendrier 2027. Inscrivez votre intérêt pour être informé en premier.",
          viewAll: "Voir tout",
          explore: "Découvrir",
          items: {
            bali: { tagline: "Un domaine privé en bord de falaise. Padel d'élite.", location: "Uluwatu · Bali" },
            dubai: { tagline: "Bientôt disponible.", location: "Bientôt Disponible" }
          }
        },
        partners: {
          ariaLabel: "Nos partenaires",
          eyebrow: "Nos Partenaires",
          title: "En partenariat avec les meilleurs."
        }
      },
      ourStoryPage: {
        heroAlt: "Courtside Padel – Notre Histoire",
        heroEyebrow: "Les Fondateurs",
        heroTitle: "Notre Histoire.",
        heroSubtitle: "Frères jumeaux. Des chemins différents. Le padel a tout changé.",
        beganEyebrow: "Comment Tout a Commencé",
        beganTitle: "Né d'une<br/>obsession partagée.",
        beganParagraphs: [
          "Nous sommes frères jumeaux, nés à New York et élevés à Londres. Enfants, nous faisions tout ensemble : nous entraîner, concourir, voyager, toujours à la poursuite de la prochaine opportunité que le sport pouvait nous offrir. À 15 ans, tout a changé. Alexi est parti dans le sud de la France pour tenter le tennis professionnel. Oliver est resté à Londres, attiré par le football. Les sports de raquette avaient toujours fait partie de nous, mais pendant quelques années, la vie nous a menés sur des chemins différents.",
          "En voyage à Minorque en 2019, nous avons découvert le padel pour la première fois et avons été conquis immédiatement, pas seulement par le jeu, mais par tout ce qui l'entoure : quitter le court pour boire un verre, rencontrer de nouvelles personnes, plonger dans la piscine après un match. Compétitif, mais convivial. C'est sur cette combinaison que Courtside est bâti.",
          "L'idée s'est construite progressivement. Nous avions tous les deux grandi en voyageant, exposés très tôt à de nouveaux lieux et à de nouvelles cultures, un goût qui ne nous a jamais quittés. Alors que le padel devenait l'un des sports connaissant la plus forte croissance au monde, tout s'est éclairé : associer une destination magnifique à un padel de très haut niveau, réunir les gens, et bâtir quelque chose autour de la sensation découverte à Minorque.",
          "Minorque n'était pas un choix au hasard. C'est l'île où nous sommes tombés amoureux de ce sport, et où nous revenons depuis huit ans. C'était l'endroit évident pour construire la première retraite Courtside."
        ],
        foundersEyebrow: "Celles et Ceux Derrière le Projet",
        foundersTitle: "Rencontrez les fondateurs.",
        founderRole: "Cofondateur",
        founderAlt: "Cofondateur, Courtside Padel",
        foundersQuote: "Alexi a grandi en poursuivant le tennis. Oliver a grandi en poursuivant le football. Le padel nous a donné exactement la même obsession, simplement pour un autre jeu.",
        believeEyebrow: "Ce en Quoi Nous Croyons",
        believeQuote: "Le padel nous réunit sur le court.<br/>L'expérience le rend inoubliable.",
        believeText: "Les meilleures retraites ne ressemblent pas à des événements. Elles ressemblent à cette semaine dont on parle encore trois ans plus tard.",
        ctaTitle: "Prêt à écrire votre propre histoire ?",
        ctaText: "Chaque retraite Courtside commence par une conversation."
      },
      executivePage: {
        heroAlt: "Petit groupe en plein échange – retraite de padel Entreprises et Dirigeants",
        heroTitle: "Retraites Entreprises et Dirigeants.",
        heroSubtitle: "Des séminaires de direction et du team building aux voyages de récompense et aux retraites de conseil d'administration, nous concevons des retraites de padel privatisées et sur mesure pour tous types d'entreprises.",
        quote: "Le padel est social par nature. Il est compétitif, mais jamais trop sérieux : il se joue en double, sur un petit court qui garde tout le monde assez proche pour discuter entre les points. D'une façon ou d'une autre, il pousse les gens à communiquer et à travailler en équipe sans vraiment y penser.",
        formatEyebrow: "Le Format",
        formatTitle: "Une retraite privatisée.<br/>Votre programme.",
        formatText: "La Retraite Dirigeants est une expérience entièrement privatisée et sur mesure, conçue pour les équipes de direction, les conseils d'administration et les groupes d'entreprise de tout type. Votre groupe dispose de toute notre équipe pendant la durée de la retraite. Une privatisation complète, qu'il s'agisse d'un domaine entier ou d'une villa privée, peut être organisée selon la destination.",
        formatImageAlt: "Court de padel vide, privé et calme",
        pillars: [
          {
            number: "01",
            title: "Exclusivité Totale",
            desc: "Une privatisation complète, qu'il s'agisse d'un domaine entier ou d'une villa privée, peut être organisée sur demande selon la destination."
          },
          {
            number: "02",
            title: "Programme Sur Mesure",
            desc: "De l'intensité du coaching aux sessions de travail, journées spa et dîners privés, chaque élément est construit à partir de votre brief."
          },
          {
            number: "03",
            title: "Discrétion Absolue",
            desc: "Accords de confidentialité, coordination des transferts privés et confidentialité totale de notre équipe, sur chaque retraite que nous organisons."
          }
        ],
        ctaEyebrow: "Engagez la Conversation",
        ctaTitle: "Chaque retraite d'entreprise<br/>commence par un brief.",
        ctaText: "Dites-nous vos objectifs, la taille du groupe et vos dates préférées. Nous construirons le programme autour de vous.",
        ctaBtn: "Se Renseigner sur une Retraite d'Entreprise"
      },
      testimonials: {
        label: "Ce Que Disent Nos Convives",
        title: "Longtemps après le retour.",
        subtitle: "Les convives arrivent en joueurs. Ils repartent membres de la communauté Courtside.",
        // Vrais témoignages de convives avec de vraies photos, datés de 2026
        // (postérieur à « Est. 2025 »).
        items: [
          {
            name: "Dylan Sweidan",
            role: "Convive · Minorque",
            text: "Minorque était le cadre parfait pour une retraite padel. L'équilibre entre le temps sur le court, la bonne cuisine, la découverte de l'île et la détente au bord de mer en a fait bien plus qu'un simple stage de coaching.",
            initials: "D",
            image: "/imagenes/cms/testimonial-dylan-sweidan.jpg"
          },
          {
            name: "Katja Bonnavion",
            role: "Convive · Minorque",
            text: "J'ai passé 5 jours incroyables. L'hôtel, les restaurants et les activités étaient excellents, et le coaching était adapté au niveau de chacun, ce qui rendait chaque session agréable.",
            initials: "K",
            image: "/imagenes/cms/testimonial-katja-bonnavion.jpg"
          },
          {
            name: "Anatole Levy",
            role: "Convive · Minorque",
            text: "Ce qui a le plus marqué, c'est à quel point l'expérience était complète. Nous avons beaucoup joué au padel, mais nous avons aussi découvert le meilleur de Minorque, mangé dans des endroits fantastiques et rencontré des gens formidables. Je réserverais à nouveau sans hésiter.",
            initials: "A",
            image: "/imagenes/cms/testimonial-anatole-levy.jpg"
          },
          {
            name: "Sergi Pons",
            role: "Convive · Minorque",
            text: "Si vous cherchez à progresser au padel, je le recommande vivement. Le coaching était de grande qualité, les sessions engageantes, et je suis reparti bien plus confiant sur le court.",
            initials: "S",
            image: "/imagenes/cms/testimonial-sergi-pons.jpg"
          }
        ]
      },
      enquiryForm: {
        triggerLabel: "Demander une Retraite",
        eyebrow: "Demande de Retraite",
        title: "Construisons votre retraite.",
        close: "Fermer le formulaire de demande",
        back: "Retour",
        next: "Continuer",
        submit: "Envoyer la demande",
        sending: "Envoi…",
        emailSubject: "Demande de retraite Courtside",
        steps: {
          destination: {
            question: "Où souhaiteriez-vous jouer ?",
            help: "Choisissez une destination, ou dites-nous que vous hésitez encore.",
            options: {
              menorca: "Minorque",
              bali: "Bali",
              dubai: "Dubai",
              undecided: "Je n'ai pas encore décidé"
            }
          },
          dates: {
            question: "Quand envisagez-vous de voyager ?",
            help: "Les retraites privées se déroulent toutes les semaines de l'année, avec deux mois de préavis.",
            monthLabel: "Mois",
            yearLabel: "Année",
            months: {
              january: "Janvier",
              february: "Février",
              march: "Mars",
              april: "Avril",
              may: "Mai",
              june: "Juin",
              july: "Juillet",
              august: "Août",
              september: "Septembre",
              october: "Octobre",
              november: "Novembre",
              december: "Décembre",
              flexible: "Flexible"
            }
          },
          group: {
            question: "Combien serez-vous à voyager ?",
            help: "Y compris les accompagnants qui ne joueront pas.",
            label: "Taille du groupe",
            placeholder: "p. ex. 8",
            note: "Les retraites privées se déroulent à partir de 6 convives. Vous voyagez seul ou à deux ? Nos retraites ouvertes sont faites pour vous."
          },
          priorities: {
            question: "Qu'est-ce qui compte le plus pour vous ?",
            help: "Choisissez autant d'options que vous le souhaitez – cela nous aide à construire la semaine autour de votre groupe.",
            options: {
              coaching: "Coaching et progression",
              matchplay: "Matchs de compétition",
              wellness: "Bien-être et récupération",
              dining: "Gastronomie et vin",
              boatAndSea: "Journées en bateau et mer",
              culture: "Culture locale et découverte",
              celebration: "Un anniversaire ou une célébration",
              corporate: "Un séminaire d'entreprise ou de direction"
            },
            notesLabel: "Autre chose à nous signaler ?",
            notesPlaceholder: "L'occasion, les niveaux de jeu, vos incontournables…"
          },
          contact: {
            question: "Comment pouvons-nous vous joindre ?",
            help: "L'un des fondateurs vous répondra personnellement, généralement sous 24 heures.",
            firstName: "Prénom",
            lastName: "Nom",
            email: "E-mail",
            phone: "Téléphone",
            phoneOptional: "Facultatif",
            consent: "J'accepte que Courtside Padel utilise ces informations pour répondre à ma demande."
          }
        },
        errors: {
          destination: "Veuillez choisir une destination pour continuer.",
          dates: "Veuillez choisir un mois et une année.",
          group: "Veuillez nous indiquer combien de convives voyagent.",
          name: "Veuillez saisir votre prénom et votre nom.",
          email: "Veuillez saisir une adresse e-mail valide.",
          consent: "Veuillez accepter l'utilisation de vos informations pour que nous puissions vous répondre.",
          submit: "Un problème est survenu lors de l'envoi de votre demande. Écrivez-nous à awatelet@cspadel.com et nous la traiterons immédiatement."
        },
        success: {
          title: "Merci.",
          body: "Nous avons bien reçu votre demande. L'un des fondateurs vous contactera personnellement pour commencer à façonner votre retraite."
        }
      }
    } as const;

export default fr;
