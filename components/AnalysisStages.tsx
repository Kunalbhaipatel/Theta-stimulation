
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ProcessingResult, Stage1Data, Stage2Data, Stage4Output, LogicOperation, SuperpositionNode } from '../types';
import { 
  GitMerge, Layers, Zap, Activity, Atom, Network, 
  Orbit, Microscope, Binary, Target, FileDigit, 
  BarChart3, CheckCircle2, Move3d, Clock, Maximize2, Minimize2,
  Sigma, Divide, FunctionSquare, Braces, ChevronsRight,
  Waves, Pi, Radio, Scan
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

// --- STAGE 2: HEATMAP LOGIC TREE (Unchanged) ---
const LogicHeatmapTree: React.FC<{ data: ProcessingResult, isLightMode: boolean }> = ({ data, isLightMode }) => {
    const allOps = useMemo(() => {
        return Object.values(data.stage2).flatMap(d => d.operations).slice(0, 8);
    }, [data]);

    const getHeatColor = (type: string) => {
        if (type === 'FUSION') return isLightMode ? 'bg-orange-500 shadow-orange-500/50' : 'bg-orange-600 shadow-orange-500/50';
        if (type === 'DIFFUSION') return isLightMode ? 'bg-blue-500 shadow-blue-500/50' : 'bg-blue-600 shadow-blue-500/50';
        return isLightMode ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-emerald-600 shadow-emerald-500/50';
    };

    return (
        <div className={`w-full h-[600px] rounded-[2rem] border relative overflow-hidden flex flex-col
            ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0a0a0c] border-white/5'}
        `}>
            <div className="absolute top-6 left-8 z-10">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isLightMode ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-white'}`}>
                        <Zap size={20} />
                    </div>
                    <div>
                        <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Logic Reactor Map</h3>
                        <p className="text-xs text-slate-500">Thermal visualization of Logic Fusion & Diffusion events</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex relative p-8 mt-16">
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                        <linearGradient id="gradFusion" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={isLightMode ? "#fb923c" : "#ea580c"} stopOpacity="0.2" />
                            <stop offset="50%" stopColor={isLightMode ? "#fb923c" : "#ea580c"} stopOpacity="1" />
                            <stop offset="100%" stopColor={isLightMode ? "#fb923c" : "#ea580c"} stopOpacity="0.2" />
                        </linearGradient>
                         <linearGradient id="gradDiff" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={isLightMode ? "#3b82f6" : "#2563eb"} stopOpacity="0.2" />
                            <stop offset="50%" stopColor={isLightMode ? "#3b82f6" : "#2563eb"} stopOpacity="1" />
                            <stop offset="100%" stopColor={isLightMode ? "#3b82f6" : "#2563eb"} stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    {allOps.map((op, i) => {
                        const y = 80 + (i * 60);
                        return (
                            <g key={i}>
                                <path 
                                    d={`M 150 ${y} C 250 ${y}, 250 ${y}, 350 ${y}`} 
                                    fill="none" 
                                    stroke={`url(#${op.type === 'FUSION' ? 'gradFusion' : 'gradDiff'})`} 
                                    strokeWidth="2"
                                    className="animate-[dash_3s_linear_infinite]"
                                    strokeDasharray="10,10"
                                />
                                <path 
                                    d={`M 450 ${y} C 550 ${y}, 550 ${y}, 650 ${y}`} 
                                    fill="none" 
                                    stroke={`url(#${op.type === 'FUSION' ? 'gradFusion' : 'gradDiff'})`} 
                                    strokeWidth="2"
                                />
                            </g>
                        );
                    })}
                </svg>

                <div className="w-1/4 flex flex-col gap-4 relative z-10">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Input Field</div>
                    {allOps.map((op, i) => (
                        <div key={`in-${i}`} className={`h-12 flex items-center justify-end pr-4`}>
                            <div className={`px-3 py-1.5 rounded-full text-xs font-mono border backdrop-blur-sm
                                ${isLightMode ? 'bg-slate-50/80 border-slate-200 text-slate-600' : 'bg-white/5 border-white/10 text-slate-300'}
                            `}>
                                {op.inputs.join(' + ')}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-1/2 flex flex-col gap-4 relative z-10 items-center">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Reaction Event</div>
                     {allOps.map((op, i) => (
                        <div key={`core-${i}`} className="h-12 flex items-center justify-center w-full">
                            <div className={`w-full max-w-[200px] h-10 rounded-lg flex items-center justify-between px-3 relative overflow-hidden transition-all hover:scale-105 border
                                ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#151516] border-white/10'}
                            `}>
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${getHeatColor(op.type)}`}></div>
                                <div className={`absolute inset-0 opacity-10 ${getHeatColor(op.type)}`}></div>
                                
                                <span className={`text-[10px] font-bold ${isLightMode ? 'text-slate-800' : 'text-white'}`}>{op.type}</span>
                                <div className={`w-2 h-2 rounded-full ${getHeatColor(op.type)} animate-pulse`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-1/4 flex flex-col gap-4 relative z-10">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 pl-4">Resultant</div>
                    {allOps.map((op, i) => (
                        <div key={`out-${i}`} className={`h-12 flex items-center pl-4`}>
                             <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border
                                ${isLightMode ? 'bg-blue-50 border-blue-100 text-blue-700' : 'bg-blue-900/20 border-blue-500/20 text-blue-300'}
                            `}>
                                <CheckCircle2 size={12} />
                                {op.output}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`h-12 border-t flex items-center justify-center gap-8 text-xs
                 ${isLightMode ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-[#0f0f11] border-white/5 text-slate-400'}
            `}>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div>High Energy (Fusion)</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Expansion (Diffusion)</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Stable (Threshold)</div>
            </div>

             <style>{`
                @keyframes dash {
                    to { stroke-dashoffset: -20; }
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

  const nodes = useMemo(() => Object.values(data.stage3.nodes), [data]);
  const selectedNode = selectedNodeId ? data.stage3.nodes[selectedNodeId] : null;

  // Manual rotation logic
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

  // Projected Nodes & Connections
  const projectedData = useMemo(() => {
      const projectedNodes = nodes.map(n => {
          // Adjust spatial coords for display factor
          const rawX = (n.spatial_pos.x - 0) * 2;
          const rawY = (n.spatial_pos.y - 0) * 1;
          const rawZ = (n.spatial_pos.z - 0) * 2;
          const p = project(rawX, rawY, rawZ);
          return { ...n, px: p.x, py: p.y, scale: p.scale, zIndex: p.z };
      });

      // Sort for Painter's Algorithm (Draw back to front)
      projectedNodes.sort((a, b) => b.zIndex - a.zIndex);

      return projectedNodes;
  }, [nodes, project]);

  // Generate Projected Grid Lines
  const gridLines = useMemo(() => {
      const lines = [];
      const size = 600;
      const step = 100;
      
      // Horizontal Lines
      for (let z = -size; z <= size; z += step) {
          const path = [];
          for (let x = -size; x <= size; x += step/2) {
              const yOffset = Math.sin((x + z) * 0.01) * 30; // Wave effect
              const p = project(x, yOffset + 200, z); // Floor level +200
              path.push(`${p.x},${p.y}`);
          }
          lines.push(path.join(' L '));
      }
      return lines;
  }, [project]);


  const noiseReduction = Math.min(100, nodes.length * 8.5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
        
        {/* LEFT: INTERACTIVE 3D CONTAINER */}
        <div 
            className={`lg:col-span-2 relative rounded-[2rem] overflow-hidden border shadow-2xl flex flex-col cursor-move select-none
                ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#050505] border-white/5'}
            `} 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
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
                                onClick={(e) => { e.stopPropagation(); setSelectedNodeId(node.id); }}
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
                [DRAG] ROTATE • [SCROLL] ZOOM • [CLICK] SELECT
            </div>

            {/* HUD Overlay */}
            <div className={`absolute top-0 right-0 p-6 ${isLightMode ? 'bg-white/80' : 'bg-black/50'} backdrop-blur-md rounded-bl-2xl border-l border-b ${isLightMode ? 'border-slate-200' : 'border-white/10'}`}>
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Structure Integrity</div>
                <div className="text-2xl font-mono font-bold flex items-center gap-2">
                    {data.stage3.system_resonance}%
                    <Activity className="text-emerald-500 animate-pulse" />
                </div>
            </div>
        </div>

        {/* RIGHT: DYNAMIC ANALYSIS PANEL */}
        <div className={`rounded-[2rem] border p-8 flex flex-col shadow-2xl relative overflow-hidden transition-all duration-300
            ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#1d1d1f] border-white/5'}
        `}>
             <div className="mb-6 border-b pb-6 border-dashed border-slate-500/20">
                 <div className="flex items-center gap-3 mb-4">
                     <div className={`p-3 rounded-xl ${isLightMode ? 'bg-purple-100 text-purple-600' : 'bg-purple-500/20 text-purple-400'}`}>
                         <Network size={24} />
                     </div>
                     <h3 className={`text-xl font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                        {selectedNode ? 'Node Inspector' : 'Synaptic Analysis'}
                     </h3>
                 </div>
                 <p className="text-sm text-slate-500 leading-relaxed">
                     {selectedNode 
                        ? `Inspecting local quantum state of ${selectedNode.id}.`
                        : "Converting raw chaos into ordered structure. Diluting signal noise to reveal the theta geometry."}
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
                 <div className="flex-1 flex flex-col justify-end space-y-6 animate-in fade-in duration-300">
                     <div>
                         <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase">
                             <span>Signal Clarity</span>
                             <span>{noiseReduction.toFixed(1)}%</span>
                         </div>
                         <div className={`h-2 rounded-full overflow-hidden ${isLightMode ? 'bg-slate-200' : 'bg-white/10'}`}>
                             <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-1000"
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


// --- STAGE 4: INTERACTIVE QUANTUM TUNNEL ---

const QuantumTunnel: React.FC<{ data: ProcessingResult, isLightMode: boolean }> = ({ data, isLightMode }) => {
    // Generate Math Particles
    const particles = useMemo(() => {
        const symbols = [Sigma, Pi, FileDigit, Divide, FunctionSquare, Braces];
        return Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            icon: symbols[i % symbols.length],
            x: Math.random() * 100, // %
            y: Math.random() * 100, // %
            delay: Math.random() * 5,
            duration: 3 + Math.random() * 5,
            scale: 0.5 + Math.random(),
        }));
    }, []);

    const nodes = data.stage4.quantum_nodes;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const currentNode = nodes[selectedIndex] || nodes[0];
    const [isGlitching, setIsGlitching] = useState(false);

    // Handle Slider Change
    const handleTune = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newIndex = parseInt(e.target.value);
        if (newIndex !== selectedIndex) {
            setIsGlitching(true);
            setSelectedIndex(newIndex);
            setTimeout(() => setIsGlitching(false), 300); // Short glitch duration
        }
    };

    return (
        <div className={`w-full h-[700px] rounded-[2rem] border relative overflow-hidden flex flex-col items-center justify-center
            ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#000000] border-white/5'}
        `}>
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 font-mono text-[10px] break-all leading-none pointer-events-none select-none overflow-hidden"
                 style={{ color: isLightMode ? '#000' : '#fff' }}>
                {Array.from({ length: 5000 }).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
            </div>

            {/* TUNNEL VORTEX */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[500px]">
                <div className={`w-[800px] h-[800px] rounded-full border-[100px] border-double opacity-20 animate-[spin_20s_linear_infinite]
                    ${isLightMode ? 'border-slate-300' : 'border-blue-900'}
                `}></div>
                <div className={`absolute w-[500px] h-[500px] rounded-full border-[50px] border-dashed opacity-30 animate-[spin_10s_linear_infinite_reverse]
                    ${isLightMode ? 'border-slate-400' : 'border-indigo-900'}
                `}></div>
                 <div className={`absolute w-[200px] h-[200px] rounded-full border-[20px] opacity-50 animate-[pulse_2s_ease-in-out_infinite]
                    ${isLightMode ? 'border-slate-600 bg-slate-200' : 'border-white bg-white/10'}
                `}></div>
            </div>

            {/* CHAOS PARTICLES (Left Side) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((p) => (
                    <div 
                        key={p.id}
                        className={`absolute animate-[tunnelFlow_4s_ease-in_infinite] opacity-0 flex items-center justify-center
                             ${isLightMode ? 'text-slate-800' : 'text-blue-300'}
                        `}
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            animationDelay: `${p.delay}s`,
                            transform: `scale(${p.scale})`
                        }}
                    >
                        <p.icon size={24} />
                    </div>
                ))}
            </div>

            {/* MAIN INTERFACE CONTAINER */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-8 h-full py-12">
                
                {/* OUTPUT DISPLAY */}
                <div className="flex-1 w-full flex items-center gap-12">
                     {/* Source Info (Left) */}
                    <div className="flex-1 text-center opacity-60 hidden md:block">
                         <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Superposition</h3>
                         <div className="text-4xl font-mono tracking-tighter blur-[2px] animate-pulse">
                             ∑∆∫π∞
                         </div>
                         <p className="text-[10px] mt-2">{nodes.length} States Detected</p>
                    </div>

                    <ChevronsRight size={48} className={`animate-pulse ${isLightMode ? 'text-slate-900' : 'text-white'}`} />

                    {/* Result Panel (Right) */}
                    <div className={`flex-[2] p-8 rounded-2xl border backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-200
                         ${isLightMode ? 'bg-white/90 border-slate-200' : 'bg-[#111]/90 border-white/20'}
                         ${isGlitching ? 'scale-95 opacity-80 blur-[2px]' : 'scale-100 opacity-100 blur-0'}
                    `}>
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>

                        {currentNode ? (
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4 text-emerald-500">
                                    <Binary size={20} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Binary Truth Recovered</span>
                                </div>
                                <h2 className={`text-3xl font-bold mb-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                                    {currentNode.hypothetical_output}
                                </h2>
                                <p className="text-sm font-mono opacity-70 mb-6">
                                    "{currentNode.stability_description}"
                                </p>
                                
                                <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                                    <div className={`px-3 py-1 rounded border ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'}`}>
                                        P: {(currentNode.probability * 100).toFixed(1)}%
                                    </div>
                                    <div className={`px-3 py-1 rounded border ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'}`}>
                                        GATE: {currentNode.gateType}
                                    </div>
                                    <div className={`px-3 py-1 rounded border ${isLightMode ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'}`}>
                                        SOURCE: {currentNode.category_mix}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center opacity-50 py-12">
                                No Quantum States Found.
                            </div>
                        )}
                    </div>
                </div>

                {/* TUNER CONTROL */}
                <div className={`w-full max-w-2xl p-6 rounded-2xl border mt-8 flex flex-col gap-4 backdrop-blur-md
                    ${isLightMode ? 'bg-white/50 border-slate-200' : 'bg-black/50 border-white/10'}
                `}>
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-500">
                        <div className="flex items-center gap-2">
                             <Radio size={14} />
                             <span>Quantum Frequency Tuner</span>
                        </div>
                        <span className="font-mono text-blue-500">Channel {selectedIndex + 1} / {nodes.length}</span>
                    </div>
                    
                    <input 
                        type="range" 
                        min="0" 
                        max={Math.max(0, nodes.length - 1)} 
                        value={selectedIndex}
                        onChange={handleTune}
                        className="w-full h-2 bg-slate-400/30 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                    />
                    
                    <div className="flex justify-between text-[10px] font-mono opacity-50">
                        <span>LOW FREQUENCY</span>
                        <span>HIGH FREQUENCY</span>
                    </div>
                </div>

            </div>
            
            <style>{`
                @keyframes tunnelFlow {
                    0% { transform: scale(1) translate(0, 0); opacity: 0; }
                    20% { opacity: 1; }
                    100% { transform: scale(0) translate(var(--tw-translate-x), var(--tw-translate-y)); opacity: 0; left: 50%; top: 50%; }
                }
            `}</style>
        </div>
    );
};

export const Stage4Viewer: React.FC<StageProps> = ({ data, isLightMode }) => {
    return <QuantumTunnel data={data} isLightMode={isLightMode} />;
};
