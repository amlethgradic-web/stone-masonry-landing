import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
  <nav className="fixed top-0 left-0 right-0 z-50 py-0 bg-primary/95 backdrop-blur-sm border-b border-secondary/20 overflow-hidden">
      <div className="container mx-auto px-6 py-0 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="/logo_transparent.png" alt="Akmens Burtininkas" className="h-36 w-36 object-contain -my-6" />
          <span className="font-display text-2xl font-bold text-light tracking-wide">
            AKMENS<span className="text-secondary"> BURTININKAS</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-light/80 hover:text-secondary transition-colors text-sm font-medium tracking-wide uppercase">Paslaugos</a>
          <a href="#about" className="text-light/80 hover:text-secondary transition-colors text-sm font-medium tracking-wide uppercase">Apie</a>
          <a href="#gallery" className="text-light/80 hover:text-secondary transition-colors text-sm font-medium tracking-wide uppercase">Galerija</a>
          <a href="#contact" className="text-light/80 hover:text-secondary transition-colors text-sm font-medium tracking-wide uppercase">Kontaktai</a>
        </div>

        {/* Desktop CTA */}
        <a href="tel:+37064539734" className="hidden md:flex items-center gap-2 text-secondary font-medium text-sm hover:text-light transition-colors">
          <Phone className="w-4 h-4" />
          +370 645 39 734
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-light hover:text-secondary transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-secondary/20 py-4 px-6 space-y-4 bg-primary">
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-light/80 hover:text-secondary transition-colors text-sm font-medium uppercase">Paslaugos</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-light/80 hover:text-secondary transition-colors text-sm font-medium uppercase">Apie</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="block text-light/80 hover:text-secondary transition-colors text-sm font-medium uppercase">Galerija</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-light/80 hover:text-secondary transition-colors text-sm font-medium uppercase">Kontaktai</a>
          <a href="tel:+37064539734" className="flex items-center gap-2 text-secondary font-medium text-sm pt-4 border-t border-secondary/20">
            <Phone className="w-4 h-4" />
            +370 645 39 734
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;