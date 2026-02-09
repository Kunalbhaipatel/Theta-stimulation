
import React, { useState, useRef, useEffect } from 'react';
import { DocumentProcessor } from './services/documentProcessor';
import { GeminiService } from './services/geminiService';
import { Stage1Viewer, Stage2Viewer, Stage3Viewer, Stage4Viewer } from './components/AnalysisStages';
import { SystemGuide } from './components/SystemGuide';
import { ProcessingResult, ProcessingStage } from './types';
import { 
  Play, RotateCcw, Layers, Network, FileText, Zap, Box, Binary, BookOpen, Upload, CloudLightning,
  Sun, Moon, HelpCircle, BrainCircuit, Image as ImageIcon, Loader2
} from 'lucide-react';

const PHYSICS_DEMO_TEXT = `The particle has a mass of 5.0 kg and a volume of 0.5 m3. 
The circle has a radius of 12 cm. 
The video clip has a frame rate of 60 fps and a duration of 10 seconds.
The system temperature is 300 Kelvin. 
The network transmits at a frequency of 2.4 GHz.`;

export default function App() {
  const [text, setText] = useState<string>(PHYSICS_DEMO_TEXT);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [results, setResults] = useState<ProcessingResult | null>(null);
  const [activeStage, setActiveStage] = useState<ProcessingStage>(ProcessingStage.SYSTEM);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const processor = new DocumentProcessor();
  const geminiService = new GeminiService();

  // Real-time processing effect (Text only)
  useEffect(() => {
    if (isLiveMode && text.trim() && !imagePreview) {
      const timer = setTimeout(() => {
        runProcessor(text, false); 
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [text, isLiveMode, imagePreview]);

  const runProcessor = (inputText: string, switchTab: boolean = true) => {
    setIsProcessing(true);
    setProcessingStatus('Processing Logic Shards...');
    
    // Small delay to allow UI to show processing state
    setTimeout(() => {
      const res = processor.process(inputText);
      setResults(res);
      if (switchTab) {
        setActiveStage(ProcessingStage.STAGE1);
      }
      setIsProcessing(false);
      setProcessingStatus('');
    }, 500);
  };

  const handleManualAnalyze = () => {
    runProcessor(text, true);
  };

  const handleClear = () => {
    setText('');
    setImagePreview(null);
    setResults(null);
    setActiveStage(ProcessingStage.INPUT);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
        // Handle Image
        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64Url = e.target?.result as string;
            setImagePreview(base64Url);
            setText('Analyzing visual data structure...');
            
            // 1. Extract base64 data (remove header)
            const base64Data = base64Url.split(',')[1];
            
            setIsProcessing(true);
            setProcessingStatus('Simulation Engine: Extracting Physics Properties...');
            
            // 2. Call Gemini Service (Simulation Mode)
            const analysisText = await geminiService.analyzeImage(base64Data, file.type);
            setText(analysisText);
            
            // 3. Process the description
            setProcessingStatus('Compiling Data Shards...');
            const res = processor.process(analysisText);
            setResults(res);
            setIsProcessing(false);
            setProcessingStatus('');
            
            // Optional: Auto switch
            // setActiveStage(ProcessingStage.STAGE1);
        };
        reader.readAsDataURL(file);
    } else {
        // Handle Text
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setText(content);
            setImagePreview(null);
            runProcessor(content, true);
        };
        reader.readAsText(file);
    }

    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const NavTab = ({ stage, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveStage(stage)}
      className={`text-sm font-medium transition-all duration-200 px-3 py-2 rounded-full flex items-center gap-2
        ${activeStage === stage 
          ? (isLightMode ? 'bg-black text-white shadow-md' : 'bg-white text-black shadow-md') 
          : (isLightMode ? 'text-slate-500 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-white/10')
        }
      `}
      title={typeof label === 'string' ? label : ''}
    >
      {Icon && <Icon size={16} />}
      {label && <span>{label}</span>}
    </button>
  );

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-500
      ${isLightMode ? 'bg-[#f0f2f5] text-slate-900' : 'bg-black text-[#f5f5f7]'}
    `}>
      
      {/* --- TOP NAVIGATION BAR (Apple Style) --- */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-colors duration-500
        ${isLightMode ? 'bg-white/70 border-slate-200' : 'bg-[#1d1d1f]/80 border-white/10'}
      `}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          
          {/* Logo Area */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveStage(ProcessingStage.SYSTEM)}>
             <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transition-colors
                ${isLightMode ? 'bg-blue-600 shadow-blue-500/20' : 'bg-blue-600 shadow-blue-500/30'}
             `}>
               <BrainCircuit size={18} className="text-white" />
             </div>
             <span className={`text-sm font-bold tracking-wide ${isLightMode ? 'text-slate-800' : 'text-white'}`}>
                Theta Stimulation
             </span>
          </div>

          {/* Center Tabs */}
          <div className="hidden md:flex items-center gap-2 h-full">
             <NavTab stage={ProcessingStage.SYSTEM} icon={HelpCircle} />
             <div className={`h-4 w-[1px] mx-2 ${isLightMode ? 'bg-slate-300' : 'bg-white/10'}`}></div>
             <NavTab stage={ProcessingStage.INPUT} label="Input" />
             {results && (
               <>
                 <div className={`h-4 w-[1px] mx-2 ${isLightMode ? 'bg-slate-300' : 'bg-white/10'}`}></div>
                 <NavTab stage={ProcessingStage.STAGE1} label="Data Shards" />
                 <NavTab stage={ProcessingStage.STAGE2} label="Logic Reactor" />
                 <NavTab stage={ProcessingStage.STAGE3} label="Theta Geometry" />
                 <NavTab stage={ProcessingStage.STAGE4} label="Superposition to Binary" />
               </>
             )}
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsLightMode(!isLightMode)}
              className={`p-2 rounded-full transition-colors
                ${isLightMode ? 'bg-slate-200 text-slate-600 hover:text-slate-900' : 'bg-white/10 text-slate-400 hover:text-white'}
              `}
            >
              {isLightMode ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            
            <button 
              onClick={() => setActiveStage(ProcessingStage.INPUT)}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-colors shadow-lg
                ${isLightMode 
                  ? 'bg-slate-900 text-white hover:bg-slate-800' 
                  : 'bg-white text-black hover:bg-slate-200'}
              `}
            >
              New Analysis
            </button>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
        
        {/* SYSTEM GUIDE */}
        {activeStage === ProcessingStage.SYSTEM && (
           <SystemGuide isLightMode={isLightMode} />
        )}

        {/* INPUT STAGE */}
        {activeStage === ProcessingStage.INPUT && (
           <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="text-center mb-10 space-y-4">
               <h2 className={`text-5xl font-bold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                 Input Source.
               </h2>
               <p className={`text-xl font-light ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                 Upload visual data or paste documentation to initiate the physics pipeline.
               </p>
             </div>

             <div className={`rounded-3xl overflow-hidden shadow-2xl relative group transition-colors duration-500
                ${isLightMode ? 'bg-white border border-slate-200' : 'bg-[#1d1d1f] border border-white/10'}
             `}>
                
                {/* Toolbar */}
                <div className={`p-2 flex justify-between items-center border-b px-4 transition-colors
                   ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#2d2d2f]/50 border-white/5'}
                `}>
                   <div className="flex items-center gap-4">
                      {/* Live Mode Toggle */}
                      <button 
                        onClick={() => setIsLiveMode(!isLiveMode)}
                        disabled={!!imagePreview}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                          isLiveMode 
                            ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' 
                            : (isLightMode ? 'bg-slate-200 text-slate-500 border-transparent' : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10')
                        } ${imagePreview ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <CloudLightning size={14} className={isLiveMode ? "animate-pulse" : ""} />
                        {isLiveMode ? 'LIVE ON' : 'LIVE OFF'}
                      </button>
                      
                      {/* Upload Button */}
                      <div className="relative">
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".txt,.md,.json,.csv,.log,image/png,image/jpeg,image/webp"
                        />
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                            ${isLightMode 
                               ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                               : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}
                          `}
                        >
                          <Upload size={14} />
                          UPLOAD FILE / IMAGE
                        </button>
                      </div>
                   </div>

                   <button onClick={handleClear} className="p-2 text-slate-500 hover:text-blue-500 transition-colors" title="Clear All">
                      <RotateCcw size={16}/>
                   </button>
                </div>
                
                {/* INPUT AREA: SPLIT IF IMAGE */}
                <div className="flex flex-col md:flex-row h-[400px]">
                    {imagePreview && (
                        <div className={`w-full md:w-1/2 p-6 flex flex-col justify-center items-center relative overflow-hidden
                             ${isLightMode ? 'bg-slate-100' : 'bg-black/30'}
                        `}>
                             <img src={imagePreview} alt="Analysis Target" className="max-h-full max-w-full rounded-xl shadow-lg border border-white/10" />
                             <div className="absolute top-4 left-4 bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10">
                                 VISUAL SOURCE
                             </div>
                        </div>
                    )}

                    <div className={`relative ${imagePreview ? 'w-full md:w-1/2 border-t md:border-t-0 md:border-l' : 'w-full'} 
                        ${isLightMode ? 'border-slate-200' : 'border-white/5'}`
                    }>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className={`w-full h-full bg-transparent p-8 font-mono text-sm focus:outline-none resize-none
                                ${isLightMode ? 'text-slate-800 placeholder:text-slate-400' : 'text-slate-200 placeholder:text-slate-600'}
                            `}
                            placeholder="Enter documentation or upload an image for physics extraction..."
                        />
                        {isProcessing && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-10 animate-in fade-in">
                                <Loader2 size={32} className="text-blue-500 animate-spin mb-4" />
                                <div className="text-sm font-bold text-white">{processingStatus || 'Processing...'}</div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className={`p-6 border-t flex justify-between items-center transition-colors
                   ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#1d1d1f] border-white/5'}
                `}>
                   <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                      <span>{text.length} CHARS</span>
                      {isLiveMode && <span className="text-emerald-500 font-bold">• REALTIME SYNC</span>}
                   </div>
                   
                   {!isLiveMode && (
                     <button
                        onClick={handleManualAnalyze}
                        disabled={!text.trim() || isProcessing}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full text-sm font-bold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-blue-900/40"
                      >
                        {isProcessing ? 'Analysing...' : <><Play size={16} fill="currentColor" /> Analyze</>}
                      </button>
                   )}
                   {isLiveMode && (
                      <div className="flex items-center gap-2 text-emerald-500 text-sm font-bold px-8 py-3">
                         <Zap size={16} fill="currentColor" />
                         Running
                      </div>
                   )}
                </div>
             </div>
             
             {/* Presets */}
             <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => { setText(PHYSICS_DEMO_TEXT); setImagePreview(null); }}
                  className={`border p-4 rounded-2xl text-left transition-all
                     ${isLightMode ? 'bg-white border-slate-200 hover:border-blue-400' : 'bg-[#1d1d1f] border-white/5 hover:border-white/20'}
                  `}
                >
                   <div className={`text-sm font-bold mb-1 ${isLightMode ? 'text-slate-800' : 'text-white'}`}>Load Physics Demo</div>
                   <div className="text-xs text-slate-500">Mass, Volume, Frequency data</div>
                </button>
                <div className={`border p-4 rounded-2xl text-left opacity-60
                     ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#1d1d1f] border-white/5'}
                `}>
                   <div className={`text-sm font-bold mb-1 ${isLightMode ? 'text-slate-800' : 'text-white'}`}>Supported Formats</div>
                   <div className="text-xs text-slate-500">Images (PNG/JPG), Text (.txt, .md, .json)</div>
                </div>
             </div>
           </div>
        )}

        {/* ANALYSIS STAGES */}
        {results && activeStage !== ProcessingStage.SYSTEM && activeStage !== ProcessingStage.INPUT && (
           <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="text-center mb-10 space-y-2">
                 <h2 className={`text-4xl font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    {activeStage === ProcessingStage.STAGE1 && 'Stage 1: Data Shards'}
                    {activeStage === ProcessingStage.STAGE2 && 'Stage 2: Logic Reactor'}
                    {activeStage === ProcessingStage.STAGE3 && 'Stage 3: Theta Geometry'}
                    {activeStage === ProcessingStage.STAGE4 && 'Stage 4: Superposition to Binary'}
                 </h2>
                 <p className={isLightMode ? 'text-slate-500' : 'text-slate-400'}>
                    {activeStage === ProcessingStage.STAGE1 && 'Raw input atomization into labeled shards.'}
                    {activeStage === ProcessingStage.STAGE2 && 'Applying conservation and threshold rules.'}
                    {activeStage === ProcessingStage.STAGE3 && '3D projection of logical dependencies.'}
                    {activeStage === ProcessingStage.STAGE4 && 'Recovering binary physics from abstract superpositions.'}
                 </p>
              </div>

              {activeStage === ProcessingStage.STAGE1 && <Stage1Viewer data={results} isLightMode={isLightMode} />}
              {activeStage === ProcessingStage.STAGE2 && <Stage2Viewer data={results} isLightMode={isLightMode} />}
              {activeStage === ProcessingStage.STAGE3 && <Stage3Viewer data={results} isLightMode={isLightMode} />}
              {activeStage === ProcessingStage.STAGE4 && <Stage4Viewer data={results} isLightMode={isLightMode} />}
           </div>
        )}

      </main>
    </div>
  );
}
