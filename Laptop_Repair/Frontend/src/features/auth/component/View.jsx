import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

/* ─── Brand catalog ─────────────────────────────────── */
const BRAND_DATA = {
  apple: {
    name: 'Apple MacBook',
    tagline: 'Premium repairs for premium machines',
    cover: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80',
    badge: 'Apple Authorised Parts',
    color: 'from-slate-900 to-slate-700',
    accent: 'indigo',
    services: [
      { id: 1, name: 'Screen Replacement', price: 2499, original: 3200, time: '45 mins', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', popular: true },
      { id: 2, name: 'Battery Replacement', price: 1899, original: 2500, time: '30 mins', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', popular: false },
      { id: 3, name: 'OS Installation / Formatting', price: 499, original: 800, time: '60 mins', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12', popular: false },
      { id: 4, name: 'Keyboard Repair', price: 1299, original: 1800, time: '40 mins', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', popular: false },
      { id: 5, name: 'RAM Upgrade', price: 1599, original: 2000, time: '20 mins', icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18', popular: true },
      { id: 6, name: 'Motherboard Diagnosis', price: 699, original: 1000, time: '90 mins', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4', popular: false },
    ]
  },
  dell: {
    name: 'Dell Laptop',
    tagline: 'Certified Dell service at your doorstep',
    cover: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&q=80',
    badge: 'Dell Certified Parts',
    color: 'from-blue-900 to-blue-700',
    accent: 'blue',
    services: [
      { id: 1, name: 'Screen Replacement', price: 2199, original: 2800, time: '45 mins', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', popular: true },
      { id: 2, name: 'Battery Replacement', price: 1499, original: 1900, time: '30 mins', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', popular: false },
      { id: 3, name: 'OS Installation / Formatting', price: 399, original: 700, time: '60 mins', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12', popular: false },
      { id: 4, name: 'Keyboard Repair', price: 1099, original: 1500, time: '40 mins', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', popular: true },
    ]
  },
  hp: {
    name: 'HP Laptop',
    tagline: 'Fast & reliable HP repairs',
    cover: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1200&q=80',
    badge: 'HP Genuine Parts',
    color: 'from-sky-900 to-sky-700',
    accent: 'sky',
    services: [
      { id: 1, name: 'Screen Replacement', price: 1999, original: 2600, time: '45 mins', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', popular: false },
      { id: 2, name: 'Battery Replacement', price: 1299, original: 1700, time: '30 mins', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', popular: true },
      { id: 3, name: 'OS Installation / Formatting', price: 399, original: 700, time: '60 mins', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12', popular: false },
      { id: 4, name: 'Hinge Repair', price: 1699, original: 2200, time: '60 mins', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', popular: true },
    ]
  },
  lenovo: {
    name: 'Lenovo Laptop',
    tagline: 'Expert Lenovo service specialists',
    cover: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200&q=80',
    badge: 'Lenovo Genuine Parts',
    color: 'from-rose-900 to-rose-700',
    accent: 'rose',
    services: [
      { id: 1, name: 'Screen Replacement', price: 2099, original: 2700, time: '45 mins', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', popular: true },
      { id: 2, name: 'Battery Replacement', price: 1399, original: 1800, time: '30 mins', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', popular: false },
      { id: 3, name: 'TrackPad Repair', price: 899, original: 1300, time: '35 mins', icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122', popular: true },
      { id: 4, name: 'OS Installation / Formatting', price: 399, original: 700, time: '60 mins', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12', popular: false },
    ]
  }
};

/* ─── Tiny helpers ───────────────────────────────────── */
const StarRating = ({ rating = 4.8 }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map(i => (
      <svg key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="text-sm font-bold text-slate-700 ml-1">{rating}</span>
  </div>
);

/* ─── Main View Component ────────────────────────────── */
export default function View() {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const brand = BRAND_DATA[brandId] || BRAND_DATA['apple'];

  const [selectedService, setSelectedService] = useState(null);
  const [bookingStep, setBookingStep] = useState(0); // 0=list, 1=confirm, 2=success
  const [activeTab, setActiveTab] = useState('services');

  const handleBook = (service) => {
    setSelectedService(service);
    setBookingStep(1);
  };
  const handleConfirm = () => setBookingStep(2);

  const reviews = [
    { name: 'Priya S.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80', rating: 5, text: 'Technician arrived on time & fixed my screen in 40 mins. Genuine part used!', date: '2 days ago' },
    { name: 'Rahul M.', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&q=80', rating: 5, text: 'Great service. Battery is working perfectly. Highly recommend FixIt Now.', date: '1 week ago' },
    { name: 'Anjali K.', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&q=80', rating: 4, text: 'Quick & professional. The 90-day warranty gives real peace of mind.', date: '2 weeks ago' },
  ];

  /* ── Booking success overlay ── */
  if (bookingStep === 2) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Booking Confirmed!</h2>
          <p className="text-slate-500 mb-1">Service: <span className="font-bold text-slate-800">{selectedService?.name}</span></p>
          <p className="text-slate-500 mb-6">A technician will reach you within <span className="font-bold text-indigo-600">60 minutes</span>.</p>
          <div className="bg-indigo-50 rounded-2xl p-4 mb-6 text-left">
            <p className="text-xs text-indigo-500 font-bold uppercase mb-1">Booking ID</p>
            <p className="text-lg font-black text-indigo-700 tracking-wider">#FIX-{Math.random().toString(36).slice(2,8).toUpperCase()}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  /* ── Confirm booking drawer overlay ── */
  if (bookingStep === 1 && selectedService) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-end sm:items-center justify-center">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10" onClick={() => setBookingStep(0)} />
        <div className="relative z-20 bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-8 max-w-md w-full mx-auto">
          <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6 sm:hidden" />
          <h2 className="text-xl font-black text-slate-900 mb-1">Confirm Booking</h2>
          <p className="text-slate-400 text-sm mb-6">Review your repair details below</p>

          <div className="bg-slate-50 rounded-2xl p-5 mb-6 space-y-3">
            <div className="flex justify-between"><span className="text-slate-500 text-sm">Brand</span><span className="font-bold text-slate-900 text-sm">{brand.name}</span></div>
            <div className="flex justify-between"><span className="text-slate-500 text-sm">Service</span><span className="font-bold text-slate-900 text-sm">{selectedService.name}</span></div>
            <div className="flex justify-between"><span className="text-slate-500 text-sm">Est. Time</span><span className="font-bold text-slate-900 text-sm">{selectedService.time}</span></div>
            <div className="flex justify-between"><span className="text-slate-500 text-sm">Warranty</span><span className="font-bold text-green-600 text-sm">90 days</span></div>
            <div className="border-t border-slate-200 pt-3 flex justify-between">
              <span className="font-bold text-slate-900">Total</span>
              <div className="text-right">
                <span className="text-xl font-black text-indigo-600">₹{selectedService.price.toLocaleString()}</span>
                <span className="text-xs text-slate-400 line-through ml-2">₹{selectedService.original.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button onClick={handleConfirm} className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-200 mb-3">
            Confirm & Schedule Technician
          </button>
          <button onClick={() => setBookingStep(0)} className="w-full text-slate-500 font-medium py-2 rounded-2xl hover:bg-slate-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  /* ── Main service listing ── */
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      
      {/* ── Hero Cover ── */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img src={brand.cover} alt={brand.name} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-t ${brand.color} opacity-80`} />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-4 sm:left-6 z-10 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 pl-3 pr-4 py-2 rounded-full font-semibold text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          Brands
        </button>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10">
          <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" ></path></svg>
            {brand.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">{brand.name}</h1>
          <p className="text-white/70 mt-1 text-sm sm:text-base">{brand.tagline}</p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {['90-Day Warranty', 'Doorstep Service', 'Genuine Parts'].map(t => (
              <span key={t} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-6">

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { val: '4.9★', label: 'Avg Rating', color: 'bg-amber-50 text-amber-700' },
            { val: '2K+', label: 'Repairs Done', color: 'bg-green-50 text-green-700' },
            { val: '60 min', label: 'Avg Time', color: 'bg-indigo-50 text-indigo-700' },
          ].map(s => (
            <div key={s.label} className={`${s.color} rounded-2xl p-4 text-center`}>
              <p className="text-xl font-black">{s.val}</p>
              <p className="text-xs font-semibold opacity-70 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Tab Navigation ── */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl mb-6">
          {['services', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {tab === 'services' ? '🔧 Services' : '⭐ Reviews'}
            </button>
          ))}
        </div>

        {/* ── Services Tab ── */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900">Available Services</h2>
            {brand.services.map(service => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-indigo-200 hover:shadow-md transition-all group relative overflow-hidden"
              >
                {service.popular && (
                  <span className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-2xl rounded-tr-2xl tracking-wider">
                    POPULAR
                  </span>
                )}

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-indigo-50 group-hover:bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d={service.icon} />
                    </svg>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-slate-900 text-base">{service.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {service.time}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        90-day warranty
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price + Book */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                  <div>
                    <span className="text-2xl font-black text-slate-900">₹{service.price.toLocaleString()}</span>
                    <span className="text-sm text-slate-400 line-through ml-2">₹{service.original.toLocaleString()}</span>
                    <span className="ml-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      {Math.round((1 - service.price / service.original) * 100)}% off
                    </span>
                  </div>
                  <button
                    onClick={() => handleBook(service)}
                    className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-indigo-200"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Reviews Tab ── */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 flex items-center gap-6">
              <div className="text-center">
                <p className="text-5xl font-black text-slate-900">4.9</p>
                <StarRating rating={4.9} />
                <p className="text-xs text-slate-400 mt-1">214 reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-3">{star}</span>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: star === 5 ? '82%' : star === 4 ? '13%' : star === 3 ? '4%' : '1%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                    <StarRating rating={r.rating} />
                  </div>
                  <span className="text-xs text-slate-400">{r.date}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">"{r.text}"</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="mt-8 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-6 text-white text-center">
          <p className="font-black text-lg mb-1">Not sure what's wrong?</p>
          <p className="text-indigo-200 text-sm mb-4">Let our expert diagnose your laptop for free!</p>
          <button className="bg-white text-indigo-700 font-bold px-8 py-3 rounded-2xl hover:bg-indigo-50 transition-colors">
            Free Diagnosis
          </button>
        </div>
      </div>
    </div>
  );
}