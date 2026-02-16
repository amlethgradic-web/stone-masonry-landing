import { Star, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-charcoal-gradient">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjAgMGEyMCAyMCAwIDEgMCA0MCAwYTIwIDIwIDAgMSAwLTQwIDAiIHN0cm9rZT0iI0Q0Qjg5NiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')`
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-secondary/20 border-2 border-secondary rounded-full px-4 py-2 mb-6 hover:bg-secondary/30 transition-colors">
          <Star className="w-4 h-4 text-secondary fill-secondary" />
          <span className="text-secondary text-sm font-medium">9+ Years · Licensed & Insured</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-light leading-tight mb-6">
          Built to Last
          <br />
          <span className="text-secondary">Generations</span>
        </h1>

        <p className="text-light/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
          Expert stone masonry and tiling services crafted with precision, passion, and over 9 years of experience in natural stone construction.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-6 text-base tracking-wide rounded transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
            Get a Free Estimate
          </button>
          <button className="border-2 border-secondary text-secondary hover:bg-secondary/10 font-semibold px-8 py-6 text-base tracking-wide rounded transition-all hover:border-light">
            View My Work
          </button>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-light/80 text-sm bg-primary/50 px-4 py-3 rounded-lg backdrop-blur-sm border border-secondary/20">
            <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
            <span>Free Consultation</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-light/80 text-sm bg-primary/50 px-4 py-3 rounded-lg backdrop-blur-sm border border-secondary/20">
            <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
            <span>10 Year Warranty</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-light/80 text-sm bg-primary/50 px-4 py-3 rounded-lg backdrop-blur-sm border border-secondary/20">
            <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
            <span>Flexible Financing</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-secondary" />
      </div>
    </section>
  );
};

export default Hero;