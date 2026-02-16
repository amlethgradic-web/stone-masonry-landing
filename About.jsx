const About = () => {
  const stats = [
    { number: "9+", label: "Years Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "100%", label: "Licensed & Insured" },
    { number: "4.9★", label: "Customer Rating" },
  ];

  return (
    <section id="about" className="py-24 bg-charcoal-gradient">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-primary/50 rounded-lg border border-secondary/30 backdrop-blur-sm hover:border-secondary/60 transition-all">
                <p className="font-display text-4xl md:text-5xl font-bold text-secondary mb-2">{stat.number}</p>
                <p className="text-light/60 text-sm tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Text */}
          <div>
            <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4">Our Story</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-6">
              Craftsmanship Rooted in Tradition
            </h2>
            <p className="text-light/70 leading-relaxed mb-6">
              For over 9 years, Akmens Burtininkas has been the trusted name in natural stone masonry. 
              Our team of master craftsmen combines time-honored techniques with modern engineering 
              to deliver stonework that stands the test of time.
            </p>
            <p className="text-light/70 leading-relaxed">
              Every stone we lay is a testament to our dedication to quality. From grand fireplaces 
              to elegant patios, we approach each project with the same passion and precision that 
              has earned us the trust of hundreds of homeowners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;