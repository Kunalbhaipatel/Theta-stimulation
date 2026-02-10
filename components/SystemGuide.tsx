
import React, { useState } from 'react';
import { 
  BookOpen, Database, Activity, Globe, Zap, Box, Scale, GitMerge, 
  Thermometer, Layers, Music, Image as ImageIcon, Video, FileCode, 
  FlaskConical, Atom, Leaf, X, ChevronRight, ArrowRight, ShieldAlert, CheckCircle2, ScanSearch,
  Cpu, Microscope, Binary
} from 'lucide-react';

// --- DATA STRUCTURES WITH DEEP LOGIC ---

interface DetailItem {
  id: string;
  label: string;
  icon: any;
  color: string;
  shortDesc: string;
  deepDescription: string;
  logicChains: string[];
  coreObservable?: string;
  visualExample: {
      title: string;
      scenario: string;
      formula: string;
      reduction: string;
  };
}

const MODELS: DetailItem[] = [
  { 
    id: 'physics', icon: Atom, label: 'Physics', color: 'text-cyan-400', 
    shortDesc: 'Force, Mass, Velocity, Energy',
    deepDescription: 'The fundamental layer. All other properties eventually reduce to these physical quantities. We track 5 core observables: Space, Time, Mass/Energy, Charge/Field, and Entropy.',
    logicChains: [
      'Force + Mass → Acceleration (Newton\'s 2nd Law)',
      'Velocity + Time → Distance (Kinematics)',
      'Energy (Kinetic) ↔ Energy (Potential) (Conservation)'
    ],
    coreObservable: 'Mass/Energy',
    visualExample: {
        title: "The Projectile",
        scenario: "A ball thrown in the air is not a 'game'. It is a mass obeying a gravity field.",
        formula: "y = y₀ + v₀t - ½gt²",
        reduction: "We strip the 'game' label. We keep only the Mass (kg) and the Vector (velocity). The output is a pure prediction of location in Space-Time."
    }
  },
  { 
    id: 'math', icon: Scale, label: 'Numerical', color: 'text-blue-500', 
    shortDesc: 'Angle, Radius, Area, Volume',
    deepDescription: 'Measurable quantitative attributes. Pure mathematical abstractions that define spatial extent and magnitude.',
    logicChains: [
      'Length + Width → Area',
      'Radius → Diameter (2r) → Circumference (2πr)',
      'Velocity → Acceleration (Δv/t)'
    ],
    coreObservable: 'Space & Time',
    visualExample: {
        title: "The Circle",
        scenario: "A tire, a ring, and a planet are all just 'Circle' to the engine.",
        formula: "A = πr²",
        reduction: "We discard the material (rubber, gold, rock). We extract only the Radius. The physics engine sees only the area occupied in 2D space."
    }
  },
  { 
    id: 'geo', icon: Box, label: 'Geometry', color: 'text-indigo-400', 
    shortDesc: 'Vertices, Edges, Faces, Symmetry',
    deepDescription: 'The structural rules of space. Applicable to 2D shapes, 3D models, and CAD data. Follows Euler’s rules.',
    logicChains: [
      'Vertices + Edges → Faces (Euler: V-E+F=2)',
      'Centroid + Symmetry → Tessellation Potential',
      'Fractal Dimension → Irregularity measure'
    ],
    coreObservable: 'Space (Topology)',
    visualExample: {
        title: "The Mesh",
        scenario: "A 3D model of a house is treated as a set of vectors.",
        formula: "V - E + F = 2",
        reduction: "Walls and windows are removed. Only the topology remains. If the Euler characteristic is 2, it is a closed sphere-like object topologically."
    }
  },
  { 
    id: 'bio', icon: Activity, label: 'Biological', color: 'text-emerald-400', 
    shortDesc: 'Genome, Metabolism, Species',
    deepDescription: 'Properties of living systems, emerging from chemistry. Governed by evolution, energy flow, and information (DNA).',
    logicChains: [
      'Genome Size + Mutation Rate → Evolutionary Drift',
      'Metabolic Rate + Biomass → Trophic Level',
      'Habitat + Adaptation → Survival Strategy'
    ],
    coreObservable: 'Entropy (DNA Information)',
    visualExample: {
        title: "The Cell",
        scenario: "A living cell is a machine fighting thermodynamics.",
        formula: "ΔG = ΔH - TΔS",
        reduction: "We ignore 'life'. We see a system consuming energy (Gibbs Free Energy) to lower local Entropy (ΔS) and maintain structure against chaos."
    }
  },
  { 
    id: 'chem', icon: FlaskConical, label: 'Chemistry', color: 'text-teal-400', 
    shortDesc: 'Atomic #, pH, Bond Type',
    deepDescription: 'Interactions of matter at the atomic scale. Determines reactivity, stability, and phase.',
    logicChains: [
      'pH + Concentration → Equilibrium Shift',
      'Reaction Rate + Temp → Activation Energy',
      'Electronegativity → Bond Polarity'
    ],
    coreObservable: 'Charge/Field',
    visualExample: {
        title: "The Bond",
        scenario: "Water (H2O) is not 'wet'. It is a dipole moment.",
        formula: "F = k(q₁q₂)/r²",
        reduction: "Wetness is a sensation. The physics is the Coulomb force between the Oxygen (-) and Hydrogen (+) charges creating surface tension."
    }
  },
  { 
    id: 'env', icon: Leaf, label: 'Environmental', color: 'text-green-500', 
    shortDesc: 'Biodiversity, Carbon, Humidity',
    deepDescription: 'Macro-scale ecological properties. Describes systems, climate, and resource cycles.',
    logicChains: [
      'Temp + Humidity → Dew Point',
      'Biodiversity Index + Fragmentation → Stability Risk',
      'Pollution → Bioaccumulation'
    ],
    coreObservable: 'Mass/Energy (Systems)',
    visualExample: {
        title: "The Forest",
        scenario: "A forest is a solar energy collector.",
        formula: "P_in = P_out + P_stored",
        reduction: "We strip the beauty. We calculate the Solar Irradiance (Input) vs Biomass growth (Storage). It is a battery charge cycle."
    }
  },
  { 
    id: 'comp', icon: Database, label: 'Computer File', color: 'text-slate-400', 
    shortDesc: 'Size, Checksum, Permissions',
    deepDescription: 'Digital artifacts. Properties that describe data storage, ownership, and integrity.',
    logicChains: [
      'Creation Date vs Mod Date → Integrity Check',
      'Size + Compression → Entropy Density',
      'Checksum → Digital Signature Verification'
    ],
    coreObservable: 'Information (Bits)',
    visualExample: {
        title: "The Archive",
        scenario: "A ZIP file is a box of organized switches.",
        formula: "H(x) = -Σ p(x) log p(x)",
        reduction: "The filename is irrelevant. The physics is Shannon Entropy. High entropy means the data is compressed/random. Low entropy means it is structured/patterned."
    }
  },
  { 
    id: 'soft', icon: FileCode, label: 'Software', color: 'text-yellow-400', 
    shortDesc: 'Class, Inheritance, ID',
    deepDescription: 'Abstract logical structures in code (OOP, UI). Defines behavior, scope, and relationships.',
    logicChains: [
      'Class + Inheritance → Object Identity',
      'Thread Safety → Serialization Strategy',
      'Visibility → Access Scope'
    ],
    coreObservable: 'Information (Logic)',
    visualExample: {
        title: "The Object",
        scenario: "A software Class is a blueprint for memory allocation.",
        formula: "Memory = Σ(Property_Bytes)",
        reduction: "We don't read the code. We calculate the RAM footprint required to instantiate the object states. It is space management."
    }
  },
  { 
    id: 'text', icon: BookOpen, label: 'Text', color: 'text-pink-400', 
    shortDesc: 'Font, Spacing, Alignment',
    deepDescription: 'Visual representation of language. Typography rules affect readability and layout.',
    logicChains: [
      'Font Size + Line Spacing → Readability Score',
      'Letter Spacing → Word Spacing (Micro/Macro)',
      'Encoding → Character Set Support'
    ],
    coreObservable: 'Space (Visual)',
    visualExample: {
        title: "The Glyphs",
        scenario: "Letters are just ink distribution on a surface.",
        formula: "Density = Ink / Surface_Area",
        reduction: "Meaning is subjective. Physics sees the contrast ratio of the ink against the paper (Signal to Noise ratio)."
    }
  },
  { 
    id: 'img', icon: ImageIcon, label: 'Image', color: 'text-purple-400', 
    shortDesc: 'Bit Depth, Histogram, Contrast',
    deepDescription: '2D array of pixels. Properties define visual fidelity, color range, and compression.',
    logicChains: [
      'Bit Depth → Color Mode (RGB/CMYK)',
      'Contrast Ratio → Accessibility (WCAG)',
      'Histogram → Exposure Value'
    ],
    coreObservable: 'Light (EM Field)',
    visualExample: {
        title: "The Matrix",
        scenario: "A photo is a photon map.",
        formula: "I = P / A",
        reduction: "We treat the image as an intensity map of light hitting a sensor. We analyze the energy distribution (Histogram) rather than the subject."
    }
  },
  { 
    id: 'vid', icon: Video, label: 'Video', color: 'text-red-400', 
    shortDesc: 'FPS, Bitrate, Codec',
    deepDescription: 'Temporal sequence of images. Integrates time, audio, and visual data streams.',
    logicChains: [
      'Frame Rate + Duration → Total Frames',
      'Bitrate + Codec → Quality/Size Ratio',
      'Keyframe Interval → Seek Accuracy'
    ],
    coreObservable: 'Time + Light',
    visualExample: {
        title: "The Stream",
        scenario: "Video is just time-sliced light.",
        formula: "Data = Δt × Bitrate",
        reduction: "We strip the narrative. It is a flow rate of information over time, constrained by the bandwidth (pipe width)."
    }
  },
  { 
    id: 'aud', icon: Music, label: 'Audio', color: 'text-orange-400', 
    shortDesc: 'Sample Rate, Frequency, Pitch',
    deepDescription: 'Vibrational energy over time. Properties define sound quality and perception.',
    logicChains: [
      'Frequency ↔ Wavelength (Pitch)',
      'Sample Rate + Bit Depth → Dynamic Range',
      'Waveform → Timbre'
    ],
    coreObservable: 'Waves (Pressure)',
    visualExample: {
        title: "The Vibration",
        scenario: "Music is air pressure variance.",
        formula: "v = f × λ",
        reduction: "Melody is irrelevant. We analyze the Frequency (f) and Wavelength (λ) of the compression waves moving through the medium."
    }
  },
  { 
    id: 'mat', icon: Layers, label: 'Material', color: 'text-amber-600', 
    shortDesc: 'State, Melting Point, Conductivity',
    deepDescription: 'Physical properties of matter in bulk. Defines how objects interact with energy and force.',
    logicChains: [
      'Temp > Melting Point → Phase Transition',
      'Mass / Volume → Density',
      'Conductivity → Heat Capacity'
    ],
    coreObservable: 'Mass/Energy',
    visualExample: {
        title: "The Phase",
        scenario: "Ice turning to water.",
        formula: "Q = mL",
        reduction: "It's not 'melting'. It is the absorption of Latent Heat (L) breaking molecular bonds without changing temperature."
    }
  },
];

const UNIVERSAL_LOGIC = [
  { 
    title: 'Conservation', 
    desc: 'Nothing appears or disappears. Inputs fuse to create outputs derived from the same total.',
    icon: GitMerge,
    rule: 'Space × Time × Mass = Constant',
    details: 'Derived from the First Law of Thermodynamics. In our engine, this means if we calculate Density, we must have Mass and Volume inputs. Information (bits) is also treated as a conserved quantity (Entropy).'
  },
  { 
    title: 'Thresholds', 
    desc: 'Properties only emerge when a value crosses a critical point (The "Observation Zone").',
    icon: Thermometer,
    rule: 'Value > Limit → New State',
    details: 'Phase transitions logic. Example: A frequency below 20Hz is "Vibration", above 20Hz it becomes "Sound". UV light becomes "Visible Color" only between 400-700nm.'
  },
  { 
    title: 'Wave-Particle', 
    desc: 'Everything acts as both discrete points and continuous waves depending on measurement.',
    icon: Activity,
    rule: 'Frequency ↔ Energy',
    details: 'Applies to Audio (Sample Rate vs Pitch), Video (Frame Rate vs Motion Blur), and Light. We treat data as discrete shards (Particles) or continuous flows (Waves) depending on the analysis stage.'
  },
  { 
    title: 'Scale Invariance', 
    desc: 'The same logic applies at micro (quantum), macro (biology), and digital (file) scales.',
    icon: Globe,
    rule: 'Zoom In = Zoom Out',
    details: 'The "Structure" of a Solar System is logically similar to an Atom. The "Hierarchy" of a File System matches a Biological Taxonomy. Our engine uses one geometry (Stage 3) to represent all scales.'
  }
];

// --- COMPONENTS ---

const DetailOverlay: React.FC<{ item: DetailItem | any, onClose: () => void, isLogic?: boolean, isLightMode: boolean }> = ({ item, onClose, isLogic, isLightMode }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
    <div className={`relative w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border animate-in fade-in zoom-in-95 duration-300 flex flex-col md:flex-row
        ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#1d1d1f] border-white/10'}
        max-h-[90vh] md:max-h-[80vh]
    `}>
      
      {/* LEFT COLUMN: Visual Context (The Physics Dump) */}
      <div className={`w-full md:w-1/3 p-6 flex flex-col justify-between relative overflow-hidden
          ${isLightMode ? 'bg-slate-50' : 'bg-[#252528]'}
      `}>
          {/* Background decoration */}
          <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl"></div>
          
          <div>
              <div className={`p-3 rounded-2xl w-fit mb-6 shadow-lg border
                  ${isLightMode ? 'bg-white border-slate-200' : 'bg-black/50 border-white/10'}
                  ${item.color}
              `}>
                  <item.icon size={32} />
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{item.label || item.title}</h2>
              {isLogic && <div className="text-sm font-mono text-blue-500">{item.rule}</div>}
              {!isLogic && <div className="text-xs font-mono px-2 py-1 bg-blue-500/10 text-blue-500 w-fit rounded">{item.coreObservable}</div>}
          </div>

          {!isLogic && item.visualExample && (
              <div className={`mt-8 p-4 rounded-xl border relative z-10 hidden md:block
                  ${isLightMode ? 'bg-white border-slate-200' : 'bg-black/20 border-white/5'}
              `}>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Visual Case Study</div>
                  <h4 className={`text-lg font-bold mb-2 ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{item.visualExample.title}</h4>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">"{item.visualExample.scenario}"</p>
                  
                  <div className={`p-3 rounded-lg font-mono text-xs text-center mb-3
                      ${isLightMode ? 'bg-slate-100 text-slate-700' : 'bg-white/5 text-amber-400'}
                  `}>
                      {item.visualExample.formula}
                  </div>
                  
                  <div className="text-[10px] leading-relaxed opacity-70 border-t pt-3 border-dashed border-slate-500/20">
                      <span className="font-bold text-blue-500">REDUCTION: </span> 
                      {item.visualExample.reduction}
                  </div>
              </div>
          )}
      </div>

      {/* RIGHT COLUMN: Content */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
         <div className="flex justify-between items-start mb-6">
            <div>
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Core Definition</h3>
                 <p className={`text-base md:text-lg leading-relaxed font-light ${isLightMode ? 'text-slate-700' : 'text-slate-200'}`}>
                    {item.deepDescription || item.details || item.desc}
                 </p>
            </div>
            <button onClick={onClose} className={`p-2 rounded-full transition-colors flex-shrink-0
                ${isLightMode ? 'bg-slate-100 text-slate-500 hover:text-slate-900' : 'bg-[#2d2d2f] text-slate-400 hover:text-white'}
            `}>
                <X size={20} />
            </button>
         </div>

         {/* Mobile Visual Example (Moved here for better scrolling) */}
         {!isLogic && item.visualExample && (
              <div className={`mb-8 p-4 rounded-xl border relative z-10 md:hidden
                  ${isLightMode ? 'bg-white border-slate-200' : 'bg-black/20 border-white/5'}
              `}>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Visual Case Study: {item.visualExample.title}</div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">"{item.visualExample.scenario}"</p>
                  <div className="text-[10px] leading-relaxed opacity-70 border-t pt-3 border-dashed border-slate-500/20">
                      <span className="font-bold text-blue-500">REDUCTION: </span> 
                      {item.visualExample.reduction}
                  </div>
              </div>
         )}

         {!isLogic && item.logicChains && (
           <section className="mt-4 md:mt-8">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Logic Chains (Inputs → Outputs)</h3>
              <div className="grid gap-3">
                 {item.logicChains.map((chain: string, idx: number) => (
                    <div key={idx} className={`flex items-center gap-3 p-4 rounded-xl border group hover:border-blue-500/50 transition-colors
                        ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#2d2d2f] border-white/5'}
                    `}>
                       <Zap size={16} className="text-yellow-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                       <span className={`text-sm font-mono ${isLightMode ? 'text-slate-700' : 'text-white'}`}>{chain}</span>
                    </div>
                 ))}
              </div>
           </section>
         )}
      </div>
    </div>
  </div>
);

export const SystemGuide: React.FC<{ isLightMode: boolean }> = ({ isLightMode }) => {
  const [activeSection, setActiveSection] = useState<'models' | 'logic'>('models');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      {/* Apple-style Tab Navigation (Simplified) */}
      <div className="flex justify-center">
        <div className={`p-1.5 rounded-full inline-flex border shadow-xl backdrop-blur-md overflow-x-auto max-w-full
            ${isLightMode ? 'bg-white/80 border-slate-200' : 'bg-[#1d1d1f]/70 border-white/10'}
        `}>
          {[
            { id: 'models', label: '13 Models' },
            { id: 'logic', label: 'Universal Logic' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-6 md:px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                activeSection === tab.id 
                  ? (isLightMode ? 'bg-black text-white shadow-md' : 'bg-white text-black shadow-md') 
                  : (isLightMode ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white')
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- MODELS SECTION (Bento Grid) --- */}
      {activeSection === 'models' && (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
           <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className={`text-3xl md:text-5xl font-bold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                 Physics of Everything.
              </h2>
              <p className={`text-lg md:text-xl font-light leading-relaxed ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                 Every object, file, or concept maps to one of these 13 fundamental domains. Click any model to see how we reduce it to pure physics.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {MODELS.map((m) => {
                 const Icon = m.icon;
                 return (
                    <button 
                       key={m.id} 
                       onClick={() => setSelectedItem(m)}
                       className={`group relative border p-6 rounded-[2rem] text-left transition-all duration-300 hover:scale-[1.02] shadow-2xl overflow-hidden
                           ${isLightMode 
                               ? 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-blue-200' 
                               : 'bg-[#1d1d1f] hover:bg-[#2d2d2f] border-white/5 hover:border-blue-500/30'}
                       `}
                    >
                       <div className="absolute top-0 right-0 p-20 bg-gradient-to-br from-transparent to-blue-500/5 rounded-bl-[100px] pointer-events-none"></div>
                       
                       <div className="flex justify-between items-start mb-6 relative z-10">
                          <div className={`p-3.5 rounded-2xl border shadow-lg transition-all group-hover:scale-110 duration-300
                              ${isLightMode ? 'bg-white border-slate-100' : 'bg-black border-white/10'}
                              ${m.color}
                          `}>
                             <Icon size={24} />
                          </div>
                          <div className={`text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-widest
                             ${isLightMode ? 'bg-slate-100 text-slate-500' : 'bg-white/5 border-white/10 text-slate-400'}
                          `}>
                              {m.id}
                          </div>
                       </div>
                       
                       <div className="relative z-10">
                           <h4 className={`text-xl font-bold mb-2 tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{m.label}</h4>
                           <p className={`text-sm font-medium leading-relaxed mb-4 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                              {m.shortDesc}
                           </p>
                           
                           {/* Mini visual indicator of the core observable */}
                           <div className={`flex items-center gap-2 text-xs font-mono border-t pt-3
                               ${isLightMode ? 'border-slate-100 text-blue-600' : 'border-white/5 text-blue-400'}
                           `}>
                               <Microscope size={12} />
                               <span>Reduces to: {m.coreObservable}</span>
                           </div>
                       </div>
                    </button>
                 )
              })}
           </div>
        </div>
      )}

      {/* --- LOGIC SECTION --- */}
      {activeSection === 'logic' && (
        <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center max-w-3xl mx-auto space-y-4">
             <h2 className={`text-3xl md:text-5xl font-bold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                Universal Rules.
             </h2>
             <p className={`text-lg md:text-xl font-light leading-relaxed ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                The four immutable laws that govern how data transforms into structure.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {UNIVERSAL_LOGIC.map((l, idx) => {
              const Icon = l.icon;
              return (
                <button 
                  key={idx} 
                  onClick={() => setSelectedItem({...l, label: l.title, isLogic: true})}
                  className={`group relative overflow-hidden border rounded-[2.5rem] p-8 md:p-12 transition-all duration-500 text-left
                      ${isLightMode 
                          ? 'bg-white border-slate-200 hover:border-blue-400' 
                          : 'bg-[#1d1d1f] border-white/5 hover:border-blue-500/30'}
                  `}
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
                    <Icon size={200} className={isLightMode ? 'text-slate-900' : 'text-white'} />
                  </div>
                  
                  <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                     <div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest mb-6
                            ${isLightMode 
                                ? 'bg-slate-100 border-slate-200 text-slate-500' 
                                : 'bg-white/5 border-white/10 text-slate-300'}
                        `}>
                           Rule 0{idx + 1}
                        </div>
                        <h3 className={`text-3xl font-bold mb-4 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{l.title}</h3>
                        <p className={`text-lg leading-relaxed font-light ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                           {l.desc}
                        </p>
                     </div>
                     
                     <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20">
                           {l.rule}
                        </span>
                     </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* DETAIL OVERLAY MODAL */}
      {selectedItem && (
         <DetailOverlay 
            item={selectedItem} 
            isLogic={selectedItem.isLogic}
            onClose={() => setSelectedItem(null)} 
            isLightMode={isLightMode}
         />
      )}

    </div>
  );
};
