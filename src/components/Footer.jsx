import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary border-t-2 border-secondary/40">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <a href="#" className="inline-block mb-6">
              <div className="font-display text-2xl font-bold text-light tracking-wide hover:text-secondary transition-colors">
                AKMENS<span className="text-secondary"> BURTININKAS</span>
              </div>
            </a>
            <p className="text-light/60 text-sm leading-relaxed">
              Meistriška akmens apdaila, sukurta tarnauti kartoms. Licencijuota ir apdraustas.
            </p>
          </div>

          {/* Services Links */}
          <div className="md:col-span-1">
            <h4 className="font-display text-sm font-bold text-light uppercase tracking-wide mb-4">Paslaugos</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-light/60 hover:text-secondary transition-colors text-sm">Plytelių klijavimas</a></li>
              <li><a href="#services" className="text-light/60 hover:text-secondary transition-colors text-sm">Betonavimo darbai</a></li>
              <li><a href="#services" className="text-light/60 hover:text-secondary transition-colors text-sm">Individualūs projektai</a></li>
              <li><a href="#services" className="text-light/60 hover:text-secondary transition-colors text-sm">Terasų įrengimas</a></li>
              <li><a href="#services" className="text-light/60 hover:text-secondary transition-colors text-sm">Restauravimas</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="font-display text-sm font-bold text-light uppercase tracking-wide mb-4">Įmonė</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-light/60 hover:text-secondary transition-colors text-sm">Apie mus</a></li>
              <li><a href="#gallery" className="text-light/60 hover:text-secondary transition-colors text-sm">Galerija</a></li>
              <li><a href="#contact" className="text-light/60 hover:text-secondary transition-colors text-sm">Kontaktai</a></li>
              <li><a href="#" className="text-light/60 hover:text-secondary transition-colors text-sm">Naujienos</a></li>
              <li><a href="#" className="text-light/60 hover:text-secondary transition-colors text-sm">Privatumas</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h4 className="font-display text-sm font-bold text-light uppercase tracking-wide mb-4">Kontaktai</h4>
            <div className="space-y-3">
              <a href="tel:+37064539734" className="flex items-center gap-2 text-light/60 hover:text-secondary transition-colors text-sm group">
                <Phone className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>+370 645 39 734</span>
              </a>
              <a href="mailto:akmensburtininkas@pm.me" className="flex items-center gap-2 text-light/60 hover:text-secondary transition-colors text-sm group">
                <Mail className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="break-all">akmensburtininkas@pm.me</span>
              </a>
              <a href="https://www.akmensburtininkas.lt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-light/60 hover:text-secondary transition-colors text-sm group">
                <MapPin className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>akmensburtininkas.lt</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-secondary/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-secondary/40 transition-all border border-secondary/40 group">
                <Facebook className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center hover:bg-secondary/40 transition-all border border-secondary/40 group">
                <Instagram className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-light/40 text-xs text-center md:text-right">
              © 2026 Akmens Burtininkas. Visos teisės saugomos. Licencijuota ir apdraustas.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-secondary/5 border-t border-secondary/20 py-6">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="text-light/70 text-xs">
              <p className="font-bold text-secondary mb-1">9+</p>
              <p>Metų patirtis</p>
            </div>
            <div className="text-light/70 text-xs">
              <p className="font-bold text-secondary mb-1">500+</p>
              <p>Atliktų projektų</p>
            </div>
            <div className="text-light/70 text-xs">
              <p className="font-bold text-secondary mb-1">100%</p>
              <p>Licencijuotas ir apdraustas</p>
            </div>
            <div className="text-light/70 text-xs">
              <p className="font-bold text-secondary mb-1">24/7</p>
              <p>Palaikymas prieinamas</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;