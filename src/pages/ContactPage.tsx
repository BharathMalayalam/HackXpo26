import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  Globe, 
  Building, 
  Navigation, 
  Clock, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { quickEventHighlights } from '../data/stats';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    category: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>Official Communications</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Connect with HackXpo ’26 Desk
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Get in touch with the Department of Information Technology, Government College of Engineering, Erode for project incubation, industry sponsorship, or alumni queries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left 5 Cols: Contact Details & Campus Directions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Department Office Card */}
            <div className="p-6 sm:p-8 rounded-none bg-slate-900/60 border border-slate-800 space-y-6">
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-cyan-400" />
                <span>Department IT Secretariat</span>
              </h2>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Government College of Engineering, Erode</strong>
                    <span className="text-slate-400 text-xs">
                      (Formerly Institute of Road & Transport Technology - IRTT)<br />
                      NH-544 (Salem - Coimbatore Highway),<br />
                      Vasavi College Post, Chithode,<br />
                      Erode – 638 052, Tamil Nadu, India.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                  <Mail className="w-5 h-5 text-purple-400 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Official Inquiries:</span>
                    <a href="mailto:itdept@gceerode.ac.in" className="text-cyan-400 hover:underline">
                      itdept@gceerode.ac.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Department Telephone:</span>
                    <span className="text-slate-200">+91 (0424) 2533279, 2533379</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                  <Globe className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Institutional Portal:</span>
                    <a href="http://www.gceerode.ac.in" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                      www.gceerode.ac.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel & Route Guide */}
            <div className="p-6 rounded-none bg-slate-900/40 border border-slate-800 space-y-3">
              <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
                <Navigation className="w-4 h-4 text-purple-400" />
                <span>Transit & Campus Access</span>
              </h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li>• <strong>Railway:</strong> Erode Junction (ED) is 14 km away; frequent buses to Chithode.</li>
                <li>• <strong>Highway:</strong> Directly situated on NH-544 with dedicated entrance archway.</li>
                <li>• <strong>Airports:</strong> Coimbatore (CJB) ~ 85 km, Tiruchirappalli (TRZ) ~ 150 km.</li>
              </ul>
            </div>

          </div>

          {/* Right 7 Cols: Interactive Contact & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-none bg-[#090D18] border border-slate-800 shadow-xl space-y-6">
              
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Quick Inquiry</span>
                <h2 className="text-2xl font-heading font-bold text-white mt-1">Send a Message to the Committee</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Have a question regarding HackXpo ’26 student solutions, hiring talent, or faculty research?
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-none bg-emerald-950/40 border border-emerald-500/50 text-center space-y-3">
                  <div className="w-12 h-12 rounded-none bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white">Message Transmitted Successfully</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for contacting the Department of IT, GCE Erode. The organizing desk will respond to <strong>{formData.email}</strong> within 1 business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', affiliation: '', category: 'General Inquiry', message: '' });
                    }}
                    className="mt-4 px-4 py-2 rounded-none bg-slate-900 border border-slate-700 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Anand Sundaram"
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-none text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. anand@company.org"
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-none text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">Organization / Institution</label>
                      <input
                        type="text"
                        value={formData.affiliation}
                        onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                        placeholder="e.g. TechCorp / Alumnus / Student"
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-none text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">Inquiry Domain</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-none text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        <option value="General Inquiry">General Event Information</option>
                        <option value="Student Project Incubation">Student Project Incubation / IP</option>
                        <option value="Industry Mentorship">Industry Mentorship & Hiring</option>
                        <option value="Alumni Connect">Alumni Relations</option>
                        <option value="Sponsorship">Sponsorship & Grants</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Message / Note *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details about your query, desired project collaboration, or feedback on HackXpo ’26..."
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-none text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-none font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Committee</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
