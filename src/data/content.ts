// Every number on the site comes from Lynn's CV (public/data_resume.pdf) or, for the
// data projects, from Lynn's own project write-ups. Anything not in either is a
// bracketed placeholder for Lynn to fill in.

export const contact = {
  name: 'Lynn Le',
  email: 'tlinhle05@gmail.com',
  phone: '0449 921 128',
  phoneHref: '+61449921128',
  linkedin: 'https://www.linkedin.com/in/lynn-le-9940b4307/',
  github: 'https://github.com/ashlynn-05',
  resume: 'data_resume.pdf',
};

export type Fill = 'berry' | 'rose' | 'mist' | 'caramel' | 'jasmine';

/* Company logos, fetched from each company's own site or profile (October 2026).
   mark = square-ish icon for small tiles; full = the wide logo for the logo strip.
   href = where the logo strip links to. */
export type LogoId = 'sidekick' | 'deakin' | 'codrops' | 'sw-education' | 'kim-beauty' | 'muse-crochet';
export interface Logo { name: string; mark: string; markW: number; markH: number; full?: string; fullW?: number; fullH?: number; round?: boolean; ink?: string; href: string }
export const logos: Record<LogoId, Logo> = {
  'sidekick': { name: 'Sidekick', href: 'works/sidekick.html', mark: 'img/logos/sidekick-mark.webp', markW: 192, markH: 185, ink: '#0F64F9' },
  'deakin': { name: 'Deakin University', href: 'projects/bgis.html', mark: 'img/logos/deakin-mark.webp', markW: 256, markH: 256, round: true, ink: '#151918' },
  'codrops': { name: 'Codrops', href: 'works/codrops.html', mark: 'img/logos/codrops-mark.svg', markW: 240, markH: 240, full: 'img/logos/codrops-full.webp', fullW: 640, fullH: 71 },
  'sw-education': { name: 'SW Education', href: 'works/sw-education.html', mark: 'img/logos/sw-mark.webp', markW: 106, markH: 106, full: 'img/logos/sw-full.webp', fullW: 640, fullH: 91 },
  'kim-beauty': { name: 'Kim Beauty Warehouse', href: 'life-story.html', mark: 'img/logos/kim-mark.webp', markW: 192, markH: 99, full: 'img/logos/kim-full.webp', fullW: 640, fullH: 137 },
  'muse-crochet': { name: 'The Muse Crochet', href: 'works/muse-crochet.html', mark: 'img/logos/muse-mark.webp', markW: 256, markH: 246 },
};
export const logoOrder: LogoId[] = ['sidekick', 'deakin', 'codrops', 'sw-education', 'muse-crochet'];

export interface Metric { value: number | null; prefix?: string; suffix?: string; text?: string; caption: string }

export interface Project {
  slug: string;
  fill: Fill;
  icon: string; // Phosphor bold icon name
  label: string; // folder label
  meta: string; // folder meta line
  org: string;
  logo?: LogoId;
  role: string;
  where: string;
  dates: string;
  titleA: string;
  titleEm: string;
  chips: string[];
  problem: string;
  did: (string | { text: string; href: string; link: string })[];
  site?: { href: string; label: string; icon: string }; // the org's own page, from the CV
  metrics: Metric[];
  impactTitle: string;
  impactNote: string;
  impactOpen?: boolean;
  skills: string[];
  pos: { left: string; top: string };
}

/* Work experience case studies (the "works" folder), from the data resume. */
export const projects: Project[] = [
  {
    slug: 'sidekick', fill: 'berry', icon: 'flow-arrow', label: 'Workflow mapping', meta: 'Sidekick, 2026',
    org: 'Sidekick (YC S26)', logo: 'sidekick', role: 'Business Development Analyst Intern', where: 'Melbourne', dates: 'Jun 2026 to now',
    site: { href: 'https://www.linkedin.com/company/textsidekick/', label: 'Sidekick on LinkedIn', icon: 'linkedin-logo' },
    titleA: 'Turning discovery calls into', titleEm: 'requirements.',
    chips: ['AI automation start-up', 'Melbourne'],
    problem: 'An early-stage AI automation start-up had a stack of qualitative discovery conversations, and needed to know which product integrations to build next.',
    did: [
      'Mapped shop-floor workflows and SOP structures across manufacturing, auto dealership and retail prospects through discovery calls.',
      'Structured the findings into a requirements framework that informed which product integrations the founding team prioritised next.',
      'Segmented and analysed 30+ prospect profiles by pain-point category: SOP access, work-order routing and digital-skill gaps.',
      'Turned qualitative conversations into a structured, quantified pipeline.',
    ],
    metrics: [
      { value: 3, suffix: 'x', caption: 'Increase in qualified pipeline within target verticals' },
      { value: 30, suffix: '+', caption: 'Prospect profiles segmented by pain-point category' },
      { value: 3, caption: 'Verticals mapped: manufacturing, auto dealerships, retail' },
    ],
    impactTitle: '3x qualified pipeline',
    impactNote: 'And a requirements framework the founding team used to pick the next integrations.',
    skills: ['Process mapping', 'Requirements gathering', 'Segmentation', 'Stakeholder interviews'],
    pos: { left: '6%', top: '12%' },
  },
  {
    slug: 'codrops', fill: 'rose', icon: 'database', label: 'CRM build', meta: 'Codrops, 2024 to now',
    org: 'Codrops', logo: 'codrops', role: 'Partnership Associate', where: 'Remote', dates: 'Mar 2024 to now',
    site: { href: 'https://tympanus.net/codrops/', label: 'Visit Codrops', icon: 'arrow-up-right' },
    titleA: 'Designing the CRM behind a', titleEm: 'pipeline.',
    chips: ['Frontend dev and UX/UI publication', '2M+ monthly readers', 'Remote'],
    problem: 'Codrops reaches 2M+ web design and development readers a month, but there was no system to track sponsors from first contact to signed deal.',
    did: [
      'Built and maintained a structured CRM system tracking a 50+ sponsor pipeline end to end.',
      'Designed the data fields and stages used to monitor lead status, response rates and conversion at every step.',
      'Managed parallel workstreams (outreach, approvals, follow-ups) under tight deadlines.',
      'Documented the process at each stage so the pipeline stayed auditable.',
    ],
    metrics: [
      { value: 50, suffix: '+', caption: 'Sponsors tracked end to end in the CRM' },
      { value: 5, caption: 'Deals closed to date' },
      { value: 2, suffix: 'M+', caption: 'Monthly readers, internationally' },
    ],
    impactTitle: '5 deals closed',
    impactNote: 'From a pipeline that is documented and auditable at every stage.',
    skills: ['CRM data design', 'Conversion tracking', 'Process documentation', 'Multi-workstream management'],
    pos: { left: '30%', top: '50%' },
  },
  {
    slug: 'sw-education', fill: 'caramel', icon: 'chart-bar', label: 'Client dashboards', meta: 'SW Education, 2025',
    org: 'SW Education Pty Ltd', logo: 'sw-education', role: 'Digital Analyst Intern', where: 'Melbourne', dates: 'Aug to Nov 2025',
    site: { href: 'https://www.sweducation.com.au', label: 'Visit SW Education', icon: 'arrow-up-right' },
    titleA: 'Ten thousand records,', titleEm: 'one clean view.',
    chips: ['Education and career services', 'Melbourne'],
    problem: 'Client records were inconsistent, so operational reporting could not be trusted, and executives had no single view of engagement.',
    did: [
      'Cleaned and standardised 10,000+ client records in Excel.',
      'Made operational reporting consistent and reliable across the business.',
      'Built interactive Power BI dashboards for executives showing client engagement, service-category performance and conversion pathways.',
    ],
    metrics: [
      { value: 10000, suffix: '+', caption: 'Client records cleaned and standardised' },
      { value: 3, caption: 'Views for executives: engagement, service categories, conversion pathways' },
      { value: null, text: 'Power BI', caption: 'Interactive executive dashboards' },
    ],
    impactTitle: 'Reporting people can trust',
    impactNote: 'Clean records underneath, and executive dashboards on top.',
    skills: ['Data cleansing', 'Excel', 'Power BI', 'Executive reporting'],
    pos: { left: '56%', top: '10%' },
  },
  {
    slug: 'muse-crochet', fill: 'mist', icon: 'yarn', label: 'Restock signals', meta: 'The Muse Crochet',
    org: 'The Muse Crochet', logo: 'muse-crochet', role: 'Sales & Customer Experience Associate', where: 'Melbourne', dates: 'Nov 2024 to Mar 2025',
    site: { href: 'https://www.instagram.com/the.muse.crochet/', label: 'The Muse Crochet on Instagram', icon: 'instagram-logo' },
    titleA: 'Letting the order data pick', titleEm: 'the restock.',
    chips: ['Small business', 'Melbourne'],
    problem: 'A small crochet business selling across a POS, an online store and Instagram, with restocking decisions made on gut feel.',
    did: [
      'Analysed daily order and engagement data across Square (POS), Shopify and Instagram.',
      'Spotted which products and colourways were moving fastest.',
      'Used the pattern to guide weekly restocking and merchandise decisions.',
    ],
    metrics: [
      { value: 18, prefix: '+', suffix: '%', caption: 'Estimated lift in repeat-customer purchases' },
      { value: 3, caption: 'Data sources joined: Square, Shopify, Instagram' },
      { value: 3, caption: 'Months, from November 2024 to March 2025' },
    ],
    impactTitle: '+18% repeat purchases',
    impactNote: 'An estimated lift over the 3-month period.',
    skills: ['Sales analysis', 'Trend spotting', 'Inventory decisions'],
    pos: { left: '53%', top: '52%' },
  },
  {
    // Kept from the earlier BD portfolio (its CV listed these events); the data resume doesn't.
    slug: 'hackathons', fill: 'jasmine', icon: 'trophy', label: 'Hackathon run', meta: '4 events, 2026',
    org: 'Hackathons and competitions', role: 'Participant', where: 'Melbourne', dates: 'May to Sep 2026',
    titleA: 'Four events in', titleEm: 'five months.',
    chips: ['Hackathons', 'Competitions'],
    problem: 'Between May and September 2026 I joined four events: one brainstorm competition and three hackathons, each with its own brief and a fixed deadline.',
    did: [
      "L'Oréal Brainstorm 2026 (May 2026)",
      { text: 'Watt The Hack by MLAI x Monash DeepNeuron (Jun 2026), where the team built SolarCycle', href: 'https://github.com/cobeo2004/hackathon-fork', link: 'See the code' },
      "AI Agentic Hackathon by GenFund AI (Jul 2026), placing in the Top 20 of 150 on the Founder's Track",
      { text: 'Forward: AI in Business Hackathon by DSCube x Raid x Eleno (Sep 2026), where the team built Trustlane', href: 'https://trustlane.house-of-imaginaries.com/', link: 'Open Trustlane' },
    ],
    metrics: [
      { value: 4, caption: 'Events between May and September 2026' },
      { value: null, text: 'Top 20', caption: "Of 150 on the Founder's Track at the AI Agentic Hackathon" },
      { value: 3, caption: "Hackathons, plus L'Oréal Brainstorm 2026" },
    ],
    impactTitle: 'Two builds you can open.',
    impactNote: 'Trustlane is live, and the SolarCycle code is on GitHub. Both links are in the list.',
    skills: ['AI tools', 'Teamwork under a deadline'],
    pos: { left: '80%', top: '8%' },
  },
];

export const jobs = [
  { icon: 'flow-arrow', org: 'Sidekick', logo: 'sidekick' as LogoId, chip: 'YC S26', dates: 'Jun 2026 to now, Melbourne', role: 'Business Development Analyst Intern', note: 'Mapped workflows and SOPs through discovery calls, then segmented 30+ prospect profiles by pain point. Contributed to a 3x increase in qualified pipeline.', slug: 'sidekick' },
  { icon: 'database', org: 'Codrops', logo: 'codrops' as LogoId, dates: 'Mar 2024 to now, remote', role: 'Partnership Associate', note: 'Designed the CRM fields and stages behind a 50+ sponsor pipeline, kept it auditable, and closed 5 deals to date.', slug: 'codrops' },
  { icon: 'chart-bar', org: 'SW Education', logo: 'sw-education' as LogoId, dates: 'Aug 2025 to Nov 2025, Melbourne', role: 'Digital Analyst Intern', note: 'Cleaned and standardised 10,000+ client records, then built Power BI dashboards for executives.', slug: 'sw-education' },
  { icon: 'yarn', org: 'The Muse Crochet', logo: 'muse-crochet' as LogoId, dates: 'Nov 2024 to Mar 2025, Melbourne', role: 'Sales & Customer Experience Associate', note: 'Read order data across Square, Shopify and Instagram to guide weekly restocking: an estimated 18% lift in repeat-customer purchases.', slug: 'muse-crochet' },
];

/* ---------- Data projects (from Lynn's project write-ups) ---------- */

export interface Figure { src: string; w: number; h: number; alt: string; caption: string }

export interface DataProject {
  slug: string;
  fill: Fill;
  icon: string;
  label: string; // folder label
  name: string; // project name
  kind: string; // e.g. "client project", "Case study"
  year: string;
  titleA: string;
  titleEm: string;
  summary: string; // one line for cards
  github: string;
  dashboard?: string; // label for a live dashboard, when the write-up mentions one
  sources?: { label: string; short: string; href: string; icon: string }[]; // other links from the write-up or CV
  tools: string[];
  skills: string[];
  objective: string;
  context: string;
  role: string;
  methods?: string[];
  approach: { h: string; text: string }[];
  metrics: Metric[];
  insight: string;
  insights?: string[];
  recs: string[];
  reflection: string;
  next?: string;
  figures?: Figure[];
}

export const dataProjects: DataProject[] = [
  {
    slug: 'bgis', fill: 'berry', icon: 'buildings', label: 'BGIS workforce', name: 'BGIS Workforce Analytics',
    kind: 'Real client project', year: '2026',
    titleA: 'One contract hiding inside', titleEm: '$11.36M.',
    summary: 'Traced $11.36M in non-billable cost for a global facilities manager down to one client account.',
    github: 'https://github.com/ashlynn-05/BGIS_Workforce-Analytics',
    dashboard: 'Power BI HR dashboard',
    tools: ['Power BI', 'Power Query', 'Excel', 'Python'],
    skills: ['Data cleansing and governance', 'Data modelling (join architecture)', 'Workforce analytics'],
    objective: "Find how recruitment, retention, onboarding, scheduling and utilisation were affecting BGIS's operating margin.",
    context: 'A real client engagement with BGIS, sponsored by their Executive Director, People & Culture APAC. Five raw datasets (about 2,500 employees and 430,000+ activity records) cleaned and linked into one master file.',
    role: "Led a 7-person consulting team across three analysis streams, bringing client feedback and presentation timelines together into a three-stage margin recovery roadmap for BGIS's People & Culture APAC executive.",
    approach: [
      { h: 'Termination surge', text: "Q1 2026 terminations hit 102, a 3.7x spike on the 2025 quarterly average. That contradicted the client's internal 'lowest turnover in a decade' story." },
      { h: 'Non-billable cost', text: '$11.36M in non-billable cost, with 26.3% of all activity lines missing a billing status entirely. It looked like a company-wide billing discipline problem.' },
      { h: 'Root cause', text: '69.6% of that $11.36M traces to a single client account (Defence-NNSW), and 99.83% of non-billable cost comes from Reactive Maintenance, not Planned. 114,157 rows flagged as unmatched turned out to be a mistagged category (Private Activities), not real data failures.' },
    ],
    metrics: [
      { value: null, text: '$11.36M', caption: 'Non-billable cost decomposed to its source' },
      { value: null, text: '69.6%', caption: 'Of it traced to a single client account' },
      { value: 430000, suffix: '+', caption: 'Activity records linked across 5 raw datasets' },
    ],
    insight: 'What looked like a company-wide billing crisis was one contract and one work-type conversion issue. That turned a diffuse, unfundable problem into a scoped, fixable one.',
    recs: [
      'Stage 1 (weeks 1 to 4): audit and enforce the Defence-NNSW and BAE Systems contract terms, and tag billing status at job closure.',
      'Stage 2 (months 1 to 2): standardise naming and ID conventions across the 5 source systems, and fix the mistagged Private Activities category.',
      "Stage 3 (months 2 to 6): deploy a live Power BI HR dashboard on BGIS's existing IFS Cloud environment.",
    ],
    reflection: "The lesson was resisting the urge to report the first number we found. The client's feedback after the first presentation pushed us to decompose the $11.36M further, and that is what turned a vague billing problem into an actionable one. I also learned to flag data quality issues rather than quietly fixing around them. The client valued that honesty in both rounds of feedback.",
  },
  {
    slug: 'altano', fill: 'caramel', icon: 'bank', label: 'Altano Bank BI', name: 'Altano Bank Business Intelligence',
    kind: 'Case study, Deakin', year: '2026',
    titleA: 'Income, not credit score,', titleEm: 'drives spend.',
    summary: 'A six-page Power BI solution for a bank entering Australia, from data cleansing to three persona dashboards.',
    github: 'https://github.com/ashlynn-05/Altano---Business-Intelligence-Analytics',
    sources: [{ label: 'Read the BI report', short: 'Report', href: 'https://docs.google.com/document/d/1IEvnGQxx8mIWV9cvOufNEo7V-QRCq2K5lJ0aXwn2Nts/edit?usp=sharing', icon: 'file-text' }],
    tools: ['Power BI', 'DAX', 'Power Query', 'Excel'],
    skills: ['Data cleansing', 'OLAP and dimensional modelling', 'Dashboard UX'],
    objective: "Give Altano Bank's Executive Board evidence-based visibility into portfolio performance, customer risk and growth sustainability ahead of its Australian expansion.",
    context: 'Messy multi-source data (transactions, cards, customers) had to become one clean model, then three dashboards, because the Executive Board, Operations Managers and frontline Customer Service Officers each need a different slice of the same truth.',
    role: 'As the BI analyst, I cleaned and joined three raw datasets (93,181 transactions, 1,033 customers, 3,832 cards), built the DAX analytical layer, and designed three audience-specific dashboards following the Data, Information, Knowledge, Wisdom hierarchy (Ackoff, 1989).',
    methods: [
      'Data cleansing: fixed typos, inconsistent date formats and dropped leading zeros on postcodes, and flagged 1,536 transactions with operational risk classifications (Intelliclean ETL framework).',
      'OLAP slice and dice across brand, card type, income segment and generation (Kimball and Ross, 2013).',
      'Derived risk variables: DTI_Risk, Value_Segment and Income_Segment.',
      'Persona-mapped dashboard design for strategic, operational and frontline decisions.',
    ],
    approach: [
      { h: 'Market share and product penetration', text: 'Mastercard leads share at 52.09% but earns the lowest revenue per card ($1,750). Amex runs a 100% credit portfolio at $2,400 per card. Discover underperforms on every metric, flagging it for partnership review.' },
      { h: 'Customer segmentation and profitability', text: 'Income correlates with spend (r = 0.41); credit score does not (r = -0.02). 62.4% of customers are over-indebted (DTI of 1.0 or more), concentrated in Gen X (74.76%) and Millennials (77.55%).' },
      { h: 'Growth forecasting', text: 'High-Income customers drive the strongest daily revenue growth, while Mid-Income customers show high volume but negative daily growth, a sign of revenue leakage. Category growth proved transient, not structural.' },
      { h: 'Three persona dashboards', text: 'An Executive Board view (portfolio health, risk, growth), an Operations Manager view (error rates and transaction performance) and a Business User view (frontline outreach and compliance checks).' },
    ],
    metrics: [
      { value: null, text: '$2.76M', caption: 'Reactivation opportunity in dormant cards' },
      { value: null, text: '62.4%', caption: 'Of customers carry unsustainable debt' },
      { value: 93181, caption: 'Transactions cleaned and modelled' },
    ],
    insight: 'Income, not credit score, is the structural driver of customer value. Credit-score-led targeting likely under-monetises the most profitable segment and over-extends the riskiest one.',
    insights: [
      '39.4% of issued cards are dormant: a $2.76M reactivation opportunity that needs no new acquisition spend.',
      '89.6% of cards are chip-enabled, yet 100% of transactions ran on swipe. The fraud exposure does not match the technology investment.',
      'The Outreach Priority List turns risk segments into a call list, for example 85 near-retirement customers carrying $84,582 average debt on $45,276 income.',
    ],
    recs: [
      'Replace credit-score-led decisions with an income-led, DTI-gated model.',
      'Target operational controls at the states, brands and categories where error transactions concentrate.',
      'Mandate chip transactions and set a timeline to decommission swipe.',
      'Diversify toward mid-tier states (Florida, Illinois, Georgia) to reduce the 30% revenue concentration in California, Texas and New York.',
    ],
    reflection: 'This pushed me to think in layers rather than metrics: the same dataset had to answer three different questions depending on who was looking. I expected credit score to dominate, and re-verified the correlation twice before trusting that income was the real driver.',
    next: 'Extend the $2.76M dormant-card opportunity into a propensity-to-reactivate model, and add a live page that tracks portfolio DTI drift quarter over quarter.',
    figures: [
      { src: 'img/projects/altano-market.webp', w: 902, h: 512, alt: 'Power BI market overview dashboard showing card brand share and product penetration', caption: 'Market overview and product penetration' },
      { src: 'img/projects/altano-value-matrix.webp', w: 924, h: 524, alt: 'Customer value matrix comparing income band and credit score against spend', caption: 'Customer value matrix' },
      { src: 'img/projects/altano-dti.webp', w: 902, h: 324, alt: 'Generational debt-to-income risk profile chart', caption: 'Generational DTI risk profile' },
      { src: 'img/projects/altano-growth.webp', w: 902, h: 504, alt: 'Revenue growth and forecasting dashboard by income segment', caption: 'Revenue growth and forecasting' },
      { src: 'img/projects/altano-executive.webp', w: 902, h: 494, alt: 'Executive dashboard with risk and portfolio KPI cards', caption: 'Executive dashboard' },
      { src: 'img/projects/altano-operations.webp', w: 902, h: 508, alt: 'Operations performance and monitoring dashboard', caption: 'Operations dashboard' },
      { src: 'img/projects/altano-business-users.webp', w: 902, h: 512, alt: 'Business users dashboard with an outreach priority list', caption: 'Business users dashboard' },
    ],
  },
  {
    slug: 'wellora', fill: 'rose', icon: 'heartbeat', label: 'Wellora Health', name: 'Wellora Marketing Analytics',
    kind: 'Case study', year: '2026',
    titleA: 'Three problems, one', titleEm: 'root cause.',
    summary: 'Diagnosed retention gaps, digital channel inefficiencies and AI governance risk for a health retailer with BigQuery and Looker Studio.',
    github: 'https://github.com/ashlynn-05/Wellora_Marketing-Analytics',
    sources: [{ label: 'Open the Looker Studio dashboard', short: 'Dashboard', href: 'https://datastudio.google.com/reporting/d69c5298-75fa-414d-b454-4d3cee7fa0b2', icon: 'chart-bar' }],
    dashboard: 'Looker Studio dashboard',
    tools: ['BigQuery', 'SQL', 'Looker Studio'],
    skills: ['Customer segmentation', 'RFM-style retention analysis', 'GDPR and privacy analysis'],
    objective: 'Diagnose why loyalty and repeat purchases were declining, assess digital channel and AI chatbot performance, and evaluate privacy and ethical AI practice.',
    context: "Wellora Health, a fictional omnichannel health and wellness retailer, sits in Australia's health and wellness market, where customer trust and lifetime value, not transaction volume, decide long-term revenue.",
    role: 'As the marketing analytics consultant, I queried transaction, behavioural and privacy data in BigQuery, built the Looker Studio dashboards and turned the findings into recommendations grounded in lifecycle marketing and GDPR.',
    methods: [
      'Customer behaviour segmentation by channel, promotion and demographic.',
      'Loyalty cohort comparison: member vs non-member frequency and lifetime value.',
      'Digital funnel analysis: bounce, exit and conversion by device, source and visitor type.',
      'Chatbot engagement tiering against conversion and session quality.',
      'Privacy and governance audit: consent, GDPR compliance and bias alert rates.',
    ],
    approach: [
      { h: 'Retention and promotions', text: 'BOGO promotions produced the highest spend and the lowest refund rate (6.95%) of any promotion type, while loyalty members barely out-purchased non-members.' },
      { h: 'Digital channels and the chatbot', text: 'Referral traffic converts best (26.71%). Chatbot adoption sits at 99%, but conversion peaks at medium engagement (26 to 60 interactions), so the chatbot works as support, not a conversion driver.' },
      { h: 'Privacy and trust', text: 'GDPR compliance, chatbot opt-in and data-sharing consent all sit in a 49 to 50% band, and only 6.28% of customers satisfy all four privacy conditions. Bias alert rates are uniform too: a systemic design failure.' },
    ],
    metrics: [
      { value: null, text: '6.28%', caption: 'Of customers meet all four privacy conditions' },
      { value: null, text: '26.71%', caption: 'Conversion from referral traffic, the best channel' },
      { value: null, text: '~$38,500', caption: 'Projected revenue from converting 5% of one-time buyers' },
    ],
    insight: "The three case studies were causally linked. Governance is the prerequisite: invalid consent blocks the personalised communication needed to fix retention and the chatbot.",
    insights: [
      'The loyalty program changes spend marginally but does not move repeat purchase frequency, the one metric it exists for.',
      'Growth is acquisition-led, not lifecycle-led, in a market where lifetime value drives revenue.',
    ],
    recs: [
      'A three-stage post-purchase sequence (48-hour recommendation, day-14 BOGO, day 21 to 30 re-engagement) for first-time buyers.',
      'Rebuild loyalty around purchase-count tiers (Starter, Wellness Member, Wellora Elite) instead of spend volume.',
      'Move underperforming Paid Search budget to Referral partnerships.',
      'Redesign the chatbot with behavioural triggers at the medium-engagement threshold.',
      'Deploy a Consent Management Platform with purpose-specific opt-in, resolving 6,426 missing consent-timestamp records.',
      'Commission an independent bias audit with a 5% per-segment alert threshold.',
    ],
    reflection: "I treated retention, digital and privacy as three separate problems, and only saw the causal chain while writing the summary. Next time I'd test that link analytically from the start, by checking whether GDPR-compliant customers really retain or engage differently.",
    next: 'A predictive CLV model in BigQuery ML, to move from descriptive segments to scoring retention spend by predicted lifetime value.',
    figures: [
      { src: 'img/projects/wellora-retention.webp', w: 1400, h: 1052, alt: 'Looker Studio dashboard for customer retention and promotion effectiveness', caption: 'Scenario 1: retention and promotion effectiveness' },
      { src: 'img/projects/wellora-digital.webp', w: 1400, h: 1048, alt: 'Looker Studio dashboard for digital channel performance and AI chatbot engagement', caption: 'Scenario 2: digital channels and AI chatbot' },
    ],
  },
  {
    slug: 'nextwave', fill: 'mist', icon: 'shopping-cart', label: 'NextWave RFM', name: 'NextWave E-commerce Analysis',
    kind: 'Team project', year: '2026',
    titleA: 'Campaigns that were', titleEm: 'hurting conversion.',
    summary: 'RFM segmentation and campaign funnel analysis for an e-commerce retailer, in BigQuery SQL and Python.',
    github: 'https://github.com/ashlynn-05/NextWave',
    tools: ['BigQuery', 'SQL', 'Python'],
    skills: ['RFM segmentation', 'Campaign funnel analysis', 'Data visualisation'],
    objective: 'Diagnose why revenue growth depended on acquisition, and whether marketing campaigns were actually driving purchases.',
    context: 'NextWave: $4.84M revenue, 5,577 customers and 8,134 orders over 23 months. A team project on transaction, click and review data.',
    role: 'Ran the RFM segmentation and campaign-funnel SQL analysis in BigQuery, and built the Python visualisations.',
    approach: [
      { h: 'Customer value', text: '64.84% of customers bought only once. Champions (13.7% of the base) average $1,938.87 spend, but even they have not purchased in 268+ days on average.' },
      { h: 'Campaign performance', text: 'Cart-to-purchase falls from 34.0% outside campaigns to 31.69% during them. Only 7.09% of campaign-period clicks were directly attributable to the campaign.' },
      { h: 'Allocation mismatch', text: 'Champions get almost the same campaign exposure as Low/Medium Value customers despite an 8.4x spend gap. New Customers respond best (8.23%) while spending the least.' },
    ],
    metrics: [
      { value: null, text: '64.84%', caption: 'Of customers bought only once' },
      { value: null, text: '7.09%', caption: 'Of campaign-period clicks actually came from the campaign' },
      { value: null, text: '8.4x', caption: 'Spend gap with almost no targeting difference' },
    ],
    insight: 'Campaigns were measured by clicks, not revenue. That hid that they were buying attention, not purchases, and that spend was not targeted by customer value at all.',
    recs: [
      'Prioritise Champions and Loyal High-Value customers in New Product Launch campaigns (best type at 33.07% cart-to-purchase).',
      'Build a 90-day onboarding sequence for New Customers.',
      'Suspend Reactivation Offer campaigns (31.01% cart-to-purchase) and move budget to cart abandonment recovery.',
      'Measure campaigns by revenue per converting customer, not click volume.',
    ],
    reflection: "Campaign clicks looked like engagement but were mostly noise. Next time I'd push on causality: did the campaign cause the conversion drop, or attract lower-intent traffic by design?",
    figures: [
      { src: 'img/projects/nextwave-overview.webp', w: 1008, h: 630, alt: 'NextWave company overview with revenue trend, customer segments and revenue by category', caption: 'Company overview' },
    ],
  },
  {
    slug: 'retailpro', fill: 'jasmine', icon: 'brain', label: 'RetailPro models', name: 'RetailPro Predictive Analytics',
    kind: 'Case study', year: '2025',
    titleA: '24 models, and the best one', titleEm: "wasn't the pick.",
    summary: 'Built and compared 24 regression and neural network models to forecast sales for a consumer electronics retailer.',
    github: 'https://github.com/ashlynn-05/RetailPro_Predictive-Analytics',
    tools: ['Python', 'pandas', 'scikit-learn', 'Keras', 'TensorFlow'],
    skills: ['Regression modelling', 'Neural networks', 'Model evaluation'],
    objective: 'Build a model RetailPro could trust to forecast sales from store, marketing and customer features.',
    context: '2,000 records across 21 features: foot traffic, promotional frequency, product variety, pricing and more. No missing values, but categorical fields needed encoding and every feature needed scaling.',
    role: 'Preprocessed the data, built and tuned all 24 models, and selected the final model for the business recommendation.',
    approach: [
      { h: 'Feature analysis', text: 'Advertising spend, price index and competitor pricing were the strongest sales drivers. Opening hours, weather and market share showed almost no relationship, which guided feature selection.' },
      { h: 'Model testing', text: '4 multi-linear regression models (standard and ridge) and 20 multi-layer perceptrons (varying depth, activation, optimiser and learning rate), all judged on MSE, MAE, MAPE and RMSE.' },
      { h: 'Model selection', text: 'Ridge (alpha = 1) scored best on raw error, but the 2-layer ReLU MLP was chosen for adoption: RMSE 1,195.49, MAE 950.99 and a 0.96 correlation between predicted and actual sales.' },
    ],
    metrics: [
      { value: 24, caption: 'Models built and compared (4 regression, 20 neural network)' },
      { value: null, text: '0.96', caption: 'Correlation between predicted and actual sales' },
      { value: null, text: '1,195.49', caption: 'RMSE of the recommended MLP' },
    ],
    insight: 'The best-scoring model is not always the right one to deploy. The MLP traded a little raw accuracy for robustness across all 21 features, which matters for a retailer pulling several levers at once.',
    recs: [
      'Adopt the 2-layer ReLU MLP for sales forecasting.',
      'Expand the dataset and add external economic indicators to reduce overfitting risk.',
      'Refine the architecture further before full production use.',
    ],
    reflection: "Testing 24 models side by side made the accuracy versus business-fit trade-off concrete, and forced me to justify the pick in business terms. Next time I'd run a systematic hyperparameter search instead of random sampling.",
  },
  {
    slug: 'apex', fill: 'caramel', icon: 'broom', label: 'Apex clean-up', name: 'Apex Global Solutions Data Cleaning',
    kind: 'Case study', year: '2025',
    titleA: 'Cleaning eight kinds of', titleEm: 'data rot.',
    summary: 'Remediated a retail dataset broken by a system consolidation, then built a 2026 expansion framework for the COO in Excel.',
    github: 'https://github.com/ashlynn-05/apex_dataanalytics',
    tools: ['Excel', 'Chart.js'],
    skills: ['Data cleansing', 'Pivot analysis', 'Revenue validation'],
    objective: "Fix a dataset broken by a System Consolidation Initiative, and answer the COO's questions to inform a 2026 expansion strategy.",
    context: 'Duplicates, ship dates before order dates, missing categories, negative quantities and inconsistent formatting: eight distinct categories of data rot across the file.',
    role: 'Cleaned and validated the dataset end to end in Excel, then built the revenue and margin analysis behind the recommendations.',
    approach: [
      { h: 'Data cleansing', text: 'Filled missing categories with IFS mapping, corrected impossible ship-before-order dates, converted negative quantities (data-entry errors, not returns), standardised regions, contacts and names, removed duplicates, and re-validated Revenue from Unit Price, Quantity and Discount.' },
      { h: 'Strategic analysis', text: 'Revenue against margin across region, product category and customer segment, to find where volume and profitability split.' },
    ],
    metrics: [
      { value: 8, caption: 'Categories of data quality issues fixed' },
      { value: null, text: '11.1%', caption: 'Margin on Office Supplies, the highest of any category' },
      { value: null, text: '$2,143', caption: 'Average order value for Home Office, 14% above Consumer' },
    ],
    insight: "Revenue leaders aren't margin leaders. West ties South on revenue but beats it on margin, and Office Supplies has the lowest revenue but the highest margin.",
    recs: [
      'Prioritise the West region for expansion investment.',
      'Scale Office Supplies through marketing and placement.',
      'Build targeted campaigns for the high-value Home Office segment.',
    ],
    reflection: 'Negative quantities looked like returns at first, but the guidance confirmed they were entry errors, which would have changed the revenue validation. Now I check every fix against the business logic, not the statistically convenient answer.',
  },
  {
    slug: 'adidas', fill: 'rose', icon: 'sneaker', label: 'Adidas Samba', name: 'Adidas Samba Social Listening',
    kind: 'Case study', year: '2025',
    titleA: 'Is the Samba a trend', titleEm: 'or a staple?',
    summary: 'Analysed 15,000+ comments across YouTube, Reddit and X with sentiment analysis, topic modelling and network analysis.',
    github: 'https://github.com/ashlynn-05/Growth-and-Commercialisation-Strategy-based-on-social-media-data-analysis-Adidas-Case-',
    tools: ['Python'],
    skills: ['Sentiment analysis', 'Topic modelling', 'Network analysis'],
    objective: "Decide whether the Samba's social demand supports sustained growth, or whether trust and retention risks threaten adoption, then turn that into R&D and go-to-market moves.",
    context: 'YouTube, Reddit and X treated as three stages of the customer journey (discovery, trust validation, amplification) rather than interchangeable channels.',
    role: 'Ran sentiment analysis, topic modelling and network analysis (Louvain clustering) across all three platforms, and built the R&D and commercialisation roadmap.',
    approach: [
      { h: 'YouTube, top of funnel', text: "Comments skewed positive on comfort and versatility, but topics surfaced early warnings: 'overhyped' and comparisons with Nike and New Balance." },
      { h: 'Reddit, trust validation', text: 'More critical and practical: counterfeit risk and wide-foot fit, with negative topics drawing outsized comment volume.' },
      { h: 'X, amplification', text: 'A centralised diffusion structure: a few high-degree users act as reach multipliers, while niche clusters anchor authenticity and quality narratives.' },
    ],
    metrics: [
      { value: 15000, suffix: '+', caption: 'Comments analysed' },
      { value: 3, caption: 'Platforms as three journey stages' },
      { value: 3, caption: 'Friction points found: authenticity, fit, durability' },
    ],
    insight: "Samba demand is real but fragile: style-led rather than function-led, so it decays faster. The fix is turning trust friction (authenticity, fit, durability) into product investment, not more hype.",
    recs: [
      'Anti-counterfeit verification (NFC or QR, then blockchain passports).',
      'Inclusive wide-fit sizing.',
      'Durable and sustainable materials to answer wear-and-tear sentiment.',
      'A staged rollout over 0 to 1, 1 to 3 and 3 to 5 years.',
      'Activate high-degree X users for reach, and niche clusters for credibility.',
    ],
    reflection: "The three platforms weren't redundant: they measured discovery, trust and diffusion. Keeping them apart showed that 'demand is strong' and 'retention is at risk' were both true at once.",
  },
];

export const skills = [
  { label: 'Data cleansing and governance', links: [2, 4, 5], note: '10,000+ client records standardised at SW Education, 5 BGIS datasets linked into one master file, and eight kinds of data rot fixed for Apex.' },
  { label: 'Dashboards and BI', links: [2, 4, 5], note: 'Power BI for SW Education executives and BGIS, plus Power BI (Altano) and Looker Studio (Wellora) in coursework.' },
  { label: 'SQL and Python', links: [4, 5], note: 'BigQuery SQL for Wellora and NextWave, Python for RetailPro models, Adidas social listening and BGIS data prep.' },
  { label: 'KPI and trend analysis', links: [1, 2, 3, 5], note: 'Conversion tracking at Codrops, engagement and conversion pathways at SW Education, and product velocity at The Muse Crochet.' },
  { label: 'Process mapping and requirements', links: [0, 1], note: 'Shop-floor workflows and SOPs mapped into a requirements framework at Sidekick, and a documented, auditable pipeline at Codrops.' },
  { label: 'Stakeholder communication', links: [0, 1, 2, 4], note: "From Sidekick's founding team to BGIS's People & Culture APAC executive." },
];

export const beamProjects = [
  { label: 'Sidekick', logo: 'sidekick', fill: 'berry', icon: 'flow-arrow' },
  { label: 'Codrops', logo: 'codrops', fill: 'rose', icon: 'database' },
  { label: 'SW Education', logo: 'sw-education', fill: 'caramel', icon: 'chart-bar' },
  { label: 'The Muse Crochet', logo: 'muse-crochet', fill: 'mist', icon: 'yarn' },
  { label: 'Deakin x BGIS', logo: 'deakin', fill: 'jasmine', icon: 'buildings' },
  { label: 'Deakin coursework', logo: 'deakin', fill: 'caramel', icon: 'graduation-cap' },
] as const satisfies readonly { label: string; logo: LogoId; fill: string; icon: string }[];

export interface Chapter {
  date: string;
  icon: string;
  fill: Fill;
  title: string;
  body: string;
  chips?: string[];
  big?: { value: number | null; prefix?: string; suffix?: string; text?: string; caption: string };
  sticker?: { fill: string; status: string; title: string };
  todo?: boolean;
  hack?: { name: string; meta: string; href?: string; link?: string }[];
}

export const chapters: Chapter[] = [
  {
    date: '2024', icon: 'graduation-cap', fill: 'rose', title: 'New city, new degree',
    body: 'Started a Bachelor of Business Analytics at Deakin on the Deakin International Student Merit Scholarship, and took on Finance Officer at the Melbourne Overseas Vietnamese Student Association.',
    big: { value: 83, suffix: '/100', caption: 'High Distinction average so far' },
    sticker: { fill: 'caramel', status: 'Ongoing', title: 'Keep the books' },
  },
  {
    date: 'Mar 2024', icon: 'database', fill: 'rose', title: 'Built my first CRM',
    body: 'Joined Codrops as Partnership Associate and designed the CRM behind its sponsor pipeline: the fields, the stages and the conversion tracking.',
    chips: ['50+ sponsors tracked', '5 deals closed'],
    big: { value: 50, suffix: '+', caption: 'Sponsors tracked end to end' },
    sticker: { fill: 'plain', status: 'Ongoing', title: 'Say yes to cold outreach' },
  },
  {
    date: 'Nov 2024', icon: 'yarn', fill: 'mist', title: 'Crochet small biz era',
    body: 'Read order data across Square, Shopify and Instagram at The Muse Crochet to work out which colourways to restock each week.',
    chips: ['+18% repeat purchases (est.)'],
    big: { value: 18, prefix: '+', suffix: '%', caption: 'Estimated lift in repeat-customer purchases' },
    sticker: { fill: 'jasmine', status: 'Complete', title: 'Run a shop on real data' },
  },
  {
    date: 'Mar 2025', icon: 'storefront', fill: 'jasmine', title: 'Learned to read a shop floor',
    body: 'Sales Consultant at Kim Beauty Warehouse: 100+ customers a day, and a front-row seat to what makes people come back.',
    chips: ['100+ customers a day'],
    big: { value: 100, suffix: '+', caption: 'Customers helped a day' },
  },
  {
    date: 'Aug 2025', icon: 'chart-bar', fill: 'caramel', title: 'Cleaned ten thousand records',
    body: 'Digital Analyst Intern at SW Education: standardised 10,000+ client records, then built Power BI dashboards for executives.',
    chips: ['10,000+ records', 'Power BI'],
    big: { value: 10000, suffix: '+', caption: 'Client records cleaned and standardised' },
    sticker: { fill: 'mist', status: 'Ongoing', title: 'Crew the campus' },
  },
  {
    date: '2025 to 2026', icon: 'chart-line-up', fill: 'caramel', title: 'Learned to query',
    body: 'Seven data projects in BigQuery, Power BI, Python and Excel, from a real BGIS client engagement to 24 predictive models for RetailPro.',
    chips: ['BigQuery', 'Power BI', 'Python'],
    big: { value: 7, caption: 'Data projects with write-ups and code' },
    sticker: { fill: 'plain', status: 'Levelling up', title: 'One new tool a quarter' },
  },
  {
    date: 'Mar to Sep 2026', icon: 'trophy', fill: 'berry', title: 'Five events in seven months',
    body: 'A certification and four hackathons, back to back.',
    hack: [
      { name: 'UX Design Certification', meta: 'Google and Coursera, Mar 2026' },
      { name: "L'Oréal Brainstorm 2026", meta: 'May 2026' },
      { name: 'Watt The Hack', meta: 'MLAI x Monash DeepNeuron, Jun 2026', href: 'https://github.com/cobeo2004/hackathon-fork', link: 'SolarCycle' },
      { name: "AI Agentic Hackathon, Founder's Track", meta: 'GenFund AI, Jul 2026' },
      { name: 'Forward: AI in Business Hackathon', meta: 'DSCube x Raid x Eleno, Sep 2026', href: 'https://trustlane.house-of-imaginaries.com/', link: 'Trustlane' },
    ],
    big: { value: 5, caption: 'Events between March and September 2026' },
  },
  {
    date: 'Jun 2026', icon: 'rocket-launch', fill: 'berry', title: 'Joined a YC startup',
    body: 'Business Development Analyst Intern at Sidekick (YC S26): mapping shop-floor workflows into requirements and segmenting prospects by pain point.',
    big: { value: 3, suffix: 'x', caption: 'Increase in qualified pipeline' },
    sticker: { fill: 'berry', status: 'Ongoing', title: 'Mentor first-years' },
  },
  {
    date: '2026, expected', icon: 'sparkle', fill: 'mist', title: 'Graduation day', todo: true,
    body: 'Bachelor of Business Analytics, sitting at 83/100 so far. Still being written.',
    sticker: { fill: 'blush', status: 'In progress', title: 'Finish with the HD intact' },
  },
  {
    date: 'Next', icon: 'plus-circle', fill: 'jasmine', title: '[Next chapter]', todo: true,
    body: 'Unwritten. Could have your team in it.',
    sticker: { fill: 'open', status: 'Your next quest', title: 'Add a quest' },
  },
];

export const stickers = [
  { fill: 'jasmine', icon: 'yarn', status: 'Complete', title: 'Run a shop on real data', note: 'Restocked crochet by what the order data said, not vibes.', l: '3%', t: '40px', r: -4 },
  { fill: 'plain', icon: 'paper-plane-tilt', status: 'Ongoing', title: 'Say yes to cold outreach', note: '50+ sponsors later, rejection stopped stinging.', l: '27%', t: '74px', r: 3 },
  { fill: 'berry', icon: 'chalkboard-teacher', status: 'Ongoing', title: 'Mentor first-years', note: 'B&L Peer Mentor. Explaining it is how I learn it twice.', l: '51%', t: '30px', r: -2 },
  { fill: 'caramel', icon: 'piggy-bank', status: 'Ongoing', title: 'Keep the books', note: 'Finance Officer at MOVSA. Small budgets, real consequences.', l: '75%', t: '64px', r: 4 },
  { fill: 'mist', icon: 'confetti', status: 'Ongoing', title: 'Crew the campus', note: 'DUSA Crew. Events on time, people in the right room.', l: '5%', t: '362px', r: 3 },
  { fill: 'plain', icon: 'lightning', status: 'Levelling up', title: 'One new tool a quarter', note: 'BigQuery, then DAX, then whatever the next role needs.', l: '29%', t: '340px', r: -3 },
  { fill: 'blush', icon: 'seal-check', status: 'In progress', title: 'Finish with the HD intact', note: '83/100 and a merit scholarship. Final stretch.', l: '53%', t: '356px', r: 2 },
  { fill: 'open', icon: 'plus-circle', status: 'Your next quest', title: 'Add a quest', note: "A race, a trip, a recipe. Tell me and I'll pin it here.", l: '77%', t: '344px', r: -4 },
];

/** The analytics stack from the CV, shown on the works page. */
export const stackTools = ['Excel', 'SQL (BigQuery)', 'Power BI', 'Looker Studio', 'Python'];

export const tools = ['Excel', 'SQL', 'BigQuery', 'Power BI', 'DAX', 'Looker Studio', 'Python', 'Jira', 'Miro', 'LucidChart', 'Salesforce', 'HubSpot', 'Figma'];
