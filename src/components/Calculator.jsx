import { useState } from "react";
import { Calculator, ChevronDown, Info } from "lucide-react";

const workTypes = [
  { id: "masonry", label: "Mūro darbai" },
  { id: "tiles", label: "Plytelių klojimas" },
  { id: "restoration", label: "Restauravimas" },
  { id: "outdoor", label: "Lauko darbai" },
];

const materialTypes = {
  masonry: [
    { id: "natural", label: "Natūralus akmuo" },
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
    { id: "tiles", label: "Plytelių restauravimas" },
  ],
  outdoor: [
    { id: "floor", label: "Akmens grindys" },
    { id: "clinker", label: "Klinkerio mūras" },
    { id: "concrete", label: "Betonavimo darbai" },
  ],
};

const locationTypes = {
  tiles: ["Vonios kambarys", "Virtuvė", "Grindys", "Sienos"],
  restoration: ["Istorinis pastatas", "Privatus namas", "Kita"],
  outdoor: ["Sodas", "Privažiavimas", "Kita"],
};

const tileSizeMultipliers = {
  small:  { label: "Mažos — iki 60 cm", description: "Standartinis dydis, įprastas klojimas", min: 1.0, max: 1.0 },
  medium: { label: "Vidutinės — iki 120 cm", description: "Didesnis formatas, reikia didesnio tikslumo", min: 1.5, max: 1.7 },
  large:  { label: "Didelės — virš 120 cm", description: "Didelės plokštės, reikalingas specialistas", min: 1.7, max: 1.9 },
};

const basePrices = {
  masonry: { natural: [50, 75], brick: [30, 45] },
  tiles: { ceramic: [25, 40], porcelain: [25, 45], natural_stone: [45, 60], mosaic: [45, 75] },
  restoration: { stone: [55, 80], tiles: [35, 55] },
  outdoor: { floor: [40, 65], clinker: [25, 45], concrete: [0, 0] }, // concrete uses its own sub-type pricing
};

const siteStatusMultipliers = {
  new: { label: "Naujas statinys", description: "Paruošta darbams, griovimas nereikalingas", min: 1.0, max: 1.0 },
  demolition: { label: "Reikalingas griovimas", description: "Senasis paviršius turi būti pašalintas pirmiausia", min: 1.3, max: 1.5 },
};

const WATERPROOFING_MIN = 100;
const WATERPROOFING_MAX = 250;
const FOUNDATION_MIN_PER_LM = 75;
const FOUNDATION_MAX_PER_LM = 200;

// Concrete works sub-types — all prices include formwork labour
// Prices are per m² (floor, stairs, retaining wall) or per lm (foundation)
const concreteSubTypes = [
  {
    id: "floor",
    label: "Betoninis grindinys",
    description: "Plokštė ant grunto — įeina klojiniai, betonavimas ir apdaila",
    unit: "m²",
    min: 55,
    max: 85,
  },
  {
    id: "stairs",
    label: "Betoniniai laiptai",
    description: "Monolitiniai laiptai — įeina klojiniai ir paviršiaus apdaila",
    unit: "m²",
    min: 110,
    max: 160,
  },
  {
    id: "retaining_wall",
    label: "Atraminė siena",
    description: "Armuota atraminė siena — įeina klojiniai abiejose pusėse",
    unit: "m²",
    min: 90,
    max: 130,
  },
  {
    id: "foundation",
    label: "Pamatas",
    description: "Juostinis arba plokštelinis pamatas — įeina iškasimas, klojiniai ir betonavimas",
    unit: "lm",
    min: 120,
    max: 220,
  },
];

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
  const [concreteSubType, setConcreteSubType] = useState("");
  const [tileSize, setTileSize] = useState("");
  const [location, setLocation] = useState("");
  const [waterproofing, setWaterproofing] = useState(null);
  const [foundation, setFoundation] = useState(null);
  const [foundationLength, setFoundationLength] = useState("");
  const [siteStatus, setSiteStatus] = useState("");
  const [area, setArea] = useState("");
  const [result, setResult] = useState(null);

  const handleWorkTypeChange = (val) => {
    setWorkType(val);
    setMaterial("");
    setConcreteSubType("");
    setTileSize("");
    setLocation("");
    setWaterproofing(null);
    setFoundation(null);
    setFoundationLength("");
    setSiteStatus("");
    setResult(null);
  };

  const handleMaterialChange = (val) => {
    setMaterial(val);
    setConcreteSubType("");
    setTileSize("");
    setResult(null);
  };

  const handleLocationChange = (val) => {
    setLocation(val);
    setWaterproofing(null);
    setResult(null);
  };

  const isMasonry = workType === "masonry";
  const isConcrete = workType === "outdoor" && material === "concrete";
  const needsTileSize = workType === "tiles";
  const needsWaterproofing = workType === "tiles" && location === "Vonios kambarys";
  const needsFoundation = isMasonry;
  const needsLocation = !isMasonry && !isConcrete;
  const needsSiteCondition = !isMasonry && !isConcrete && workType !== "restoration";

  // Concrete sub-type: foundation uses lm input, others use m²
  const concreteSubTypeData = concreteSubTypes.find((c) => c.id === concreteSubType);
  const concreteUsesLm = concreteSubType === "foundation";

  // Visibility logic
  const showConcreteSubType = isConcrete && material;
  const showFoundation = needsFoundation && material;
  const showTileSize = needsTileSize && material;
  const showLocation = needsLocation && workType && material && (!needsTileSize || tileSize);
  const showWaterproofing = needsWaterproofing && location;
  const showSiteCondition = needsSiteCondition && showLocation && location && (!needsWaterproofing || waterproofing !== null);
  const showArea =
    (isConcrete && concreteSubType) ||
    (isMasonry && foundation !== null && (!foundation || foundationLength)) ||
    (workType === "restoration" && location) ||
    (needsSiteCondition && showSiteCondition && siteStatus);

  const canCalculate =
    workType && material && area && Number(area) > 0 &&
    (!isConcrete || concreteSubType) &&
    (!needsTileSize || tileSize) &&
    (!needsLocation || location) &&
    (!needsWaterproofing || waterproofing !== null) &&
    (!needsFoundation || (foundation !== null && (!foundation || (foundationLength && Number(foundationLength) > 0)))) &&
    (!needsSiteCondition || siteStatus);

  const calculate = () => {
    if (!canCalculate) return;

    const areaNum = Number(area);

    // Concrete works — price is self-contained per sub-type (includes formwork)
    if (isConcrete && concreteSubTypeData) {
      const labourMin = Math.round(concreteSubTypeData.min * areaNum);
      const labourMax = Math.round(concreteSubTypeData.max * areaNum);
      setResult({
        min: labourMin,
        max: labourMax,
        area: areaNum,
        unit: concreteSubTypeData.unit,
        concreteLabel: concreteSubTypeData.label,
        waterproofing: false, waterMin: 0, waterMax: 0,
        foundation: false, foundMin: 0, foundMax: 0, foundationLength: 0,
      });
      return;
    }

    const [baseMin, baseMax] = basePrices[workType][material];

    let sizeMin = 1.0, sizeMax = 1.0;
    if (needsTileSize && tileSize) {
      sizeMin = tileSizeMultipliers[tileSize].min;
      sizeMax = tileSizeMultipliers[tileSize].max;
    }

    let statusMin = 1.0, statusMax = 1.0;
    if (needsSiteCondition && siteStatus) {
      statusMin = siteStatusMultipliers[siteStatus].min;
      statusMax = siteStatusMultipliers[siteStatus].max;
    }

    const labourMin = Math.round(baseMin * statusMin * sizeMin * areaNum);
    const labourMax = Math.round(baseMax * statusMax * sizeMax * areaNum);

    const waterMin = waterproofing ? WATERPROOFING_MIN : 0;
    const waterMax = waterproofing ? WATERPROOFING_MAX : 0;

    const lm = foundation ? Number(foundationLength) : 0;
    const foundMin = Math.round(FOUNDATION_MIN_PER_LM * lm);
    const foundMax = Math.round(FOUNDATION_MAX_PER_LM * lm);

    setResult({
      min: labourMin + waterMin + foundMin,
      max: labourMax + waterMax + foundMax,
      area: areaNum,
      waterproofing, waterMin, waterMax,
      foundation, foundMin, foundMax,
      foundationLength: lm,
    });
  };

  const reset = () => {
    setWorkType(""); setMaterial(""); setConcreteSubType(""); setTileSize("");
    setLocation(""); setWaterproofing(null);
    setFoundation(null); setFoundationLength("");
    setSiteStatus(""); setArea("");
    setResult(null);
  };

  return (
    <section id="calculator" className="py-24 bg-charcoal-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4">Kainų skaičiuoklė</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-light mb-4">Apskaičiuokite savo kainą</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded mb-6" />
          <p className="text-light/60 max-w-xl mx-auto text-sm leading-relaxed">
            Užpildykite žemiau esančią formą, kad gautumėte apytikslę projekto kainą. Galutinė kaina gali skirtis priklausomai nuo projekto specifikos.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-secondary/20 rounded-2xl p-8 shadow-elevated">

            {/* Step 1: Work Type */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                <h3 className="font-display text-lg font-bold text-light">Darbų tipas</h3>
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

            {/* Step 2: Material */}
            {workType && (
              <div className="mb-8 animate-fade-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
                  <h3 className="font-display text-lg font-bold text-light">Medžiagos tipas</h3>
                </div>
                <SelectField
                  label="Medžiaga"
                  value={material}
                  onChange={handleMaterialChange}
                  options={materialTypes[workType]}
                  placeholder="Pasirinkite medžiagą..."
                />
              </div>
            )}

            {/* Step 3: Concrete Sub-Type (outdoor + concrete only) */}
            {showConcreteSubType && (
              <div className="mb-8 animate-fade-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                  <h3 className="font-display text-lg font-bold text-light">Betonavimo darbų tipas</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {concreteSubTypes.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => { setConcreteSubType(sub.id); setArea(""); setResult(null); }}
                      className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                        concreteSubType === sub.id
                          ? "border-secondary bg-secondary/20"
                          : "border-secondary/20 bg-primary/40 hover:border-secondary/40"
                      }`}
                    >
                      <span className={`text-sm font-semibold block ${concreteSubType === sub.id ? "text-secondary" : "text-light"}`}>
                        {sub.label}
                      </span>
                      <span className="text-xs text-light/50 mt-0.5 block">
                        {sub.description} · €{sub.min}–€{sub.max} / {sub.unit}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Foundation (masonry only) */}
            {showFoundation && (
              <div className="mb-8 animate-fade-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                  <h3 className="font-display text-lg font-bold text-light">Pamatas</h3>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => { setFoundation(false); setFoundationLength(""); setResult(null); }}
                    className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                      foundation === false
                        ? "border-secondary bg-secondary/20"
                        : "border-secondary/20 bg-primary/40 hover:border-secondary/40"
                    }`}
                  >
                    <span className={`text-sm font-semibold block ${foundation === false ? "text-secondary" : "text-light"}`}>Tinkamas pamatas jau yra</span>
                    <span className="text-xs text-light/50 mt-0.5 block">Iškasimas ar betonavimas nereikalingas</span>
                  </button>
                  <button
                    onClick={() => { setFoundation(true); setResult(null); }}
                    className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                      foundation === true
                        ? "border-secondary bg-secondary/20"
                        : "border-secondary/20 bg-primary/40 hover:border-secondary/40"
                    }`}
                  >
                    <span className={`text-sm font-semibold block ${foundation === true ? "text-secondary" : "text-light"}`}>Reikia iškasti ir išbetonuoti pamatą</span>
                    <span className="text-xs text-light/50 mt-0.5 block">€{FOUNDATION_MIN_PER_LM}–€{FOUNDATION_MAX_PER_LM} už tiesinį metrą</span>
                  </button>
                </div>
                {foundation === true && (
                  <div className="mt-4 animate-fade-up">
                    <label className="block text-xs font-semibold tracking-widest uppercase text-secondary mb-2">Pamato ilgis</label>
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1 max-w-xs">
                        <input
                          type="number"
                          min="1"
                          max="1000"
                          value={foundationLength}
                          onChange={(e) => { setFoundationLength(e.target.value); setResult(null); }}
                          placeholder="pvz. 12"
                          className="w-full bg-primary/60 border border-secondary/30 text-light rounded-lg px-4 py-3 focus:outline-none focus:border-secondary transition-colors font-medium placeholder:text-light/30"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary font-semibold text-sm">lm</span>
                      </div>
                      <span className="text-light/40 text-sm">Įveskite pamato ilgį tiesiniais metrais</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Tile Size (tiles only) */}
            {showTileSize && (
              <div className="mb-8 animate-fade-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
                  <h3 className="font-display text-lg font-bold text-light">Plytelių dydis</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {Object.entries(tileSizeMultipliers).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => { setTileSize(key); setResult(null); }}
                      className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                        tileSize === key
                          ? "border-secondary bg-secondary/20"
                          : "border-secondary/20 bg-primary/40 hover:border-secondary/40"
                      }`}
                    >
                      <span className={`text-sm font-semibold block ${tileSize === key ? "text-secondary" : "text-light"}`}>{val.label}</span>
                      <span className="text-xs text-light/50 mt-0.5 block">{val.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Location (not masonry) */}
            {showLocation && (
              <div className="mb-8 animate-fade-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">{needsTileSize ? 4 : 3}</span>
                  <h3 className="font-display text-lg font-bold text-light">Patalpos / vietos tipas</h3>
                </div>
                <SelectField
                  label="Vieta"
                  value={location}
                  onChange={handleLocationChange}
                  options={locationTypes[workType].map((l) => ({ id: l, label: l }))}
                  placeholder="Pasirinkite vietą..."
                />
              </div>
            )}

            {/* Waterproofing (tiles + bathroom only) */}
            {showWaterproofing && (
              <div className="mb-8 animate-fade-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">5</span>
                  <h3 className="font-display text-lg font-bold text-light">Hidroizoliacija</h3>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => { setWaterproofing(true); setResult(null); }}
                    className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                      waterproofing === true
                        ? "border-secondary bg-secondary/20"
                        : "border-secondary/20 bg-primary/40 hover:border-secondary/40"
                    }`}
                  >
                    <span className={`text-sm font-semibold block ${waterproofing === true ? "text-secondary" : "text-light"}`}>Taip — reikalinga hidroizoliacija</span>
                    <span className="text-xs text-light/50 mt-0.5 block">Prideda €{WATERPROOFING_MIN}–€{WATERPROOFING_MAX} prie bendros sumos</span>
                  </button>
                  <button
                    onClick={() => { setWaterproofing(false); setResult(null); }}
                    className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                      waterproofing === false
                        ? "border-secondary bg-secondary/20"
                        : "border-secondary/20 bg-primary/40 hover:border-secondary/40"
                    }`}
                  >
                    <span className={`text-sm font-semibold block ${waterproofing === false ? "text-secondary" : "text-light"}`}>Ne — hidroizoliacija nereikalinga</span>
                    <span className="text-xs text-light/50 mt-0.5 block">Paviršius jau hidroizoliuotas arba nereikalinga</span>
                  </button>
                </div>
              </div>
            )}

            {/* Site Condition (not masonry) */}
            {showSiteCondition && (
              <div className="mb-8 animate-fade-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {needsWaterproofing ? 6 : needsTileSize ? 5 : 4}
                  </span>
                  <h3 className="font-display text-lg font-bold text-light">Statybvietės būklė</h3>
                </div>
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
            )}

            {/* Area */}
            {showArea && (
              <div className="mb-8 animate-fade-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {isConcrete ? 4 : isMasonry ? 4 : needsWaterproofing ? 7 : needsTileSize ? 6 : 5}
                  </span>
                  <h3 className="font-display text-lg font-bold text-light">
                    {isConcrete && concreteUsesLm ? "Ilgis" : "Plotas"}
                  </h3>
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
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary font-semibold text-sm">
                      {isConcrete && concreteUsesLm ? "lm" : "m²"}
                    </span>
                  </div>
                  <span className="text-light/40 text-sm">
                    {isConcrete && concreteUsesLm
                      ? "Įveskite ilgį tiesiniais metrais"
                      : "Įveskite plotą kvadratiniais metrais"}
                  </span>
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
                  <p className="text-light/50 text-sm mb-4">
                    {result.area} {result.unit || "m²"} · Darbo kaina be medžiagų
                    {result.concreteLabel ? ` · ${result.concreteLabel} (klojiniai įskaičiuoti)` : ""}
                  </p>

                  {(result.waterproofing || result.foundation) && (
                    <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-3 mb-4 text-left">
                      <p className="text-secondary text-xs font-semibold tracking-wide uppercase mb-2">Įskaičiuota</p>
                      {result.foundation && (
                        <p className="text-light/70 text-xs mb-1">
                          Betoninis pamatas ({result.foundationLength} lm): €{result.foundMin.toLocaleString()} – €{result.foundMax.toLocaleString()}
                        </p>
                      )}
                      {result.waterproofing && (
                        <p className="text-light/70 text-xs">
                          Hidroizoliacija: €{result.waterMin} – €{result.waterMax}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-start gap-2 bg-secondary/10 border border-secondary/20 rounded-xl p-4 text-left mb-4">
                    <Info className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <p className="text-light/60 text-xs leading-relaxed">
                      Tai yra apytikslė kaina, apimanti tik darbo išlaidas. Medžiagos skaičiuojamos atskirai. Galutinė kaina gali skirtis priklausomai nuo projekto specifikos. Susisiekite su mumis dėl tikslios kainos.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={reset}
                      className="flex-1 py-3 border border-secondary/30 text-light/70 rounded-xl hover:border-secondary hover:text-light transition-all duration-200 font-semibold text-sm"
                    >
                      Pradėti iš naujo
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