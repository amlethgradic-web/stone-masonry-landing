import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const projects = [
  { image: gallery1, title: "Custom Fireplace", category: "Interior" },
  { image: gallery2, title: "Stone Patio & Walls", category: "Outdoor Living" },
  { image: gallery3, title: "Stone Veneer Facade", category: "Exterior" },
  { image: gallery4, title: "Garden Walkway", category: "Landscaping" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-stone-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4">Portfolio</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-4">Recent Projects</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/70 transition-colors duration-300 flex items-end">
                <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full">
                  <p className="text-secondary text-sm tracking-wide uppercase font-semibold mb-2">{project.category}</p>
                  <h3 className="font-display text-2xl font-bold text-light">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;