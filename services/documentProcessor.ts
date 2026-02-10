
import { Stage1Output, Stage2Output, Stage3Output, Stage4Output, ProcessingResult, Label, LogicOperation, Stage2Data, Stage3Data, SuperpositionNode, QuantumGateType, UniversalBase } from '../types';

export class DocumentProcessor {
  private properties: Record<string, string[]> = {
    numerical: ['angle', 'length', 'width', 'height', 'area', 'volume', 'radius', 'diameter', 'circumference', 'perimeter', 'density', 'velocity', 'acceleration', 'frequency', 'wavelength', 'amplitude', 'pixel count', 'resolution', 'coordinate', 'scale factor'],
    computer_file: ['file name', 'file type', 'extension', 'size on disk', 'creation date', 'modification date', 'access date', 'owner', 'permissions', 'attributes', 'version number', 'compatibility mode', 'security settings', 'checksum', 'location', 'path', 'compression status', 'archive bit', 'digital signature', 'author', 'title', 'comments'],
    text: ['font family', 'font size', 'font weight', 'font style', 'color', 'alignment', 'line spacing', 'letter spacing', 'word spacing', 'rotation angle', 'opacity', 'shadow offset', 'border style', 'margin', 'padding', 'encoding', 'language', 'case', 'hyphenation', 'ligatures'],
    material: ['state', 'mass', 'density', 'volume', 'energy', 'temperature', 'melting point', 'boiling point', 'hardness', 'tensile strength', 'conductivity', 'malleability', 'ductility', 'brittleness', 'viscosity', 'elasticity', 'refractive index', 'specific heat capacity', 'ph level', 'solubility'],
    video: ['frame rate', 'fps', 'resolution', 'duration', 'bitrate', 'codec', 'aspect ratio', 'pixel depth', 'audio channels', 'sample rate', 'audio bitrate', 'subtitle language', 'keyframe interval', 'color space', 'compression type', 'file format', 'metadata tags', 'brightness', 'contrast', 'saturation', 'timestamp'],
    geometry: ['vertices', 'edges', 'faces', 'centroid', 'apothem', 'inradius', 'circumradius', 'symmetry', 'tessellation', 'fractal dimension'],
    image: ['bit depth', 'color mode', 'contrast ratio', 'histogram', 'file format', 'exif data', 'gamma', 'noise level', 'sharpening radius', 'layer blend mode', 'opacity'],
    audio: ['sample rate', 'bit rate', 'channels', 'dynamic range', 'frequency response', 'pitch', 'tempo', 'reverb time', 'waveform shape', 'compression ratio', 'amplitude'],
    software: ['class name', 'id', 'visibility', 'inheritance', 'mutability', 'scope', 'default value', 'event handlers', 'thread safety', 'serialization'],
    biological: ['genus', 'species', 'habitat', 'lifespan', 'genome size', 'metabolic rate', 'reproductive strategy', 'body symmetry', 'cell type', 'enzyme activity', 'toxicity level', 'trophic level', 'photosynthetic efficiency', 'mutation rate', 'biodiversity index', 'osmoregulation', 'allele frequency', 'endangerment status', 'biomass', 'hormone receptor density', 'ecological niche'],
    physics: ['force', 'mass', 'acceleration', 'velocity', 'time', 'distance', 'energy', 'kinetic', 'potential', 'frequency', 'amplitude', 'wavelength', 'momentum', 'impulse'],
    chemistry: ['atomic number', 'atomic mass', 'electron configuration', 'bond type', 'electronegativity', 'polarity', 'reaction rate', 'temperature', 'activation energy', 'ph', 'concentration', 'equilibrium constant', 'oxidation state', 'redox potential'],
    environmental: ['temperature', 'humidity', 'dew point', 'biodiversity index', 'habitat fragmentation', 'species richness', 'carbon footprint', 'energy consumption', 'emission factor', 'soil ph', 'nutrient availability', 'plant growth rate', 'pollution level', 'bioaccumulation']
  };

  public process(document: string): ProcessingResult {
    const stage1 = this.stage1BreakAndLabel(document);
    const stage2 = this.stage2LogicLayer(stage1);
    const stage3 = this.stage3DistributeNodes(stage2);
    const stage4 = this.stage4Superposition(stage2, stage3); 

    return {
      stage1,
      stage2,
      stage3,
      stage4
    };
  }

  private stage1BreakAndLabel(document: string): Stage1Output {
    const pieces = document.split(/(?<=[.!?])\s+/).filter(p => p.trim().length > 0);
    const labeled: Stage1Output = {};

    pieces.forEach((piece, index) => {
      const labels: Label[] = [];
      const lowerPiece = piece.toLowerCase();

      for (const [category, props] of Object.entries(this.properties)) {
        for (const prop of props) {
          if (lowerPiece.includes(prop.toLowerCase())) {
            const regex = new RegExp(`${prop}.*?(\\d+(\\.\\d+)?)`, 'i');
            const match = piece.match(regex);
            const value = match ? parseFloat(match[1]) : undefined;
            
            labels.push({ 
              category, 
              property: prop,
              value: value
            });
          }
        }
      }

      labeled[`shard_${index}`] = {
        id: `shard_${index}`,
        text: piece,
        labels: labels
      };
    });

    return labeled;
  }

  private stage2LogicLayer(shards: Stage1Output): Stage2Output {
    const output: Stage2Output = {};

    for (const [key, shard] of Object.entries(shards)) {
      const operations: LogicOperation[] = [];
      const props = shard.labels.map(l => l.property.toLowerCase());
      
      // IMPLEMENTATION OF SPECIFIC LOGIC CHAINS FROM PDF (PAGES 9-14)
      
      // --- 1. COMPUTER FILE (Information / Entropy) ---
      if (props.includes('creation date') || props.includes('modification date')) {
        operations.push({ 
            type: 'THRESHOLD', 
            inputs: ['Creation', 'Mod Date'], 
            output: 'Causality Verified', 
            description: 'Creation < Modification', 
            rule: 'Temporal Logic',
            universalBase: 'TIME',
            noiseReduction: 95
        });
      }
      if (props.includes('size on disk') || props.includes('compression')) {
        operations.push({ 
            type: 'CONSERVATION', 
            inputs: ['Size', 'Compression'], 
            output: 'Shannon Entropy', 
            description: 'Size * Ratio = Information', 
            rule: 'Conservation of Info',
            universalBase: 'ENTROPY',
            noiseReduction: 88
        });
      }

      // --- 2. NUMERICAL / GEOMETRY (Space) ---
      if (props.includes('radius')) {
        operations.push({ 
            type: 'DIFFUSION', 
            inputs: ['Radius'], 
            output: 'Diameter / Circumference', 
            description: 'r → 2r → 2πr', 
            rule: 'Geometric Chain',
            universalBase: 'SPACE',
            noiseReduction: 100
        });
      }
      if (props.includes('length') && props.includes('width')) {
        operations.push({ 
            type: 'FUSION', 
            inputs: ['Length', 'Width'], 
            output: 'Area (2D Space)', 
            description: 'Euclidean Product', 
            rule: 'Dimensional Emergence',
            universalBase: 'SPACE',
            noiseReduction: 92
        });
      }

      // --- 3. PHYSICS / MATERIAL (Mass-Energy) ---
      if (props.includes('mass') && props.includes('volume')) {
        operations.push({ 
            type: 'FUSION', 
            inputs: ['Mass', 'Volume'], 
            output: 'Density', 
            description: 'Mass / Volume', 
            rule: 'Material Definition',
            universalBase: 'MASS_ENERGY',
            noiseReduction: 90
        });
      }
      if (props.includes('temperature') || props.includes('melting point')) {
        operations.push({ 
            type: 'THRESHOLD', 
            inputs: ['Temp', 'Melting Pt'], 
            output: 'Phase State', 
            description: 'T > Melting → Liquid', 
            rule: 'Phase Transition',
            universalBase: 'MASS_ENERGY',
            noiseReduction: 85
        });
      }

      // --- 4. VIDEO / AUDIO (Time / Waves) ---
      if (props.includes('frame rate') || props.includes('duration')) {
        operations.push({ 
            type: 'CONSERVATION', 
            inputs: ['FPS', 'Duration'], 
            output: 'Total Frame Count', 
            description: 'Rate * Time = Quantity', 
            rule: 'Temporal Integration',
            universalBase: 'TIME',
            noiseReduction: 98
        });
      }
      if (props.includes('frequency') || props.includes('wavelength')) {
        operations.push({ 
            type: 'EMERGENCE', 
            inputs: ['Frequency'], 
            output: 'Wave Energy', 
            description: 'E = hf', 
            rule: 'Wave-Particle Duality',
            universalBase: 'CHARGE_FIELD', // Waves map to Charge/Field in PDF Core 5
            noiseReduction: 80
        });
      }

      // Universal Fallback if no specific chain matches but data exists
      if (operations.length === 0 && shard.labels.length > 0) {
        const cat = shard.labels[0].category;
        let base: UniversalBase = 'ENTROPY';
        if (['physics', 'material', 'biological'].includes(cat)) base = 'MASS_ENERGY';
        if (['geometry', 'numerical'].includes(cat)) base = 'SPACE';
        if (['video', 'audio'].includes(cat)) base = 'TIME';
        
        operations.push({
            type: 'DIFFUSION',
            inputs: [shard.labels[0].property],
            output: 'Universal Projection',
            description: 'Mapping to Core Observable',
            rule: 'Universal Connection',
            universalBase: base,
            noiseReduction: 60
        });
      }

      output[key] = {
        segmentId: key,
        baseProperties: shard.labels,
        operations: operations
      };
    }

    return output;
  }

  private stage3DistributeNodes(logicLayer: Stage2Output): Stage3Output {
    const nodes: { [key: string]: Stage3Data } = {};
    const keys = Object.keys(logicLayer);
    const count = keys.length;
    
    let complexOps = 0;
    Object.values(logicLayer).forEach(d => {
        if (d.operations.some(op => op.type === 'FUSION' || op.type === 'THRESHOLD')) {
            complexOps++;
        }
    });
    const complexityRatio = count > 0 ? complexOps / count : 0;
    const densityFactor = Math.min(count, 40);
    const baseRotations = 2.5;
    const rotations = baseRotations + (complexityRatio * 3.5) + (densityFactor / 8);
    const baseHeight = 600;
    const totalHeight = baseHeight + (densityFactor * 45);
    const totalAngle = Math.PI * 2 * rotations;

    keys.forEach((key, index) => {
      const data = logicLayer[key];
      const hasFusion = data.operations.some(op => op.type === 'FUSION');
      const hasThreshold = data.operations.some(op => op.type === 'THRESHOLD');
      const hasDiffusion = data.operations.some(op => op.type === 'DIFFUSION');
      
      const t = index / Math.max(count - 1, 1);
      const theta = t * totalAngle;
      
      let role = 'Data Vertex';
      let integrity = 75; 
      let baseRadius = 200;

      if (hasFusion) { role = 'Structural Anchor'; baseRadius = 320; integrity = 95; } 
      else if (hasThreshold) { role = 'Critical Junction'; baseRadius = 260; integrity = 88; } 
      else if (hasDiffusion) { role = 'Diffraction Point'; baseRadius = 120; integrity = 80; } 
      else { baseRadius = 180 + (Math.sin(t * Math.PI * 8) * 20); }

      const helixVariance = Math.cos(theta * 2) * 40; 
      const radius = baseRadius + helixVariance;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      const y = (t * totalHeight) - (totalHeight / 2);

      nodes[key] = {
        id: key,
        theta_angle: Math.round(theta * (180/Math.PI)) % 360,
        theta_integrity: integrity,
        spatial_pos: { x: parseFloat(x.toFixed(0)), y: parseFloat(y.toFixed(0)), z: parseFloat(z.toFixed(0)) },
        shape_role: role,
        universal_alignment: ["Conservation", "Duality"],
        connections: [],
        is_resonating: false
      };
    });

    const nodeIds = Object.keys(nodes);
    nodeIds.forEach((id, idx) => {
        if (idx < nodeIds.length - 1) nodes[id].connections.push({ targetId: nodeIds[idx + 1], strength: 1.0, type: 'SPINE' });
        if (nodes[id].shape_role === 'Structural Anchor') {
            let found = 0;
            for(let i = idx + 1; i < nodeIds.length && found < 2; i++) {
                if (nodes[nodeIds[i]].shape_role === 'Structural Anchor') {
                    nodes[id].connections.push({ targetId: nodeIds[i], strength: 0.9, type: 'STRUCTURAL' });
                    found++;
                }
            }
        }
    });

    // Resonance Loop
    let totalEnergy = 0;
    Object.values(nodes).forEach(sourceNode => {
        if (sourceNode.theta_integrity > 85) {
            sourceNode.is_resonating = true;
            totalEnergy += 10;
            sourceNode.connections.forEach(conn => {
                const target = nodes[conn.targetId];
                if (target) {
                    const boost = (sourceNode.theta_integrity / 100) * conn.strength * 15;
                    target.theta_integrity = Math.min(100, target.theta_integrity + boost);
                    if (target.theta_integrity > 90) { target.is_resonating = true; totalEnergy += 5; }
                }
            });
        }
    });

    const avgIntegrity = Object.values(nodes).reduce((acc, n) => acc + n.theta_integrity, 0) / count;
    const system_resonance = Math.min(100, (avgIntegrity * 0.7) + (totalEnergy / count * 2));

    return { nodes, system_resonance: parseFloat(system_resonance.toFixed(1)) };
  }

  // --- STAGE 4: SUPERPOSITION & PHYSICS REDUCTION ENGINE ---
  private stage4Superposition(stage2: Stage2Output, stage3: Stage3Output): Stage4Output {
    const quantum_nodes: SuperpositionNode[] = [];
    const nodeKeys = Object.keys(stage3.nodes);
    
    // Cross-pollinate nodes to find "Uninvented Combinations" then reduce them to pure Physics
    // We limit this to avoid infinite loops, taking pairs that are NOT connected in Stage 3
    
    for (let i = 0; i < nodeKeys.length; i++) {
        for (let j = i + 1; j < nodeKeys.length; j++) {
            const idA = nodeKeys[i];
            const idB = nodeKeys[j];
            const nodeA = stage2[idA];
            const nodeB = stage2[idB];

            if (!nodeA || !nodeB) continue;

            // Get categories
            const catA = nodeA.baseProperties[0]?.category || 'unknown';
            const catB = nodeB.baseProperties[0]?.category || 'unknown';

            // Only combine if categories are DIFFERENT (Cross-Domain Logic)
            if (catA !== catB && quantum_nodes.length < 24) {
                
                let result = this.calculatePhysicsReduction(catA, catB, nodeA.baseProperties[0]?.property, nodeB.baseProperties[0]?.property);
                
                if (result) {
                    quantum_nodes.push({
                        id: `quantum_${i}_${j}`,
                        sourceA_id: idA,
                        sourceB_id: idB,
                        gateType: result.gate,
                        hypothetical_output: result.output,
                        probability: result.prob,
                        category_mix: `${catA.toUpperCase()} + ${catB.toUpperCase()}`,
                        stability_description: result.desc
                    });
                }
            }
        }
    }

    return {
        quantum_nodes,
        entropy_level: Math.random() * 100
    };
  }

  private calculatePhysicsReduction(catA: string, catB: string, propA: string, propB: string): { gate: QuantumGateType, output: string, prob: number, desc: string } | null {
      // This logic table simulates the "Physics Reduction Engine".
      // It transforms abstract domain concepts into Core Physics Observables:
      // [Entropy, Energy, Force, Mass, Information, Space/Time]

      const key = [catA, catB].sort().join('|');

      // 1. BIOLOGY + SOFTWARE -> Information Entropy
      if (key.includes('biological') && key.includes('software')) {
          return { 
              gate: 'XOR', 
              output: 'Bio-Digital Entropy', 
              prob: 0.95, 
              desc: 'Reducing genetic mutation and code compilation to pure Information Entropy.' 
          };
      }

      // 2. PHYSICS + SOFTWARE -> Energy Conservation
      if (key.includes('physics') && key.includes('software')) {
          return { 
              gate: 'AND', 
              output: 'Simulation Energy', 
              prob: 0.88, 
              desc: 'Calculating the Energy cost of enforcing conservation laws in a digital system.' 
          };
      }

      // 3. AUDIO + GEOMETRY -> Force Fields
      if (key.includes('audio') && key.includes('geometry')) {
          return { 
              gate: 'CNOT', 
              output: 'Acoustic Force', 
              prob: 0.75, 
              desc: 'Sound waves exerting Force on geometric structures (Cymatics) in Space.' 
          };
      }

      // 4. MATERIAL + COMPUTER_FILE -> Mass-Information
      if (key.includes('material') && key.includes('computer_file')) {
           return { 
              gate: 'NAND', 
              output: 'Matter Information', 
              prob: 0.65, 
              desc: 'Encoding Information bits into the Mass states of physical matter.' 
          };
      }

      // 5. ENVIRONMENTAL + TEXT -> System Entropy
      if (key.includes('environmental') && key.includes('text')) {
           return { 
              gate: 'OR', 
              output: 'System Entropy', 
              prob: 0.45, 
              desc: 'Reading environmental chaos as high Entropy data streams.' 
          };
      }

      // 6. VIDEO + PHYSICS -> Light Energy
      if (key.includes('video') && key.includes('physics')) {
           return { 
              gate: 'AND', 
              output: 'Light Energy', 
              prob: 0.81, 
              desc: 'Frame rate synchronized with photon Energy distribution over Time.' 
          };
      }

      // Generic Fallbacks - Force Physics Context
      if (Math.random() > 0.7) {
          return {
              gate: 'XOR',
              output: `Vector-${propA}`,
              prob: Math.random(),
              desc: `Reducing ${propA} and ${propB} to fundamental Force vectors in Space-Time.`
          }
      }

      return null;
  }
}
