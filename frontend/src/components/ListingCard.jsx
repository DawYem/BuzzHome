import { Link } from 'react-router-dom';

const badgeStyles = {
  'Budget Pick': 'badge-budget',
  'Best Value': 'badge-value',
  'Near Campus': 'badge-campus',
  'Transfer Friendly': 'badge-transfer',
};

function Badge({ label }) {
  if (!label) return null;
  return (
    <span className={`chip absolute top-3 left-3 shadow-sm ${badgeStyles[label] || 'bg-gray-500 text-white'}`}>
      {label === 'Budget Pick' && '💚 '}
      {label === 'Best Value' && '⭐ '}
      {label === 'Near Campus' && '📍 '}
      {label === 'Transfer Friendly' && '🤝 '}
      {label}
    </span>
  );
}

export default function ListingCard({ listing }) {
  const {
    id,
    title,
    price,
    neighborhood,
    distanceToCampus,
    bedrooms,
    bathrooms,
    furnished,
    leaseTerm,
    image,
    badge,
    estimatedCommute,
  } = listing;

  const safePrice = Number.isFinite(Number(price)) ? Number(price) : 0;
  const safeBedrooms = Number.isFinite(Number(bedrooms)) ? Number(bedrooms) : 0;
  const safeBathrooms = Number.isFinite(Number(bathrooms)) ? Number(bathrooms) : 0;
  const bedroomLabel = safeBedrooms === 0 ? 'Studio' : `${safeBedrooms} BR`;

  return (
    <div className="card group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80';
          }}
        />
        <Badge label={badge} />
        {furnished && (
          <span className="chip absolute top-3 right-3 bg-navy/90 text-white shadow-sm">
            Furnished
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Price */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-2xl font-display font-bold text-gold-bright">
            ${safePrice.toLocaleString()}
            <span className="text-sm font-normal text-gray-400">/mo</span>
          </p>
          <span className="chip bg-navy/5 text-navy font-medium shrink-0">{leaseTerm}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-navy text-base leading-snug mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Location row */}
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-1">
          <svg className="w-4 h-4 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="truncate">{neighborhood}</span>
        </div>

        {/* Distance */}
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
          <svg className="w-4 h-4 text-navy/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{distanceToCampus} mi from GT</span>
          {estimatedCommute && (
            <span className="text-gray-400">· {estimatedCommute}</span>
          )}
        </div>

        {/* Specs chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="chip bg-gray-100 text-gray-600">
            🛏 {bedroomLabel}
          </span>
          <span className="chip bg-gray-100 text-gray-600">
            🚿 {safeBathrooms} Bath
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Link
            to={`/listings/${id}`}
            className="block w-full text-center bg-navy text-white font-semibold text-sm py-2.5 rounded-xl hover:bg-navy-light transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
