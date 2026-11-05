import { useState, useEffect, useCallback, useRef } from "react";

const curvedNiche = [
  "/IMG_1610.jpg",
  "/IMG_1612.jpg",
  "/IMG_1606.jpg",
];

const miteredCorner = [
  "/IMG_1600.jpg",
  "/IMG_1601.jpg",
  "/IMG_1602.jpg",
  "/IMG_1603.jpg",
];


const bathroomRepairImagessecond = [
  "/IMG_0295.jpg",
  "/IMG_0313.jpg",
  "/IMG_0330.jpg",
  "/IMG_0337.jpg",
  "/IMG_0338.jpg",
];

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
  { image: "/IMG_1610.jpg", title: "Virtuvės plytelės", category: "Interjeras" },
  { image: "/IMG_8725.jpg", title: "Juodosios granito plytelės", category: "Interjeras" },
  { image: "/IMG_2151.JPEG", title: "Vonios kambarys", category: "Interjeras" },
  { image: "/IMG_2002.jpg", title: "Vonios kambarys su LED apšvietimu", category: "Interjeras" },
  { image: "/IMG_6927.jpg", title: "Moderni virtuvė", category: "Interjeras" },
  { image: "/IMG_6441.jpg", title: "Šešiakampės grindys", category: "Interjeras" },

  // New images — visible after "Rodyti daugiau"
  { image: "/IMG_2001.jpg", title: "Vonios kambarys su LED apšvietimu", category: "Interjeras" },
  { image: "/IMG_0894.jpg", title: "Vonios sienos plytelės", category: "Interjeras" },
  { image: "/IMG_0241.jpg", title: "Vonios kambario niša su LED apšvietimu", category: "Interjeras" },
  { image: "/IMG_0237.jpg", title: "Vonios kambarys su LED apšvietimu", category: "Interjeras" },
  { image: "/IMG_0206.JPEG", title: "Pilkosios marmuro plytelės", category: "Interjeras" },
  { image: "/bathroom-tiles.jpg", title: "Kampai 45° užpildyti epoksidu", category: "Interjeras" },
  { image: "/IMG_0016.jpg", title: "Didelės akmens plytelės", category: "Interjeras" },
  { image: "/IMG_0017.jpg", title: "Didelės akmens plytelės", category: "Interjeras" },
  { image: "/IMG_0015.jpg", title: "Didelės akmens plytelės", category: "Interjeras" },
  { image: "/IMG_0658.JPEG", title: "Metro plytelės", category: "Interjeras" },
  { image: "/IMG_6135.JPEG", title: "Baltos dušo plytelės", category: "Interjeras" },
  { image: "/IMG_8778.JPEG", title: "Terrazzo grindys", category: "Interjeras" },
  { image: "/IMG_8178.JPEG", title: "Smėlio spalvos dušas", category: "Interjeras" },
  { image: "/IMG_0292.jpg", title: "Tvoros atnaujinimas", category: "Restauravimas" },
];

// Multi-photo projects shown after "Rodyti daugiau"
const groups = [
  { images: curvedNiche, title: "Išlenkta niša", category: "Interjeras" },
  { images: miteredNiche, title: "Kampai 45° užpildyti epoksidu", category: "Interjeras" },
  { images: hydroImages, title: "Hidroizoliacija", category: "Interjeras" },
  { images: showerRepairImages, title: "Dušo remontas", category: "Remontas" },
  { images: bathroomRepairImages, title: "Vonios plytelių remontas", category: "Remontas" },
  {
    images: bathroomRepairImagessecond,
    title: "Dušo grindų atnaujinimas su paslėptu nuoteku",
    category: "Remontas",
  },
];

const INITIAL_COUNT = 9;
const SWIPE_THRESHOLD = 50;

const ArrowIcon = ({ direction }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
    />
  </svg>
);

// Full-screen viewer with captions, prev/next, keyboard and swipe support
const Lightbox = ({ slides, index, onClose, onChange }) => {
  const touchStartX = useRef(null);
  const slide = slides[index];
  const total = slides.length;

  const goPrev = useCallback(
    () => onChange((index - 1 + total) % total),
    [index, total, onChange]
  );
  const goNext = useCallback(
    () => onChange((index + 1) % total),
    [index, total, onChange]
  );

  // Keyboard: Esc closes, arrows navigate
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext, onClose]);

  // Lock page scroll while open
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Preload neighbouring photos so navigation feels instant
  useEffect(() => {
    [(index + 1) % total, (index - 1 + total) % total].forEach((i) => {
      const img = new Image();
      img.src = slides[i].src;
    });
  }, [index, total, slides]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      diff > 0 ? goPrev() : goNext();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={slide.title}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/25 text-white rounded-full w-11 h-11 flex items-center justify-center transition-colors duration-200"
        aria-label="Uždaryti"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-10 text-white/80 text-sm font-semibold bg-white/10 px-3 py-1.5 rounded-full">
        {index + 1} / {total}
      </div>

      {/* Prev */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/25 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-200"
          aria-label="Ankstesnė nuotrauka"
        >
          <ArrowIcon direction="left" />
        </button>
      )}

      {/* Next */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/25 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-200"
          aria-label="Kita nuotrauka"
        >
          <ArrowIcon direction="right" />
        </button>
      )}

      {/* Photo */}
      <img
        key={slide.src}
        src={slide.src}
        alt={slide.title}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[92vw] max-h-[78vh] object-contain rounded-lg shadow-2xl"
      />

      {/* Description */}
      <div
        className="mt-5 px-6 text-center max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-secondary text-sm tracking-wide uppercase font-semibold mb-1">
          {slide.category}
        </p>
        <h3 className="font-display text-xl md:text-2xl font-bold text-light">
          {slide.title}
        </h3>
        {slide.count > 1 && (
          <p className="text-white/60 text-sm mt-1">
            Nuotrauka {slide.position} iš {slide.count}
          </p>
        )}
      </div>
    </div>
  );
};

// Reusable grouped slideshow card
const GroupedCard = ({ images, title, category, onOpen }) => {
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
          onClick={() => onOpen(current)}
          className={`w-full h-80 object-cover cursor-zoom-in transition-opacity duration-500 ${
            i === current ? "opacity-100 relative" : "opacity-0 absolute inset-0"
          }`}
        />
      ))}

      {/* Static label (clicks pass through to the photo) */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-6 pb-10">
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
const ProjectCard = ({ project, onOpen }) => (
  <div
    onClick={onOpen}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen();
      }
    }}
    role="button"
    tabIndex={0}
    aria-label={`Peržiūrėti: ${project.title}`}
    className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-zoom-in"
  >
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
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  // One flat list of every photo currently on the page, in display order.
  // The lightbox moves through this list with prev/next.
  const slides = visibleProjects.map((p) => ({
    src: p.image,
    title: p.title,
    category: p.category,
    count: 1,
    position: 1,
  }));

  // Where each multi-photo project starts inside the flat list
  const groupOffsets = [];
  if (showAll) {
    groups.forEach((g) => {
      groupOffsets.push(slides.length);
      g.images.forEach((src, i) => {
        slides.push({
          src,
          title: g.title,
          category: g.category,
          count: g.images.length,
          position: i + 1,
        });
      });
    });
  }

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

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
            <ProjectCard
              key={index}
              project={project}
              onOpen={() => setLightboxIndex(index)}
            />
          ))}
          {showAll &&
            groups.map((g, gi) => (
              <GroupedCard
                key={g.title}
                images={g.images}
                title={g.title}
                category={g.category}
                onOpen={(photoIndex) => setLightboxIndex(groupOffsets[gi] + photoIndex)}
              />
            ))}
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

      {lightboxIndex !== null && (
        <Lightbox
          slides={slides}
          index={lightboxIndex}
          onClose={closeLightbox}
          onChange={setLightboxIndex}
        />
      )}
    </section>
  );
};

export default Gallery;
