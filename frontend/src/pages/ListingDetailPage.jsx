import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import ContactForm from '../components/ContactForm';
import { getListingById, getListings } from '../api/listings';

const badgeStyles = {
  'Budget Pick': 'badge-budget',
  'Best Value': 'badge-value',
  'Near Campus': 'badge-campus',
  'Transfer Friendly': 'badge-transfer',
};

function FeatureItem({ icon, label, value, positive }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className={`font-medium text-sm ${positive ? 'text-emerald-600' : 'text-gray-500'}`}>{value}</p>
      </div>
    </div>
  );
}

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    setLoading(true);
    getListingById(id)
      .then((data) => {
        if (!data) { navigate('/listings'); return; }
        setListing(data);
        return getListings({ maxPrice: data.price + 400, maxDistance: data.distanceToCampus + 1.5 });
      })
      .then((others) => {
        if (others) setSimilar(others.filter((l) => l.id !== parseInt(id)).slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse">
        <div className="h-72 bg-gray-200 rounded-2xl mb-6" />
        <div className="h-8 bg-gray-200 rounded w-2/3 mb-3" />
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-6" />
        <div className="h-32 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (!listing) return null;

  const {
    title, price, neighborhood, distanceToCampus, bedrooms, bathrooms, furnished,
    leaseTerm, availableFrom, availableTo, amenities, description, image, badge,
    idealForTransferStudents, roommateInfo, address, parking, petsAllowed, washerDryer,
    estimatedCommute, postedBy,
  } = listing;

  const bedroomLabel = bedrooms === 0 ? 'Studio' : `${bedrooms} Bedroom${bedrooms > 1 ? 's' : ''}`;
  const fromDate = new Date(availableFrom).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const toDate = new Date(availableTo).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 mb-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-navy transition-colors">Home</Link>
          <span>/</span>
          <Link to="/listings" className="hover:text-navy transition-colors">Listings</Link>
          <span>/</span>
          <span className="text-navy font-medium truncate max-w-xs">{title}</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero image + badges */}
        <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 md:h-96 bg-gray-200 mb-6 shadow-card">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'; }}
          />
          {badge && (
            <span className={`chip absolute top-4 left-4 shadow-md text-sm ${badgeStyles[badge] || 'bg-gray-500 text-white'}`}>
              {badge === 'Budget Pick' && '💚 '}
              {badge === 'Best Value' && '⭐ '}
              {badge === 'Near Campus' && '📍 '}
              {badge === 'Transfer Friendly' && '🤝 '}
              {badge}
            </span>
          )}
          {furnished && (
            <span className="chip absolute top-4 right-4 bg-navy/90 text-white shadow-md text-sm">Furnished</span>
          )}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & price */}
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <h1 className="font-display font-bold text-navy text-2xl sm:text-3xl leading-tight">{title}</h1>
                <div className="text-right shrink-0">
                  <p className="font-display font-bold text-gold-bright text-3xl">${price.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">/ month</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {address}
                </span>
                <span>·</span>
                <span>📍 {distanceToCampus} mi from GT</span>
                {estimatedCommute && <><span>·</span><span>🚶 {estimatedCommute}</span></>}
              </div>
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-2">
              <span className="chip bg-navy/5 text-navy font-medium">🛏 {bedroomLabel}</span>
              <span className="chip bg-navy/5 text-navy font-medium">🚿 {bathrooms} Bath</span>
              <span className="chip bg-navy/5 text-navy font-medium">📅 {leaseTerm} lease</span>
              <span className="chip bg-navy/5 text-navy font-medium">📆 {fromDate} – {toDate}</span>
              {furnished && <span className="chip bg-gold-bright/15 text-gold-dark font-medium">🛋️ Furnished</span>}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display font-bold text-navy text-xl mb-3">About this place</h2>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="font-display font-bold text-navy text-xl mb-4">Property features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                <FeatureItem icon="🚗" label="Parking" value={parking ? 'Available' : 'Not included'} positive={parking} />
                <FeatureItem icon="🐾" label="Pets" value={petsAllowed ? 'Allowed' : 'Not allowed'} positive={petsAllowed} />
                <FeatureItem icon="👕" label="Washer/Dryer" value={washerDryer ? 'In-unit' : 'Not available'} positive={washerDryer} />
                <FeatureItem icon="🛋️" label="Furnished" value={furnished ? 'Yes' : 'No'} positive={furnished} />
              </div>
            </div>

            {/* Amenities */}
            {amenities?.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-display font-bold text-navy text-xl mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {amenities.map((a) => (
                    <span key={a} className="chip bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ✓ {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Roommate info */}
            {roommateInfo && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="font-display font-bold text-navy text-xl mb-3">About your potential housemates</h2>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🤝</span>
                  <p className="text-gray-600 leading-relaxed">{roommateInfo}</p>
                </div>
              </div>
            )}

            {/* For transfer students */}
            {idealForTransferStudents && (
              <div className="bg-gold-bright/10 border border-gold/30 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0">🎓</span>
                  <div>
                    <h3 className="font-display font-bold text-navy text-lg mb-2">
                      Why this is great for transfer students
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      This listing is specifically flagged as ideal for incoming transfer students. Whether it's the short lease term, the furnished setup, or the proximity to campus, this place is designed to help you settle in quickly without the usual headaches of apartment hunting in a new city.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-display font-bold text-navy text-xl">Location</h2>
                <p className="text-gray-500 text-sm">{address}</p>
              </div>
              <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center gap-2 text-blue-400">
                <svg className="w-12 h-12 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-sm font-medium">Map preview · {neighborhood}, Atlanta GA</p>
                <p className="text-xs opacity-60">{distanceToCampus} miles from Georgia Tech</p>
              </div>
            </div>
          </div>

          {/* Right: Sticky contact + lister */}
          <div className="space-y-5">
            {/* Lister info */}
            <div className="bg-white rounded-2xl shadow-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center text-xl">
                  🧑‍🎓
                </div>
                <div>
                  <p className="font-semibold text-navy">{postedBy}</p>
                  <p className="text-xs text-gray-400">Current GT Student · Lister</p>
                </div>
              </div>
              <div className="text-xs text-gray-400 bg-gray-50 rounded-xl px-3 py-2 mb-4">
                📅 Available: {fromDate} – {toDate}
              </div>
              <button
                onClick={() => setShowContact((v) => !v)}
                className="w-full btn-primary text-sm"
              >
                {showContact ? 'Hide Contact Form' : '📩 Contact Lister'}
              </button>
            </div>

            {/* Contact form */}
            {showContact && (
              <div className="bg-white rounded-2xl shadow-card p-5">
                <h3 className="font-display font-bold text-navy text-lg mb-4">Send a message</h3>
                <ContactForm listingTitle={title} />
              </div>
            )}

            {/* Quick info card */}
            <div className="bg-navy rounded-2xl p-5 text-white space-y-3">
              <h3 className="font-display font-bold text-lg mb-3">Lease Summary</h3>
              {[
                { label: 'Monthly Rent', value: `$${price.toLocaleString()}` },
                { label: 'Lease Term', value: leaseTerm },
                { label: 'Available From', value: fromDate },
                { label: 'Available To', value: toDate },
                { label: 'Distance to GT', value: `${distanceToCampus} miles` },
                { label: 'Commute', value: estimatedCommute || 'N/A' },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center text-sm border-b border-white/10 pb-2 last:border-0 last:pb-0">
                  <span className="text-white/60">{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar listings */}
        {similar.length > 0 && (
          <div className="mt-12">
            <h2 className="section-heading text-2xl mb-6">Similar listings you might like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
