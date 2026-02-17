import { Landmark, Home, Flame, TreePine, Blocks, Wrench } from "lucide-react";

const services = [
  { 
    icon: Home, 
    title: "Plytelių klijavimas", 
    description: "Profesionalus plytelių klijavimas su porceliano, keramikos ir natūralaus akmens variantais, bet kuriai erdvei.",
    features: ["Porcelianas", "Keramika", "Natūralus akmuo"]
  },
  { 
    icon: Flame, 
    title: "Individualūs akmens ar plytelių projektai", 
    description: "Jūsų unikalios kriauklės ar individualios palangės - viskas įmanoma!",
    features: ["Plytelės", "Natūralus akmuo", "Individualus dizainas"]
  },
  { 
    icon: Landmark, 
    title: "Gyvenamųjų namų betonavimo darbai", 
    description: "Nuo betonino grindų liejimo iki stalviršių - Tvaru!s sprendimai.",
    features: ["Grindų lyginimas", "Sienų lyginimas", "Aukščiausios klasės medžiagos"]
  },
  { 
    icon: TreePine, 
    title: "Terasų ir takelių įrengimas", 
    description: "Gražios plokštakmenes ir mėlynojo akmens lauko erdvės, sukurtos ištvermei.",
    features: ["Neslidi danga", "Oro sąlygų atsparus", "Lengva priežiūra"]
  },
  { 
    icon: Blocks, 
    title: "Vonios remontas", 
    description: "Tvirti akmens pamatai ir konstrukcinis mūras ilgalaikiam stabilumui.",
    features: ["Apkrovų pernešimas", "Sertifikuotas darbas", "Ilgaamžis"]
  },
  { 
    icon: Wrench, 
    title: "Restauravimas", 
    description: "Ekspertų atliekamas istorinio akmens mūro restauravimas, išsaugant originalų charakterį.",
    features: ["Istorinių objektų derinimas", "Ekspertų priežiūra", "Išsaugojimas"]
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-stone-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4">Ką darome</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-4">Mūsų paslaugos</h2>
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
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span key={feature} className="text-xs bg-secondary/20 text-secondary px-3 py-1 rounded-full border border-secondary/40">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;