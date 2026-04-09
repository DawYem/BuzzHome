import { useState, useEffect, useCallback } from 'react';
import ListingCard from '../components/ListingCard';
import FilterBar from '../components/FilterBar';
import { getListings } from '../api/listings';

const DEFAULT_FILTERS = {
  maxPrice: '',
  bedrooms: '',
  furnished: '',
  maxDistance: '',
  sort: '',
  search: '',
  transferFriendly: false,
};

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

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      let data = await getListings(filters);
      if (filters.transferFriendly) {
        data = data.filter((l) => l.idealForTransferStudents);
      }
      setListings(data);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  function clearFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  const hasActiveFilters =
    filters.maxPrice ||
    filters.bedrooms !== '' ||
    filters.furnished !== '' ||
    filters.maxDistance ||
    filters.transferFriendly ||
    filters.search;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page header */}
      <div className="bg-navy text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2">Student Subleases Near GT</h1>
          <p className="text-white/60">Affordable, short-term housing for incoming transfer students.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + mobile filter toggle */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by title, neighborhood, or keyword..."
              className="form-input pl-10"
              value={filters.search}
              onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            />
          </div>
          <button
            className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 text-navy font-medium px-4 py-2.5 rounded-xl text-sm hover:border-navy/50 transition-colors shadow-sm"
            onClick={() => setMobileFiltersOpen((o) => !o)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="bg-gold-bright text-navy text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                !
              </span>
            )}
          </button>
        </div>

        {/* Mobile filter panel */}
        {mobileFiltersOpen && (
          <div className="lg:hidden mb-6">
            <FilterBar filters={filters} onChange={setFilters} onClear={clearFilters} />
          </div>
        )}

        <div className="flex gap-6 items-start">
          {/* Sidebar (desktop) */}
          <div className="hidden lg:block w-72 shrink-0 sticky top-24">
            <FilterBar filters={filters} onChange={setFilters} onClear={clearFilters} />
          </div>

          {/* Listings grid */}
          <div className="flex-1 min-w-0">
            {/* Results count + sort summary */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                {loading ? 'Loading...' : (
                  <span>
                    <span className="font-semibold text-navy">{listings.length}</span> listing
                    {listings.length !== 1 ? 's' : ''} found
                    {hasActiveFilters && ' · filtered'}
                  </span>
                )}
              </p>
              {hasActiveFilters && !loading && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-gold-bright hover:text-gold-dark underline font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-card">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="font-display font-bold text-navy text-xl mb-2">No listings found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find more options.</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {listings.map((l) => (
                  <ListingCard key={l.id} listing={l} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
