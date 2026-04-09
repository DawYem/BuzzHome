import { useState } from 'react';

export default function ContactForm({ listingTitle = '', listerId = '' }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  }

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-display font-bold text-emerald-700 text-lg mb-1">Message Sent!</h3>
        <p className="text-emerald-600 text-sm">
          Your message has been sent to the lister. They'll reach out to you at <strong>{form.email}</strong> soon.
        </p>
        <button
          className="mt-4 text-sm text-emerald-700 underline hover:no-underline"
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {listingTitle && (
        <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
          Re: <span className="font-medium text-navy">{listingTitle}</span>
        </p>
      )}

      <div>
        <label className="form-label" htmlFor="name">Your Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="e.g. Jordan Smith"
          className="form-input"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="form-label" htmlFor="email">Your Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="form-input"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="form-label" htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Hi! I'm interested in this listing. Is it still available? I'm a transfer student arriving in August..."
          className="form-input resize-none"
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold-bright text-navy font-semibold py-3 rounded-xl hover:bg-gold transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Sending...
          </>
        ) : (
          'Send Message to Lister'
        )}
      </button>

      <p className="text-xs text-center text-gray-400">
        This is a demo — no real message will be sent.
      </p>
    </form>
  );
}
