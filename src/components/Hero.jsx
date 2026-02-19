import { Star, CheckCircle, Calculator } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-20">
      {/* Background with stone wall image and brown overlay */}
      <div className="absolute inset-0">
        {/* Stone wall image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/a-dry-stone-retaining-wall-v0-q0xxm1wctogf1.webp')`,
          }}
        />
        {/* Brown  overlay */}
        <div className="absolute inset-0 bg-[#3d3022]/75" />
        {/* Gradient to primary at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-secondary/20 border-2 border-secondary rounded-full px-4 py-2 mb-6 hover:bg-secondary/30 transition-colors">
          <Star className="w-4 h-4 text-secondary fill-secondary" />
          <span className="text-secondary text-sm font-medium">9+ Metai · Licencijuotas ir Apdraustas</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-light leading-tight mb-6">
          Sukurta tarnauti
          <br />
          <span className="text-secondary">Kartoms</span>
        </h1>

        <p className="text-light/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
          Eksperto akmens mūro ir plytelių klijavimo paslaugos, atliekamos su tikslumu, aistra ir daugiau nei 9 metų patirtimi natūralaus akmens statyboje.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="#contact" className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-6 text-base tracking-wide rounded transition-all shadow-lg hover:shadow-xl transform hover:scale-105 inline-block">
            Gauti nemokamą konsultaciją
          </a>
          <a href="#calculator" className="border-2 border-secondary text-secondary hover:bg-secondary/10 font-semibold px-8 py-6 text-base tracking-wide rounded transition-all hover:border-light inline-flex items-center justify-center gap-2">
            <Calculator className="w-5 h-5" />
            Skaičiuoti kainą
          </a>
          <a href="#gallery" className="border-2 border-secondary/50 text-secondary/80 hover:bg-secondary/10 hover:text-secondary font-semibold px-8 py-6 text-base tracking-wide rounded transition-all hover:border-secondary inline-block">
            Peržiūrėti mano darbus
          </a>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-light/80 text-sm bg-primary/50 px-4 py-3 rounded-lg backdrop-blur-sm border border-secondary/20">
            <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
            <span>Nemokama konsultacija</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-light/80 text-sm bg-primary/50 px-4 py-3 rounded-lg backdrop-blur-sm border border-secondary/20">
            <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
            <span>10 metų garantija</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-light/80 text-sm bg-primary/50 px-4 py-3 rounded-lg backdrop-blur-sm border border-secondary/20">
            <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
            <span>Lankstus finansavimas</span>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Hero;