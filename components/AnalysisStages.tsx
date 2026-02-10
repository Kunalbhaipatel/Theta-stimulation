
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ProcessingResult, Stage1Data, Stage2Data, Stage4Output, LogicOperation, SuperpositionNode } from '../types';
import { 
  GitMerge, Layers, Zap, Activity, Atom, Network, 
  Orbit, Microscope, Binary, Target, FileDigit, 
  BarChart3, CheckCircle2, Move3d, Clock, Maximize2, Minimize2,
  Sigma, Divide, FunctionSquare, Braces, ChevronsRight, ChevronDown,
  Waves, Pi, Radio, Scan, Thermometer, Gauge, Filter, Sparkles,
  PlayCircle, RefreshCw, BarChart, Split, MousePointerClick, TrendingUp,
  Database, Scale, Box, ArrowRight
} from 'lucide-react';

interface StageProps {
    data: ProcessingResult;
    isLightMode: boolean;
}

// --- STAGE 1: DATA SHARDS (Unchanged) ---
export const Stage1Viewer: React.FC<StageProps> = ({ data, isLightMode }) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(data.stage1).map(([key, item]) => {
        const shard = item as Stage1Data;
        return (
          <div key={key} className={`group relative border rounded-3xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl
              ${isLightMode 
                  ? 'bg-white border-slate-200 hover:border-blue-400' 
                  : 'bg-[#1d1d1f] border-white/5 hover:border-blue-500/50'}
          `}>
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-slate-500">
              <Layers size={60} />
            </div>
            <div className="p-8 relative z-10">
              <div className="flex justify-between items-center mb-6">
                <span className={`text-xs font-mono uppercase tracking-widest px-2 py-1 rounded-lg
                    ${isLightMode ? 'text-blue-600 bg-blue-100' : 'text-blue-400 bg-blue-500/10'}
                `}>ID: {key.split('_')[1]}</span>
              </div>
              <p className={`font-medium text-lg leading-relaxed mb-8 ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>
                "{shard.text}"
              </p>
              <div className="flex flex-wrap gap-2">
                  {shard.labels.length > 0 ? (
                    shard.labels.map((label, idx) => (
                      <div key={idx} className={`flex items-center gap-2 px-3 py-1.5 border rounded-full text-xs
                          ${isLightMode 
                              ? 'bg-slate-100 border-slate-200 text-slate-700' 
                              : 'bg-black/40 border-white/10 text-blue-100'}
                      `}>
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        <span className="font-semibold">{label.property}</span>
                        {label.value && <span className={`font-mono ml-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>[{label.value}]</span>}
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">No extraction data</span>
                  )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// --- STAGE 2: LOGIC REACTOR (PURE PIPELINE) ---
const LogicHeatmapTree: React.FC<{ data: ProcessingResult, isLightMode: boolean }> = ({ data, isLightMode }) => {
    
    // Flatten operations
    const reactorData = useMemo(() => {
        const rawOps = (Object.values(data.stage2) as Stage2Data[]).flatMap(d => d.operations).slice(0, 10);
        return rawOps.map((op, i) => ({ ...op, id: i }));
    }, [data]);

    const getUniversalIcon = (base: string) => {
        switch(base) {
            case 'SPACE': return Box;
            case 'TIME': return Clock;
            case 'MASS_ENERGY': return Atom;
            case 'CHARGE_FIELD': return Zap;
            case 'ENTROPY': return Binary;
            default: return Activity;
        }
    };

    const getBaseColor = (base: string) => {
        switch(base) {
            case 'SPACE': return 'text-blue-500 border-blue-500';
            case 'TIME': return 'text-orange-500 border-orange-500';
            case 'MASS_ENERGY': return 'text-red-500 border-red-500';
            case 'CHARGE_FIELD': return 'text-yellow-500 border-yellow-500';
            case 'ENTROPY': return 'text-emerald-500 border-emerald-500';
            default: return 'text-slate-500 border-slate-500';
        }
    };

    return (
        <div className={`w-full min-h-[700px] rounded-[2rem] border relative overflow-hidden flex flex-col p-8
            ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0a0a0c] border-white/5'}
        `}>
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl ${isLightMode ? 'bg-slate-100' : 'bg-white/10'}`}>
                    <GitMerge size={24} className={isLightMode ? 'text-slate-800' : 'text-white'} />
                </div>
                <div>
                    <h3 className={`text-xl font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Pure Logic Pipeline</h3>
                    <p className="text-sm text-slate-500">Input ID + Noise → Logic Filter → Universal Base</p>
                </div>
            </div>

            {/* Pipeline Header Row */}
            <div className="grid grid-cols-4 gap-4 mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 px-4">
                <div>1. Noisy Input ID</div>
                <div>2. Logic Filter</div>
                <div>3. Universal Logic (Base)</div>
                <div>4. Clear Path</div>
            </div>

            {/* Logic Rows */}
            <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2">
                {reactorData.map((op, i) => {
                    const BaseIcon = getUniversalIcon(op.universalBase);
                    const colorClass = getBaseColor(op.universalBase);

                    return (
                        <div key={i} className={`grid grid-cols-4 gap-4 items-center p-4 rounded-xl border relative overflow-hidden group hover:scale-[1.01] transition-transform duration-300
                            ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#151516] border-white/5'}
                        `}>
                            {/* Column 1: Input + Noise */}
                            <div className="relative">
                                <div className={`font-mono text-xs font-bold mb-1 ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                                    {op.inputs.join(' + ')}
                                </div>
                                {/* Visual Noise Effect */}
                                <div className="absolute inset-0 pointer-events-none opacity-20 flex flex-wrap gap-0.5 overflow-hidden mix-blend-overlay">
                                    {Array.from({length: 20}).map((_, j) => (
                                        <div key={j} className={`w-1 h-1 rounded-full animate-pulse ${isLightMode ? 'bg-black' : 'bg-white'}`} style={{ animationDelay: `${Math.random()}s` }}></div>
                                    ))}
                                </div>
                                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                                    <Waves size={10} /> Raw Data
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="absolute left-[24%] top-1/2 -translate-y-1/2 text-slate-300/20">
                                <ChevronsRight size={40} />
                            </div>

                            {/* Column 2: Logic Filter */}
                            <div className="relative z-10 pl-4 border-l border-dashed border-slate-500/20">
                                <div className={`text-xs font-bold mb-1 ${isLightMode ? 'text-blue-600' : 'text-blue-400'}`}>
                                    {op.rule}
                                </div>
                                <div className="text-[10px] text-slate-500 truncate" title={op.description}>
                                    {op.description}
                                </div>
                                {/* Filter Visual */}
                                <div className={`mt-2 h-1 w-full rounded-full overflow-hidden ${isLightMode ? 'bg-slate-200' : 'bg-white/10'}`}>
                                    <div className="h-full bg-blue-500 animate-[pulse-flow_2s_linear_infinite]" style={{ width: `${op.noiseReduction}%` }}></div>
                                </div>
                            </div>

                             {/* Arrow */}
                             <div className="absolute left-[49%] top-1/2 -translate-y-1/2 text-slate-300/20">
                                <ArrowRight size={24} />
                            </div>

                            {/* Column 3: Universal Base */}
                            <div className="flex items-center gap-3 pl-4 border-l border-dashed border-slate-500/20">
                                <div className={`p-2 rounded-lg border ${colorClass} bg-opacity-10 bg-current`}>
                                    <BaseIcon size={18} />
                                </div>
                                <div>
                                    <div className={`text-xs font-bold ${colorClass.split(' ')[0]}`}>
                                        {op.universalBase}
                                    </div>
                                    <div className="text-[10px] text-slate-500">Core Observable</div>
                                </div>
                            </div>

                            {/* Column 4: Clear Path */}
                            <div className={`flex items-center justify-end gap-2 ${isLightMode ? 'text-slate-800' : 'text-white'}`}>
                                <div className="text-right">
                                    <div className="text-sm font-bold">{op.output}</div>
                                    <div className="text-[10px] text-emerald-500 font-mono">100% PURE</div>
                                </div>
                                <CheckCircle2 size={16} className="text-emerald-500" />
                            </div>
                            
                            {/* Connecting Line */}
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity w-full`}></div>
                        </div>
                    );
                })}
            </div>

            <style>{`
                @keyframes pulse-flow {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export const Stage2Viewer: React.FC<StageProps> = ({ data, isLightMode }) => {
    return <LogicHeatmapTree data={data} isLightMode={isLightMode} />;
};

// --- STAGE 3: INTERACTIVE WAVE GRID GEOMETRY ---

const WaveGrid3D: React.FC<StageProps> = ({ data, isLightMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive State
  const [rotation, setRotation] = useState({ x: 20, y: 45 }); // Degrees
  const [zoom, setZoom] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Physics Engine State
  const [temperature, setTemperature] = useState(0); // 0 (Frozen) to 100 (Chaotic)

  const nodes = useMemo(() => Object.values(data.stage3.nodes), [data]);
  const selectedNode = selectedNodeId ? data.stage3.nodes[selectedNodeId] : null;

  // Manual rotation logic (Mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMousePos.x;
      const dy = e.clientY - lastMousePos.y;
      setRotation(prev => ({
          x: Math.max(-90, Math.min(90, prev.x - dy * 0.5)), // Clamp vertical rotation
          y: prev.y + dx * 0.5
      }));
      setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  // Touch Logic (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
      setIsDragging(true);
      setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - lastMousePos.x;
      const dy = e.touches[0].clientY - lastMousePos.y;
      setRotation(prev => ({
          x: Math.max(-90, Math.min(90, prev.x - dy * 0.5)),
          y: prev.y + dx * 0.5
      }));
      setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
      const newZoom = Math.max(0.5, Math.min(2, zoom - e.deltaY * 0.001));
      setZoom(newZoom);
  };

  // 3D Projection Engine
  const project = useCallback((x: number, y: number, z: number) => {
      // 1. Rotate Y (Azimuth)
      const radY = rotation.y * (Math.PI / 180);
      const x1 = x * Math.cos(radY) - z * Math.sin(radY);
      const z1 = z * Math.cos(radY) + x * Math.sin(radY);

      // 2. Rotate X (Elevation)
      const radX = rotation.x * (Math.PI / 180);
      const y2 = y * Math.cos(radX) - z1 * Math.sin(radX);
      const z2 = z1 * Math.cos(radX) + y * Math.sin(radX);

      // 3. Perspective
      const focalLength = 800;
      const scale = focalLength / (focalLength + z2);
      const x3 = x1 * scale;
      const y3 = y2 * scale;

      return { x: x3, y: y3, scale, z: z2 };
  }, [rotation]);

  // Projected Nodes & Connections (Responsive to Temperature)
  const projectedData = useMemo(() => {
      // Physics: Temperature adds random jitter and expands the lattice
      const thermalExpansion = 1 + (temperature * 0.005);
      const jitter = temperature * 0.5;

      const projectedNodes = nodes.map((n, idx) => {
          // Adjust spatial coords for display factor + Physics simulation
          let rawX = (n.spatial_pos.x - 0) * 2 * thermalExpansion;
          let rawY = (n.spatial_pos.y - 0) * 1 * thermalExpansion;
          let rawZ = (n.spatial_pos.z - 0) * 2 * thermalExpansion;
          
          // Apply Thermal Noise (Simulated based on node ID to be deterministic per temp)
          const noiseFactorX = Math.sin(idx * 1.5) * jitter;
          const noiseFactorY = Math.cos(idx * 2.3) * jitter;
          rawX += noiseFactorX;
          rawY += noiseFactorY;

          const p = project(rawX, rawY, rawZ);
          return { ...n, px: p.x, py: p.y, scale: p.scale, zIndex: p.z };
      });

      // Sort for Painter's Algorithm (Draw back to front)
      projectedNodes.sort((a, b) => b.zIndex - a.zIndex);

      return projectedNodes;
  }, [nodes, project, temperature]);

  // Generate Projected Grid Lines (Responsive to Temperature)
  const gridLines = useMemo(() => {
      const lines = [];
      const size = 600;
      const step = 100;
      
      // Physics: High temp = Higher wave frequency and amplitude on grid
      const waveFreq = 0.01 + (temperature * 0.0005);
      const waveAmp = 30 + (temperature * 0.5);

      // Horizontal Lines
      for (let z = -size; z <= size; z += step) {
          const path = [];
          for (let x = -size; x <= size; x += step/2) {
              const yOffset = Math.sin((x + z) * waveFreq) * waveAmp; // Wave effect modified by temp
              const p = project(x, yOffset + 200, z); // Floor level +200
              path.push(`${p.x},${p.y}`);
          }
          lines.push(path.join(' L '));
      }
      return lines;
  }, [project, temperature]);


  const noiseReduction = Math.max(0, Math.min(100, (nodes.length * 8.5) - (temperature * 0.8)));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[700px]">
        
        {/* LEFT: INTERACTIVE 3D CONTAINER */}
        <div 
            className={`lg:col-span-2 relative rounded-[2rem] overflow-hidden border shadow-2xl flex flex-col cursor-move select-none touch-none
                ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#050505] border-white/5'}
                h-[400px] sm:h-[500px] lg:h-full
            `} 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            onWheel={handleWheel}
        >
            
            {/* AXIS LABELS */}
            <div className="absolute top-6 left-8 z-20 pointer-events-none">
                <div className="flex items-center gap-2 mb-1">
                    <Move3d className="text-blue-500" size={16}/>
                    <span className="text-xs font-bold text-blue-500 tracking-widest">SPACE (Y)</span>
                </div>
                <div className={`h-16 w-[1px] ml-2 ${isLightMode ? 'bg-blue-500/20' : 'bg-blue-500/50'}`}></div>
            </div>

            <div className="absolute bottom-8 right-8 z-20 pointer-events-none flex items-center gap-2">
                 <div className={`w-16 h-[1px] ${isLightMode ? 'bg-emerald-500/20' : 'bg-emerald-500/50'}`}></div>
                 <span className="text-xs font-bold text-emerald-500 tracking-widest">TIME (X)</span>
                 <Clock className="text-emerald-500" size={16}/>
            </div>

            {/* 3D SCENE */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="relative w-0 h-0" style={{ transform: `scale(${zoom})` }}>
                    
                    {/* SVG LAYER: GRID & CONNECTIONS */}
                    <svg className="absolute overflow-visible pointer-events-none" style={{ left: 0, top: 0 }}>
                         {/* GRID */}
                         {gridLines.map((d, i) => (
                             <path 
                                key={`grid-${i}`} 
                                d={`M ${d}`} 
                                fill="none" 
                                stroke={isLightMode ? '#e2e8f0' : '#1e293b'} 
                                strokeWidth="1"
                                opacity="0.5"
                             />
                         ))}

                         {/* NODE CONNECTIONS */}
                         {projectedData.map(node => 
                             node.connections.map((conn, i) => {
                                 const target = projectedData.find(n => n.id === conn.targetId);
                                 if (!target) return null;
                                 
                                 const isSelected = selectedNodeId === node.id || selectedNodeId === target.id;
                                 
                                 return (
                                     <line 
                                        key={`conn-${node.id}-${i}`}
                                        x1={node.px} y1={node.py}
                                        x2={target.px} y2={target.py}
                                        stroke={isSelected ? (isLightMode ? '#3b82f6' : '#60a5fa') : (isLightMode ? '#cbd5e1' : '#334155')}
                                        strokeWidth={isSelected ? 2 : 1}
                                        opacity={isSelected ? 1 : 0.4}
                                     />
                                 )
                             })
                         )}
                    </svg>

                    {/* DOM LAYER: NODES */}
                    {projectedData.map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        const size = 16 * node.scale * (isSelected ? 1.5 : 1);
                        
                        return (
                            <div 
                                key={node.id}
                                onMouseDown={(e) => { e.stopPropagation(); setSelectedNodeId(node.id); }}
                                onTouchEnd={(e) => { e.stopPropagation(); setSelectedNodeId(node.id); }}
                                className={`absolute rounded-full shadow-[0_0_15px_currentColor] transition-colors duration-200 cursor-pointer flex items-center justify-center
                                    ${node.is_resonating 
                                        ? (isLightMode ? 'bg-orange-500 text-orange-500' : 'bg-orange-400 text-orange-400') 
                                        : (isLightMode ? 'bg-blue-500 text-blue-500' : 'bg-blue-400 text-blue-400')}
                                    ${isSelected ? 'ring-4 ring-white/50 z-50' : 'z-10'}
                                `}
                                style={{
                                    transform: `translate(${node.px}px, ${node.py}px)`,
                                    width: size,
                                    height: size,
                                    marginLeft: -size/2,
                                    marginTop: -size/2,
                                    opacity: Math.max(0.2, Math.min(1, 1 - (node.zIndex / 1000))) // Fade distant nodes
                                }}
                            >
                                {isSelected && (
                                    <div className={`absolute -top-8 text-[10px] font-bold whitespace-nowrap px-2 py-1 rounded backdrop-blur-md
                                        ${isLightMode ? 'bg-black/80 text-white' : 'bg-white/90 text-black'}
                                    `}>
                                        {node.id}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
            
            {/* INSTRUCTIONS */}
            <div className={`absolute bottom-6 left-6 text-[10px] font-mono opacity-50 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                [DRAG] ROTATE • [SCROLL] ZOOM
            </div>

            {/* HUD Overlay */}
            <div className={`absolute top-0 right-0 p-6 ${isLightMode ? 'bg-white/80' : 'bg-black/50'} backdrop-blur-md rounded-bl-2xl border-l border-b ${isLightMode ? 'border-slate-200' : 'border-white/10'}`}>
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Structure Integrity</div>
                <div className="text-2xl font-mono font-bold flex items-center gap-2">
                    {data.stage3.system_resonance}%
                    <Activity className="text-emerald-500 animate-pulse" />
                </div>
            </div>
            
            {/* MATHEMATICAL EQUATION OVERLAY */}
            <div className={`absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl border backdrop-blur-md flex items-center gap-4 transition-all
               ${isLightMode ? 'bg-white/90 border-slate-300' : 'bg-black/70 border-white/20'}
            `}>
               <div className="font-serif italic text-lg opacity-80">
                  Θ(i) = arccos <span className="mx-1 text-blue-500">( R / {((100-temperature)/100).toFixed(2)}Z )</span> + δ<span className="text-orange-500">{temperature}°K</span>
               </div>
            </div>

        </div>

        {/* RIGHT: DYNAMIC ANALYSIS PANEL */}
        <div className={`rounded-[2rem] border p-8 flex flex-col shadow-2xl relative overflow-hidden transition-all duration-300 min-h-[400px]
            ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#1d1d1f] border-white/5'}
        `}>
             <div className="mb-6 border-b pb-6 border-dashed border-slate-500/20">
                 <div className="flex items-center gap-3 mb-4">
                     <div className={`p-3 rounded-xl ${isLightMode ? 'bg-purple-100 text-purple-600' : 'bg-purple-500/20 text-purple-400'}`}>
                         <Network size={24} />
                     </div>
                     <h3 className={`text-xl font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                        {selectedNode ? 'Node Inspector' : 'System Variables'}
                     </h3>
                 </div>
                 <p className="text-sm text-slate-500 leading-relaxed">
                     {selectedNode 
                        ? `Inspecting local quantum state of ${selectedNode.id}.`
                        : "Adjust global physics parameters to test structural resilience against thermodynamic chaos."}
                 </p>
             </div>

             {selectedNode ? (
                 <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                     <div className="grid grid-cols-2 gap-4">
                         <div className={`p-3 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'}`}>
                             <div className="text-[10px] uppercase text-slate-500 mb-1">Role</div>
                             <div className={`font-bold text-xs ${isLightMode ? 'text-slate-800' : 'text-white'}`}>{selectedNode.shape_role}</div>
                         </div>
                         <div className={`p-3 rounded-lg border ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'}`}>
                             <div className="text-[10px] uppercase text-slate-500 mb-1">Theta Angle</div>
                             <div className="font-mono text-xs text-blue-500">{selectedNode.theta_angle}°</div>
                         </div>
                     </div>
                     
                     <div>
                         <div className="text-[10px] uppercase text-slate-500 mb-2">Space-Time Coordinates</div>
                         <div className="font-mono text-xs opacity-70">
                             X: {selectedNode.spatial_pos.x} | Y: {selectedNode.spatial_pos.y} | Z: {selectedNode.spatial_pos.z}
                         </div>
                     </div>

                     <div>
                        <div className="text-[10px] uppercase text-slate-500 mb-2">Active Connections ({selectedNode.connections.length})</div>
                        <div className="max-h-[200px] overflow-y-auto custom-scrollbar space-y-2">
                            {selectedNode.connections.map((c, i) => (
                                <div key={i} className={`flex items-center justify-between text-xs p-2 rounded ${isLightMode ? 'bg-slate-100' : 'bg-white/5'}`}>
                                    <span>→ {c.targetId}</span>
                                    <span className="opacity-50 font-mono">{c.type}</span>
                                </div>
                            ))}
                            {selectedNode.connections.length === 0 && <div className="text-xs italic opacity-50">No outgoing links.</div>}
                        </div>
                     </div>
                     
                     <button 
                        onClick={() => setSelectedNodeId(null)}
                        className={`w-full py-2 text-xs font-bold rounded border hover:opacity-80
                            ${isLightMode ? 'border-slate-300 text-slate-600' : 'border-white/20 text-slate-300'}
                        `}
                     >
                        RETURN TO SYSTEM VIEW
                     </button>
                 </div>
             ) : (
                 <div className="flex-1 flex flex-col justify-between space-y-6 animate-in fade-in duration-300">
                     
                     {/* PHYSICS CONTROL PANEL */}
                     <div className={`p-5 rounded-2xl border flex flex-col gap-4
                        ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-black/20 border-white/10'}
                     `}>
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-500">
                            <div className="flex items-center gap-2">
                                <Thermometer size={14} className={temperature > 50 ? "text-orange-500" : "text-blue-500"} />
                                <span>Lattice Temperature</span>
                            </div>
                            <span className="font-mono">{temperature}°K</span>
                        </div>
                        
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={temperature}
                            onChange={(e) => setTemperature(parseInt(e.target.value))}
                            className={`w-full h-2 rounded-lg appearance-none cursor-pointer
                                ${isLightMode ? 'bg-slate-200 accent-blue-600' : 'bg-white/10 accent-blue-500'}
                            `}
                        />
                        
                        <div className="text-[10px] leading-relaxed opacity-70">
                            Increasing system temperature introduces stochastic noise to the geometry, simulating thermodynamic stress on the logical arguments.
                        </div>
                     </div>

                     <div>
                         <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                             <span>Signal Clarity</span>
                             <span>{noiseReduction.toFixed(1)}%</span>
                         </div>
                         <div className={`h-2 rounded-full overflow-hidden ${isLightMode ? 'bg-slate-200' : 'bg-white/10'}`}>
                             <div className={`h-full transition-all duration-1000 ${noiseReduction < 50 ? 'bg-orange-500' : 'bg-gradient-to-r from-blue-500 to-emerald-500'}`}
                                  style={{ width: `${noiseReduction}%` }}></div>
                         </div>
                     </div>
                     
                     <div className="text-xs text-slate-400 flex items-center gap-2">
                         <Scan size={14} />
                         <span>Click any node in the 3D view to inspect details.</span>
                     </div>
                 </div>
             )}
        </div>
    </div>
  );
};

export const Stage3Viewer: React.FC<StageProps> = ({ data, isLightMode }) => {
    return <WaveGrid3D data={data} isLightMode={isLightMode} />;
};


// --- STAGE 4: SCIENTIFIC WAVE INTERFERENCE & COLLAPSE ---

const ThetaFlowDiagram: React.FC<{ isLightMode: boolean }> = ({ isLightMode }) => {
  const strokeColor = isLightMode ? "#334155" : "#94a3b8";
  const accentColor = isLightMode ? "#3b82f6" : "#60a5fa";
  
  return (
    <div className={`w-full h-[140px] border-b border-dashed ${isLightMode ? 'border-slate-200 bg-slate-50/50' : 'border-white/5 bg-black/20'} p-4 relative overflow-hidden flex items-center justify-center`}>
         <svg viewBox="0 0 800 120" className="w-full h-full max-w-2xl">
            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill={strokeColor} />
                </marker>
            </defs>

            {/* STEP 1: THETA STIMULATION */}
            <g>
                <text x="50" y="20" fontSize="10" fontWeight="bold" fill={strokeColor} opacity="0.7">THETA STIMULATION</text>
                {/* Pulse Wave */}
                <path d="M 20 60 Q 40 20, 60 60 T 100 60" fill="none" stroke={accentColor} strokeWidth="2" className="animate-[pulse_2s_linear_infinite]" />
                <circle cx="60" cy="60" r="3" fill={accentColor} className="animate-ping" />
                {/* Arrow */}
                <path d="M 110 60 L 150 60" stroke={strokeColor} strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="4 2" />
            </g>

            {/* STEP 2: PHYSICS LAYER */}
            <g>
                 <text x="210" y="20" fontSize="10" fontWeight="bold" fill={strokeColor} opacity="0.7">PHYSICS LAYER</text>
                 <rect x="190" y="30" width="8" height="60" rx="2" fill={strokeColor} opacity="0.1" />
                 <rect x="210" y="30" width="8" height="60" rx="2" fill={strokeColor} opacity="0.1" />
                 <rect x="230" y="30" width="8" height="60" rx="2" fill={strokeColor} opacity="0.1" />
                 <rect x="250" y="30" width="8" height="60" rx="2" fill={strokeColor} opacity="0.1" />
                 <rect x="270" y="30" width="8" height="60" rx="2" fill={strokeColor} opacity="0.1" />
                 
                 {/* Diffraction lines passing through */}
                 <path d="M 170 60 L 190 60" stroke={accentColor} strokeWidth="2" opacity="0.5" />
                 <path d="M 280 40 L 320 30" stroke={accentColor} strokeWidth="1" opacity="0.3" />
                 <path d="M 280 50 L 320 50" stroke={accentColor} strokeWidth="1" opacity="0.3" />
                 <path d="M 280 60 L 320 70" stroke={accentColor} strokeWidth="1" opacity="0.3" />
                 <path d="M 280 70 L 320 90" stroke={accentColor} strokeWidth="1" opacity="0.3" />
                 
                 <path d="M 330 60 L 370 60" stroke={strokeColor} strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="4 2" />
            </g>

            {/* STEP 3: SUPERPOSITION */}
            <g>
                <text x="420" y="20" fontSize="10" fontWeight="bold" fill={strokeColor} opacity="0.7">SUPERPOSITION</text>
                <circle cx="460" cy="60" r="25" fill="none" stroke={accentColor} strokeWidth="1" strokeDasharray="2 2" className="animate-[spin_10s_linear_infinite]" />
                <circle cx="460" cy="60" r="15" fill="none" stroke={strokeColor} strokeWidth="1" opacity="0.5" />
                <path d="M 435 60 Q 460 35, 485 60 T 535 60" fill="none" stroke={strokeColor} strokeWidth="1" opacity="0.3" />
                <path d="M 435 60 Q 460 85, 485 60" fill="none" stroke={strokeColor} strokeWidth="1" opacity="0.3" />
                
                <path d="M 500 60 L 540 60" stroke={strokeColor} strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="4 2" />
            </g>

            {/* STEP 4: PROBABILITY */}
            <g>
                <text x="600" y="20" fontSize="10" fontWeight="bold" fill={strokeColor} opacity="0.7">INPUT PROBABILITY</text>
                {/* Probability Curve */}
                <path d="M 580 90 Q 640 90, 640 40 Q 640 90, 700 90" fill="none" stroke={isLightMode ? '#10b981' : '#34d399'} strokeWidth="2" />
                <circle cx="640" cy="40" r="4" fill={isLightMode ? '#10b981' : '#34d399'} />
                <text x="650" y="40" fontSize="9" fill={strokeColor}>New Input</text>
            </g>
         </svg>
    </div>
  );
}

const WaveInterferenceEngine: React.FC<{ data: ProcessingResult, isLightMode: boolean }> = ({ data, isLightMode }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [collapsed, setCollapsed] = useState(false);
    
    // Safety check for nodes
    const nodes = data.stage4.quantum_nodes;
    if (!nodes || nodes.length === 0) {
        return <div className="p-12 text-center opacity-50">No quantum superposition states detected in input.</div>;
    }

    const activeNode = nodes[activeIndex] || nodes[0];

    // Probability Distribution for Graph (Simulated but deterministic based on node)
    const probabilities = useMemo(() => {
        return Array.from({length: 12}).map((_, i) => {
            const val = Math.sin((i + activeIndex) * 0.8) * 0.5 + 0.5;
            // The "True" peak should be high
            return i === 8 ? 0.95 : val * 0.6;
        });
    }, [activeIndex]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        if(!ctx) return;
        
        // High DPI setup
        const dpr = window.devicePixelRatio || 1;
        // Fix for canvas rect being 0 initially
        const rect = canvas.getBoundingClientRect();
        if(rect.width === 0) return;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        
        let t = 0;
        let animationId: number;

        const draw = () => {
            if(collapsed) {
                 // Static "Collapsed" State drawing
                const w = rect.width;
                const h = rect.height;
                const centerY = h / 2;
                
                ctx.clearRect(0, 0, w, h);
                
                // Flatline axis
                ctx.beginPath();
                ctx.strokeStyle = isLightMode ? '#94a3b8' : '#475569';
                ctx.lineWidth = 2;
                ctx.moveTo(0, centerY);
                ctx.lineTo(w, centerY);
                ctx.stroke();

                // Dirac Delta Function (Spike)
                const spikeX = w * 0.7; // Fixed position for visual stability
                ctx.beginPath();
                ctx.strokeStyle = isLightMode ? '#10b981' : '#34d399';
                ctx.lineWidth = 4;
                ctx.moveTo(spikeX, centerY);
                ctx.lineTo(spikeX, centerY - 100);
                ctx.stroke();

                // Particle
                ctx.fillStyle = isLightMode ? '#10b981' : '#34d399';
                ctx.beginPath();
                ctx.arc(spikeX, centerY - 100, 6, 0, Math.PI * 2);
                ctx.fill();

                // Label
                ctx.fillStyle = isLightMode ? '#10b981' : '#34d399';
                ctx.font = 'bold 12px monospace';
                ctx.fillText("STATE DETERMINED", spikeX + 10, centerY - 90);

                return;
            } 
            
            t += 0.05;
            const w = rect.width;
            const h = rect.height;
            const centerY = h / 2;
            
            ctx.clearRect(0, 0, w, h);
            
            // Grid Lines
            ctx.strokeStyle = isLightMode ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            for(let x=0; x<w; x+=40) { ctx.moveTo(x,0); ctx.lineTo(x,h); }
            for(let y=0; y<h; y+=40) { ctx.moveTo(0,y); ctx.lineTo(w,y); }
            ctx.stroke();

            // Wave A properties (Concept 1)
            const freqA = 0.02;
            const ampA = 30;
            
            // Wave B properties (Concept 2 - varies by index)
            const freqB = 0.02 + (activeIndex * 0.005);
            const phaseB = activeIndex * 0.5;
            const ampB = 30;

            // Draw Source Wave A (Top, faint)
            ctx.beginPath();
            ctx.strokeStyle = isLightMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.3)';
            ctx.lineWidth = 2;
            for(let x=0; x<w; x++) {
                ctx.lineTo(x, centerY - 50 + Math.sin(x * freqA + t) * ampA);
            }
            ctx.stroke();
            
            // Draw Source Wave B (Top, faint)
            ctx.beginPath();
            ctx.strokeStyle = isLightMode ? 'rgba(249, 115, 22, 0.3)' : 'rgba(249, 115, 22, 0.3)';
            ctx.lineWidth = 2;
            for(let x=0; x<w; x++) {
                ctx.lineTo(x, centerY - 50 + Math.sin(x * freqB + t + phaseB) * ampB);
            }
            ctx.stroke();

            // Draw Resultant Superposition (Main)
            ctx.beginPath();
            const gradient = ctx.createLinearGradient(0, 0, w, 0);
            gradient.addColorStop(0, isLightMode ? '#10b981' : '#34d399');
            gradient.addColorStop(1, isLightMode ? '#3b82f6' : '#60a5fa');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 4;
            
            for(let x=0; x<w; x++) {
                const yA = Math.sin(x * freqA + t) * ampA;
                const yB = Math.sin(x * freqB + t + phaseB) * ampB;
                // Constructive Interference Calculation
                const y = centerY + 40 + (yA + yB);
                ctx.lineTo(x, y);
            }
            ctx.stroke();
            
            animationId = requestAnimationFrame(draw);
        };
        
        draw();
        return () => cancelAnimationFrame(animationId);
    }, [activeIndex, collapsed, isLightMode]);

    // Reset collapse state when changing nodes
    useEffect(() => {
        setCollapsed(false);
    }, [activeIndex]);

    return (
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 h-[750px] lg:h-[650px] font-mono`}>
            
            {/* LEFT: SUPERPOSITION SELECTOR */}
            <div className={`rounded-[2rem] border p-6 flex flex-col gap-4 overflow-hidden
                ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0a0a0c] border-white/5'}
            `}>
                <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${isLightMode ? 'bg-slate-100' : 'bg-white/10'}`}>
                        <Split size={18} />
                    </div>
                    <div>
                        <h3 className={`text-sm font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Quantum Pairs</h3>
                        <p className="text-[10px] text-slate-500">Cross-domain entanglement</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
                    {nodes.map((node, i) => (
                        <button 
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`w-full text-left p-3 rounded-xl border transition-all text-xs relative group
                                ${activeIndex === i 
                                    ? (isLightMode ? 'bg-slate-100 border-blue-400' : 'bg-white/10 border-blue-500') 
                                    : (isLightMode ? 'hover:bg-slate-50 border-transparent' : 'hover:bg-white/5 border-transparent')}
                            `}
                        >
                            <div className="font-bold mb-1 truncate">{node.category_mix}</div>
                            <div className="opacity-50 text-[10px]">{node.id}</div>
                            {activeIndex === i && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>}
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT: SCIENTIFIC DASHBOARD */}
            <div className={`lg:col-span-2 rounded-[2rem] border overflow-hidden flex flex-col relative
                 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#151516] border-white/5'}
            `}>
                
                {/* 0. NEW THETA FLOW DIAGRAM */}
                <ThetaFlowDiagram isLightMode={isLightMode} />

                {/* 1. WAVE MONITOR (CANVAS) */}
                <div className="flex-1 relative min-h-[200px] border-b border-dashed border-slate-500/20 bg-opacity-50">
                     <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                     
                     {/* Overlay Labels */}
                     <div className="absolute top-4 left-6 flex gap-4 text-[10px] font-bold tracking-widest pointer-events-none">
                         <span className={isLightMode ? 'text-blue-500' : 'text-blue-400'}>● SOURCE A</span>
                         <span className={isLightMode ? 'text-orange-500' : 'text-orange-400'}>● SOURCE B</span>
                     </div>
                     <div className="absolute bottom-4 left-6 text-[10px] font-bold tracking-widest text-emerald-500 pointer-events-none">
                         ● INTERFERENCE PATTERN (SUPERPOSITION)
                     </div>
                </div>

                {/* 2. ANALYTICS & CONTROLS */}
                <div className={`h-[240px] flex flex-col md:flex-row
                     ${isLightMode ? 'bg-white' : 'bg-[#0f0f11]'}
                `}>
                    {/* A. PROBABILITY DISTRIBUTION GRAPH */}
                    <div className="flex-1 p-6 border-r border-dashed border-slate-500/20 flex flex-col">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <BarChart size={14} /> Probability Density
                        </div>
                        <div className="flex-1 flex items-end justify-between gap-1 pb-4">
                            {probabilities.map((h, i) => (
                                <div key={i} className="flex-1 bg-slate-500/20 rounded-t-sm relative group overflow-hidden" style={{ height: `${h * 100}%` }}>
                                    <div className={`absolute bottom-0 left-0 right-0 top-0 opacity-50 transition-all duration-500
                                        ${i === 8 ? 'bg-emerald-500' : (isLightMode ? 'bg-slate-400' : 'bg-slate-600')}
                                        ${collapsed && i === 8 ? 'opacity-100' : ''}
                                        ${collapsed && i !== 8 ? 'h-0 top-auto' : ''} 
                                    `}></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] opacity-40">
                             <span>0</span>
                             <span>|Ψ|²</span>
                             <span>1</span>
                        </div>
                    </div>

                    {/* B. COLLAPSE CONTROL */}
                    <div className="w-full md:w-[40%] p-6 flex flex-col justify-between relative overflow-hidden">
                         
                         {/* Result Display */}
                         <div className="relative z-10">
                             <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Physical Reality</div>
                             {collapsed ? (
                                 <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                     <h2 className={`text-xl font-bold leading-tight mb-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                                         {activeNode.hypothetical_output}
                                     </h2>
                                     <p className="text-xs opacity-60 leading-relaxed">
                                         {activeNode.stability_description}
                                     </p>
                                 </div>
                             ) : (
                                 <div className="h-20 flex items-center text-xs opacity-40 italic">
                                     System in superposition. Wave function not collapsed.
                                 </div>
                             )}
                         </div>

                         {/* Action Button */}
                         <button
                            onClick={() => setCollapsed(!collapsed)}
                            className={`w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase transition-all mt-4 flex items-center justify-center gap-2
                                ${collapsed 
                                    ? (isLightMode ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' : 'bg-white/10 text-slate-400 hover:bg-white/20')
                                    : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20'}
                            `}
                         >
                            {collapsed ? (
                                <><RefreshCw size={14} /> Reset Observation</>
                            ) : (
                                <><MousePointerClick size={14} /> Collapse Wave Function</>
                            )}
                         </button>

                    </div>
                </div>
            </div>

        </div>
    );
};

export const Stage4Viewer: React.FC<StageProps> = ({ data, isLightMode }) => {
    return <WaveInterferenceEngine data={data} isLightMode={isLightMode} />;
};
