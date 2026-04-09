import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion';

const subleaseGuide = [
  {
    question: 'Why is subleasing a good option when transferring to GT?',
    answer: "When you transfer, you're navigating a new city, a new campus culture, and a demanding course load — all at the same time. A short-term sublease lets you land somewhere safe and affordable near campus while you explore Atlanta, meet people, and figure out which neighborhood you actually want to live in long-term. Committing to a full year's lease before you know the city is a big risk.",
  },
  {
    question: 'What should I look for before signing a sublease?',
    answer: "Check the original lease to understand if subleasing is allowed (some landlords restrict it). Look for clarity on who is responsible for utilities and repairs. Make sure the move-in and move-out dates align with your semester. Always inspect the space (or request photos and a video walkthrough) before committing. Ask about security deposit, notice requirements, and what happens if you need to leave early.",
  },
  {
    question: 'What questions should I ask the lister?',
    answer: "Ask: Is the original landlord aware of and okay with the sublease? What utilities are included in rent? What is the exact lease start/end date? Are there any quirks about the unit I should know? Is parking available? What is the building's noise level like? Are there any known maintenance issues? What is the best/worst thing about living there? What is the neighborhood like at night?",
  },
  {
    question: 'How close is "close" to Georgia Tech?',
    answer: "Georgia Tech's main campus is in Midtown Atlanta. The closest neighborhoods are Home Park (0.3–0.8 miles, primarily accessible on foot), parts of Midtown (0.5–1.5 miles, walk/bus), and Atlantic Station (1–1.5 miles). The GT Stingerette shuttle and MARTA bus extend your reasonable range to about 2–3 miles. MARTA rail (Red/Gold line) can take you further but with more commute time.",
  },
  {
    question: 'What does a realistic budget look like for first semester?',
    answer: "Rent near campus ranges from $700–$1,600+/month depending on location and type. Budget-friendly furnished studios in Home Park run $875–$950/month including utilities — that's one of the most cost-effective options. Factor in $100–150/month for groceries, $30–50 for transportation (or get a MARTA Breeze card), and $100 for miscellaneous. Total monthly budget: $1,100–$1,250 for a frugal lifestyle.",
  },
  {
    question: 'Is it safe to sublet from another student?',
    answer: "Generally yes, when you take precautions. Always video-call or meet the lister before sending any money. Verify their GT affiliation if possible (many students list their .gatech.edu email). Never pay rent without seeing the unit first (in-person or via live video tour). Use a written sublease agreement — even a simple one protects both parties. Trust your gut: if something feels off, walk away.",
  },
];

const faqItems = [
  {
    question: 'Can I break a sublease early if I need to leave?',
    answer: "It depends on the agreement. Most subleases require 30 days notice to end early, and you may forfeit your security deposit. Always clarify early termination terms before signing. Short-term subleases (3–4 months) are naturally lower-risk than 6-month ones.",
  },
  {
    question: 'Do I need renters insurance for a sublease?',
    answer: "It's highly recommended. Renters insurance typically costs $10–15/month and covers your personal belongings in case of theft, fire, or water damage. It also provides liability coverage. Many landlords now require it even for subleases.",
  },
  {
    question: 'What does "utilities included" actually mean?',
    answer: "Usually it means water, electric, and sometimes WiFi are covered by the rent. Always ask specifically what's included — some listers mean only water, others mean everything. Get it in writing to avoid surprise charges.",
  },
  {
    question: 'Can international or out-of-state students sublet?',
    answer: "Absolutely. Subleasing is one of the most accessible housing options for students arriving from out of state or internationally, since you don't need an established U.S. credit history or a local co-signer. Arrange a video tour if you can't visit in person.",
  },
  {
    question: 'What is the GT Stingerette?',
    answer: "The Stingerette is GT's free on-demand night shuttle service that operates within a defined area around campus. It's great for safe late-night transportation. There's also the free GT bus system (the Trolley) and MARTA bus and rail connections.",
  },
];

const checklistItems = [
  'Confirmed the sublease is allowed by the original landlord',
  'Read the full original lease agreement',
  'Verified what utilities are included',
  'Confirmed exact move-in and move-out dates',
  'Inspected the unit in-person or via live video tour',
  'Confirmed security deposit amount and refund conditions',
  'Agreed on early termination policy in writing',
  'Got the lister\'s full name, GT email, and phone number',
  'Signed a written sublease agreement',
  'Looked up the neighborhood on Google Street View',
  'Checked the commute to campus at the times you\'d travel',
  'Asked about laundry, parking, and pets if applicable',
];

export default function TransferStudentPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-hero-gradient text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="text-sm font-semibold text-gold-bright uppercase tracking-widest mb-3 block">
            Transfer Student Resource
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">
            Your Guide to Subleasing Near Georgia Tech
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Everything an incoming transfer student needs to know about finding safe, affordable short-term housing near GT's campus.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/listings" className="btn-primary">Browse Listings</Link>
            <a href="#guide" className="btn-outline-gold">Read the Guide ↓</a>
          </div>
        </div>
      </div>

      {/* Why sublease intro */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="section-heading text-3xl mb-4">Why subleasing is smart for transfer students</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Transferring to Georgia Tech is one of the most exciting — and most overwhelming — decisions you'll make. You're landing in a new city, often mid-year, with limited time to find housing. Signing a 12-month lease before you've even set foot on campus is a gamble most students can't afford.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                A short-term sublease solves this. It gives you a stable, affordable home base near campus while you figure out Atlanta, make friends, and discover which neighborhood you actually want to live in long-term.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The students listing on BuzzHome are GT students themselves — they know what you're going through and are genuinely trying to help while getting their rent covered.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: '🏠', title: 'Stability from day one', desc: 'Move in before orientation and start the semester with housing already sorted.' },
                { icon: '💰', title: 'Budget-friendly', desc: 'Many subleases include utilities and furnishings, making the true cost lower than raw rent suggests.' },
                { icon: '🗺️', title: 'Time to explore', desc: 'Use the sublease period to research long-term options in neighborhoods you actually like.' },
                { icon: '🤝', title: 'Built-in community', desc: 'Living with or near GT students gives you an instant network on day one.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                  <span className="text-3xl shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-navy text-base mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GT Campus Distance Guide */}
      <section className="bg-navy text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-3xl mb-2">How close is close to Georgia Tech?</h2>
          <p className="text-white/60 mb-8">A quick guide to neighborhoods near GT's main campus in Midtown Atlanta.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { neighborhood: 'Home Park', range: '0.3–0.8 mi', commute: '5–15 min walk', note: 'Closest neighborhood. Student-dense, affordable, very walkable.', tag: 'Best for transfer students' },
              { neighborhood: 'Midtown', range: '0.5–1.5 mi', commute: '10–20 min walk / 5 min bus', note: 'Vibrant area. Mix of luxury and mid-range. Great amenities.', tag: 'Near Campus' },
              { neighborhood: 'Atlantic Station', range: '1–1.5 mi', commute: '15–25 min walk / 8 min bus', note: 'Walkable mixed-use district. Good transit, food, and retail.', tag: 'Good option' },
              { neighborhood: 'West Midtown', range: '1.5–2.5 mi', commute: '20–35 min walk / 10–15 min bus', note: 'Trendy and growing. More space for the money. Bus access.', tag: 'Budget range' },
            ].map((n) => (
              <div key={n.neighborhood} className="bg-white/10 rounded-2xl p-5">
                <span className="chip bg-gold-bright/20 text-gold-bright mb-3 inline-block">{n.tag}</span>
                <h3 className="font-display font-bold text-white text-lg mb-1">{n.neighborhood}</h3>
                <p className="text-gold-bright text-sm font-medium mb-1">{n.range} from GT</p>
                <p className="text-white/50 text-xs mb-3">🚶 {n.commute}</p>
                <p className="text-white/70 text-sm">{n.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sublease guide accordion */}
      <section id="guide" className="bg-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-heading text-3xl mb-2">Your complete sublease guide</h2>
          <p className="text-gray-500 mb-8">Common questions answered for students navigating subleasing for the first time.</p>
          <Accordion items={subleaseGuide} allowMultiple />
        </div>
      </section>

      {/* Budgeting tips */}
      <section className="bg-gold-bright/10 border-y border-gold/20 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-heading text-3xl mb-8">Budgeting tips for first semester</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🏠', title: 'Prioritize location over size', tip: 'A smaller furnished studio near campus will cost you less money and stress than a larger unfurnished place farther away. Walk > commute.' },
              { icon: '💡', title: 'Seek all-inclusive listings', tip: 'Listings that include utilities (electric, water, WiFi) simplify your budget dramatically. No bill surprises at the end of the month.' },
              { icon: '🛋️', title: 'Choose furnished if you can', tip: 'Buying furniture for a 3-month stay doesn\'t make sense. Furnished subleases cost a bit more monthly but save you hundreds in one-time costs.' },
              { icon: '🚌', title: 'Get a MARTA Breeze card', tip: 'A 30-day MARTA pass costs about $95 and covers unlimited rides on bus and rail. It\'s way cheaper than Uber everywhere.' },
              { icon: '🛒', title: 'Explore Bento, Breadwinner nearby', tip: 'Home Park and Midtown have affordable meal options. Learning to cook 3–4 simple meals per week cuts food costs significantly.' },
              { icon: '📦', title: 'Ship boxes, don\'t buy new', tip: 'Ship your essentials from home via USPS flat rate boxes before you arrive. It\'s cheaper than buying duplicates in Atlanta.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-5 shadow-card">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-navy mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-signing checklist */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-heading text-3xl mb-2">Pre-signing checklist</h2>
          <p className="text-gray-500 mb-6">Go through this before committing to any sublease.</p>
          <div className="space-y-2">
            {checklistItems.map((item) => (
              <div key={item} className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <span className="text-emerald-500 mt-0.5 shrink-0 text-lg">☐</span>
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">Tip: Print this list and check off items as you go through the process.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-heading text-3xl mb-2">More questions</h2>
          <p className="text-gray-500 mb-8">Quick answers to common transfer student housing questions.</p>
          <Accordion items={faqItems} allowMultiple />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-14 px-4 text-center text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-3xl mb-3">Ready to find your place?</h2>
          <p className="text-white/60 mb-8">Browse subleases curated specifically for transfer students near GT campus.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/listings" className="btn-primary">Browse Listings</Link>
            <Link to="/listings?transferFriendly=true" className="btn-outline-gold">Transfer-Friendly Only</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
