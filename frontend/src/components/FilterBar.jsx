export default function FilterBar({ filters, onChange, onClear }) {
  function handleChange(key, value) {
    onChange({ ...filters, [key]: value });
  }

  const hasActiveFilters =
    filters.maxPrice || filters.bedrooms !== '' || filters.furnished !== '' || filters.maxDistance;

  return (
    <aside className="bg-white rounded-2xl shadow-card p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-navy text-base">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-xs text-gold-bright hover:text-gold-dark underline font-medium transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Max Price */}
      <div>
        <label className="form-label">Max Monthly Rent</label>
        <select
          className="form-input"
          value={filters.maxPrice}
          onChange={(e) => handleChange('maxPrice', e.target.value)}
        >
          <option value="">Any price</option>
          <option value="800">Up to $800</option>
          <option value="900">Up to $900</option>
          <option value="1000">Up to $1,000</option>
          <option value="1200">Up to $1,200</option>
          <option value="1500">Up to $1,500</option>
        </select>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="form-label">Bedrooms</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: '', label: 'Any' },
            { value: '0', label: 'Studio' },
            { value: '1', label: '1 BR+' },
            { value: '2', label: '2 BR+' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleChange('bedrooms', opt.value)}
              className={`py-2 px-3 rounded-xl text-sm font-medium border-2 transition-all duration-150 ${
                filters.bedrooms === opt.value
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-navy/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Furnished */}
      <div>
        <label className="form-label">Furnished</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: '', label: 'Any' },
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleChange('furnished', opt.value)}
              className={`py-2 px-2 rounded-xl text-sm font-medium border-2 transition-all duration-150 ${
                filters.furnished === opt.value
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-navy/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Distance to Campus */}
      <div>
        <label className="form-label">Distance to GT Campus</label>
        <select
          className="form-input"
          value={filters.maxDistance}
          onChange={(e) => handleChange('maxDistance', e.target.value)}
        >
          <option value="">Any distance</option>
          <option value="0.5">Under 0.5 miles</option>
          <option value="1">Under 1 mile</option>
          <option value="2">Under 2 miles</option>
          <option value="5">Under 5 miles</option>
        </select>
      </div>

      {/* Sort */}
      <div>
        <label className="form-label">Sort By</label>
        <select
          className="form-input"
          value={filters.sort}
          onChange={(e) => handleChange('sort', e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="distance">Closest to Campus</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {/* Transfer Student toggle */}
      <div className="border-t border-gray-100 pt-4">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={filters.transferFriendly || false}
              onChange={(e) => handleChange('transferFriendly', e.target.checked)}
            />
            <div
              className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                filters.transferFriendly ? 'bg-gold-bright' : 'bg-gray-200'
              }`}
            />
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                filters.transferFriendly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
          <span className="text-sm font-medium text-gray-700">
            🤝 Transfer-Friendly Only
          </span>
        </label>
      </div>
    </aside>
  );
}
