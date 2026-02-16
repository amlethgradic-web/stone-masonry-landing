import { Landmark, Home, Flame, TreePine, Blocks, Wrench, ArrowRight } from "lucide-react";

const services = [
  { 
    icon: Home, 
    title: "Tiling", 
    description: "Professional tiling installation with porcelain, ceramic, and natural stone options for any space.",
    features: ["Porcelain", "Ceramic", "Natural Stone"]
  },
  { 
    icon: Landmark, 
    title: "Retaining Walls", 
    description: "Engineered stone retaining walls that combine structural integrity with natural beauty.",
    features: ["Structural Engineering", "Natural Stone", "Custom Design"]
  },
  { 
    icon: Flame, 
    title: "Fireplaces & Hearths", 
    description: "Custom stone fireplaces that become the centerpiece of your home.",
    features: ["Custom Design", "Heat Resistant", "Premium Materials"]
  },
  { 
    icon: TreePine, 
    title: "Patios & Walkways", 
    description: "Beautiful flagstone and bluestone outdoor living spaces built to endure.",
    features: ["Slip Resistant", "Weather Durable", "Easy Maintenance"]
  },
  { 
    icon: Blocks, 
    title: "Foundation Work", 
    description: "Solid stone foundations and structural masonry for lasting stability.",
    features: ["Load Bearing", "Certified Work", "Lifetime Durable"]
  },
  { 
    icon: Wrench, 
    title: "Restoration", 
    description: "Expert restoration of historic stonework preserving original character.",
    features: ["Historic Matching", "Expert Care", "Preservation"]
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-stone-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4">What We Do</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-4">Our Services</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-primary/50 backdrop-blur-sm p-8 rounded-xl border border-secondary/30 hover:border-secondary/60 transition-all duration-300 hover:-translate-y-2 hover:bg-primary/70 shadow-lg hover:shadow-xl"
              >
                <IconComponent className="w-12 h-12 text-secondary mb-5 group-hover:scale-125 transition-transform" />
                <h3 className="font-display text-xl font-semibold text-light mb-3">{service.title}</h3>
                <p className="text-light/70 leading-relaxed mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.features.map((feature) => (
                    <span key={feature} className="text-xs bg-secondary/20 text-secondary px-3 py-1 rounded-full border border-secondary/40">
                      {feature}
                    </span>
                  ))}
                </div>
                <button className="text-secondary hover:text-light font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all hover:underline">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;