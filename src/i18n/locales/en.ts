const en = {
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
          { name: "Oliver Watellet", role: "Co-Founder & Strategic Vision", photo: "/imagenes/about-us/oli.webp" },
          { name: "Alexy Watellet", role: "Co-Founder & Athletic Director", photo: "/imagenes/about-us/alex.webp" },
          { name: "Carlos M.", role: "Head Coach (Menorca)", photo: "/team/carlos.jpg" },
          { name: "Elena R.", role: "Lead Concierge", photo: "/team/elena.jpg" }
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
        faqViewLess: "View less",
        faqViewAll: "View all questions",
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
          introLine1: "Curating World-Class",
          introLine2: "Padel Retreats.",
          intro: "Curating World-Class Padel Retreats.",
          subtitle: "Ultra-luxury retreats. Wellness, rest, and strategic networking through padel.",
          intent: "Design your stay. What are you looking for today?",
          individual: "Personal Suite",
          individualSub: "To connect and unwind",
          group: "Full Villa",
          groupSub: "For your trusted group",
          corporate: "Executive Retreat",
          corporateSub: "High level for your company",
          individualDescriptor: "A private court. Your rules.",
          groupDescriptor: "Exclusive grounds for your circle.",
          corporateDescriptor: "Strategy. On and off the court."
        },
        luxuryStrip: {
          destinations: "Exclusive Destinations",
          privateAccess: "Private Access",
          curatedProperties: "Curated Properties",
          conciergeService: "Concierge Service"
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
        terms: "Terms of Service",
        cookies: "Cookie Policy"
      },
      cookieConsent: {
        title: "We use cookies",
        description: "We use essential cookies to run this site and optional cookies to understand how it is used. You can accept all cookies or reject non-essential ones.",
        policyLink: "Learn more",
        accept: "Accept all",
        reject: "Reject non-essential"
      },
      whatsappConcierge: {
        label: "24/7 Concierge",
        ariaLabel: "Chat with our concierge on WhatsApp",
        prefillMessage: "Hello, I'd like to speak with the CourtSide concierge."
      },
      cookiePolicy: {
        title: "Cookie Policy",
        intro: "This policy explains how CourtSide Padel uses cookies and similar technologies on courtsidepadel.com.",
        sections: [
          {
            title: "What are cookies?",
            body: "Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how you use it."
          },
          {
            title: "Essential cookies",
            body: "These cookies are required for the website to function. They include your language preference and your cookie consent choice. They cannot be disabled."
          },
          {
            title: "Analytics cookies",
            body: "If you accept non-essential cookies, we may use analytics tools to measure traffic and improve our services. These cookies are only activated after you give consent."
          },
          {
            title: "Managing your preferences",
            body: "You can accept or reject non-essential cookies via the banner shown on your first visit. To change your choice later, clear your browser data for this site or contact us at hello@courtsidepadel.com."
          },
          {
            title: "Updates",
            body: "We may update this policy from time to time. The latest version will always be available on this page."
          }
        ]
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
      baliPage: {
        heroTitle: "BALI",
        heroTagline: "Jungle Luxury. Elite Padel.",
        heroLocation: "Canggu · Bali",
        heroDate: "July 2026 · 5 Days · All-Inclusive",
        heroSubtitle: "Where the rhythm of Bali meets elite padel. Five days of coaching, wellness, and cultural immersion wrapped in five-star tropical luxury.",
        sectionTag: "The Destination",
        sectionTitle: "The Bali Retreat",
        bookBtn: "Reserve Your Place",
        enquireBtn: "Speak with Concierge",
        whatsappMessage: "Hello, I'd like to enquire about the Bali padel retreat.",
        galleryLabel: "Gallery",
        galleryNote: "Photography coming soon",
        stats: {
          duration: { value: "5", label: "Days" },
          group: { value: "8–16", label: "Guests Max" },
          rating: { value: "5★", label: "Luxury Villas" },
          privacy: { value: "100%", label: "Private" }
        },
        pillars: [
          { tag: "Elite Coaching", title: "Sunrise sessions. Golden hour matchplay.", desc: "Coach-led training and competitive matchplay on private padel courts, tailored to every level from foundation to elite." },
          { tag: "Luxury Villas", title: "Private infinity pools. Open-air pavilions.", desc: "Hand-selected boutique villas in Canggu with personal staff, private pools and total seclusion in the tropics." },
          { tag: "Bali Wellness", title: "Holistic recovery and performance.", desc: "Balinese spa treatments, sunrise yoga, guided meditation and cold plunge pools — the full performance recovery." },
          { tag: "Cultural Soul", title: "The real Bali, curated for you.", desc: "Sunrise temple treks, traditional ceremonies, rice terrace walks and private cooking classes with local chefs." }
        ],
        datesTitle: "Available Retreats",
        dates: [
          { label: "July 8 – 12, 2026", desc: "5 days · 4 nights · Open Retreat", spots: "Limited Places" },
          { label: "July 22 – 26, 2026", desc: "5 days · 4 nights · Open Retreat", spots: "Limited Places" }
        ],
        ctaTitle: "Your Bali suite awaits.",
        ctaDesc: "An intimate group. A private villa. Five extraordinary days.",
        ctaBtn: "Reserve Your Place",
        ctaSecondaryBtn: "Speak with Concierge"
      },
      dubaiPage: {
        heroTitle: "DUBAI",
        heroTagline: "Urban Prestige. Desert Courts.",
        heroLocation: "Dubai · UAE",
        heroDate: "November 2026 · 4 Days · All-Inclusive",
        heroSubtitle: "The world's most prestigious city as your backdrop. Floodlit courts, penthouse suites, and curated networking in the desert capital of luxury.",
        sectionTag: "The Destination",
        sectionTitle: "The Dubai Retreat",
        bookBtn: "Reserve Your Place",
        enquireBtn: "Speak with Concierge",
        whatsappMessage: "Hello, I'd like to enquire about the Dubai padel retreat.",
        galleryLabel: "Gallery",
        galleryNote: "Photography coming soon",
        stats: {
          duration: { value: "4", label: "Days" },
          group: { value: "8–14", label: "Guests Max" },
          rating: { value: "5★", label: "Properties" },
          privacy: { value: "100%", label: "Private" }
        },
        pillars: [
          { tag: "Premium Courts", title: "Floodlit courts with skyline views.", desc: "World-class padel courts against the Dubai skyline. Morning and evening sessions under perfect desert conditions." },
          { tag: "Penthouse Suites", title: "Icons of urban luxury.", desc: "The finest five-star properties in Dubai — from Downtown to Palm Jumeirah — curated for the most discerning guests." },
          { tag: "Elite Network", title: "The highest calibre of company.", desc: "Curated guest lists. Board-level conversations. Off-court experiences designed for the global elite." },
          { tag: "Desert Experiences", title: "Beyond the court.", desc: "Private desert safaris, helicopter city tours, Michelin-starred dining and exclusive yacht experiences in the Arabian Gulf." }
        ],
        datesTitle: "Available Retreats",
        dates: [
          { label: "November 19 – 22, 2026", desc: "4 days · 3 nights · Open Retreat", spots: "Limited Places" }
        ],
        ctaTitle: "Dubai. Your court is ready.",
        ctaDesc: "Four days. An unmatched city. The finest company.",
        ctaBtn: "Reserve Your Place",
        ctaSecondaryBtn: "Speak with Concierge"
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
    } as const;

export default en;
