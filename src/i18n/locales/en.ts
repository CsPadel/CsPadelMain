const en = {
      navbar: {
        ourStory: "Our Story",
        experience: "The Experience",
        destinations: "Destinations",
        upcomingRetreats: "Upcoming Retreats",
        menorca: "Menorca",
        bali: "Bali",
        dubai: "Dubai",
        mykonos: "Mykonos",
        eastSussex: "UK (East Sussex)"
      },
      experiencePage: {
        heroEyebrow: "The Experience",
        heroTitle: "Beyond the Court.",
        heroSubtitle: "It's not just about the padel. It's about where you play, who you play with, and everything that happens around the game.",
        apartTitle: "What sets us apart.",
        apart: [
          {
            title: "Real Padel Expertise",
            desc: "Over ten years playing and coaching at a high level, including competitive players on our own team. We know the game, not just the industry around it."
          },
          {
            title: "Run End-to-End, By Us",
            desc: "Coaching, hospitality, logistics and dining, all handled directly by our own team. Nothing outsourced, nothing generic."
          },
          {
            title: "Personal, Whatever the Format",
            desc: "Mixed abilities welcome on every retreat, with coaching tailored player by player. For private and executive groups, the entire itinerary is built around you."
          }
        ],
        offCourtEyebrow: "Off the Court",
        offCourtTitle: "It doesn't stop at the final point.",
        offCourtText: "Boat tours along hidden coastlines. Wine and cheese tastings at local vineyards. Cliffside sunsets. Mountain and beach hikes. Handpicked dining that reflects each destination, not a resort buffet. The court is where it starts. It's not where it ends.",
        quoteEyebrow: "In Their Words",
        quote: "We've always been passionate about padel, travel, and the experience of discovering new places and meeting new people. We realised how easily the game creates connection, no matter your level or background. Through shared experiences on and off the court, we want to bring people together in beautiful locations and create moments that go beyond just playing padel.",
        quoteAuthor: "Alexi & Oliver Watelet, Co-Founders",
        ctaTitle: "Ready to experience it?",
        ctaText: "Every Courtside retreat starts with a conversation."
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
              desc: "Led by former professionals at one of Menorca's premier padel venues – home club of one of the world's top players."
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
        // agenda: each activity has an `image` field – a standalone path string (e.g. "/imagenes/filename.jpg")
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
                title: 'Breakfast – Barceló Nura',
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
                title: 'Lunch & Boat Tour – Sa Punta',
                desc: 'Lunch at Sa Punta restaurant followed by a charter boat tour from Es Castell.',
                image: '/imagenes/Cala en porter.jpg',
              },
              {
                time: '20:00',
                title: 'Dinner – Hotel / Free Evening',
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
                title: 'Breakfast – Barceló Nura',
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
                title: 'Vineyard Tour & Lunch – Binifadet',
                desc: 'Tour and lunch at Binifadet winery. Wine & cheese tasting included.',
                image: '/imagenes/binifadet.jpeg',
              },
              {
                time: '20:00',
                title: 'Dinner – La Calita',
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
                title: 'Early Breakfast – Barceló Nura',
                desc: 'Tournament day starts early. Hydration packs ready and group seating reserved.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '09:00 – 13:00',
                title: 'Padel Tournament – Padelin',
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
                title: "Sunset & Tapas – Cova d'en Xoroi",
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
                title: 'Final Breakfast – Barceló Nura',
                desc: 'Last group breakfast together. Luggage out by 11:00.',
                image: '/imagenes/bambu.jpg',
              },
              {
                time: '10:30 – 13:00',
                title: 'Optional Padel Session – Padelin',
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
          { q: "Do I need padel experience?", a: "No. Our retreats welcome all levels – coaching is tailored from beginners building foundations to advanced players refining strategy." },
          { q: "Is everything included?", a: "Yes. Everything in the itinerary is included – accommodation, all meals, coaching, matchplay, local transport, and activities. Guests are welcome to skip any activity. Anything booked outside the itinerary is at the guest's own cost." },
          { q: "Are flights and airport transfers included?", a: "Transfers to and from Mahón Airport are included. Flights are not – our concierge can advise on routes or arrange a private charter on request." },
          { q: "Can a non-playing partner come along?", a: "Yes. Non-playing partners pay the same retreat price, and their programme can be customised around their preferences." },
          { q: "What about dietary requirements?", a: "Our on-site private chef builds bespoke menus around a wellness and dietary questionnaire sent before arrival." },
          { q: "How many guests per retreat?", a: "Each open retreat is capped to preserve exclusivity. Private retreats run for a minimum of 6 guests." },
          { q: "Can I extend my stay before or after the retreat?", a: "Yes – we can arrange additional nights at Barceló Nura on request." },
          { q: "Can I book a private retreat on different dates?", a: "Yes. We run fully bespoke private retreats on any week of the year, with a minimum of 6 guests and 2 months' lead time." },
          { q: "When is the next Menorca retreat?", a: "30 September – 4 October 2026 (4 nights, 5 days). Places are limited – early booking is advised." },
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
          headlineLine1: "Curated",
          headlineLine2: "Padel Retreats",
          discoverBtn: "Discover Experiences",
          scroll: "Scroll",
          slogan: "Beyond the court. Into an experience.",
          subtitle: "Wellness, rest, and networking through padel.",
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
      pageLoader: {
        tagline: "Luxury Padel Retreats"
      },
      footer: {
        ariaLabel: "Site footer",
        quote: "Padel brings us on court.<br/>The experience makes it unforgettable.",
        companyLabel: "Company",
        corporate: "Corporate & Executive",
        contactLabel: "Get in Touch",
        whatsappConcierge: "WhatsApp Concierge",
        messageTeam: "Message the Team",
        whatsappMessage: "Hello, I'd like to enquire about a Courtside Padel retreat.",
        rights: "© 2026 Courtside Padel. All rights reserved.",
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
        label: "Chat with Us",
        ariaLabel: "Chat with the Courtside team on WhatsApp",
        prefillMessage: "Hello, I'd like to speak with the Courtside team."
      },
      cookiePolicy: {
        title: "Cookie Policy",
        intro: "This policy explains how Courtside Padel uses cookies and similar technologies on courtsidepadel.com.",
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
            body: "You can accept or reject non-essential cookies via the banner shown on your first visit. To change your choice later, clear your browser data for this site or contact us at awatelet@cspadel.com."
          },
          {
            title: "Updates",
            body: "We may update this policy from time to time. The latest version will always be available on this page."
          }
        ]
      },
      bespokeRetreats: {
        eyebrow: "Bespoke Private Retreats",
        title: "Have Your Own Dates in Mind?",
        description: "Already have your group and your dates? Tell us your plans and we'll build the retreat around them – any week of the year, in Menorca.",
        features: [
          "Minimum 6 guests",
          "Any week of the year",
          "Fully tailored",
          "Two months' notice"
        ],
        cta: "Plan Your Retreat"
      },
      baliPage: {
        heroTitle: "BALI",
        heroTagline: "Jungle Luxury. Elite Padel.",
        heroLocation: "Uluwatu · Bali",
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
          { tag: "Luxury Villas", title: "Private infinity pools. Open-air pavilions.", desc: "Hand-selected boutique villas above the Uluwatu cliffs with personal staff, private pools and total seclusion in the tropics." },
          { tag: "Bali Wellness", title: "Holistic recovery and performance.", desc: "Balinese spa treatments, sunrise yoga, guided meditation and cold plunge pools – the full performance recovery." },
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
        ctaSecondaryBtn: "Speak with Concierge",
        landing: {
          heroAlt: "Infinity pool at dusk – Courtside Bali estate",
          heroTitle: "An Escape to Bali.",
          heroSubtitle: "A private cliff-top estate on the Bukit Peninsula, home to the only WPT-recognised padel courts on the island. A Mandarin Oriental Home.",
          stayEyebrow: "Where You Stay",
          stayTitle: "Two ways to experience Bali.",
          estateTitle: "The Estate",
          estateText: "The entire 8-suite cliff-top estate, exclusively yours. Private chef, butler, and concierge, an infinity pool overlooking the Indian Ocean, and a private spa pavilion. On-site experiences included: spa treatments, yoga, cooking classes, personal training, and more. This is the full, in-house Bali retreat, built for groups who want everything on one property.",
          estateImageAlts: [
            "Aerial view of the Bali estate and infinity pool",
            "Open-air living pavilion at the Bali estate",
            "Bali estate suite with outdoor bath"
          ],
          studiosTitle: "The Studios",
          studiosText: "Modern, comfortable rooms just steps from the padel courts, ideal for solo travellers, couples, or anyone who'd rather spend the week out exploring Bali than in. Air-conditioned, with ensuite bathrooms and a kitchenette. On-site extras like spa and cooking classes aren't included here, but can be arranged through local partners on request.",
          studiosImageAlt: "The Studios – interior room",
          courtsEyebrow: "The Courts",
          courtsTitle: "The only WPT-recognised courts in Bali.",
          courtsText: "Two courts, custom-built by Padel Galis, the official court provider of the World Padel Tour. Set within the estate, overlooking the Indian Ocean. It's the only facility of its kind on the island.",
          courtsImageAlt: "Padel Galis courts at the Bali estate, overlooking the Indian Ocean",
          beyondEyebrow: "Off the Court",
          beyondTitle: "Bali, beyond the estate.",
          beyondText: "Surfing, diving, paragliding, temple visits, cycling, sound healing, and more, all arranged through a local activity coordinator who knows the island inside out. Whatever you're into, it's within reach.",
          beyondImageAlt: "The Uluwatu coastline, beyond the Bali estate",
          closingImageAlt: "The private chef and culinary team at the Bali estate",
          ctaTitle: "Ready to Experience Uluwatu?",
          ctaText: "Dates and pricing are confirmed once we know your group and plans. Full itinerary available on request.",
          ctaBtn: "Enquire About Bali",
          gallery: {
            eyebrow: "The Gallery",
            title: "A Taste of Bali",
            dragHint: "Click & drag",
            prev: "Previous images",
            next: "Next images"
          }
        }
      },
      eastSussexPage: {
        landing: {
          heroAlt: "The main house at Crafted at Powdermills, seen across the private lake at golden hour",
          heroTitle: "The English Countryside, 70 Minutes from London.",
          heroSubtitle: "Crafted at Powdermills is a boutique country hotel on a private lake, with its own dedicated padel club.",
          roomsEyebrow: "Where You Stay",
          roomsTitle: "Rooms & Cottages",
          roomsText: "Rooms range from Cosy doubles to full Suites, and three private cottages, Ash Cottage, Oak Cottage, and The Lake House, sleep between six and ten, each with their own kitchen and living space. The Lake House also has its own deck onto the lake and a private garden. Dog-friendly throughout.",
          roomsImageAlts: [
            "A Suite at Crafted at Powdermills, with sitting area and lounge seating",
            "The Lake House cottage exterior, on the edge of the lake"
          ],
          padelEyebrow: "The Padel",
          padelTitle: "An established club, not a court built for the occasion.",
          padelText: "Crafted Padel Club already runs two courts, with coaching, classes, and a real community around it, not something added for a retreat. Guests and members can book games, and beginner and advanced classes run weekly. This is a place people already come to play.",
          padelImageAlts: [
            "The two padel courts at Crafted Padel Club, East Sussex",
            "A coaching session on court at Crafted Padel Club"
          ],
          bookEyebrow: "How It Works",
          bookTitle: "Book It Your Way",
          bookText1: "Crafted at Powdermills already hosts large-scale corporate events, with spaces that have held over 200 people for company days and celebrations. Whether it's a small leadership offsite or a full company retreat, the venue and the padel club both scale to fit.",
          bookText2: "Open retreats and private group buyouts can also be arranged here, built around your dates rather than fixed ones. Stay one night or stay a week. We build the programme, working directly with the team at Crafted.",
          bookImageAlt: "A private dining and events room at Crafted at Powdermills, set for a long-table group dinner",
          beyondEyebrow: "Beyond the Court",
          beyondTitle: "There's a lot more than padel here.",
          beyondText: "A wood-fired hot tub and sauna by the lake, cold plunge, wild swimming, paddleboards and kayaks on the lake, pottery and craft workshops in the Craft Barn, a full gym and studio programme, and a restaurant and pub both worth staying in for. Most of what makes this retreat memorable happens off the court.",
          beyondImageAlt: "The lakeside sauna at Crafted at Powdermills, looking out over the water",
          closingImageAlt: "The restaurant at Crafted at Powdermills",
          ctaEyebrow: "Start the Conversation",
          ctaTitle: "Ready to Experience East Sussex?",
          ctaText: "Dates and pricing are confirmed once we know your group and plans.",
          ctaBtn: "Enquire About East Sussex"
        }
      },
      dubaiPage: {
        heroTitle: "DUBAI",
        heroTagline: "Urban Prestige. Desert Courts.",
        heroLocation: "Coming Soon",
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
          { tag: "Penthouse Suites", title: "Icons of urban luxury.", desc: "The finest five-star properties in Dubai – from Downtown to Palm Jumeirah – curated for the most discerning guests." },
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
        ctaSecondaryBtn: "Speak with Concierge",
        landing: {
          heroAlt: "Dubai skyline at golden hour",
          title: "Dubai.<br/>Coming Soon.",
          text: "We're building something special for Dubai. Get in touch if you'd like to be the first to know when it's ready.",
          ctaBtn: "Get in Touch"
        }
      },
      mykonosPage: {
        heroTitle: "MYKONOS",
        heroTagline: "Aegean Elegance. Elite Padel.",
        heroLocation: "Mykonos · Greece",
        heroDate: "2027 Season · 5 Days · All-Inclusive",
        heroSubtitle: "Whitewashed villages, endless Aegean blue, and elite padel at golden hour. Five days of coaching and sun-soaked luxury on one of Europe's most storied islands.",
        sectionTag: "The Destination",
        sectionTitle: "The Mykonos Retreat",
        bookBtn: "Reserve Your Place",
        enquireBtn: "Speak with Concierge",
        whatsappMessage: "Hello, I'd like to enquire about the Mykonos padel retreat.",
        galleryLabel: "Gallery",
        galleryNote: "Photography coming soon",
        stats: {
          duration: { value: "5", label: "Days" },
          group: { value: "8–16", label: "Guests Max" },
          rating: { value: "5★", label: "Cycladic Villas" },
          privacy: { value: "100%", label: "Private" }
        },
        pillars: [
          { tag: "Elite Coaching", title: "Morning sessions. Golden hour matchplay.", desc: "Coach-led training and competitive matchplay against an Aegean backdrop, tailored to every level from foundation to elite." },
          { tag: "Cycladic Villas", title: "Whitewashed walls. Endless sea views.", desc: "Hand-selected clifftop villas with private pools, sweeping Aegean views and total seclusion above the water." },
          { tag: "Aegean Wellness", title: "Recovery, island style.", desc: "Sea swims, sunset yoga, Mediterranean spa rituals and long lunches built for full performance recovery." },
          { tag: "Island Culture", title: "The real Mykonos, curated for you.", desc: "Private boat days to hidden coves, sunset in Little Venice, Chora's old town, and beach club evenings among the Cyclades." }
        ],
        datesTitle: "Available Retreats",
        dates: [
          { label: "2027 Season", desc: "5 days · 4 nights · Open Retreat", spots: "Dates TBA" }
        ],
        ctaTitle: "Mykonos. Your court on the Aegean.",
        ctaDesc: "An intimate group. A private villa. Five days above the sea.",
        ctaBtn: "Reserve Your Place",
        ctaSecondaryBtn: "Speak with Concierge"
      },
      upcomingRetreatsPage: {
        eyebrow: "Next 12–18 Months",
        heroTitle: "Upcoming Retreats.",
        heroSubtitle: "Elite padel, exceptional company, and everything around the game curated to match – across every Courtside destination.",
        bespokeNote: "Bespoke dates available upon request.",
        destinations: {
          menorca: {
            name: "Menorca",
            location: "Balearic Islands · Spain",
            dates: ["October 2026", "April 2027", "May 2027", "June 2027", "September 2027", "October 2027"],
            cta: "Explore Menorca"
          },
          bali: {
            name: "Bali",
            location: "Uluwatu · Bali",
            dates: ["March 2027", "July 2027", "August 2027"],
            cta: "Explore Bali"
          }
        },
        ctaTitle: "Have your own dates in mind?",
        ctaText: "Tell us your plans and we'll build the retreat around them.",
        ctaBtn: "Plan Your Retreat"
      },
      homePage: {
        retreatTypes: {
          ariaLabel: "Retreat types",
          eyebrow: "Retreat Formats",
          title: "Choose Your Retreat.",
          explore: "Explore",
          viewDetails: "view details",
          items: {
            open: {
              tag: "Solo or Friends",
              name: "Open Retreat",
              desc: "Join a curated group of like-minded players for five immersive days of padel, fine dining and Mediterranean life."
            },
            private: {
              tag: "Ultimate Privacy",
              name: "Private Retreat",
              desc: "Reserve the entire estate exclusively for your group. Complete privacy, custom schedule, and total immersion."
            },
            executive: {
              tag: "C-Suite & Boards",
              name: "Corporate & Executive",
              desc: "Strategy in silence. High-performance leadership and networking in the most exclusive padel setting."
            }
          }
        },
        destinations: {
          eyebrow: "Confirmed 2026",
          title: "Our Destination",
          location: "Balearic Islands · Spain",
          tagline: "Mediterranean Sanctuary",
          dates: "Sep 30 – Oct 4, 2026",
          spots: "Few Spaces Left",
          explore: "Explore"
        },
        upcoming: {
          eyebrow: "Dates TBA",
          title: "Upcoming Retreats",
          subtitle: "New destinations in development for our 2027 calendar. Register your interest to hear first.",
          viewAll: "View all",
          explore: "Explore",
          items: {
            bali: { tagline: "A private cliff-top estate. Elite padel.", location: "Uluwatu · Bali" },
            dubai: { tagline: "Coming soon.", location: "Coming Soon" }
          }
        },
        partners: {
          ariaLabel: "Our partners",
          eyebrow: "Our Partners",
          title: "In partnership with the best."
        }
      },
      ourStoryPage: {
        heroAlt: "Courtside Padel – Our Story",
        heroEyebrow: "The Founders",
        heroTitle: "Our Story.",
        heroSubtitle: "Twin brothers. Different paths. Padel changed everything.",
        beganEyebrow: "How It Began",
        beganTitle: "Born from a<br/>shared obsession.",
        beganParagraphs: [
          "We're twin brothers, born in New York and raised in London. As kids, we did everything together, training, competing, travelling, always chasing the next opportunity sport could give us. At 15, that changed. Alexi left for the south of France to chase professional tennis. Oliver stayed in London, drawn to football instead. Racket sports had always been part of who we were, but for a few years, life pulled us in different directions.",
          "Travelling in Menorca in 2019, we picked up padel for the first time and were hooked immediately, not just by the game, but everything around it: walking off court for a drink, meeting new people, jumping in the pool after a match. Competitive, but social. That combination is what Courtside is built on.",
          "The idea came together gradually. We'd both grown up travelling, exposed early to new places and cultures, a love that never left us. As padel grew into one of the fastest-growing sports in the world, it clicked: pair a beautiful destination with world-class padel, bring people together, and build something around the feeling we first found in Menorca.",
          "Menorca wasn't a random choice. It's the island where we fell in love with the sport, and one we've returned to for eight years running. It was the obvious place to build the first Courtside retreat."
        ],
        foundersEyebrow: "The People Behind It",
        foundersTitle: "Meet the founders.",
        founderRole: "Co-Founder",
        founderAlt: "Co-Founder, Courtside Padel",
        foundersQuote: "Alexi grew up chasing tennis. Oliver grew up chasing football. Padel gave us the exact same obsession, just for a different game.",
        believeEyebrow: "What We Believe",
        believeQuote: "Padel brings us on court.<br/>The experience makes it unforgettable.",
        believeText: "The best retreats don't feel like events. They feel like the week you keep talking about three years later.",
        ctaTitle: "Ready to build your own story?",
        ctaText: "Every Courtside retreat starts with a conversation."
      },
      executivePage: {
        heroAlt: "Small group mid-rally – Corporate & Executive padel retreat",
        heroTitle: "Corporate & Executive Retreats.",
        heroSubtitle: "From leadership offsites and team building to rewards trips and board retreats, we build closed, bespoke padel retreats for companies of every kind.",
        quote: "Padel is social by nature. It's competitive, but never too serious, played in doubles on a small court that keeps everyone close enough to talk between points. Somehow it gets people communicating and working as a team without really trying.",
        formatEyebrow: "The Format",
        formatTitle: "A closed retreat.<br/>Your agenda.",
        formatText: "The Executive Retreat is a fully closed, bespoke experience for leadership teams, boards, and company groups of every kind. Your group has our full team for the duration of the retreat. A fully private buyout, whether an entire estate or a private villa, can be arranged depending on the destination.",
        formatImageAlt: "Empty padel court, private and quiet",
        pillars: [
          {
            number: "01",
            title: "Full Exclusivity",
            desc: "A fully private buyout, whether that's an entire estate or a private villa, can be arranged on request depending on the destination."
          },
          {
            number: "02",
            title: "Bespoke Programme",
            desc: "From coaching intensity to boardroom sessions, spa days, and private dining, every element is built around your brief."
          },
          {
            number: "03",
            title: "Total Discretion",
            desc: "NDAs, private transfer coordination, and complete confidentiality from our team, on every retreat we run."
          }
        ],
        ctaEyebrow: "Start the Conversation",
        ctaTitle: "Every corporate retreat<br/>begins with a brief.",
        ctaText: "Tell us your objectives, group size and preferred dates. We'll build the programme around you.",
        ctaBtn: "Enquire About a Corporate Retreat"
      },
      testimonials: {
        label: "What Guests Have To Say",
        title: "Remembered long after.",
        subtitle: "Guests arrive as players. They leave part of the Courtside community.",
        // Real guest testimonials with real photos, dated 2026 (after "Est. 2025").
        items: [
          {
            name: "Dylan Sweidan",
            role: "Guest · Menorca",
            text: "Menorca was the perfect setting for a padel retreat. The balance between time on court, great food, exploring the island and relaxing by the sea made it feel like so much more than just a coaching trip.",
            initials: "D",
            image: "/imagenes/cms/testimonial-dylan-sweidan.jpg"
          },
          {
            name: "Katja Bonnavion",
            role: "Guest · Menorca",
            text: "I had an amazing 5 days. The hotel, restaurants and activities were all brilliant, and the coaching was adapted to everyone's level, which made every session enjoyable.",
            initials: "K",
            image: "/imagenes/cms/testimonial-katja-bonnavion.jpg"
          },
          {
            name: "Anatole Levy",
            role: "Guest · Menorca",
            text: "What stood out most was how well-rounded the experience was. We played plenty of padel, but also got to experience the best of Menorca, eat at some fantastic places and meet genuinely great people. I'd book again without hesitation.",
            initials: "A",
            image: "/imagenes/cms/testimonial-anatole-levy.jpg"
          },
          {
            name: "Sergi Pons",
            role: "Guest · Menorca",
            text: "If you're looking to improve your padel, I'd definitely recommend it. The coaching was high quality, the sessions were engaging, and I left feeling much more confident on court.",
            initials: "S",
            image: "/imagenes/cms/testimonial-sergi-pons.jpg"
          }
        ]
      },
      enquiryForm: {
        triggerLabel: "Enquire About a Retreat",
        eyebrow: "Retreat Enquiry",
        title: "Let's build your retreat.",
        close: "Close enquiry form",
        back: "Back",
        next: "Continue",
        submit: "Send enquiry",
        sending: "Sending…",
        emailSubject: "Courtside retreat enquiry",
        steps: {
          destination: {
            question: "Where would you like to play?",
            help: "Pick a destination, or tell us you're still deciding.",
            options: {
              menorca: "Menorca",
              bali: "Bali",
              dubai: "Dubai",
              undecided: "Still deciding"
            }
          },
          dates: {
            question: "When are you thinking of travelling?",
            help: "Private retreats run any week of the year, with two months' notice.",
            monthLabel: "Month",
            yearLabel: "Year",
            months: {
              january: "January",
              february: "February",
              march: "March",
              april: "April",
              may: "May",
              june: "June",
              july: "July",
              august: "August",
              september: "September",
              october: "October",
              november: "November",
              december: "December",
              flexible: "Flexible"
            }
          },
          group: {
            question: "How many of you will be travelling?",
            help: "Including any non-playing partners joining the group.",
            label: "Group size",
            placeholder: "e.g. 8",
            note: "Private retreats run for a minimum of 6 guests. Travelling solo or as a pair? Our open retreats are the perfect fit."
          },
          priorities: {
            question: "What matters most to you?",
            help: "Choose as many as you like – it helps us shape the week around your group.",
            options: {
              coaching: "Coaching and improvement",
              matchplay: "Competitive matchplay",
              wellness: "Wellness and recovery",
              dining: "Food and wine",
              boatAndSea: "Boat days and the sea",
              culture: "Local culture and exploring",
              celebration: "A birthday or celebration",
              corporate: "A company or leadership offsite"
            },
            notesLabel: "Anything else we should know?",
            notesPlaceholder: "The occasion, playing levels, must-haves…"
          },
          contact: {
            question: "How can we reach you?",
            help: "One of the founders will come back to you personally, usually within 24 hours.",
            firstName: "First name",
            lastName: "Last name",
            email: "Email",
            phone: "Phone",
            phoneOptional: "Optional",
            consent: "I agree to Courtside Padel using these details to respond to my enquiry."
          }
        },
        errors: {
          destination: "Please choose a destination to continue.",
          dates: "Please choose a month and a year.",
          group: "Please tell us how many guests are travelling.",
          name: "Please enter your first and last name.",
          email: "Please enter a valid email address.",
          consent: "Please accept the use of your details so we can reply.",
          submit: "Something went wrong sending your enquiry. Please email awatelet@cspadel.com and we'll pick it up straight away."
        },
        success: {
          title: "Thank you.",
          body: "Your enquiry is with us. One of the founders will be in touch personally to start shaping your retreat."
        }
      }
    } as const;

export default en;
