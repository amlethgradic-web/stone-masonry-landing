import { useState } from "react";
import { Calculator, ChevronDown, Info } from "lucide-react";

const workTypes = [
  { id: "masonry", label: "Akmens mūras", labelEn: "Stone Masonry" },
  { id: "tiles", label: "Plytelių klijavimas", labelEn: "Tile Laying" },
  { id: "restoration", label: "Restauravimas", labelEn: "Restoration" },
  { id: "outdoor", label: "Lauko darbai", labelEn: "Outdoor Work" },
];

const materialTypes = {
  masonry: [
    { id: "natural", label: "Natūralus akmuo" },
    { id: "artificial", label: "Dirbtinis akmuo" },
    { id: "brick", label: "Plyta" },
  ],
  tiles: [
    { id: "ceramic", label: "Keraminės plytelės" },
    { id: "porcelain", label: "Porceliano plytelės" },
    { id: "natural_stone", label: "Natūralus akmuo" },
    { id: "mosaic", label: "Mozaika" },
  ],
  restoration: [
    { id: "stone", label: "Akmens restauravimas" },
    { id: "brick", label: "Plytų restauravimas" },
    { id: "tiles", label: "Plytelių restauravimas" },
  ],
  outdoor: [
    { id: "paving", label: "Grindinio akmuo" },
    { id: "wall", label: "Tvoros akmuo" },
    { id: "steps", label: "Laiptai" },
  ],
};

const locationTypes = {
  masonry: ["Gyvenamasis namas", "Komercinis pastatas", "Sodo namelis", "Kita"],
  tiles: ["Vonios kambarys", "Virtuvė", "Koridorius", "Terasa", "Grindys", "Sienos"],
  restoration: ["Senas pastatas", "Istorinis objektas", "Privatus namas", "Kita"],
  outdoor: ["Kiemas", "Sodas", "Privažiavimas", "Baseino zona", "Kita"],
};

const complexityMultipliers = {
  simple: { label: "Paprasta", description: "Tiesios linijos, standartinis darbas", min: 1.0, max: 1.0 },
  medium: { label: "Vidutinė", description: "Keletas kampų, vidutinis sudėtingumas", min: 1.2, max: 1.3 },
  complex: { label: "Sudėtinga", description: "Daug kampų, detalios mozaikos, unikalūs sprendimai", min: 1.5, max: 1.7 },
};

const basePrices = {
  masonry: { natural: [45, 65], artificial: [35, 50], brick: [30, 45] },
  tiles: { ceramic: [20, 35], porcelain: [25, 40], natural_stone: [40, 60], mosaic: [50, 75] },
  restoration: { stone: [55, 80], brick: [45, 65], tiles: [35, 55] },
  outdoor: { paving: [30, 50], wall: [40, 60], steps: [60, 90] },
};

const siteStatusMultipliers = {
  new: { label: "Naujas statinys", description: "Paruoštas darbui, be nugriovimo", min: 1.0, max: 1.0 },
  demolition: { label: "Reikalingas griovimas", description: "Pirma reikia nugriauti seną dangą", min: 1.3, max: 1.5 },
};

const SelectField = ({ label, value, onChange, options, placeholder }) => (
  <div className="relative">
    <label className="block text-xs font-semibold tracking-widest uppercase text-secondary mb-2">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-primary/60 border border-secondary/30 text-light rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-secondary transition-colors cursor-pointer font-medium"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.id || opt} value={opt.id || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
    </div>
  </div>
);

const PriceCalculator = () => {
  const [workType, setWorkType] = useState("");
  const [material, setMaterial] = useState("");
  const [location, setLocation] = useState("");
  const [complexity, setComplexity] = useState("");
  const [siteStatus, setSiteStatus] = useState("");
  const [area, setArea] = useState("");
  const [result, setResult] = useState(null);

  const handleWorkTypeChange = (val) => {
    setWorkType(val);
    setMaterial("");
    setLocation("");
    setResult(null);
  };

  const canCalculate = workType && material && location && complexity && siteStatus && area && Number(area) > 0;

  const calculate = () => {
    if (!canCalculate) return;

    const [baseMin, baseMax] = basePrices[workType][material];
    const complexMult = complexityMultipliers[complexity];
    const statusMult = siteStatusMultipliers[siteStatus];
    const areaNum = Number(area);

    const totalMin = Math.round(baseMin * complexMult.min * statusMult.min * areaNum);
    const totalMax = Math.round(baseMax * complexMult.max * statusMult.max * areaNum);

    setResult({ min: totalMin, max: totalMax, area: areaNum });
  };

  const reset = () => {
    setWorkType(""); setMaterial(""); setLocation("");
    setComplexity(""); setSiteStatus(""); setArea("");
    setResult(null);
  };

  return (
    <section id="calculator" className="py-24 bg-charcoal-gradient">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4">Kainos skaičiuoklė</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-4">Apskaičiuokite kainą</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded mb-6" />
          <p className="text-light/60 max-w-xl mx-auto text-sm leading-relaxed">
            Užpildykite žemiau esančias formas ir gaukite apytikslę jūsų projekto kainą. Galutinė kaina gali skirtis priklausomai nuo projekto specifikos.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-secondary/20 rounded-2xl p-8 shadow-elevated">

            {/* Step 1: Work Type */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                <h3 className="font-display text-lg font-bold text-light">Darbo tipas</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {workTypes.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => handleWorkTypeChange(w.id)}
                    className={`p-4 rounded-xl border text-center transition-all duration-200 ${
                      workType === w.id
                        ? "border-secondary bg-secondary/20 text-secondary"
                        : "border-secondary/20 bg-primary/40 text-light/70 hover:border-secondary/50 hover:text-light"
                    }`}
                  >
                    <span className="text-sm font-semibold block">{w.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Details */}
            {workType && (
              <div className="mb-8 animate-fade-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                  <h3 className="font-display text-lg font-bold text-light">Detalės</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectField
                    label="Medžiagos tipas"
                    value={material}
                    onChange={(v) => { setMaterial(v); setResult(null); }}
                    options={materialTypes[workType]}
                    placeholder="Pasirinkite medžiagą..."
                  />
                  <SelectField
                    label="Patalpos / vietos tipas"
                    value={location}
                    onChange={(v) => { setLocation(v); setResult(null); }}
                    options={locationTypes[workType].map((l) => ({ id: l, label: l }))}
                    placeholder="Pasirinkite vietą..."
                  />
                </div>
              </div>
            )}

            {/* Step 3: Site & Complexity */}
            {workType && material && location && (
              <div className="mb-8 animate-fade-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                  <h3 className="font-display text-lg font-bold text-light">Statybvietės būklė ir sudėtingumas</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Site Status */}
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-secondary mb-2">Statybvietės būklė</label>
                    <div className="flex flex-col gap-2">
                      {Object.entries(siteStatusMultipliers).map(([key, val]) => (
                        <button
                          key={key}
                          onClick={() => { setSiteStatus(key); setResult(null); }}
                          className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                            siteStatus === key
                              ? "border-secondary bg-secondary/20"
                              : "border-secondary/20 bg-primary/40 hover:border-secondary/40"
                          }`}
                        >
                          <span className={`text-sm font-semibold block ${siteStatus === key ? "text-secondary" : "text-light"}`}>{val.label}</span>
                          <span className="text-xs text-light/50 mt-0.5 block">{val.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Complexity */}
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-secondary mb-2">Darbo sudėtingumas</label>
                    <div className="flex flex-col gap-2">
                      {Object.entries(complexityMultipliers).map(([key, val]) => (
                        <button
                          key={key}
                          onClick={() => { setComplexity(key); setResult(null); }}
                          className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                            complexity === key
                              ? "border-secondary bg-secondary/20"
                              : "border-secondary/20 bg-primary/40 hover:border-secondary/40"
                          }`}
                        >
                          <span className={`text-sm font-semibold block ${complexity === key ? "text-secondary" : "text-light"}`}>{val.label}</span>
                          <span className="text-xs text-light/50 mt-0.5 block">{val.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Area */}
            {workType && material && location && complexity && siteStatus && (
              <div className="mb-8 animate-fade-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">4</span>
                  <h3 className="font-display text-lg font-bold text-light">Plotas</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 max-w-xs">
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={area}
                      onChange={(e) => { setArea(e.target.value); setResult(null); }}
                      placeholder="pvz. 25"
                      className="w-full bg-primary/60 border border-secondary/30 text-light rounded-lg px-4 py-3 focus:outline-none focus:border-secondary transition-colors font-medium placeholder:text-light/30"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary font-semibold text-sm">m²</span>
                  </div>
                  <span className="text-light/40 text-sm">Įveskite plotą kvadratiniais metrais</span>
                </div>
              </div>
            )}

            {/* Calculate Button */}
            {canCalculate && !result && (
              <button
                onClick={calculate}
                className="w-full py-4 bg-secondary text-primary font-display font-bold text-lg rounded-xl hover:bg-secondary/90 transition-all duration-200 flex items-center justify-center gap-3 animate-fade-up shadow-stone hover:shadow-elevated"
              >
                <Calculator className="w-5 h-5" />
                Skaičiuoti kainą
              </button>
            )}

            {/* Result */}
            {result && (
              <div className="mt-2 animate-fade-up">
                <div className="bg-primary/80 border border-secondary/40 rounded-2xl p-6 text-center">
                  <p className="text-secondary text-xs font-semibold tracking-widest uppercase mb-2">Apytikslė kaina</p>
                  <div className="font-display text-5xl font-bold text-light mb-1">
                    €{result.min.toLocaleString()} – €{result.max.toLocaleString()}
                  </div>
                  <p className="text-light/50 text-sm mb-4">{result.area} m² · Darbo kaina be medžiagų</p>
                  <div className="flex items-start gap-2 bg-secondary/10 border border-secondary/20 rounded-xl p-4 text-left mb-4">
                    <Info className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-light/60 text-xs leading-relaxed">
                      Ši kaina yra apytikslė ir apima tik darbo sąnaudas. Medžiagų kaina skaičiuojama atskirai. Galutinė kaina gali skirtis priklausomai nuo projekto specifikos. Susisiekite su mumis dėl tikslaus įkainojimo.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={reset}
                      className="flex-1 py-3 border border-secondary/30 text-light/70 rounded-xl hover:border-secondary hover:text-light transition-all duration-200 font-semibold text-sm"
                    >
                      Skaičiuoti iš naujo
                    </button>
                    <a
                      href="#contact"
                      className="flex-1 py-3 bg-secondary text-primary rounded-xl hover:bg-secondary/90 transition-all duration-200 font-bold text-sm text-center"
                    >
                      Gauti tikslią kainą
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
