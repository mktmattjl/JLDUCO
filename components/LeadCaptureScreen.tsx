
import React, { useState } from 'react';

interface LeadCaptureScreenProps {
  onSubmit: (lead: { name: string, email: string }) => void;
}

const LeadCaptureScreen: React.FC<LeadCaptureScreenProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onSubmit({ name, email });
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white p-8 text-center">
        <h2 className="text-5xl font-bold text-[#166886] mb-4">Thank You!</h2>
        <p className="text-xl text-slate-600">A travel specialist will be in touch with you shortly to plan your dream journey.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 p-8">
      <div className="w-full max-w-lg text-center">
        <h2 className="text-4xl font-bold text-slate-800 mb-2">Let's Plan Your Perfect Trip</h2>
        <p className="text-lg text-slate-500 mb-8">Provide your details below, and one of our specialists will contact you.</p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-6 text-left">
            <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#166886] focus:border-transparent transition"
              placeholder="e.g., Jean-Luc Picard"
              required
            />
          </div>
          <div className="mb-8 text-left">
            <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-[#166886] focus:border-transparent transition"
              placeholder="e.g., captain@enterprise.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-4 bg-[#166886] text-white font-bold rounded-md hover:bg-[#12556d] transition-colors"
          >
            Submit Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadCaptureScreen;
