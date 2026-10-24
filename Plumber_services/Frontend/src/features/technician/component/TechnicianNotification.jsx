
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TechnicianNotification() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All'); // 'All', 'Unread', 'Urgent'
  const [expandedId, setExpandedId] = useState(null);

  const notificationsData = [
    {
      id: 1,
      title: 'Customer Request for Repairing',
      time: '10 mins ago',
      urgent: true,
      unread: false,
      customerName: 'Aman Verma',
      laptopModel: 'Dell XPS 13',
      issue: 'Overheating & unexpected shutdown',
      address: 'Plot 45, MP Nagar Zone-II, Bhopal',
      distance: '1.8 km away',
      phone: '+91 98260 •••••'
    },
    {
      id: 2,
      title: 'Customer Request for Repairing',
      time: '45 mins ago',
      urgent: true,
      unread: true,
      customerName: 'Rohit Malviya',
      laptopModel: 'HP Pavilion 14',
      issue: 'Keyboard keys not responding & power jack loose',
      address: 'House 12, Indrapuri Sector C, Bhopal',
      distance: '3.4 km away',
      phone: '+91 94065 •••••'
    },
    {
      id: 3,
      title: 'Customer Request for Repairing',
      time: '2 hours ago',
      urgent: false,
      unread: false,
      customerName: 'Sneha Patel',
      laptopModel: 'Lenovo IdeaPad Slim 3',
      issue: 'Windows OS crash / boot loop',
      address: 'Flat 302, Arera Colony, Bhopal',
      distance: '2.1 km away',
      phone: '+91 97550 •••••'
    },
    {
      id: 4,
      title: 'Customer Request for Repairing',
      time: '5 hours ago',
      urgent: false,
      unread: false,
      customerName: 'Kunal Joshi',
      laptopModel: 'Apple MacBook Air M1',
      issue: 'Screen flickering & faint lines',
      address: 'Shop 7, New Market, Bhopal',
      distance: '5.2 km away',
      phone: '+91 91112 •••••'
    }
  ];

  // Filter list based on selected pill tab
  const filteredList = notificationsData.filter((item) => {
    if (activeTab === 'Unread') return item.unread;
    if (activeTab === 'Urgent') return item.urgent;
    return true;
  });

  const unreadCount = notificationsData.filter((n) => n.unread).length;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      
      {/* Top App Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/technician-Dashboard')}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Back to Dashboard"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Notifications
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Bell Icon with Red Unread Dot Badge */}
            <button className="relative p-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Profile Avatar Button */}
            <button 
              onClick={() => navigate('/technician-profile')}
              className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm border border-indigo-200 hover:ring-2 hover:ring-indigo-400 transition-all"
            >
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Pill Filter Tabs */}
        <div className="flex items-center gap-2.5 mb-6">
          <button
            onClick={() => setActiveTab('All')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
              activeTab === 'All'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All
          </button>

          <button
            onClick={() => setActiveTab('Unread')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              activeTab === 'Unread'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>Unread</span>
            <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-black ${
              activeTab === 'Unread' ? 'bg-slate-800 text-indigo-300' : 'bg-slate-100 text-slate-600'
            }`}>
              ({unreadCount})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('Urgent')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm ${
              activeTab === 'Urgent'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Urgent
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3.5">
          {filteredList.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Blue Indicator Dot for Unread Notifications */}
                {item.unread && (
                  <span className="absolute left-2.5 top-6 sm:top-7 w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.7)]" />
                )}

                {/* Header / Clickable Accordion Bar */}
                <div
                  onClick={() => toggleExpand(item.id)}
                  className={`p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none transition-colors ${
                    item.unread ? 'pl-7 sm:pl-8' : ''
                  } hover:bg-slate-50/70`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Wrench Icon Box */}
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>

                    <div>
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                        {item.title}
                      </h2>
                      <div className="flex items-center gap-2.5 mt-1">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {item.time}
                        </span>

                        {item.urgent && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-100">
                            URGENT
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Chevron */}
                  <div className="text-slate-400 pl-3">
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-indigo-600' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Collapsible Details Body */}
                {isExpanded && (
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-slate-100 bg-slate-50/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-3.5">
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Customer</p>
                        <p className="text-sm font-bold text-slate-900 mt-0.5">{item.customerName}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.phone}</p>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Laptop Model</p>
                        <p className="text-sm font-bold text-slate-900 mt-0.5">{item.laptopModel}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.distance}</p>
                      </div>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 mb-4 space-y-2">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Reported Issue</p>
                        <p className="text-xs sm:text-sm font-medium text-slate-700 mt-0.5">{item.issue}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-start gap-1.5 text-xs text-slate-500">
                        <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{item.address}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/technician/dashboard');
                        }}
                        className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-[0_4px_14px_rgba(79,70,229,0.35)] transition-all flex items-center justify-center gap-1.5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M5 13l4 4L19 7" />
                        </svg>
                        Accept & Start
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(null);
                        }}
                        className="py-3 px-5 rounded-xl border border-slate-300 hover:bg-white active:scale-[0.98] text-slate-700 font-bold text-xs sm:text-sm transition-all"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Empty State */}
          {filteredList.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-sm font-bold text-slate-700">No requests in this category</p>
              <p className="text-xs text-slate-400 mt-1">Check back soon for new customer repair requests.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}