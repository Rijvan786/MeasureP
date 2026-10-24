import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function   TechnicianDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center font-sans p-4 md:p-8">
      <div className="w-full max-w-2xl space-y-6">
        
        {/* Header Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, Rizwan!</h1>
            <p className="text-sm text-gray-500 mt-1">Technician Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
              <button 
                onClick={() => setIsOnline(!isOnline)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out flex items-center ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isOnline ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
            <button
                onClick={() => navigate('/TechnicianNotification')}
                className="relative p-2 bg-gray-50 border border-gray-200 rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">3</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-50">
            <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">Today's Jobs</p>
            <p className="text-3xl font-black text-gray-900">4</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-green-50">
            <p className="text-xs font-bold text-green-500 uppercase tracking-wider mb-1">Earnings</p>
            <p className="text-3xl font-black text-gray-900">₹1,200</p>
          </div>
        </div>

        {/* Current Assignment */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg font-bold text-gray-800">Current Assignment</h2>
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-indigo-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Rahul Sharma</h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  A-12, Arera Colony, Bhopal 
                  <span className="ml-2 bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-xs font-medium">2.5 km away</span>
                </p>
              </div>
              <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                High Priority
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
              <p className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Dell Inspiron 15
              </p>
              <p className="text-sm text-gray-600 flex items-start gap-2">
                <svg className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
                Issue: Screen flickering and battery draining fast
              </p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Accept & Start
              </button>
              <button className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                </svg>
                Map Location
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Queue */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">Upcoming Queue</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
            
            {/* Item 1 */}
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                  AK
                </div>
                <div>
                  <p className="font-bold text-gray-900">Amit Kumar</p>
                  <p className="text-xs text-gray-500 mt-0.5">HP Pavilion • Keyboard not working</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>

            {/* Item 2 */}
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-bold text-sm">
                  PS
                </div>
                <div>
                  <p className="font-bold text-gray-900">Priya Singh</p>
                  <p className="text-xs text-gray-500 mt-0.5">MacBook Air • OS Installation</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}