import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    { icon: Phone, text: "+370 645 39 734", label: "Call us", href: "tel:+37064539734" },
    { icon: Mail, text: "akmensburtininkas@pm.me", label: "Email us", href: "mailto:akmensburtininkas@pm.me" },
    { icon: MapPin, text: "Lithuania", label: "Location" },
    { icon: Clock, text: "Mon–Sat: 7:00 AM – 6:00 PM", label: "Hours" },
  ];

  return (
    <section id="contact" className="py-24 bg-charcoal-gradient">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4">Get In Touch</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-light/70 leading-relaxed mb-10">
              Contact us for a free consultation and estimate. We'll visit your site, discuss your vision, and provide a detailed plan.
            </p>
            <div className="space-y-6">
              {contactInfo.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/40 transition-all border border-secondary/40">
                      <IconComponent className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-light/50 text-xs uppercase tracking-wide">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-light font-medium hover:text-secondary transition-colors">
                          {item.text}
                        </a>
                      ) : (
                        <p className="text-light font-medium">{item.text}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="bg-secondary/10 backdrop-blur-sm rounded-xl p-8 border-2 border-secondary/40 hover:border-secondary/80 transition-all">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-primary/30 border-2 border-secondary/40 rounded-lg px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary transition-all" 
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-primary/30 border-2 border-secondary/40 rounded-lg px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary transition-all" 
                />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-primary/30 border-2 border-secondary/40 rounded-lg px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary transition-all" 
              />
              <select 
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="w-full bg-primary/30 border-2 border-secondary/40 rounded-lg px-4 py-3 text-light/70 focus:outline-none focus:border-secondary transition-all"
              >
                <option value="">Select Service</option>
                <option value="retaining-walls">Residential Concrete Works</option>
                <option value="fireplaces">Tiling</option>
                <option value="stone-veneer">Custom Stone or Tile Projects</option>
                <option value="patios">Patios & Walkways</option>
                <option value="foundation">Foundation Work</option>
                <option value="restoration">Restoration</option>
        
              </select>
              <textarea 
                placeholder="Tell us about your project..." 
                rows={4} 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-primary/30 border-2 border-secondary/40 rounded-lg px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary transition-all resize-none" 
              />
              <button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold py-6 text-base tracking-wide rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Request Free Estimate
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;