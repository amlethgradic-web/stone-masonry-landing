import { useState } from "react";

const bathroomRepairImages = [
  "/IMG_9616.JPEG",
  "/IMG_9618.JPEG",
  "/IMG_9619.JPEG",
  "/IMG_9620.JPEG",
  "/IMG_9623.JPEG",
  "/IMG_9624.JPEG",
];

const showerRepairImages = [
  "/IMG_1029.JPEG",
  "/IMG_1030.JPEG",
  "/IMG_1031.JPEG",
  "/IMG_1034.JPEG",
  "/IMG_1038.JPEG",
];

const hydroImages = [
  "/IMG_0187.JPEG",
  "/IMG_0186.JPEG",

];

const projects = [
  // Original 9 — always visible
  { image: "/IMG_0375.jpg", title: "Akmens krantas", category: "Lauko darbai" },
  { image: "/IMG_0917.jpg", title: "Akmens atraminė siena", category: "Lauko darbai" },
  { image: "/IMG_0980.jpg", title: "Virtuvės plytelės", category: "Interjeras" },
  { image: "/IMG_0292.jpg", title: "Tvoros atnaujinimas", category: "Restauravimas" },
  { image: "/IMG_8725.jpg", title: "Juodosios granito plytelės", category: "Interjeras" },
  { image: "/IMG_2151.JPEG", title: "Vonios kambarys", category: "Interjeras" },
  { image: "/IMG_0894.jpg", title: "Vonios sienos plytelės", category: "Interjeras" },
  { image: "/IMG_6927.jpg", title: "Moderni virtuvė", category: "Interjeras" },
  { image: "/IMG_6441.jpg", title: "Šešiakampės grindys", category: "Interjeras" },

  // New images — visible after "Rodyti daugiau"
  { image: "/IMG_0206.JPEG", title: "Pilkosios marmuro plytelės", category: "Interjeras" },
 { image: "/bathroom-tiles.jpg", title: "45°", category: "Interjeras" },
  { image: "/IMG_0658.JPEG", title: "Metro plytelės", category: "Interjeras" },
  { image: "/IMG_6135.JPEG", title: "Baltos dušo plytelės", category: "Interjeras" },
  { image: "/IMG_8778.JPEG", title: "Terrazzo grindys", category: "Interjeras" },
  { image: "/IMG_8178.JPEG", title: "Smėlio spalvos dušas", category: "Interjeras" },
];

const INITIAL_COUNT = 9;

// Reusable grouped slideshow card
const GroupedCard = ({ images, title, category }) => {
  const [current, setCurrent] = useState(0);

  const prev = (e) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };

  const next = (e) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % images.length);
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${title} ${i + 1}`}
          className={`w-full h-80 object-cover transition-opacity duration-500 ${
            i === current ? "opacity-100 relative" : "opacity-0 absolute inset-0"
          }`}
        />
      ))}

      {/* Static label */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-6 pb-10">
        <p className="text-secondary text-sm tracking-wide uppercase font-semibold mb-1">{category}</p>
        <h3 className="font-display text-2xl font-bold text-light">{title}</h3>
      </div>

      {/* Prev arrow */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
        aria-label="Ankstesnis"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
        aria-label="Kitas"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              i === current ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Nuotrauka ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter badge */}
      <div className="absolute top-3 right-3 z-20 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
        {current + 1} / {images.length}
      </div>
    </div>
  );
};

// Standard single-image card
const ProjectCard = ({ project }) => (
  <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
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
);

const Gallery = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section id="gallery" className="py-24 bg-stone-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4">Projektai</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-4">Naujausi projektai</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
          {showAll && (
            <>
              <GroupedCard
                images={hydroImages}
                title="Hidroizoliacija"
                category="Restauravimas"
              />
              <GroupedCard
                images={showerRepairImages}
                title="Dušo remontas"
                category="Restauravimas"
              />
              <GroupedCard
                images={bathroomRepairImages}
                title="Vonios plytelių remontas"
                category="Restauravimas"
              />
            </>
          )}
        </div>

        {!showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-secondary text-secondary font-semibold tracking-widest uppercase text-sm rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300"
            >
              Rodyti daugiau
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => {
                setShowAll(false);
                document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-secondary text-secondary font-semibold tracking-widest uppercase text-sm rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300"
            >
              Rodyti mažiau
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;