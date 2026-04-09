import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { getListings } from '../api/listings';

const whyItems = [
  {
    icon: '💰',
    title: 'Affordable Options',
    desc: 'Every listing is curated with student budgets in mind. Filter by price and find places starting under $800/mo.',
  },
  {
    icon: '📍',
    title: 'Near Campus',
    desc: 'Browse subleases in Home Park, Midtown, and other GT-adjacent neighborhoods — many within walking distance.',
  },
  {
    icon: '⏱️',
    title: 'Short-Term Flexibility',
    desc: 'Need just a semester? Find 3–6 month subleases that fit your schedule — no long-term commitments required.',
  },
  {
    icon: '🤝',
    title: 'Transfer-Student Friendly',
    desc: 'Many listers are current GT students who understand the transfer experience and are happy to help you settle in.',
  },
];

const howSteps = [
  {
    step: '01',
    icon: '🔍',
    title: 'Browse Housing',
    desc: 'Search listings by price, location, size, and lease length. Use filters to find exactly what you need.',
  },
  {
    step: '02',
    icon: '💡',
    title: 'Compare Options',
    desc: 'Read full details on each listing — amenities, commute estimates, roommate info, and more.',
  },
  {
    step: '03',
    icon: '📩',
    title: 'Contact the Lister',
    desc: "Send a message directly to the current tenant. Ask questions, set up a visit, and lock in your place.",
  },
];

const testimonials = [
  {
    quote:
      "BuzzHome made my transfer so much easier. I found a furnished place less than a mile from campus in under an hour. Couldn't believe how affordable it was.",
    name: 'Jaylen K.',
    detail: 'Transfer Student · CS Major',
    avatar: '👨🏾‍💻',
  },
  {
    quote:
      "Moving from out of state was intimidating, but having a short 3-month sublease option was perfect for figuring out Atlanta before committing to a full lease.",
    name: 'Sofia T.',
    detail: 'Transfer Student · Mechanical Engineering',
    avatar: '👩🏽‍🔬',
  },
  {
    quote:
      "I saved so much stress by finding a roommate through BuzzHome before my first day of classes. My housemates ended up being in the same major!",
    name: 'Marcus D.',
    detail: 'Transfer Student · Business',
    avatar: '👨🏻‍📚',
  },
];

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-10 bg-gray-200 rounded-xl mt-4" />
      </div>
    </div>
  );
}

export default function HomePage() {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListings({ sort: 'price_asc' })
      .then((data) => setFeaturedListings(data.filter((l) => l.badge).slice(0, 6)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-hero-gradient text-white relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold/5" />
          <div className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-white/3" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            {/* Tag */}
            <span className="inline-flex items-center gap-2 bg-gold-bright/15 text-gold-bright border border-gold-bright/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              🐝 Built for Georgia Tech Students
            </span>

            <h1 className="font-display font-extrabold text-5xl sm:text-6xl leading-tight mb-5">
              Find Affordable <br />
              <span className="text-gold-bright">Student Subleases</span>
              <br /> Near GT
            </h1>

            <p className="text-white/75 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              BuzzHome connects incoming transfer students with short-term, budget-friendly housing near Georgia Tech's campus — so you can focus on school, not searching.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/listings" className="btn-primary text-base">
                Browse Listings
              </Link>
              <Link to="/post" className="btn-outline-gold text-base">
                Post a Sublease
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <div className="text-center">
                <p className="font-display font-bold text-2xl text-white">12+</p>
                <p className="text-white/50 text-xs">Active Listings</p>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <p className="font-display font-bold text-2xl text-white">$700</p>
                <p className="text-white/50 text-xs">Starting From</p>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <p className="font-display font-bold text-2xl text-white">0.3 mi</p>
                <p className="text-white/50 text-xs">Closest to Campus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ────────────────────────────── */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
            <div>
              <span className="text-sm font-semibold text-gold-bright uppercase tracking-widest mb-2 block">
                Featured Picks
              </span>
              <h2 className="section-heading text-3xl sm:text-4xl">Top Affordable Listings</h2>
              <p className="text-gray-500 mt-2">Hand-picked for budget-conscious transfer students.</p>
            </div>
            <Link to="/listings" className="text-navy font-semibold text-sm hover:text-gold-bright transition-colors shrink-0">
              View all listings →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/listings" className="btn-secondary text-sm">
              See All Listings
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY BUZZHOME ─────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-gold-bright uppercase tracking-widest mb-2 block">
              Why BuzzHome?
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl">Housing designed for students</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              We built BuzzHome because finding a sublease near campus shouldn't be stressful — especially when you're new to Atlanta.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-card transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-navy text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="bg-navy py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-gold-bright uppercase tracking-widest mb-2 block">
              Simple Process
            </span>
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl">
              How BuzzHome Works
            </h2>
            <p className="text-white/60 mt-3 max-w-xl mx-auto">
              From search to move-in in three straightforward steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-0.5 bg-gold/20" />

            {howSteps.map((step) => (
              <div key={step.step} className="text-center relative">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gold-bright/15 border border-gold-bright/30 text-4xl mb-5 mx-auto">
                  {step.icon}
                </div>
                <span className="block text-gold-bright font-display font-bold text-sm uppercase tracking-widest mb-1">
                  Step {step.step}
                </span>
                <h3 className="font-display font-bold text-white text-xl mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/listings" className="btn-primary text-base">
              Start Browsing
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOR TRANSFER STUDENTS ────────────────────────── */}
      <section className="bg-gold-light/20 border-y border-gold/20 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-gold-bright uppercase tracking-widest mb-2 block">
                For Incoming Transfer Students
              </span>
              <h2 className="section-heading text-3xl sm:text-4xl mb-4">
                Starting fresh at Georgia Tech?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Transferring to a new university is exciting — but finding housing in an unfamiliar city is stressful. BuzzHome makes it easy to land a safe, affordable sublease near campus while you settle in, explore neighborhoods, and figure out where you want to live long-term.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Short-term leases that match semester timelines',
                  'Furnished options so you can move in with just your bags',
                  'Listings from current GT students who get it',
                  'Neighborhood guides and commute estimates included',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <span className="text-gold-bright mt-0.5 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link to="/transfer" className="btn-primary">Transfer Student Guide</Link>
                <Link to="/listings" className="btn-secondary">Browse Listings</Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Average Rent', value: '$925/mo', icon: '💰' },
                { label: 'Closest to GT', value: '0.3 miles', icon: '🏫' },
                { label: 'Furnished Options', value: '7 listings', icon: '🛋️' },
                { label: 'Shortest Lease', value: '3 months', icon: '📅' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-card text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="font-display font-bold text-navy text-xl">{stat.value}</p>
                  <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-gold-bright uppercase tracking-widest mb-2 block">
              Student Stories
            </span>
            <h2 className="section-heading text-3xl sm:text-4xl">What transfer students say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gold/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold-bright">★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="bg-gold-bright py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-extrabold text-navy text-3xl sm:text-4xl mb-4">
            Ready to find your place near GT?
          </h2>
          <p className="text-navy/70 text-lg mb-8">
            Browse real student subleases — no long-term commitment required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/listings" className="bg-navy text-white font-semibold px-8 py-3 rounded-xl hover:bg-navy-dark transition-colors">
              Browse All Listings
            </Link>
            <Link to="/transfer" className="border-2 border-navy text-navy font-semibold px-8 py-3 rounded-xl hover:bg-navy/10 transition-colors">
              Transfer Student Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
