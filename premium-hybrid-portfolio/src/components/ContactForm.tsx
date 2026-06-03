import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageSquare, AlertCircle, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "../data";
import { motion, AnimatePresence } from "motion/react";

export default function ContactForm() {
  const { email, phone, location, socials, bio } = PORTFOLIO_DATA.profile;

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message details are required";
    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate sending network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Store in localStorage safely as secondary persistence check
      const messages = JSON.parse(localStorage.getItem("portfolio_messages") || "[]");
      const savedMsg = { ...formData, timestamp: new Date().toISOString() };
      localStorage.setItem("portfolio_messages", JSON.stringify([...messages, savedMsg]));

      // Clear Form layout
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success banner after 5s
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleInputChange = (field: string, val: string) => {
    setFormData({ ...formData, [field]: val });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <section id="contact" className="space-y-6">
      {/* SECTION HEADER */}
      <div>
        <h2 className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-2">
          <MessageSquare size={16} className="text-cyber-blue" />
          <span>Let's Build Together</span>
        </h2>
        <p className="font-sans text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
          Reach out for collaborations or questions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* TEXT DETAILS BOX */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/20 p-5 space-y-5">
          <p className="font-sans text-xs text-slate-400 leading-relaxed">
            {bio}
          </p>

          {/* Contact Methods list */}
          <div className="space-y-3 pt-2 text-xs">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-slate-400 hover:text-cyber-blue transition group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-slate-950 group-hover:border-cyber-blue/30 transition">
                <Mail size={13} className="text-cyber-blue" />
              </div>
              <span className="font-semibold break-all">{email}</span>
            </a>

            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 text-slate-400 hover:text-cyber-blue transition group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-slate-950 group-hover:border-cyber-blue/30 transition">
                <Phone size={13} className="text-cyber-blue" />
              </div>
              <span className="font-semibold">{phone}</span>
            </a>

            <div className="flex items-center gap-3 text-slate-400 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-slate-950">
                <MapPin size={13} className="text-cyber-blue" />
              </div>
              <span className="font-semibold">{location}</span>
            </div>
          </div>

          {/* Social connections links */}
          <div className="flex items-center gap-2.5 pt-2">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-500 transition shadow-inner"
              title="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-500 transition shadow-inner"
              title="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href={socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-500 transition shadow-inner"
              title="Twitter"
            >
              <Twitter size={14} />
            </a>
          </div>
        </div>

        {/* INPUT FORM CONTENT */}
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/45 p-5">
          {/* Inputs Row 1: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Van Thien"
                className={`w-full rounded-lg border bg-slate-950/80 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition focus:border-cyber-blue ${
                  errors.name ? "border-red-500/50" : "border-slate-800"
                }`}
              />
              {errors.name && (
                <p className="flex items-center gap-1 font-sans text-[10px] text-red-400 font-semibold leading-none pt-0.5">
                  <AlertCircle size={10} />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="example@mail.com"
                className={`w-full rounded-lg border bg-slate-950/80 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition focus:border-cyber-blue ${
                  errors.email ? "border-red-500/50" : "border-slate-800"
                }`}
              />
              {errors.email && (
                <p className="flex items-center gap-1 font-sans text-[10px] text-red-400 font-semibold leading-none pt-0.5">
                  <AlertCircle size={10} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Subject Field */}
          <div className="space-y-1.5">
            <label className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subject Title</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              placeholder="Collaboration opportunity..."
              className={`w-full rounded-lg border bg-slate-950/80 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition focus:border-cyber-blue ${
                errors.subject ? "border-red-500/50" : "border-slate-800"
              }`}
            />
            {errors.subject && (
              <p className="flex items-center gap-1 font-sans text-[10px] text-red-400 font-semibold leading-none pt-0.5">
                <AlertCircle size={10} />
                <span>{errors.subject}</span>
              </p>
            )}
          </div>

          {/* Message Area */}
          <div className="space-y-1.5">
            <label className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider">Message Details</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell me about your tech requirements..."
              className={`w-full rounded-lg border bg-slate-950/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition resize-none focus:border-cyber-blue ${
                errors.message ? "border-red-500/50" : "border-slate-800"
              }`}
            />
            {errors.message && (
              <p className="flex items-center gap-1 font-sans text-[10px] text-red-400 font-semibold leading-none pt-0.5">
                <AlertCircle size={10} />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* Main Action Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyber-blue/90 font-display font-extrabold uppercase py-3 text-xs tracking-wider text-slate-950 shadow-[0_0_15px_rgba(3,251,255,0.15)] hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition duration-200 active:scale-98 disabled:opacity-50 select-none cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-slate-950 animate-ping" />
                <span>Broadcasting...</span>
              </span>
            ) : (
              <>
                <Send size={11} strokeWidth={2.5} />
                <span>Send message</span>
              </>
            )}
          </button>

          {/* Submission Feedback alert banner */}
          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-start gap-2.5 rounded-lg border border-emerald-950/40 bg-emerald-950/15 p-3.5"
              >
                <Sparkles size={14} className="text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h5 className="font-sans font-bold text-emerald-400 text-xs leading-none">Message Dispatched!</h5>
                  <p className="font-sans text-[10px] text-slate-400 leading-normal mt-1">
                    Thank you Thien Tung! Your parameters were written to our datastore safely. I will read and review shortly!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* FOOTER METADATA COPTWRIGHTS */}
      <footer className="pt-6 border-t border-white/5 text-center sm:flex sm:justify-between items-center text-[10px] text-slate-500 font-mono gap-4 font-semibold pb-1.5 selection:bg-cyber-blue shadow-inner">
        <span>© {new Date().getFullYear()} Van Thien Tung. All rights reserved.</span>
        <span className="hover:text-cyber-blue transition cursor-help">Secure Cloud-Native Architecture</span>
      </footer>
    </section>
  );
}
