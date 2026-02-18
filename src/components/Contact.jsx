import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });
  const [autoFilled, setAutoFilled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      setFormData(prev => ({ ...prev, message: e.detail.message }));
      setAutoFilled(true);
      setTimeout(() => setAutoFilled(false), 4000);
    };
    window.addEventListener("calculatorSummary", handler);
    return () => window.removeEventListener("calculatorSummary", handler);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create email content
    const subject = encodeURIComponent(`Naujas užklausimas iš ${formData.name}`);
    const body = encodeURIComponent(
      `Vardas: ${formData.name}\n` +
      `Telefonas: ${formData.phone}\n` +
      `El. paštas: ${formData.email}\n` +
      `Paslauga: ${formData.service}\n\n` +
      `Žinutė:\n${formData.message}`
    );
    
    // Open email client with pre-filled content
    window.location.href = `mailto:akmensburtininkas@pm.me?subject=${subject}&body=${body}`;
    
    // Optionally reset form
    // setFormData({ name: "", phone: "", email: "", service: "", message: "" });
  };

  const contactInfo = [
    { icon: Phone, text: "+370 645 39 734", label: "Skambinkite", href: "tel:+37064539734" },
    { icon: Mail, text: "akmensburtininkas@pm.me", label: "El. paštas", href: "mailto:akmensburtininkas@pm.me" },
    { icon: MapPin, text: "Kaunas", label: "Vieta" },
    { icon: Clock, text: "Pr–Št: 7:00 – 18:00", label: "Darbo laikas" },
  ];

  return (
    <section id="contact" className="py-24 bg-charcoal-gradient">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4">Susisiekite</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-6">
              Pasiruošę pradėti savo projektą?
            </h2>
            <p className="text-light/70 leading-relaxed mb-10">
              Susisiekite su mumis dėl nemokamos konsultacijos ir įkainojimo. Aplankysime vietą, aptarsime jūsų viziją ir pateiks išsamų planą.
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
                  placeholder="Jūsų vardas" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-primary/30 border-2 border-secondary/40 rounded-lg px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary transition-all" 
                />
                <input 
                  type="tel" 
                  placeholder="Telefono numeris" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-primary/30 border-2 border-secondary/40 rounded-lg px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary transition-all" 
                />
              </div>
              <input 
                type="email" 
                placeholder="El. pašto adresas" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-primary/30 border-2 border-secondary/40 rounded-lg px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary transition-all" 
              />
              <select 
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
                className="w-full bg-primary/30 border-2 border-secondary/40 rounded-lg px-4 py-3 text-light/70 focus:outline-none focus:border-secondary transition-all"
              >
                <option value="">Pasirinkite paslaugą</option>
                <option value="retaining-walls">Gyvenamųjų namų betonavimo darbai</option>
                <option value="fireplaces">Plytelių klijavimas</option>
                <option value="stone-veneer">Individualūs akmens ar plytelių projektai</option>
                <option value="patios">Terasų ir takelių įrengimas</option>
                <option value="foundation">Akmens mūro darbai</option>
                <option value="restoration">Restauravimas</option>
        
              </select>
              {autoFilled && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/20 border border-secondary/40 text-secondary text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Skaičiuoklės duomenys automatiškai įkelti į žinutę
                </div>
              )}
              <textarea 
                placeholder="Papasakokite apie savo projektą..." 
                rows={4} 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-primary/30 border-2 border-secondary/40 rounded-lg px-4 py-3 text-light placeholder:text-light/40 focus:outline-none focus:border-secondary transition-all resize-none" 
              />
              <button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold py-6 text-base tracking-wide rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Prašyti nemokamo kainos įvertinimo
              
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;