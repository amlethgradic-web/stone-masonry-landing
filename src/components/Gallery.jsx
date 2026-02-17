const projects = [
  { image: "/IMG_0375.jpg", title: "Akmens krantas", category: "Lauko darbai" },
  { image: "/IMG_0917.jpg", title: "Akmens atraminė siena", category: "Lauko darbai" },
  { image: "/IMG_0980.jpg", title: "Virtuvės plytelės", category: "Interjeras" },
  { image: "/IMG_0292.jpg", title: "Tvoros atnaujinimas", category: "Restauravimas" },
  { image: "/IMG_8725.jpg", title: "Juodosios granito plytelės", category: "Interjeras" },
  { image: "/bathroom-tiles.jpg", title: "45°", category: "Interjeras" },
  { image: "/IMG_0894.jpg", title: "Vonios sienos plytelės", category: "Interjeras" },
  { image: "/IMG_6927.jpg", title: "Moderni virtuvė", category: "Interjeras" },
  { image: "/IMG_6441.jpg", title: "Šešiakampės grindys", category: "Interjeras" },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-stone-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4">Projektai</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-4">Naujausi projektai</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
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