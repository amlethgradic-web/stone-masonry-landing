const About = () => {
  const stats = [
    { number: "9+", label: "Metų Patirtis" },
    { number: "250+", label: "Įvykdytų Projektų" },
    { number: "100%", label: "Dėmesio jums – Mes niekada neimam kelių darbų vienu metu." },
    { number: "4.9★", label: "Klientų Įvertinimas" },
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
            <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4">Mano Istorija</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-6">
              Darbų garantija ir laiku, bei švariai atliekamas darbas
            </h2>
            <p className="text-light/70 leading-relaxed mb-6">
              Aukštos kokybės plytelių klijavimo, betonavimo, akmens apdirbimo ir renovacijos paslaugos!
Ieškote profesionalaus meistro, kuris galėtų pasirūpinti jūsų statybos ar remonto darbais? Esu meistras, įgijęs ilgametės patirties Islandijoje, Italijoje ir Olandijoje, todėl garantuoju aukščiausią darbo kokybę ir atitikimą tarptautiniams standartams.
            </p>
            <p className="text-light/70 leading-relaxed">
              Dirbu Kaune ir visoje Lietuvoje.
Pasitikėkite specialistu, kuris per daugelį metų įgijo patirtį ir meistriškumą!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;