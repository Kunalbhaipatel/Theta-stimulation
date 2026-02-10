
export interface Label {
  category: string;
  property: string;
  value?: string | number;
}

export interface Stage1Data {
  id: string;
  text: string;
  labels: Label[];
}

export interface Stage1Output {
  [key: string]: Stage1Data;
}

export type UniversalBase = 'SPACE' | 'TIME' | 'MASS_ENERGY' | 'CHARGE_FIELD' | 'ENTROPY';

export interface LogicOperation {
  type: 'FUSION' | 'DIFFUSION' | 'THRESHOLD' | 'CONSERVATION' | 'EMERGENCE';
  inputs: string[];
  output: string;
  description: string;
  rule: string; // The specific logic chain from the PDF
  universalBase: UniversalBase; // The physics foundation (Page 16 of PDF)
  noiseReduction: number; // 0-100%
}

export interface Stage2Data {
  segmentId: string;
  operations: LogicOperation[];
  baseProperties: Label[];
}

export interface Stage2Output {
  [key: string]: Stage2Data;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface NodeConnection {
  targetId: string;
  strength: number;
  type: string;
}

export interface Stage3Data {
  id: string;
  theta_angle: number; // The geometric angle
  theta_integrity: number; // How well it fits the shape (0-100)
  spatial_pos: Vector3; // 3D coordinates
  shape_role: string; // e.g., "Anchor", "Vertex", "Edge"
  universal_alignment: string[];
  connections: NodeConnection[];
  is_resonating?: boolean; // New: Did this node reach the amplification state?
}

export interface Stage3Output {
  nodes: { [key: string]: Stage3Data };
  system_resonance: number; // New: Global score of how well the logic amplified
}

// --- STAGE 4 TYPES ---

export type QuantumGateType = 'AND' | 'OR' | 'XOR' | 'NAND' | 'CNOT';

export interface SuperpositionNode {
  id: string;
  sourceA_id: string;
  sourceB_id: string;
  gateType: QuantumGateType;
  hypothetical_output: string;
  probability: number; // 0.0 to 1.0 (How stable is this uninvented logic?)
  category_mix: string; // e.g. "BIO-PHYSICS"
  stability_description: string;
}

export interface Stage4Output {
  quantum_nodes: SuperpositionNode[];
  entropy_level: number;
}

export interface ProcessingResult {
  stage1: Stage1Output;
  stage2: Stage2Output;
  stage3: Stage3Output;
  stage4: Stage4Output; // Added Stage 4
}

export enum ProcessingStage {
  SYSTEM = 'SYSTEM', // New Documentation Tab
  INPUT = 'INPUT',
  STAGE1 = 'STAGE1', // Breakdown
  STAGE2 = 'STAGE2', // Fusion/Diffusion
  STAGE3 = 'STAGE3', // Theta Geometry
  STAGE4 = 'STAGE4'  // Superposition
}
