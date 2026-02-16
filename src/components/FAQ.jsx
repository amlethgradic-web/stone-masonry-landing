import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How long does a typical stone masonry project take?",
    answer: "Project timelines vary based on scope and complexity. Simple patios may take 1-2 weeks, while custom fireplaces or extensive retaining walls can take 3-6 weeks. We provide a detailed timeline during the consultation."
  },
  {
    question: "Do you offer a warranty on your work?",
    answer: "Yes! We offer a 10-year warranty on all our masonry work. We stand behind our craftsmanship and use only premium materials to ensure your project lasts generations."
  },
  {
    question: "What's included in a free consultation?",
    answer: "Our consultation includes a site visit, discussion of your vision and budget, material selection, detailed measurements, and a comprehensive estimate. There's no obligation."
  },
  {
    question: "Do you handle both interior and exterior work?",
    answer: "Absolutely! We specialize in both interior (fireplaces, hearths, accent walls) and exterior work (patios, walkways, retaining walls, façades)."
  },
  {
    question: "What types of stone do you work with?",
    answer: "We work with a wide variety of natural stone including granite, limestone, marble, slate, fieldstone, and flagstone. We can source materials that match your specific aesthetic and budget."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Yes, we are fully licensed, insured, and certified. We carry liability and workers' compensation insurance for your peace of mind."
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-stone-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4">Common Questions</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-4">Frequently Asked Questions</h2>
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