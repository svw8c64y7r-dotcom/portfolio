import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ShieldCheck, 
  MessageSquare,
  Lock,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { personalData } from '../data/personal';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Subject line is required.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Message body is required.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${personalData.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      window.location.href = mailtoUrl;
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-[#110720] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>SECURE COMMUNICATION CHANNELS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
            Available for Cybersecurity Engineer, VAPT Specialist, SOC Analyst, and DFIR opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Coordinates & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-xl backdrop-blur-sm">
              <h3 className="font-display font-bold text-xl text-white mb-1 flex items-center gap-2">
                <span>Sri Ragav Surya A</span>
              </h3>
              <p className="text-xs font-mono text-purple-400 mb-6">
                Cybersecurity Professional & Security Researcher
              </p>

              <div className="space-y-3.5">
                {/* Email Item */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-purple-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Primary Email</span>
                      <a href={`mailto:${personalData.email}`} className="text-xs sm:text-sm font-mono text-slate-200 hover:text-purple-300 truncate block">
                        {personalData.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(personalData.email, 'email')}
                    className="p-1.5 text-slate-400 hover:text-purple-300 transition-colors"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-cyber-green" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyber-blue shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Phone Number</span>
                      <a href={`tel:${personalData.phone.replace(/\s+/g, '')}`} className="text-xs sm:text-sm font-mono text-slate-200 hover:text-cyber-blue">
                        {personalData.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(personalData.phone, 'phone')}
                    className="p-1.5 text-slate-400 hover:text-cyber-blue transition-colors"
                    title="Copy Phone"
                  >
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-cyber-blue" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyber-green shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Location Base</span>
                    <span className="text-xs sm:text-sm font-mono text-slate-200">
                      {personalData.location}
                    </span>
                  </div>
                </div>

                {/* Security PGP Fingerprint Card */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400 shrink-0">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">PGP Key ID</span>
                      <span className="text-xs font-mono text-slate-300 font-bold">
                        0x8870726999SURYA
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('0x8870726999SURYA', 'pgp')}
                    className="p-1.5 text-slate-400 hover:text-amber-400 transition-colors"
                    title="Copy PGP Key ID"
                  >
                    {copiedField === 'pgp' ? <Check className="w-4 h-4 text-cyber-green" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                  Professional Profiles:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5 hover:border-purple-400 transition-colors group"
                  >
                    <Linkedin className="w-4 h-4 text-cyber-blue group-hover:scale-110 transition-transform" />
                    <div className="truncate">
                      <span className="text-xs font-mono text-slate-200 font-bold block">LinkedIn</span>
                      <span className="text-[10px] text-slate-500 truncate block">Connect</span>
                    </div>
                  </a>

                  <a
                    href={personalData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2.5 hover:border-purple-400 transition-colors group"
                  >
                    <Github className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div className="truncate">
                      <span className="text-xs font-mono text-slate-200 font-bold block">GitHub</span>
                      <span className="text-[10px] text-slate-500 truncate block">Repositories</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2 text-[11px] font-mono text-slate-400">
                <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span>Strict privacy guidelines enforced. Residential addresses and sensitive personal dates are omitted per industry standard.</span>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-xl backdrop-blur-sm">
              <h3 className="font-display font-bold text-xl text-white mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <span>Transmit Secure Message</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono mb-6">
                Fill out the form below. Messages are validated and dispatched directly to the primary email channel.
              </p>

              {submitSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-emerald-200">
                    <span className="font-bold">Message Dispatched!</span> Your email client should open automatically with your formatted message. If not, feel free to email directly to <a href={`mailto:${personalData.email}`} className="underline font-mono">{personalData.email}</a>.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Full Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-black/40 border text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-white/10 focus:border-purple-400'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-400 font-mono mt-1 block flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Your Professional Email <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-black/40 border text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-white/10 focus:border-purple-400'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-400 font-mono mt-1 block flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Subject / Discussion Topic <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Cybersecurity Engineering Opportunity / VAPT Assessment"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-black/40 border text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.subject ? 'border-red-500' : 'border-white/10 focus:border-purple-400'
                    }`}
                  />
                  {errors.subject && (
                    <span className="text-[11px] text-red-400 font-mono mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Message Body <span className="text-purple-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please outline the details of your inquiry, role requirements, or collaboration scope..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-black/40 border text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-red-500' : 'border-white/10 focus:border-purple-400'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] text-red-400 font-mono mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs sm:text-sm font-mono font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 active:scale-95 transition-all shadow-neon-purple disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Securing & Dispatching...' : 'Transmit Message'}</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
