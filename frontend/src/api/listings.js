import axios from 'axios';
import mockListings from '../data/mockListings';

const BASE_URL = '/api';

function buildParams(filters = {}) {
  const params = new URLSearchParams();
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
  if (filters.bedrooms !== undefined && filters.bedrooms !== '') params.set('bedrooms', filters.bedrooms);
  if (filters.furnished !== undefined && filters.furnished !== '') params.set('furnished', filters.furnished);
  if (filters.maxDistance) params.set('maxDistance', filters.maxDistance);
  if (filters.search) params.set('search', filters.search);
  if (filters.sort) params.set('sort', filters.sort);
  return params.toString();
}

export async function getListings(filters = {}) {
  try {
    const query = buildParams(filters);
    const res = await axios.get(`${BASE_URL}/listings${query ? '?' + query : ''}`);
    if (!Array.isArray(res.data)) {
      return applyFilters(mockListings, filters);
    }
    return res.data;
  } catch {
    // Fall back to local mock data when backend is not running
    return applyFilters(mockListings, filters);
  }
}

export async function getListingById(id) {
  try {
    const res = await axios.get(`${BASE_URL}/listings/${id}`);
    return res.data;
  } catch {
    return mockListings.find((l) => l.id === parseInt(id)) || null;
  }
}

export async function postListing(data) {
  try {
    const res = await axios.post(`${BASE_URL}/listings`, data);
    return res.data;
  } catch {
    return { success: true, message: 'Listing submitted for review (mock mode).' };
  }
}

// Client-side filtering fallback
function applyFilters(listings, filters) {
  let result = [...listings];
  const { maxPrice, bedrooms, furnished, maxDistance, search, sort } = filters;

  if (maxPrice) result = result.filter((l) => l.price <= parseInt(maxPrice));
  if (bedrooms !== undefined && bedrooms !== '') {
    const beds = parseInt(bedrooms);
    result = beds === 0 ? result.filter((l) => l.bedrooms === 0) : result.filter((l) => l.bedrooms >= beds);
  }
  if (furnished !== undefined && furnished !== '') {
    result = result.filter((l) => l.furnished === (furnished === 'true'));
  }
  if (maxDistance) result = result.filter((l) => l.distanceToCampus <= parseFloat(maxDistance));
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.neighborhood.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
    );
  }
  if (sort === 'price_asc') result.sort((a, b) => a.price - b.price);
  else if (sort === 'price_desc') result.sort((a, b) => b.price - a.price);
  else if (sort === 'distance') result.sort((a, b) => a.distanceToCampus - b.distanceToCampus);
  else if (sort === 'newest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return result;
}
