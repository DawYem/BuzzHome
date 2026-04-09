import { Link } from 'react-router-dom';

const footerLinks = [
  {
    heading: 'Explore',
    links: [
      { to: '/listings', label: 'Browse Listings' },
      { to: '/post', label: 'Post a Sublease' },
      { to: '/transfer', label: 'For Transfer Students' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { to: '/about', label: 'How It Works' },
      { to: '/about', label: 'Our Mission' },
      { to: '/about', label: 'Future Features' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { to: '/transfer', label: 'Sublease Guide' },
      { to: '/transfer', label: 'FAQ' },
      { to: '/about', label: 'Safety Tips' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🐝</span>
              <span className="font-display font-bold text-xl">
                Buzz<span className="text-gold-bright">Home</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Student-first sublease housing near Georgia Tech. Built for incoming transfer students navigating Atlanta for the first time.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="font-semibold text-gold-light text-sm uppercase tracking-wider mb-3">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-white/60 text-sm hover:text-gold-bright transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} BuzzHome. All rights reserved.</p>
          <p className="text-center sm:text-right max-w-md">
            BuzzHome is an independent student housing mockup and is not officially affiliated with Georgia Tech.
          </p>
        </div>
      </div>
    </footer>
  );
}
