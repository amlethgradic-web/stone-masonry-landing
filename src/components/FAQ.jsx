import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Kiek laiko trunka tipinis projektas?",
    answer: "Projektų trukmė priklauso nuo apimties ir sudėtingumo. Paprasti plytelių klijavimo darbai gali užtrukti 1-2 dienas, o individualūs vonios kambariai ar placioš atramines sienos gali užtrukti 2-4 savaites. Konsultacijos metu pateikiame išsamų tvarkaraštį."
  },
  {
    question: "Ar teikiate garantiją savo darbui?",
    answer: "Taip! Daugumai mūsų darbų teikiama 10 metų garantiją. Stengiamės užtikrinti aukščiausią kokybę ir naudojame tik aukščiausios klasės medžiagas, kad jūsų projektas tarnautų kartoms."
  },
  {
    question: "Kas įtraukta į nemokamą konsultaciją?",
    answer: "Mūsų konsultacija apima apsilankymą vietoje, jūsų vizijos ir biudžeto aptarimą, medžiagų pasirinkimą, išsamius iš matavimus ir kainos aptarimą. Jokių įsipareigojimų."
  },
  {
    question: "Ar atlikate tiek vidaus, tiek išorės darbus?",
    answer: "Žinoma! Specializuojamės tiek vidaus darbuose (plytelių klijavimas, betono lyginimas, sienų lyginimas), tiek išorės darbuose (terasų įrengimas, takeliai, atramines sienos, fasadai)."
  },
  {
    question: "Su kokiais akmens tipais dirbate?",
    answer: "Dirbame su įvairiais natūraliais akmenimis, įskaitant granitą, kalkakmenį, marmurą, skiedrą, laukiniais akmenimis ir dar daugiau. Galime parinkti medžiagas, atitinkančias jūsų estetinius pageidavimus ir biudžetą."
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-stone-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4">Dažni klausimai</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-4">Dažniausiai užduodami klausimai</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded" />
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-secondary/40 rounded-lg overflow-hidden bg-primary/50 backdrop-blur-sm hover:border-secondary/80 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-secondary/5 transition-colors"
              >
                <h3 className="font-display text-lg font-semibold text-light text-left">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-secondary flex-shrink-0 ml-4 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-secondary/10 border-t-2 border-secondary/40">
                  <p className="text-light/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;