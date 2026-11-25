import type {
  Campaign,
  Devotional,
  EditorialEntry,
  EventRecord,
  GalleryItem,
  GivingPurpose,
  Leader,
  MediaCollection,
  MediaEpisode,
  Ministry,
  ScheduleSlot,
  SiteSettings,
} from "@/domain/models";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteSettings: SiteSettings = {
  organizationName: "Christian Power Ministries International",
  shortName: "CPMI",
  declaration:
    "Declaring the love of God and demonstrating the purpose and power of the Kingdom of God.",
  values: ["Love", "Joy", "Righteousness", "Peace", "Justice"],
  foundedYear: 2014,
  foundedIn: "Johannesburg, South Africa",
  founderName: "Pastor Stephen Kabuye",
  vision:
    "A world where everyone discovers and maximises their full potential to fulfil their purpose in life.",
  mission:
    "To provide leadership, vision and resources to communities in order to restore mankind back to God's dominion leadership mandate.",
  scriptureReference: "Matthew 11:28",
  missionScriptures: ["Matthew 28:1–20", "Genesis 1:28"],
  beliefs: [
    { title: "Scripture", summary: "The Bible is inspired by God and is the foundation for faith, teaching and daily life.", references: ["2 Timothy 3:15–17"] },
    { title: "The living God", summary: "There is one true God, revealed as Father, Son and Holy Spirit, and Jesus Christ is fully divine.", references: ["Isaiah 43:10–11", "Matthew 1:23"] },
    { title: "Salvation and new life", summary: "Salvation is offered through Jesus Christ, calling every person to repentance, faith and a transformed life.", references: ["Luke 24:46–47", "Romans 12:1–2"] },
    { title: "Spirit-empowered witness", summary: "The Holy Spirit equips believers with power and gifts for worship, service and witness.", references: ["Acts 1:8", "1 Corinthians 12:4–10"] },
    { title: "The Church and its mission", summary: "The Church is called to make disciples, build community, care for people and carry the good news into the world.", references: ["Matthew 28:18–20", "Ephesians 2:19–22"] },
    { title: "Healing and eternal hope", summary: "We pray for healing, live in the hope of Christ's return and look toward God's promised new creation.", references: ["Matthew 8:16–17", "1 Thessalonians 4:16–17", "2 Peter 3:13"] },
  ],
  weeklyRhythm: [
    { day: "Sunday", title: "Kingdom Citizens Celebration", summary: "Corporate worship, fellowship and practical Kingdom teaching.", time: "9:00am–12:00pm" },
    { day: "Monday", title: "Kingdom Prayer Congress", summary: "Teaching, corporate prayer and intercession for people, communities and nations." },
    { day: "Tuesday", title: "Leadership Meeting", summary: "Planning, formation and development for ministry leaders and teams." },
    { day: "Wednesday", title: "Kingdom Success & Influence School", summary: "Biblical training for personal development, leadership and responsible influence." },
    { day: "Thursday", title: "Rehearsals & Department Meetings", summary: "Ministry teams prepare, rehearse and coordinate their work." },
    { day: "Friday", title: "Kingdom Prayer Meeting", summary: "A focused time of prayer and spiritual formation." },
    { day: "Saturday", title: "Groups, Activities & Seminars", summary: "Departmental gatherings, practical activities and learning opportunities." },
  ],
  objectives: [
    "Establish ministries locally and internationally.",
    "Develop the CPMI Centre for Training and Education.",
    "Establish colleges and institutions of learning locally and abroad.",
    "Establish radio stations to reach communities with Kingdom news.",
    "Minister to the sick, the poor and people in need.",
    "Encourage and develop Kingdom citizens through teaching, service and leadership.",
  ],
  publicEmail: process.env.MINISTRY_PUBLIC_EMAIL || undefined,
  publicPhone: process.env.MINISTRY_PUBLIC_PHONE || undefined,
  address: process.env.MINISTRY_ADDRESS || undefined,
  timezone: process.env.MINISTRY_TIMEZONE ?? "Africa/Johannesburg",
  siteUrl,
  socialLinks: [],
};

export const ministries: Ministry[] = [
  {
    slug: "kingdom-teaching-and-discipleship",
    name: "Kingdom Teaching & Discipleship",
    summary: "Helping people learn Kingdom principles and apply them in everyday life.",
    description: [
      "CPMI teaches the unchanging message of God's Kingdom in ways people can understand and practise in their homes, work and communities.",
      "Bible study, discipleship and Kingdom tools teaching help believers grow in character, purpose and service.",
    ],
    focusAreas: ["Bible study", "Discipleship", "Kingdom tools"],
    image: {
      src: "/assets/img/service/01.jpg",
      alt: "Temporary Danbox template photograph representing education and mentoring",
      temporary: true,
    },
    featured: true,
  },
  {
    slug: "children-youth-and-education",
    name: "Children, Youth & Education",
    summary: "Supporting children and young people as they learn, grow and discover purpose.",
    description: [
      "This ministry brings together children's ministry, youth ministry and educational support for school-age learners.",
      "Community learning includes tutoring in key school subjects, computer skills and music training as resources become available.",
    ],
    focusAreas: ["Children's ministry", "Youth development", "Tutoring and skills"],
    image: {
      src: "/assets/img/service/02.jpg",
      alt: "Temporary Danbox template photograph representing community media outreach",
      temporary: true,
    },
    featured: true,
  },
  {
    slug: "family-and-relationships",
    name: "Family & Relationships",
    summary: "Strengthening marriages, families, parents and people in every season of life.",
    description: [
      "CPMI supports healthy family life through biblical teaching, prayer, counselling and practical fellowship.",
      "The ministry serves married couples, single adults, single parents, widows and senior citizens with dignity and care.",
    ],
    focusAreas: ["Marriage and family", "Single parents and widows", "Seniors"],
    image: {
      src: "/assets/img/service/03.jpg",
      alt: "Temporary Danbox template photograph representing compassionate community care",
      temporary: true,
    },
    featured: true,
  },
  {
    slug: "healing-and-compassionate-care",
    name: "Healing & Compassionate Care",
    summary: "Praying for the sick and supporting people facing practical or emotional need.",
    description: [
      "Healing, hospital visitation, counselling and community care are central expressions of CPMI's call to serve.",
      "The ministry seeks to support orphans, widows and people facing hardship through prayer, presence and practical help.",
    ],
    focusAreas: ["Prayer for healing", "Hospital and pastoral care", "Practical support"],
    image: {
      src: "/assets/img/service/04.jpg",
      alt: "Temporary Danbox template photograph representing ministry development",
      temporary: true,
    },
    featured: true,
  },
  {
    slug: "leadership-and-community-development",
    name: "Leadership & Community Development",
    summary: "Equipping people to lead responsibly and serve their communities with vision.",
    description: [
      "Leadership training and Bible school courses develop character, competence and responsible influence.",
      "The ministry also supports community learning through computer, music and practical skills training.",
    ],
    focusAreas: ["Leadership institute", "Bible school", "Community skills"],
    image: { src: "/assets/img/service/05.jpg", alt: "Temporary Danbox photograph representing leadership development", temporary: true },
  },
  {
    slug: "evangelism-and-missions",
    name: "Evangelism & Missions",
    summary: "Sharing the Kingdom message locally and supporting ministry development across communities.",
    description: [
      "CPMI carries the good news beyond the local gathering through evangelism, missions and community relationships.",
      "The ministry's objectives include establishing and supporting ministries locally and internationally.",
    ],
    focusAreas: ["Local evangelism", "Missions", "Ministry development"],
    image: { src: "/assets/img/service/06.jpg", alt: "Temporary Danbox photograph representing evangelism and missions", temporary: true },
  },
  {
    slug: "media-and-radio",
    name: "Media & Radio",
    summary: "Carrying Kingdom news through radio, live broadcasts and on-demand teaching.",
    description: [
      "Radio programmes and digital media extend worship, teaching and encouragement beyond a physical gathering.",
      "Explore the weekly radio schedule, or take a teaching with you for the journey home.",
    ],
    focusAreas: ["CPMI Radio", "Live broadcast", "Digital teaching"],
    image: { src: "/assets/img/service/07.jpg", alt: "Temporary Danbox photograph representing media ministry", temporary: true },
  },
  {
    slug: "marketplace-arts-and-hospitality",
    name: "Marketplace, Arts & Hospitality",
    summary: "Creating space for business, creativity, welcome and service to flourish.",
    description: [
      "Business forums help Kingdom citizens connect faith with enterprise and responsible community influence.",
      "Fine arts, music and hospitality teams use creativity and practical service to build a welcoming ministry community.",
    ],
    focusAreas: ["Business forum", "Fine arts and music", "Hospitality"],
    image: { src: "/assets/img/service/01.jpg", alt: "Temporary Danbox photograph representing creativity and hospitality", temporary: true },
  },
];

export const leaders: Leader[] = [
  {
    slug: "pastor-stephen-kabuye",
    name: "Pastor Stephen Kabuye",
    role: "Founder",
    category: "Senior Leadership",
    biography: [
      "Pastor Stephen Kabuye established Christian Power Ministries International in Johannesburg, South Africa, in 2014.",
      "The ministry brings together born-again Kingdom citizens from different nations and cultures for worship, fellowship, practical teaching and service.",
    ],
    assignments: ["Kingdom teaching", "Leadership development", "Ministry vision"],
    portrait: {
      src: "/assets/img/brand/cpmi/cpmi-emblem.png",
      alt: "Emblem of Christian Power Ministries International",
    },
  },
];

export const news: EditorialEntry[] = [
  {
    slug: "welcome-to-the-cpmi-digital-ministry",
    title: "A digital home for faith, purpose and service",
    excerpt:
      "CPMI is preparing one place for teaching, broadcasts, ministry news, events, prayer and practical ways to participate.",
    body: [
      "Come here for the Sunday gathering, a reading for the week or a quiet moment of prayer.",
      "If you are visiting for the first time, the visit page lists the celebration time and offers a way to ask for directions.",
    ],
    category: "Platform update",
    tags: ["CPMI", "digital ministry"],
    status: "PUBLISHED",
    image: {
      src: "/assets/img/news/04.jpg",
      alt: "Temporary Danbox template photograph used for the sample platform announcement",
      temporary: true,
    },
    sample: true,
  },
  {
    slug: "building-a-weekly-rhythm-of-the-word",
    title: "Building a weekly rhythm around the Word",
    excerpt: "Make room for Scripture in the morning, a teaching at lunchtime and prayer as the day closes.",
    body: [
      "Choose one passage and return to it throughout the week. Listen for a phrase that speaks to a decision in front of you.",
      "The radio guide and devotional library offer two places to start.",
    ],
    category: "Media ministry",
    tags: ["radio", "teaching"],
    publishedAt: "2026-11-12T08:00:00.000Z",
    status: "PUBLISHED",
    image: { src: "/assets/img/news/01.jpg", alt: "Temporary Danbox media ministry photograph", temporary: true },
    sample: true,
  },
  {
    slug: "a-place-for-prayer-and-connection",
    title: "A place for prayer, connection and a next step",
    excerpt: "Find someone to pray with, plan a Sunday visit or share a skill with a neighbour.",
    body: [
      "You can send a prayer request privately. If you would like a response, include a way to reach you.",
      "For a first visit, start with the Sunday Kingdom Citizens Celebration and ask for directions before travelling.",
    ],
    category: "Community",
    tags: ["prayer", "connection"],
    publishedAt: "2026-11-05T08:00:00.000Z",
    status: "PUBLISHED",
    image: { src: "/assets/img/news/05.jpg", alt: "Temporary Danbox community photograph", temporary: true },
    sample: true,
  },
];

export const stories: EditorialEntry[] = [
  {
    slug: "learning-to-serve-close-to-home",
    title: "Faith becomes visible when service comes close",
    excerpt: "What does caring for a neighbour look like on an ordinary weekday?",
    body: [
      "Sometimes service starts with a question. A learner may need a quiet hour to go over fractions. A parent may welcome someone who can listen.",
      "Ask what would help before offering a solution. If teaching or visiting is one of your gifts, explore the community ministries.",
    ],
    category: "Faith in action",
    tags: ["service", "community"],
    publishedAt: "2026-10-18T08:00:00.000Z",
    status: "PUBLISHED",
    image: { src: "/assets/img/news/05.jpg", alt: "Temporary Danbox community service photograph", temporary: true },
    sample: true,
  },
  {
    slug: "growing-through-purposeful-learning",
    title: "Learning that moves from insight to purpose",
    excerpt: "A lesson takes root when someone gets to use it, share it and try again.",
    body: [
      "CPMI's stated objectives include training and education that help people recognise their potential and serve responsibly.",
      "A keyboard exercise, a first spreadsheet and a difficult maths problem all offer something worth practising together.",
    ],
    category: "Training & education",
    tags: ["learning", "purpose"],
    publishedAt: "2026-09-28T08:00:00.000Z",
    status: "PUBLISHED",
    image: { src: "/assets/img/news/07.jpg", alt: "Temporary Danbox learning photograph", temporary: true },
    sample: true,
  },
];

export const devotionals: Devotional[] = [
  {
    slug: "an-invitation-to-rest-and-purpose",
    title: "An invitation to rest—and to walk in purpose",
    excerpt:
      "A short editorial reflection on Christ's invitation to rest and purposeful discipleship.",
    body: [
      "In Matthew 11:28, Jesus invites weary people to come to him. Bring one unfinished concern into prayer before moving on with the day.",
      "Where could you offer someone else a little rest today?",
    ],
    category: "Purpose",
    tags: ["rest", "purpose", "discipleship"],
    status: "PUBLISHED",
    image: {
      src: "/assets/img/news/06.jpg",
      alt: "Temporary Danbox template photograph accompanying A devotional",
      temporary: true,
    },
    sample: true,
    scriptureReferences: ["Matthew 11:28"],
    relatedSermonSlugs: [],
  },
  {
    slug: "leading-from-a-restored-heart",
    title: "Leading from a restored heart",
    excerpt: "Purposeful leadership begins with a life being formed before it becomes a platform for influence.",
    body: [
      "Think of the person who will be affected by your next decision. What could you learn by listening to them first?",
      "Read Mark 10:43–45, then choose one ordinary act of service that needs no recognition.",
    ],
    category: "Leadership",
    tags: ["leadership", "formation"],
    publishedAt: "2026-11-03T08:00:00.000Z",
    status: "PUBLISHED",
    image: { src: "/assets/img/news/08.jpg", alt: "Temporary Danbox devotional photograph", temporary: true },
    sample: true,
    scriptureReferences: ["Matthew 11:28", "Mark 10:43-45"],
    relatedSermonSlugs: ["kingdom-leadership-in-everyday-life"],
  },
  {
    slug: "faith-that-crosses-the-threshold",
    title: "Faith that crosses the threshold",
    excerpt: "The Word shapes ordinary decisions, relationships and service beyond a weekly gathering.",
    body: [
      "James connects belief with the way we treat people in need. Look for one opportunity to put what you believe into practice today.",
      "A meal, a visit or an hour of tutoring can be a place to begin.",
    ],
    category: "Everyday faith",
    tags: ["faith", "service"],
    publishedAt: "2026-10-27T08:00:00.000Z",
    status: "PUBLISHED",
    image: { src: "/assets/img/news/09.jpg", alt: "Temporary Danbox devotional photograph", temporary: true },
    sample: true,
    scriptureReferences: ["James 2:17"],
    relatedSermonSlugs: ["faith-beyond-the-walls"],
  },
];

export const events: EventRecord[] = [
  {
    slug: "worship-and-purpose-gathering-preview",
    title: "Worship & Purpose Gathering",
    summary: "A morning of worship, fellowship and teaching on purpose.",
    description: ["Sing together and reflect on the gifts you can put to work in your community."],
    startsAt: "2027-02-14T07:00:00.000Z",
    endsAt: "2027-02-14T09:00:00.000Z",
    timezone: "Africa/Johannesburg",
    venueName: "Venue to be confirmed",
    registrationEnabled: false,
    status: "PUBLISHED",
    image: { src: "/assets/img/event/01.jpg", alt: "Temporary Danbox worship gathering photograph", temporary: true },
    sample: true,
  },
  {
    slug: "leadership-for-community-preview",
    title: "Leadership for Community",
    summary: "Explore leadership through responsibility and service.",
    description: ["Discuss a leadership challenge with others and practise listening before making a decision."],
    startsAt: "2027-03-06T06:30:00.000Z",
    endsAt: "2027-03-06T11:00:00.000Z",
    timezone: "Africa/Johannesburg",
    venueName: "Training venue to be confirmed",
    registrationEnabled: false,
    status: "PUBLISHED",
    image: { src: "/assets/img/event/02.jpg", alt: "Temporary Danbox leadership event photograph", temporary: true },
    sample: true,
  },
  {
    slug: "community-care-day-preview",
    title: "Community Care Day",
    summary: "A day centred on practical care for neighbours.",
    description: ["Explore ways to contribute tutoring, learning materials and everyday essentials."],
    startsAt: "2027-04-17T06:00:00.000Z",
    endsAt: "2027-04-17T12:00:00.000Z",
    timezone: "Africa/Johannesburg",
    venueName: "Community location to be confirmed",
    registrationEnabled: false,
    status: "PUBLISHED",
    image: { src: "/assets/img/event/03.jpg", alt: "Temporary Danbox community event photograph", temporary: true },
    sample: true,
  },
];

export const sermons: MediaEpisode[] = [
  {
    slug: "discovering-purpose",
    title: "Discovering Purpose",
    description: "A message record exploring identity, calling and faithful action.",
    mediaType: "VIDEO",
    artwork: { src: "/assets/img/news/01.jpg", alt: "Temporary teaching artwork", temporary: true },
    durationSeconds: 2340,
    publishedAt: "2026-11-09T08:00:00.000Z",
    speaker: "CPMI Teaching Team",
    scriptureReferences: ["Matthew 11:28"],
    seriesSlug: "purpose-and-dominion",
    status: "PUBLISHED",
    sample: true,
  },
  {
    slug: "faith-beyond-the-walls",
    title: "Faith Beyond the Walls",
    description: "A audio teaching about carrying belief into work, family and community life.",
    mediaType: "AUDIO",
    artwork: { src: "/assets/img/news/05.jpg", alt: "Temporary teaching artwork", temporary: true },
    durationSeconds: 1920,
    publishedAt: "2026-11-02T08:00:00.000Z",
    speaker: "CPMI Teaching Team",
    scriptureReferences: ["James 2:17"],
    seriesSlug: "purpose-and-dominion",
    status: "PUBLISHED",
    sample: true,
  },
  {
    slug: "rest-for-the-weary",
    title: "Rest for the Weary",
    description: "A reflective message built around Christ's invitation in Matthew 11:28.",
    mediaType: "VIDEO",
    artwork: { src: "/assets/img/news/06.jpg", alt: "Temporary teaching artwork", temporary: true },
    durationSeconds: 1680,
    publishedAt: "2026-10-26T08:00:00.000Z",
    speaker: "CPMI Teaching Team",
    scriptureReferences: ["Matthew 11:28"],
    seriesSlug: "restored-for-purpose",
    status: "PUBLISHED",
    sample: true,
  },
  {
    slug: "kingdom-leadership-in-everyday-life",
    title: "Kingdom Leadership in Everyday Life",
    description: "A conversation about influence expressed through responsibility and service.",
    mediaType: "AUDIO",
    artwork: { src: "/assets/img/news/07.jpg", alt: "Temporary teaching artwork", temporary: true },
    durationSeconds: 2160,
    publishedAt: "2026-10-19T08:00:00.000Z",
    speaker: "CPMI Teaching Team",
    scriptureReferences: ["Mark 10:43-45"],
    seriesSlug: "restored-for-purpose",
    status: "PUBLISHED",
    sample: true,
  },
];

export const podcastEpisodes: MediaEpisode[] = [
  {
    slug: "the-courage-to-begin",
    title: "The Courage to Begin",
    description: "A podcast conversation about taking the first faithful step toward purpose.",
    mediaType: "AUDIO",
    artwork: { src: "/assets/img/news/08.jpg", alt: "Temporary podcast artwork", temporary: true },
    durationSeconds: 1560,
    host: "CPMI Radio Team",
    scriptureReferences: ["Zechariah 4:10"],
    programmeSlug: "purpose-conversations",
    status: "PUBLISHED",
    sample: true,
  },
  {
    slug: "service-with-dignity",
    title: "Service with Dignity",
    description: "A discussion about compassionate work that listens before it acts.",
    mediaType: "AUDIO",
    artwork: { src: "/assets/img/news/09.jpg", alt: "Temporary podcast artwork", temporary: true },
    durationSeconds: 1740,
    host: "CPMI Radio Team",
    scriptureReferences: ["Micah 6:8"],
    programmeSlug: "community-table",
    status: "PUBLISHED",
    sample: true,
  },
];

export const podcasts: MediaCollection[] = [
  {
    slug: "purpose-conversations",
    title: "Purpose Conversations",
    summary: "Conversations about faith, identity, leadership and the next faithful step.",
    description: ["Explore the first steps of a calling and the people who help us take them."],
    artwork: { src: "/assets/img/news/08.jpg", alt: "Temporary Purpose Conversations artwork", temporary: true },
    kind: "PODCAST",
    host: "CPMI Radio Team",
    episodeSlugs: ["the-courage-to-begin"],
    status: "PUBLISHED",
    sample: true,
  },
  {
    slug: "community-table",
    title: "The Community Table",
    summary: "A series for practical conversations about service, care and shared responsibility.",
    description: ["Listen to reflections on hospitality, dignity and the work of caring for neighbours."],
    artwork: { src: "/assets/img/news/09.jpg", alt: "Temporary Community Table artwork", temporary: true },
    kind: "PODCAST",
    host: "CPMI Radio Team",
    episodeSlugs: ["service-with-dignity"],
    status: "PUBLISHED",
    sample: true,
  },
];

export const sermonSeries: MediaCollection[] = [
  {
    slug: "purpose-and-dominion",
    title: "Purpose & Dominion",
    summary: "A teaching series about restored identity, responsibility and God-given purpose.",
    description: ["Begin with Discovering Purpose and continue with Faith Beyond the Walls."],
    artwork: { src: "/assets/img/news/01.jpg", alt: "Temporary Purpose and Dominion artwork", temporary: true },
    kind: "SERMON_SERIES",
    episodeSlugs: ["discovering-purpose", "faith-beyond-the-walls"],
    status: "PUBLISHED",
    sample: true,
  },
  {
    slug: "restored-for-purpose",
    title: "Restored for Purpose",
    summary: "A series connecting spiritual rest, character and service.",
    description: ["Explore the connection between rest, character and the way we lead."],
    artwork: { src: "/assets/img/news/06.jpg", alt: "Temporary Restored for Purpose artwork", temporary: true },
    kind: "SERMON_SERIES",
    episodeSlugs: ["rest-for-the-weary", "kingdom-leadership-in-everyday-life"],
    status: "PUBLISHED",
    sample: true,
  },
];

export const radioProgrammes: MediaCollection[] = [
  {
    slug: "kingdom-morning",
    title: "Kingdom Morning",
    summary: "A bright breakfast programme with Scripture, reflection and a purposeful start.",
    description: ["Begin the day with a Scripture reading and one question to carry with you."],
    artwork: { src: "/assets/img/brand/cpmi/cpmi-radio-artwork.png", alt: "CPMI Radio artwork" },
    kind: "RADIO_PROGRAMME",
    episodeSlugs: ["starting-with-purpose"],
    status: "PUBLISHED",
    sample: true,
  },
  {
    slug: "word-and-purpose",
    title: "Word & Purpose",
    summary: "A teaching hour connecting Scripture with leadership and everyday decisions.",
    description: ["Pause for a lunchtime teaching and a practical reflection."],
    artwork: { src: "/assets/img/brand/cpmi/cpmi-radio-artwork.png", alt: "CPMI Radio artwork" },
    kind: "RADIO_PROGRAMME",
    episodeSlugs: ["lead-where-you-are"],
    status: "PUBLISHED",
    sample: true,
  },
  {
    slug: "evening-rest",
    title: "Evening Rest",
    summary: "A calm programme for prayer, reflection and the close of the day.",
    description: ["Close the day with a quiet moment of prayer."],
    artwork: { src: "/assets/img/brand/cpmi/cpmi-radio-artwork.png", alt: "CPMI Radio artwork" },
    kind: "RADIO_PROGRAMME",
    episodeSlugs: ["an-invitation-to-rest"],
    status: "PUBLISHED",
    sample: true,
  },
];

export const radioEpisodes: MediaEpisode[] = [
  { slug: "starting-with-purpose", title: "Starting with Purpose", description: "A Kingdom Morning segment.", mediaType: "AUDIO", artwork: { src: "/assets/img/brand/cpmi/cpmi-radio-artwork.png", alt: "CPMI Radio artwork" }, durationSeconds: 1320, host: "CPMI Radio Team", scriptureReferences: ["Matthew 11:28"], programmeSlug: "kingdom-morning", status: "PUBLISHED", sample: true },
  { slug: "lead-where-you-are", title: "Lead Where You Are", description: "A Word & Purpose teaching segment.", mediaType: "AUDIO", artwork: { src: "/assets/img/brand/cpmi/cpmi-radio-artwork.png", alt: "CPMI Radio artwork" }, durationSeconds: 1680, host: "CPMI Radio Team", scriptureReferences: ["Mark 10:43-45"], programmeSlug: "word-and-purpose", status: "PUBLISHED", sample: true },
  { slug: "an-invitation-to-rest", title: "An Invitation to Rest", description: "A Evening Rest reflection.", mediaType: "AUDIO", artwork: { src: "/assets/img/brand/cpmi/cpmi-radio-artwork.png", alt: "CPMI Radio artwork" }, durationSeconds: 1200, host: "CPMI Radio Team", scriptureReferences: ["Matthew 11:28"], programmeSlug: "evening-rest", status: "PUBLISHED", sample: true },
];

export const schedule: ScheduleSlot[] = [
  { id: "mon-morning", programmeSlug: "kingdom-morning", dayOfWeek: 1, startsAtLocal: "06:00", endsAtLocal: "08:00", timezone: "Africa/Johannesburg", sample: true },
  { id: "mon-word", programmeSlug: "word-and-purpose", dayOfWeek: 1, startsAtLocal: "12:00", endsAtLocal: "13:00", timezone: "Africa/Johannesburg", sample: true },
  { id: "tue-morning", programmeSlug: "kingdom-morning", dayOfWeek: 2, startsAtLocal: "06:00", endsAtLocal: "08:00", timezone: "Africa/Johannesburg", sample: true },
  { id: "tue-evening", programmeSlug: "evening-rest", dayOfWeek: 2, startsAtLocal: "20:00", endsAtLocal: "21:00", timezone: "Africa/Johannesburg", sample: true },
  { id: "wed-morning", programmeSlug: "kingdom-morning", dayOfWeek: 3, startsAtLocal: "06:00", endsAtLocal: "08:00", timezone: "Africa/Johannesburg", sample: true },
  { id: "wed-word", programmeSlug: "word-and-purpose", dayOfWeek: 3, startsAtLocal: "18:00", endsAtLocal: "19:00", timezone: "Africa/Johannesburg", sample: true },
  { id: "thu-morning", programmeSlug: "kingdom-morning", dayOfWeek: 4, startsAtLocal: "06:00", endsAtLocal: "08:00", timezone: "Africa/Johannesburg", sample: true },
  { id: "thu-evening", programmeSlug: "evening-rest", dayOfWeek: 4, startsAtLocal: "20:00", endsAtLocal: "21:00", timezone: "Africa/Johannesburg", sample: true },
  { id: "fri-morning", programmeSlug: "kingdom-morning", dayOfWeek: 5, startsAtLocal: "06:00", endsAtLocal: "08:00", timezone: "Africa/Johannesburg", sample: true },
  { id: "fri-word", programmeSlug: "word-and-purpose", dayOfWeek: 5, startsAtLocal: "17:00", endsAtLocal: "18:00", timezone: "Africa/Johannesburg", sample: true },
  { id: "sat-word", programmeSlug: "word-and-purpose", dayOfWeek: 6, startsAtLocal: "10:00", endsAtLocal: "11:00", timezone: "Africa/Johannesburg", sample: true },
  { id: "sun-evening", programmeSlug: "evening-rest", dayOfWeek: 0, startsAtLocal: "20:00", endsAtLocal: "21:00", timezone: "Africa/Johannesburg", sample: true },
];

export const campaigns: Campaign[] = [
  {
    slug: "community-care-preview",
    title: "Community Care Initiative",
    summary: "Books, blankets and everyday essentials for community care.",
    description: ["This illustrative campaign explores practical resources for families."],
    category: "Community outreach",
    goalMinor: 25_000_000,
    verifiedRaisedMinor: 0,
    currency: "ZAR",
    image: { src: "/assets/img/causes/01.jpg", alt: "Temporary community care campaign photograph", temporary: true },
    status: "PUBLISHED",
    sample: true,
  },
  {
    slug: "media-ministry-preview",
    title: "Media & Evangelism Project",
    summary: "Radio and recording equipment for sharing Kingdom teaching.",
    description: ["This illustrative project explores microphones, studio equipment and the cost of broadcasting."],
    category: "Media ministry",
    goalMinor: 40_000_000,
    verifiedRaisedMinor: 0,
    currency: "ZAR",
    image: { src: "/assets/img/causes/02.jpg", alt: "Temporary media ministry campaign photograph", temporary: true },
    status: "PUBLISHED",
    sample: true,
  },
];

export const givingPurposes: GivingPurpose[] = [
  {
    id: "tithes-offerings",
    label: "Tithes and offerings",
    description: "General worship giving designated as a tithe or offering.",
  },
  {
    id: "general-ministry",
    label: "General ministry support",
    description: "Support for CPMI's approved ministry work and operations.",
  },
  {
    id: "community-outreach",
    label: "Community outreach",
    description: "Support for verified compassion and community initiatives.",
  },
  {
    id: "church-development",
    label: "Church development",
    description: "Support for verified ministry and facility development needs.",
  },
  {
    id: "media-evangelism",
    label: "Media and evangelism",
    description: "Support for approved radio, video and evangelism activity.",
  },
];

export const gallery: GalleryItem[] = [
  {
    id: "gallery-1",
    title: "Worship and community",
    caption: "Illustrative photograph.",
    image: {
      src: "/assets/img/gallery/gallery-1.jpg",
      alt: "Temporary Danbox template community photograph",
      temporary: true,
    },
  },
  {
    id: "gallery-2",
    title: "Faith in action",
    caption: "Illustrative photograph.",
    image: {
      src: "/assets/img/gallery/gallery-2.jpg",
      alt: "Temporary Danbox template outreach photograph",
      temporary: true,
    },
  },
  {
    id: "gallery-3",
    title: "Growing together",
    caption: "Illustrative photograph.",
    image: {
      src: "/assets/img/gallery/gallery-3.jpg",
      alt: "Temporary Danbox template group photograph",
      temporary: true,
    },
  },
  {
    id: "gallery-4",
    title: "Serving with compassion",
    caption: "Illustrative photograph.",
    image: {
      src: "/assets/img/gallery/gallery-4.jpg",
      alt: "Temporary Danbox template service photograph",
      temporary: true,
    },
  },
];
