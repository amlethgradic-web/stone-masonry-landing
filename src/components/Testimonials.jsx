import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Smith",
    role: "Homeowner",
    text: "Akmens Burtininkas transformed our outdoor space with a beautiful stone patio. The craftsmanship is impeccable and the team was professional throughout.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  },
  {
    name: "Sarah Johnson",
    role: "Property Manager",
    text: "We hired them for a complete fireplace restoration. They matched the historic stonework perfectly. Highly recommended!",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    name: "Michael Brown",
    role: "Business Owner",
    text: "Professional, punctual, and meticulous. They completed our commercial facade project ahead of schedule without compromising quality.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-4">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-primary/50 backdrop-blur-sm border-2 border-secondary/40 rounded-xl p-8 hover:border-secondary/80 transition-all duration-300 hover:shadow-xl"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-light/80 leading-relaxed mb-6 italic">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-secondary"
                />
                <div>
                  <p className="text-light font-semibold">{testimonial.name}</p>
                  <p className="text-secondary text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;