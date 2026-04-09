import { useState } from 'react';
import { Link } from 'react-router-dom';
import { postListing } from '../api/listings';

const AMENITY_OPTIONS = [
  'WiFi Included', 'Utilities Included', 'Air Conditioning', 'Heating', 'Dishwasher',
  'In-Unit Laundry', 'Laundry in Building', 'Gym Access', 'Pool', 'Parking Included',
  'Rooftop Access', 'Package Lockers', 'Bike Storage', 'Backyard', 'Balcony',
];

const initialForm = {
  title: '',
  price: '',
  neighborhood: '',
  address: '',
  distanceToCampus: '',
  bedrooms: '',
  bathrooms: '',
  availableFrom: '',
  availableTo: '',
  leaseTerm: '',
  furnished: '',
  parking: false,
  petsAllowed: false,
  washerDryer: false,
  amenities: [],
  description: '',
  postedBy: '',
  contact: '',
};

export default function PostListingPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors((e) => ({ ...e, [name]: '' }));
  }

  function toggleAmenity(amenity) {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(amenity)
        ? f.amenities.filter((a) => a !== amenity)
        : [...f.amenities, amenity],
    }));
  }

  function validate() {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Listing title is required';
    if (!form.price || isNaN(form.price) || +form.price <= 0) errs.price = 'Enter a valid monthly rent';
    if (!form.neighborhood.trim()) errs.neighborhood = 'Neighborhood is required';
    if (!form.bedrooms) errs.bedrooms = 'Select bedroom count';
    if (!form.bathrooms) errs.bathrooms = 'Select bathroom count';
    if (!form.availableFrom) errs.availableFrom = 'Start date is required';
    if (!form.availableTo) errs.availableTo = 'End date is required';
    if (!form.description.trim() || form.description.length < 30) errs.description = 'Please write at least 30 characters';
    if (!form.postedBy.trim()) errs.postedBy = 'Your name is required';
    if (!form.contact.trim()) errs.contact = 'Contact info is required';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      await postListing({ ...form, price: parseInt(form.price), bedrooms: parseInt(form.bedrooms), bathrooms: parseFloat(form.bathrooms), distanceToCampus: parseFloat(form.distanceToCampus) || 0, furnished: form.furnished === 'true', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80', idealForTransferStudents: false });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-card p-10">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="font-display font-bold text-navy text-2xl mb-3">Listing Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your sublease listing has been submitted for review. It will appear on BuzzHome once approved (within 24–48 hours in a real system).
          </p>
          <div className="bg-gold-bright/10 border border-gold/30 rounded-xl p-4 mb-6 text-sm text-gray-600">
            <strong className="text-navy">What happens next:</strong> Our team reviews listings for accuracy and student safety before publishing. You'll receive an email confirmation at the contact you provided.
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/listings" className="btn-primary">Browse Listings</Link>
            <button onClick={() => { setSubmitted(false); setForm(initialForm); }} className="btn-secondary text-sm">
              Post Another Listing
            </button>
          </div>
        </div>
      </div>
    );
  }

  const Field = ({ label, name, error, required, children }) => (
    <div>
      <label className="form-label" htmlFor={name}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Page header */}
      <div className="bg-navy text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2">Post a Sublease</h1>
          <p className="text-white/60">Help a fellow GT student find affordable housing near campus.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form className="lg:col-span-2 space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Basic Info */}
            <div className="bg-white rounded-2xl shadow-card p-6 space-y-5">
              <h2 className="font-display font-bold text-navy text-xl">Basic Information</h2>

              <Field label="Listing Title" name="title" error={errors.title} required>
                <input id="title" name="title" type="text" className="form-input" placeholder='e.g. "Cozy Furnished Studio – Walk to GT"' value={form.title} onChange={handleChange} />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Monthly Rent ($)" name="price" error={errors.price} required>
                  <input id="price" name="price" type="number" min="0" className="form-input" placeholder="e.g. 900" value={form.price} onChange={handleChange} />
                </Field>
                <Field label="Lease Term" name="leaseTerm" error={errors.leaseTerm}>
                  <select id="leaseTerm" name="leaseTerm" className="form-input" value={form.leaseTerm} onChange={handleChange}>
                    <option value="">Select lease length</option>
                    <option value="1 month">1 month</option>
                    <option value="2 months">2 months</option>
                    <option value="3 months">3 months</option>
                    <option value="4 months">4 months</option>
                    <option value="5 months">5 months</option>
                    <option value="6 months">6 months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </Field>
              </div>

              <Field label="Neighborhood / Area" name="neighborhood" error={errors.neighborhood} required>
                <select id="neighborhood" name="neighborhood" className="form-input" value={form.neighborhood} onChange={handleChange}>
                  <option value="">Select neighborhood</option>
                  <option>Home Park</option>
                  <option>Midtown</option>
                  <option>Atlantic Station</option>
                  <option>West Midtown</option>
                  <option>Old Fourth Ward</option>
                  <option>Poncey-Highland</option>
                  <option>Virginia-Highland</option>
                  <option>Inman Park</option>
                  <option>Grant Park</option>
                  <option>Other</option>
                </select>
              </Field>

              <Field label="Street Address / Approximate Area" name="address" error={errors.address}>
                <input id="address" name="address" type="text" className="form-input" placeholder="e.g. Home Park, Atlanta, GA 30318" value={form.address} onChange={handleChange} />
              </Field>

              <Field label="Distance to GT Campus (miles)" name="distanceToCampus" error={errors.distanceToCampus}>
                <input id="distanceToCampus" name="distanceToCampus" type="number" min="0" step="0.1" className="form-input" placeholder="e.g. 0.5" value={form.distanceToCampus} onChange={handleChange} />
              </Field>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl shadow-card p-6 space-y-5">
              <h2 className="font-display font-bold text-navy text-xl">Property Details</h2>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Bedrooms" name="bedrooms" error={errors.bedrooms} required>
                  <select id="bedrooms" name="bedrooms" className="form-input" value={form.bedrooms} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="0">Studio</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                  </select>
                </Field>
                <Field label="Bathrooms" name="bathrooms" error={errors.bathrooms} required>
                  <select id="bathrooms" name="bathrooms" className="form-input" value={form.bathrooms} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="1">1 Bath</option>
                    <option value="1.5">1.5 Bath</option>
                    <option value="2">2 Bath</option>
                    <option value="3">3+ Bath</option>
                  </select>
                </Field>
              </div>

              <Field label="Furnished?" name="furnished" error={errors.furnished}>
                <div className="grid grid-cols-3 gap-2">
                  {[{ value: 'true', label: '🛋️ Furnished' }, { value: 'false', label: '📦 Unfurnished' }, { value: '', label: 'Not sure' }].map((opt) => (
                    <button type="button" key={opt.value} onClick={() => setForm((f) => ({ ...f, furnished: opt.value }))}
                      className={`py-2.5 px-2 rounded-xl text-sm font-medium border-2 transition-all ${form.furnished === opt.value ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-gray-200 hover:border-navy/50'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Checkboxes */}
              <div>
                <p className="form-label">Additional features</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'parking', label: '🚗 Parking', key: 'parking' },
                    { name: 'petsAllowed', label: '🐾 Pets OK', key: 'petsAllowed' },
                    { name: 'washerDryer', label: '👕 Washer/Dryer', key: 'washerDryer' },
                  ].map((feat) => (
                    <label key={feat.name} className="flex items-center gap-2 cursor-pointer p-3 border-2 rounded-xl hover:border-navy/30 transition-colors">
                      <input type="checkbox" name={feat.name} checked={form[feat.key]} onChange={handleChange} className="w-4 h-4 accent-navy" />
                      <span className="text-sm text-gray-700">{feat.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="bg-white rounded-2xl shadow-card p-6 space-y-5">
              <h2 className="font-display font-bold text-navy text-xl">Availability</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Available From" name="availableFrom" error={errors.availableFrom} required>
                  <input id="availableFrom" name="availableFrom" type="date" className="form-input" value={form.availableFrom} onChange={handleChange} />
                </Field>
                <Field label="Available To" name="availableTo" error={errors.availableTo} required>
                  <input id="availableTo" name="availableTo" type="date" className="form-input" value={form.availableTo} onChange={handleChange} />
                </Field>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="font-display font-bold text-navy text-xl mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {AMENITY_OPTIONS.map((a) => (
                  <button type="button" key={a} onClick={() => toggleAmenity(a)}
                    className={`chip border-2 transition-all ${form.amenities.includes(a) ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-gray-200 hover:border-navy/40'}`}>
                    {form.amenities.includes(a) ? '✓ ' : ''}{a}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="font-display font-bold text-navy text-xl mb-4">Description</h2>
              <Field label="Tell potential tenants about the space" name="description" error={errors.description} required>
                <textarea id="description" name="description" rows={5} className="form-input resize-none" placeholder="Describe the apartment, neighborhood vibe, what makes it a great option for a GT student, what's included, etc. The more detail the better!" value={form.description} onChange={handleChange} />
              </Field>
              <p className="text-xs text-gray-400 mt-1">{form.description.length} characters · minimum 30 required</p>
            </div>

            {/* Photo Upload (mock) */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="font-display font-bold text-navy text-xl mb-2">Photos</h2>
              <p className="text-sm text-gray-500 mb-4">Upload photos of your space. Clear, well-lit photos get 3x more responses.</p>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-navy/40 transition-colors cursor-pointer">
                <div className="text-4xl mb-2">📸</div>
                <p className="text-sm text-gray-500 font-medium">Click to upload photos</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB · Photo upload is simulated in this demo</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
              <h2 className="font-display font-bold text-navy text-xl">Your Information</h2>
              <Field label="Your Name" name="postedBy" error={errors.postedBy} required>
                <input id="postedBy" name="postedBy" type="text" className="form-input" placeholder="e.g. Alex M." value={form.postedBy} onChange={handleChange} />
              </Field>
              <Field label="Contact Email or Phone" name="contact" error={errors.contact} required>
                <input id="contact" name="contact" type="text" className="form-input" placeholder="yourname@gatech.edu or (404) 555-0000" value={form.contact} onChange={handleChange} />
              </Field>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full btn-primary text-base py-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg> Submitting...</>
              ) : 'Submit Listing for Review 🏠'}
            </button>
          </form>

          {/* Sidebar tips */}
          <div className="space-y-5">
            <div className="bg-navy rounded-2xl p-5 text-white sticky top-24">
              <h3 className="font-display font-bold text-lg mb-4">Tips for a great listing</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { icon: '📸', tip: 'Add clear photos — listings with photos get 3x more inquiries' },
                  { icon: '💰', tip: 'Be transparent about what\'s included in rent (utilities, WiFi, etc.)' },
                  { icon: '🗓️', tip: 'Be specific about lease dates to attract the right tenants' },
                  { icon: '🤝', tip: 'Mention roommate info if applicable — it builds trust' },
                  { icon: '📍', tip: 'Include distance to campus and commute estimate' },
                  { icon: '✅', tip: 'Respond quickly to interested students — subleases go fast' },
                ].map((item) => (
                  <li key={item.tip} className="flex items-start gap-2">
                    <span className="shrink-0">{item.icon}</span>
                    <span className="text-white/70">{item.tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gold-bright/10 border border-gold/30 rounded-2xl p-5">
              <h4 className="font-semibold text-navy mb-2">📋 Mockup Notice</h4>
              <p className="text-sm text-gray-600">
                This form is a demo — no real listing is saved to a database. Submissions simulate the flow of a real sublease platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
