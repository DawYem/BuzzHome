import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion';

const howItWorksFull = [
  {
    question: 'How are listings created?',
    answer: "Listings are created by current Georgia Tech students and residents who have a sublease available. They fill out our listing form with all the relevant details — price, availability, amenities, and a full description — and submit it for review. In a real version of BuzzHome, each listing would be reviewed by our team within 24–48 hours before going live.",
  },
  {
    question: 'Are the listings real?',
    answer: "The listings currently shown on BuzzHome are realistic mock data created for this demo. In a production version, listings would be real subleases submitted by verified GT students. The listing fields, workflow, and contact process are all modeled after how a real platform would work.",
  },
  {
    question: 'How do I contact a lister?',
    answer: "On any listing's detail page, click the 'Contact Lister' button to open a contact form. In this mockup, the form simulates sending a message. In a real version, this would send an email to the lister and notify them in their dashboard.",
  },
  {
    question: 'Is BuzzHome affiliated with Georgia Tech?',
    answer: "No. BuzzHome is an independent project and is not officially affiliated with, endorsed by, or connected to the Georgia Institute of Technology. It is a concept/mockup created for portfolio demonstration purposes.",
  },
];

const futureFeatures = [
  { icon: '🔐', title: 'GT Email Verification', desc: 'Verify lister identity with @gatech.edu email authentication for an extra layer of trust.' },
  { icon: '🗺️', title: 'Interactive Map View', desc: 'Browse listings on an interactive Mapbox map with commute overlays and transit stops.' },
  { icon: '💬', title: 'In-App Messaging', desc: 'Real-time chat between listers and interested tenants without leaving the platform.' },
  { icon: '📋', title: 'Digital Sublease Agreements', desc: 'Generate and e-sign a basic sublease agreement directly within BuzzHome.' },
  { icon: '⭐', title: 'Lister Reviews', desc: 'Leave and read reviews for listers to build community trust over time.' },
  { icon: '🔔', title: 'Listing Alerts', desc: 'Set alerts for new listings that match your budget, location, and timing preferences.' },
  { icon: '📸', title: 'Virtual Tours', desc: 'Embed short video walkthroughs so out-of-state students can see a space remotely.' },
  { icon: '📊', title: 'Pricing Insights', desc: 'Show average rent by neighborhood so students can quickly evaluate whether a price is fair.' },
];

const team = [
  { name: 'Concept & Design', role: 'Student-centered housing research, UX/UI design, and product vision for the GT transfer student experience.' },
  { name: 'Frontend', role: 'React 18 + Tailwind CSS + Vite. Fully responsive, accessible, and polished for portfolio-quality presentation.' },
  { name: 'Backend', role: 'Node.js + Express REST API with in-memory mock data. Production-ready architecture, mockup-scale implementation.' },
];

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-hero-gradient text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-sm font-semibold text-gold-bright uppercase tracking-widest mb-3 block">
            About BuzzHome
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">
            Making student housing less stressful
          </h1>
          <p className="text-white/70 text-xl max-w-2xl">
            BuzzHome is a concept product designed to reduce one of the biggest pain points for incoming transfer students: finding affordable, short-term housing near campus.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading text-3xl mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Housing is one of the first major obstacles new transfer students face. Unlike freshmen who can rely on campus dorms, transfer students often arrive mid-year, from out of state, with little knowledge of Atlanta's neighborhoods and no existing network to turn to.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                BuzzHome was conceived to change that. By creating a dedicated marketplace where current GT students can list available subleases directly to incoming transfer students, we remove the friction of searching Craigslist, Facebook Marketplace, or dozens of irrelevant apartment sites.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The goal: affordable, student-trusted, campus-adjacent housing should be easy to find — not a second full-time job on top of an already stressful transition.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: '🎯', title: 'Core Focus: Transfer Students', desc: 'Every feature is designed with the unique needs of incoming transfer students in mind.' },
                { icon: '💰', title: 'Affordability First', desc: 'Budget filters, "Budget Pick" badges, and pricing transparency are front and center.' },
                { icon: '🔒', title: 'Trust Through Community', desc: 'Listers are GT students with verified .edu emails in the future product vision.' },
                { icon: '🏃', title: 'Speed to Housing', desc: 'From search to contact in minutes — no long application processes or broker fees.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <span className="text-3xl shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How listings work */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-heading text-3xl">How the Platform Works</h2>
            <p className="text-gray-500 mt-2">The full listing lifecycle, explained.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '1', icon: '📝', title: 'A student posts a sublease', desc: "GT students heading abroad, graduating early, or moving out fill out our listing form with full details." },
              { step: '2', icon: '🔍', title: 'BuzzHome reviews the listing', desc: "Our team verifies key details and approves the listing within 24–48 hours before it goes live." },
              { step: '3', icon: '🧭', title: 'Transfer students browse', desc: "Incoming students search, filter by budget and distance, and explore detailed listing pages." },
              { step: '4', icon: '📩', title: 'Direct contact & agreement', desc: "Interested students contact the lister directly. They connect, arrange a viewing, and sign a sublease agreement." },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-5 shadow-card text-center">
                <div className="w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                  {s.step}
                </div>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-display font-bold text-navy mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="bg-navy text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl mb-4">Trust & Safety (Future Vision)</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                In a full production version of BuzzHome, safety would be built into every layer of the platform. Here's how we'd approach it:
              </p>
              <ul className="space-y-3">
                {[
                  'GT email verification for all listers (@gatech.edu)',
                  'Manual listing review before any listing goes public',
                  'Flagging and reporting system for suspicious listings',
                  'No payments processed through the platform — rent paid directly',
                  'Clear disclaimers and sublease agreement templates for users',
                  'Community ratings and reviews after completed stays',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="text-gold-bright mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 text-center">
              <div className="text-6xl mb-4">🛡️</div>
              <h3 className="font-display font-bold text-xl mb-3">Safe by Design</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                The fundamental safety principle: BuzzHome connects students with other GT community members, not anonymous strangers. That community context is the foundation of trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Features */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-heading text-3xl">Future Features Roadmap</h2>
            <p className="text-gray-500 mt-2">What the full version of BuzzHome would include.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {futureFeatures.map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gold/40 hover:shadow-card transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-navy text-sm mb-1">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works FAQ */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-heading text-3xl mb-2">Platform Questions</h2>
          <p className="text-gray-500 mb-8">Common questions about how BuzzHome works.</p>
          <Accordion items={howItWorksFull} allowMultiple />
        </div>
      </section>

      {/* Mockup disclaimer */}
      <section className="bg-gold-bright/10 border-y border-gold/20 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <span className="text-3xl shrink-0">📋</span>
            <div>
              <h3 className="font-display font-bold text-navy text-xl mb-2">This is a concept mockup</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                BuzzHome is currently a prototype built for portfolio and demonstration purposes. All listing data is mock data. No real payments, real authentication, or real user data is handled. The platform architecture, design, and feature set are intended to demonstrate what a real student housing product could look like at MVP stage.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                BuzzHome is an independent student housing mockup and is not officially affiliated with Georgia Tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-heading text-3xl mb-8 text-center">Built With</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((t) => (
              <div key={t.name} className="text-center bg-gray-50 rounded-2xl p-6">
                <h3 className="font-display font-bold text-navy text-lg mb-2">{t.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t.role}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['React 18', 'Vite', 'Tailwind CSS', 'React Router v6', 'Node.js', 'Express', 'Axios'].map((tech) => (
              <span key={tech} className="chip bg-navy/5 text-navy border border-navy/10 font-medium">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-14 px-4 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-4">🐝</div>
          <h2 className="font-display font-bold text-3xl mb-3">Ready to explore the demo?</h2>
          <p className="text-white/60 mb-8">Browse the mock listings or try posting a sublease to see the full flow.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/listings" className="btn-primary">Browse Listings</Link>
            <Link to="/post" className="btn-outline-gold">Post a Sublease</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
