import { Contact, FootballResource, NewsItem, SpotracContract, TranscriptionJob, VCFirm } from '../types';

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'cnt-01',
    first_name: 'Marcus',
    last_name: 'Vance',
    email: 'm.vance@nflscoutcentral.org',
    phone: '+1 (214) 555-0182',
    organization: 'National Football Scouting (NFS)',
    source_type: 'nfs_portal',
    hubspot_id: 'hs-90281',
    scouting_role: 'Senior National Scout',
    relationship_strength: 5,
    last_contact_at: '2026-09-18T10:30:00Z',
    metadata: {
      territory: 'SEC / Big 12',
      targetDeal: '2027 Pro Day Priority Access',
      notes: 'Key decision maker for regional combine credentials and APT portal tier 3 clearance.',
      linkedin: 'https://linkedin.com/in/marcusvance-nfl'
    }
  },
  {
    id: 'cnt-02',
    first_name: 'Elena',
    last_name: 'Rostova',
    email: 'elena.rostova@sapphiresport.vc',
    phone: '+1 (415) 555-7391',
    organization: 'Sapphire Sport',
    source_type: 'csv_import',
    hubspot_id: 'hs-88412',
    scouting_role: 'Partner, Sports Tech Strategy',
    relationship_strength: 4,
    last_contact_at: '2026-09-15T16:45:00Z',
    metadata: {
      territory: 'Global',
      targetDeal: 'Series A Co-Investment in Athlete Vision AI',
      notes: 'Focuses on scalable media rights and youth sports analytics SaaS.',
      linkedin: 'https://linkedin.com/in/elena-rostova-vc'
    }
  },
  {
    id: 'cnt-03',
    first_name: 'Dave',
    last_name: 'Kowalski',
    email: 'd.kowalski@blesto-eval.com',
    phone: '+1 (312) 555-4921',
    organization: 'BLESTO Scouting Service',
    source_type: 'manual',
    scouting_role: 'Midwest Regional Director',
    relationship_strength: 5,
    last_contact_at: '2026-09-19T08:15:00Z',
    metadata: {
      territory: 'Big Ten / MAC',
      targetDeal: 'Fall Draft Grade Calibration Exchange',
      notes: 'Requires dual-auth badge confirmation for senior spring combine board sharing.'
    }
  },
  {
    id: 'cnt-04',
    first_name: 'Tariq',
    last_name: 'Sterling',
    email: 't.sterling@frontofficesports.com',
    phone: '+1 (212) 555-8320',
    organization: 'Front Office Sports / Media',
    source_type: 'csv_import',
    scouting_role: 'Senior Media Rights Reporter',
    relationship_strength: 4,
    last_contact_at: '2026-09-12T14:20:00Z',
    metadata: {
      territory: 'National',
      targetDeal: 'Preps2Press Syndication Agreement',
      notes: 'Interested in exclusive high school to pro transition metrics and NIL analytics.'
    }
  },
  {
    id: 'cnt-05',
    first_name: 'Grover',
    last_name: 'Norcross',
    email: 'gnorcross@oneheartproject.org',
    phone: '+1 (817) 555-6610',
    organization: 'One Heart Project',
    source_type: 'manual',
    hubspot_id: 'hs-71932',
    scouting_role: 'Executive Director, Athlete Mentorship',
    relationship_strength: 5,
    last_contact_at: '2026-09-17T11:00:00Z',
    metadata: {
      territory: 'National / At-Risk Youth',
      targetDeal: 'Annual Sports Executive Gala & Scholarship Fund',
      notes: 'Leading sports rehabilitation program connecting pro athletes with juvenile justice reform.'
    }
  },
  {
    id: 'cnt-06',
    first_name: 'Chloe',
    last_name: 'Sinclair',
    email: 'csinclair@arctospartners.com',
    phone: '+1 (646) 555-9034',
    organization: 'Arctos Partners',
    source_type: 'csv_import',
    scouting_role: 'VP Franchise Valuation & PE Deals',
    relationship_strength: 3,
    last_contact_at: '2026-09-10T19:00:00Z',
    metadata: {
      territory: 'North America / European Leagues',
      targetDeal: 'Minority Stake Syndicate in Pro Football Franchise',
      notes: 'Leading institutional investor in professional sports franchises and stadium real estate.'
    }
  }
];

export const FOOTBALL_RESOURCES: FootballResource[] = [
  {
    name: 'Christian Prep Football News',
    classification: 'Confirmed Publication',
    status: 'Live Publication',
    type: 'High School & Prep Media',
    url: 'https://christianprepfootballnews.com',
    requiresAuth: false,
    description: 'Premier national publication covering Christian high school programs, athletic excellence, character development, and collegiate recruiting pipelines.',
    badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40'
  },
  {
    name: 'American Football Scouting Int. (AFSI)',
    classification: 'Subdomain',
    status: 'Verified',
    type: 'International Scouting Engine',
    url: 'https://afsi.preps2pro.com',
    requiresAuth: true,
    description: 'Specialized evaluation database tracking European, Latin American, and Canadian talent for NFL International Player Pathway and collegiate rosters.',
    badgeColor: 'border-violet-500/40 text-violet-400 bg-violet-950/40'
  },
  {
    name: 'Preps2Press Portal',
    classification: 'Internal Workspace',
    status: 'User-Owned',
    type: 'Media & Reporter Directory',
    url: 'https://preps2pro.com/portal',
    requiresAuth: true,
    description: 'Proprietary management hub coordinating prep reporters, photojournalists, team press boxes, and direct broadcast rights accreditation.',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-950/40'
  },
  {
    name: 'BLESTO Scouting',
    classification: 'Pro Scouting',
    status: 'Restricted',
    type: 'Authorized Member Teams Only',
    url: null,
    requiresAuth: true,
    description: 'Restricted cooperative scouting bureau servicing partner NFL franchises. Access requires verified NFL franchise credentials and active board clearance.',
    badgeColor: 'border-rose-500/40 text-rose-400 bg-rose-950/40'
  },
  {
    name: 'NFL Scouting Combine',
    classification: 'Public',
    status: 'Verified',
    type: 'Official Combine Central',
    url: 'https://www.nflcombine.net/',
    requiresAuth: false,
    description: 'Official schedule, timing results, medical standards, media credentials, and verified athletic test benchmarks for the annual NFL Combine.',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40'
  },
  {
    name: 'NFS APT Portal',
    classification: 'Secure Portal',
    status: 'Authorized Only',
    type: 'National Football Scouting APT',
    url: 'https://secure.nationalfootballscouting.com/aptportal/',
    requiresAuth: true,
    description: 'Secure enterprise portal providing authenticated scouts access to proprietary medical reports, interview transcripts, and testing logs.',
    badgeColor: 'border-sky-500/40 text-sky-400 bg-sky-950/40'
  }
];

export const VC_FIRM_DIRECTORY: VCFirm[] = [
  {
    id: 'vc-01',
    name: 'Techstars Sports',
    stage: 'Pre-Seed & Seed',
    focus: 'Emerging Athlete Tech, Wearables, Coaching SaaS',
    keyFirmsOrPeople: ['Jordan Fliegel', 'Matthew Eisner'],
    checkSize: '$120K - $500K',
    location: 'Indianapolis, IN / Boulder, CO',
    portfolioHighlights: ['Nextiles', 'Zone7', 'ReSpo.Vision', 'Kinatrax'],
    website: 'https://techstars.com/accelerators/sports',
    status: 'Active Dealflow',
    thesisNotes: 'Foundational investments targeting athletic biometric capture and youth sports tournament software. Strictly sports-performance focus.'
  },
  {
    id: 'vc-02',
    name: 'SeventySix Capital',
    stage: 'Pre-Seed & Seed',
    focus: 'Sports Tech & Next-Gen Media (No Sportsbooks)',
    keyFirmsOrPeople: ['Wayne Kimmel', 'Chad Stender'],
    checkSize: '$250K - $1.5M',
    location: 'Conshohocken, PA',
    portfolioHighlights: ['Quintessential', 'Diamond Kinetics', 'Nerd Street', 'ShotTracker'],
    website: 'https://seventysixcapital.com',
    status: 'In Discussions',
    thesisNotes: 'Early-stage smart sports venues, connected equipment, and athlete-led consumer media brands.'
  },
  {
    id: 'vc-03',
    name: 'Kaptyn Ventures',
    stage: 'Pre-Seed & Seed',
    focus: 'Grassroots Athletics SaaS & Athlete Recovery',
    keyFirmsOrPeople: ['Austin Meyer', 'Sloan Harris'],
    checkSize: '$500K - $2M',
    location: 'Austin, TX',
    portfolioHighlights: ['HydroRecover', 'PrepSync', 'VarsityLocker'],
    website: 'https://kaptyn.com',
    status: 'Monitored',
    thesisNotes: 'Backing collegiate NIL operational infrastructure and high school athletic directors compliance workflows.'
  },
  {
    id: 'vc-04',
    name: 'Courtside Ventures',
    stage: 'Series A & B',
    focus: 'Scaled Media Platforms, Fan Engagement, Venue Experience',
    keyFirmsOrPeople: ['Deepen Parikh', 'Vasudev Bailey'],
    checkSize: '$2M - $8M',
    location: 'New York, NY & Detroit, MI',
    portfolioHighlights: ['The Athletic (exited)', '100 Thieves', 'Beam', 'Overtime', 'Freeletics'],
    website: 'https://courtsidevc.com',
    status: 'Active Dealflow',
    thesisNotes: 'Leading early-growth fund backed by Dan Gilbert and sports team owners. Intersect of sports, gaming, and digital culture.'
  },
  {
    id: 'vc-05',
    name: 'Sapphire Sport',
    stage: 'Series A & B',
    focus: 'Enterprise Sports Tech, Fan Monetization, Connected Fitness',
    keyFirmsOrPeople: ['Doug Higgins', 'Michael Spirito'],
    checkSize: '$3M - $12M',
    location: 'San Francisco, CA',
    portfolioHighlights: ['Tonal', 'Fevo', 'Buzzer', 'Aglet', 'Flowhaven'],
    website: 'https://sapphireventures.com/sport',
    status: 'Portfolio Company',
    thesisNotes: 'Anchor fund with LPs across City Football Group, San Jose Sharks, Adidas, and Sinclair Broadcast.'
  },
  {
    id: 'vc-06',
    name: 'Causeway Media Partners',
    stage: 'Series A & B',
    focus: 'Broadcasting Tech, Stadium IoT, Athletic Performance',
    keyFirmsOrPeople: ['Bob Higgins', 'Wyc Grousbeck (Boston Celtics Owner)'],
    checkSize: '$4M - $15M',
    location: 'Boston, MA',
    portfolioHighlights: ['SeatGeek', 'Formlabs', 'Quintessential', 'Hydrow', 'Streetbee'],
    website: 'https://causewaymp.com',
    status: 'Active Dealflow',
    thesisNotes: 'Founded by owners of the Boston Celtics and 49ers. Strong distribution network into pro sports team boardrooms.'
  },
  {
    id: 'vc-07',
    name: 'Arctos Partners',
    stage: 'Growth & Private Equity',
    focus: 'Institutional Pro Team Ownership Stakes & Stadium Infrastructure',
    keyFirmsOrPeople: ['Ian Charles', 'David O’Connor'],
    checkSize: '$25M - $250M+',
    location: 'Dallas, TX & New York, NY',
    portfolioHighlights: ['Golden State Warriors', 'Aston Martin F1', 'Paris Saint-Germain', 'Utah Jazz'],
    website: 'https://arctospartners.com',
    status: 'Monitored',
    thesisNotes: 'First institutional fund approved across MLB, NBA, MLS, and NHL for passive minority equity holding.'
  },
  {
    id: 'vc-08',
    name: 'RedBird Capital Partners',
    stage: 'Growth & Private Equity',
    focus: 'Global Sports Media Rights, League Creation, Venue Real Estate',
    keyFirmsOrPeople: ['Gerry Cardinale', 'Alec Scheiner'],
    checkSize: '$50M - $500M',
    location: 'New York, NY',
    portfolioHighlights: ['AC Milan', 'YES Network', 'Skydance Sports', 'TGL Golf', 'UFL'],
    website: 'https://redbirdcap.com',
    status: 'Active Dealflow',
    thesisNotes: 'Architects of transformative media businesses, partner to NFL Players Association (OneTeam Partners).'
  },
  {
    id: 'vc-09',
    name: 'Blue Owl / Dyal HomeCourt',
    stage: 'Growth & Private Equity',
    focus: 'NBA Team Fractional Equity & Global League Ecosystems',
    keyFirmsOrPeople: ['Michael Rees', 'Andrew Laurino'],
    checkSize: '$30M - $150M',
    location: 'New York, NY',
    portfolioHighlights: ['Phoenix Suns', 'Sacramento Kings', 'Atlanta Hawks'],
    website: 'https://blueowl.com',
    status: 'In Discussions',
    thesisNotes: 'Dedicated franchise liquidity fund offering liquidity to multi-generational ownership families.'
  }
];

export const SPOTRAC_HIGHLIGHTS: SpotracContract[] = [
  {
    player: 'Patrick Mahomes',
    team: 'Kansas City Chiefs',
    position: 'QB',
    contractValue: '$450,000,000',
    avgAnnual: '$45,000,000',
    guaranteed: '$141,481,905',
    freeAgentYear: 2032,
    capHit2026: '$44,500,000'
  },
  {
    player: 'Justin Jefferson',
    team: 'Minnesota Vikings',
    position: 'WR',
    contractValue: '$140,000,000',
    avgAnnual: '$35,000,000',
    guaranteed: '$110,000,000',
    freeAgentYear: 2029,
    capHit2026: '$29,800,000'
  },
  {
    player: 'Nick Bosa',
    team: 'San Francisco 49ers',
    position: 'DE',
    contractValue: '$170,000,000',
    avgAnnual: '$34,000,000',
    guaranteed: '$122,500,000',
    freeAgentYear: 2029,
    capHit2026: '$31,250,000'
  },
  {
    player: 'Joe Burrow',
    team: 'Cincinnati Bengals',
    position: 'QB',
    contractValue: '$275,000,000',
    avgAnnual: '$55,000,000',
    guaranteed: '$219,010,000',
    freeAgentYear: 2030,
    capHit2026: '$54,200,000'
  },
  {
    player: 'Lamar Jackson',
    team: 'Baltimore Ravens',
    position: 'QB',
    contractValue: '$260,000,000',
    avgAnnual: '$52,000,000',
    guaranteed: '$185,000,000',
    freeAgentYear: 2028,
    capHit2026: '$43,650,000'
  }
];

export const MOCK_NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-01',
    source: 'Sportico',
    title: 'NFL Private Equity Window Expands: Institutional Funds Cleared for 10% Team stakes',
    category: 'VC & Capital',
    timestamp: '18 min ago',
    url: 'https://sportico.com',
    highlight: 'Franchise valuations spike past $6.2B median as Arctos and institutional consortiums mobilize capital.'
  },
  {
    id: 'news-02',
    source: 'KennectedReader',
    title: 'Executive Intelligence Briefing: The Next Wave of NIL Collective Consolidations',
    category: 'Scouting',
    timestamp: '42 min ago',
    url: 'https://kennectedreader.com',
    highlight: 'Collegiate Athletic Directors moving toward centralized revenue-sharing front offices under NCAA settlement terms.'
  },
  {
    id: 'news-03',
    source: 'SBJ',
    title: 'Media Rights Negotiation Update: Big Ten & SEC Explore Global Streaming Carve-outs',
    category: 'Media Rights',
    timestamp: '1 hour ago',
    url: 'https://sportsbusinessjournal.com',
    highlight: 'Direct-to-consumer bundling accelerates while linear networks lock multi-year playoff access.'
  },
  {
    id: 'news-04',
    source: 'SportsTechie',
    title: 'Computer Vision in Football Scouting: High-School Film Tagged 14x Faster via Next-Gen AI',
    category: 'Tech Watch',
    timestamp: '2 hours ago',
    url: 'https://sporttechie.com',
    highlight: 'How Preps2Press and automated telemetry pipelines are leveling talent discovery across rural districts.'
  },
  {
    id: 'news-05',
    source: 'Christian Prep News',
    title: 'Character First: Trinity Christian Prepares for National Showcase Against IMG Academy',
    category: 'Scouting',
    timestamp: '3 hours ago',
    url: 'https://christianprepfootballnews.com',
    highlight: 'Top recruiting talent combines Christian mission with Division-I athletic pedigree under national spotlight.'
  }
];

export const INITIAL_TRANSCRIPTIONS: TranscriptionJob[] = [
  {
    id: 'job-901',
    filename: 'Call_Review_Agent_Sponsorship_SEC_Draft_2026.mp4',
    fileSize: '48.2 MB',
    duration: '24m 18s',
    status: 'completed',
    uploadedAt: '2026-09-19T09:15:00Z',
    speakers: ['Agent (Lead)', 'Executive (Brand Sponsor)', 'Athlete (Captain)'],
    tags: ['Sponsorship', 'NIL Terms', 'SEC Pro Day', 'Apparel Rights'],
    brightcoveVideoId: 'bc-8849102',
    summary: 'Executive sponsor confirmed $450k brand entitlement package across 8 collegiate activations. Agent requested exclusivity in hydration category.',
    segments: [
      {
        speaker: 'Agent',
        time: '00:01:14',
        text: 'Thank you everyone for jumping on. We are reviewing the verified combine tape alongside our Preps2Press statistical profile before formalizing the apparel sponsor rider.'
      },
      {
        speaker: 'Executive',
        time: '00:02:45',
        text: 'From the brand side, our CMO wants clear alignment on character standards and youth clinic participation, especially partnering with initiatives like One Heart Project.'
      },
      {
        speaker: 'Athlete',
        time: '00:04:10',
        text: 'Giving back to younger kids and showing leadership both on the field and in the community is my top priority. I want our partnership to represent integrity.'
      },
      {
        speaker: 'Agent',
        time: '00:05:30',
        text: 'Perfect alignment. We will incorporate the charitable matching grant directly into Section 4.2 of the HubSpot contract record.'
      }
    ]
  },
  {
    id: 'job-902',
    filename: 'Scout_Evaluation_Audio_AFSI_European_Combine.wav',
    fileSize: '19.4 MB',
    duration: '14m 52s',
    status: 'completed',
    uploadedAt: '2026-09-18T16:20:00Z',
    speakers: ['Scout (National)', 'Executive (Scouting Director)'],
    tags: ['AFSI', 'International Scouting', 'Edge Rusher', 'Combine Tape'],
    brightcoveVideoId: 'bc-7719203',
    summary: 'Detailed physical breakdown of 6ft 5in Frankfurt pass rusher. 10-yard split clocked at 1.58s with 82-inch wingspan. Fast-tracked for NFS APT portal entry.',
    segments: [
      {
        speaker: 'Scout',
        time: '00:00:45',
        text: 'Watching his lateral agility during the three-cone drill in Munich was eye-opening. His bend around the arc is ready for an NFL practice squad immediately.'
      },
      {
        speaker: 'Executive',
        time: '00:02:18',
        text: 'Agreed. Let us ensure the medical file is uploaded to the secure NFS APT portal ahead of the general Combine committee meeting.'
      }
    ]
  }
];
