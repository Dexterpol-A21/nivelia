const MAX_COLORS = 8;
const MAX_STIRS = 24;
const MAX_TWIRLS = 4;
const STIR_LIFE = 1.3;
const STIR_STEP = 0.06;
const TWIRL_LIFE = 2.6;
const INTRO_SECONDS = 1.6;
const TYPES = { linear: 0, radial: 1 };

const VERTEX = `#version 300 es
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FIELD = `#version 300 es
precision highp float;
precision highp int;
uniform float uAspect;
uniform float uTime;
uniform vec3 uRamp[8];
uniform int uCount;
uniform int uType;
uniform vec2 uDir;
uniform float uExtent;
uniform float uBands;
uniform float uSoftness;
uniform float uFlow;
uniform float uScale;
uniform float uSilk;
uniform vec4 uStir[24];
uniform float uStirWeight[24];
uniform vec4 uTwirl[4];
uniform vec2 uSeed;
uniform float uContrast;
uniform float uSaturation;
uniform float uSettle;
uniform float uReveal;
in vec2 vUv;
out vec4 outColor;

vec2 hash2(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * vec3(0.1031, 0.103, 0.0973));
  q += dot(q, q.yzx + 33.33);
  return fract((q.xx + q.yz) * q.zy) * 2.0 - 1.0;
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = dot(hash2(i), f);
  float b = dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
  float c = dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
  float d = dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
  return 0.5 + 0.5 * mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec2 drift(vec2 p, float t) {
  vec2 w1 = vec2(
    noise(p * 0.85 + vec2(t * 0.11, t * 0.07)),
    noise(p * 0.85 + vec2(4.1, 1.7) - vec2(t * 0.08, t * 0.12))
  );
  vec2 w2 = vec2(
    noise(p * 1.55 + w1 * 1.8 + vec2(1.3, 7.1) + t * 0.05),
    noise(p * 1.55 + w1 * 1.8 + vec2(6.4, 2.2) - t * 0.06)
  );
  return (w1 - 0.5) * 1.1 + (w2 - 0.5) * 0.55;
}

vec2 warp(vec2 p) {
  vec2 q = p / uScale;
  if (uType == 1) {
    float turn = uTime * 0.35;
    q = mat2(cos(turn), sin(turn), -sin(turn), cos(turn)) * q;
  } else {
    q += vec2(-uDir.y, uDir.x) * uTime * 0.45;
  }
  return p + drift(q + uSeed, uTime) * uFlow * uScale * uSettle;
}

float coord(vec2 p) {
  vec2 w = warp(p);
  return uType == 1 ? 1.0 - length(w) * 1.1 : dot(w, uDir) / uExtent + 0.5;
}

vec3 labToRgb(vec3 lab) {
  float l = lab.x + 0.3963377774 * lab.y + 0.2158037573 * lab.z;
  float m = lab.x - 0.1055613458 * lab.y - 0.0638541728 * lab.z;
  float s = lab.x - 0.0894841775 * lab.y - 1.2914855480 * lab.z;
  l = l * l * l;
  m = m * m * m;
  s = s * s * s;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  );
}

vec3 encode(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
  for (int i = 0; i < 24; i++) {
    float w = uStirWeight[i];
    if (w <= 0.0) continue;
    vec2 d = p - uStir[i].xy;
    p -= uStir[i].zw * w * exp(-dot(d, d) / 0.045);
  }
  for (int i = 0; i < 4; i++) {
    float angle = uTwirl[i].z;
    if (angle == 0.0) continue;
    vec2 d = p - uTwirl[i].xy;
    float a = angle * exp(-dot(d, d) / (uTwirl[i].w * uTwirl[i].w));
    float c = cos(a);
    float s = sin(a);
    p = uTwirl[i].xy + mat2(c, -s, s, c) * d;
  }
  float raw = coord(p);
  float s = raw;
  if (uBands > 1.0) {
    s *= uBands;
    float cycle = floor(s);
    s = fract(s);
    if (mod(cycle, 2.0) > 0.5) s = 1.0 - s;
  }
  s = clamp(s, 0.0, 1.0);
  float scaled = s * float(uCount - 1);
  int index = int(min(floor(scaled), float(uCount - 2)));
  float f = scaled - float(index);
  float edge = max(uSoftness * 0.5, fwidth(scaled) * 0.75);
  float shaped = smoothstep(0.5 - edge, 0.5 + edge, f);
  vec3 from = uRamp[0];
  vec3 to = uRamp[1];
  for (int i = 0; i < 7; i++) {
    if (i == index) {
      from = uRamp[i];
      to = uRamp[i + 1];
    }
  }
  vec3 lab = mix(from, to, shaped);
  if (uSilk > 0.0) {
    vec2 grad = vec2(coord(p + vec2(0.004, 0.0)) - raw, coord(p + vec2(0.0, 0.004)) - raw) / 0.004;
    vec2 slope = grad * sin(3.14159265 * clamp(raw, 0.0, 1.0) * uBands) * uSilk * 4.0;
    vec3 normal = normalize(vec3(-slope, 1.0));
    vec3 light = normalize(vec3(-uDir.y, uDir.x, 1.2));
    float diffuse = dot(normal, light) - light.z;
    lab = uRamp[0] + (lab - uRamp[0]) * (1.0 + (diffuse * 0.35 + max(diffuse, 0.0) * diffuse * 0.6) * uSilk);
  }
  lab = mix(uRamp[0], lab, smoothstep(0.0, 1.0, uReveal * 1.5 - length(vUv - 0.5) * 0.6));
  lab.x = (lab.x - 0.55) * uContrast + 0.55;
  lab.yz *= uSaturation;
  outColor = vec4(encode(labToRgb(lab)), 1.0);
}`;

const COMPOSITE = `#version 300 es
precision highp float;
uniform sampler2D uField;
uniform float uGrain;
uniform float uGrainSize;
uniform float uFrame;
in vec2 vUv;
out vec4 outColor;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float clump(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  vec3 color = texture(uField, vUv).rgb;
  vec2 pixel = gl_FragCoord.xy + uFrame * vec2(17.0, 59.0);
  float fine = hash(pixel) + hash(pixel + 7.13) - 1.0;
  float coarse = (clump(pixel / max(uGrainSize, 1.0)) - 0.5) * 2.0;
  float grain = mix(fine, coarse, clamp(uGrainSize - 1.0, 0.0, 1.0) * 0.8);
  float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
  color += grain * uGrain * (0.45 + 2.2 * luma * (1.0 - luma));
  outColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const toLinear = (value: number) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);

const toLab = ([r, g, b]: number[]) => {
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
};

type Program = { program: WebGLProgram; uniforms: Record<string, WebGLUniformLocation | null> };

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
};

const link = (gl: WebGL2RenderingContext, fragmentSource: string): Program | null => {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    if (!info) continue;
    const name = info.name.replace(/\[0\]$/, '');
    uniforms[name] = gl.getUniformLocation(program, name);
  }
  return { program, uniforms };
};

const num = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const TONES: Record<string, { colors: string[]; angle: number; flow: number; softness?: number; silk?: number }> = {
  hero: {
    colors: ['#F6F3EE', '#E6DFD4', '#0E6E9E', '#0a5678'],
    angle: 90,
    flow: 0.22,
    softness: 0.2,
    silk: 0.08,
  },
  cream: { colors: ['#F6F3EE', '#E6DFD4', '#d7ebe4', '#efe4d4', '#c9ddd6'], angle: 114, flow: 0.62 },
  forest: { colors: ['#0a5678', '#0E6E9E', '#1284ae', '#0f6468', '#0c628c'], angle: 76, flow: 0.55 },
  'hero-bone': {
    colors: ['#F6F3EE', '#E6DFD4', '#d7ebe4', '#c9ddd6', '#efe8de'],
    angle: 118,
    flow: 0.62,
    silk: 0.2,
  },
  'hero-blue': {
    colors: ['#0E6E9E', '#1490b4', '#0E6E9E', '#1284ae'],
    angle: 104,
    flow: 0.42,
    softness: 0.9,
    silk: 0.06,
  },
  petroleum: { colors: ['#2a1b4d', '#3E2770', '#543888', '#321f5c', '#241644'], angle: 128, flow: 0.58 },
  turquoise: { colors: ['#0b4c50', '#0F6468', '#148078', '#0c5862', '#0e5c68'], angle: 68, flow: 0.52 },
  ink: { colors: ['#120e1a', '#1A1228', '#2a1b4d', '#161422', '#241832'], angle: 102, flow: 0.46 },
};

type Settings = {
  colors: string[];
  type: number;
  angle: number;
  bands: number;
  speed: number;
  flow: number;
  scale: number;
  softness: number;
  silk: number;
  grainAmount: number;
  grainSize: number;
  grainAnimated: boolean;
  contrast: number;
  saturation: number;
  variation: number;
  interactive: boolean;
  stir: number;
  clickSwirl: boolean;
  intro: boolean;
};

type Trail = { x: number; y: number; vx: number; vy: number; age: number; grow: number; done: boolean };
type Spin = { x: number; y: number; age: number; direction: number };

type Slot = {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  settings: Settings;
  ramp: Float32Array;
  visible: boolean;
  time: number;
  introClock: number;
  frameSeed: number;
  grainClock: number;
  view: { width: number; height: number; ratio: number };
  trail: Trail[];
  spins: Spin[];
  pointer: { x: number; y: number; sx: number; sy: number; vx: number; inside: boolean; fresh: boolean };
  stirs: Float32Array;
  stirWeights: Float32Array;
  twirls: Float32Array;
};

let reduceMotion = false;
let glCanvas: HTMLCanvasElement | null = null;
let gl: WebGL2RenderingContext | null = null;
let fieldProgram: { program: WebGLProgram; uniforms: Record<string, WebGLUniformLocation | null> } | null = null;
let compositeProgram: { program: WebGLProgram; uniforms: Record<string, WebGLUniformLocation | null> } | null = null;
let vao: WebGLVertexArrayObject | null = null;
let fieldTexture: WebGLTexture | null = null;
let fieldBuffer: WebGLFramebuffer | null = null;
let fieldSize = { width: 0, height: 0 };
let probe: CanvasRenderingContext2D | null = null;
const colorCache = new Map<string, number[]>();
const slots: Slot[] = [];
let booted = false;
let raf = 0;
let last = 0;
let variationSeed = 0;

const parseColor = (value: string) => {
  const cached = colorCache.get(value);
  if (cached) return cached;
  let rgb = [0, 0, 0];
  if (probe) {
    probe.clearRect(0, 0, 1, 1);
    probe.fillStyle = '#000000';
    probe.fillStyle = value;
    probe.fillRect(0, 0, 1, 1);
    const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
    rgb = [r / 255, g / 255, b / 255];
  }
  colorCache.set(value, rgb);
  return rgb;
};

const readSettings = (container: HTMLElement, variation: number): Settings => {
  const data = container.dataset;
  const preset = TONES[data.tone || ''] ?? TONES.hero;
  const colors = (data.colors || preset.colors.join(','))
    .split(',')
    .map((color) => color.trim())
    .filter(Boolean)
    .slice(0, MAX_COLORS);
  return {
    colors: colors.length > 1 ? colors : [colors[0] || '#F6F3EE', colors[0] || '#0E6E9E'],
    type: TYPES[(data.type as 'linear' | 'radial') || 'linear'] ?? 0,
    angle: num(data.angle, preset.angle),
    bands: clamp(num(data.bands, 1), 1, 8),
    speed: Math.max(0, num(data.speed, 0.4)),
    flow: clamp(num(data.flow, preset.flow), 0, 3),
    scale: clamp(num(data.scale, 1), 0.25, 3),
    softness: clamp(num(data.softness, preset.softness ?? 1), 0, 1),
    silk: clamp(num(data.silk, preset.silk ?? 0.28), 0, 1),
    grainAmount: clamp(num(data.grain, 0.025), 0, 0.5),
    grainSize: clamp(num(data.grainSize, 1.2), 0.5, 4),
    grainAnimated: data.grainAnimated !== 'false',
    contrast: clamp(num(data.contrast, 1), 0.2, 2),
    saturation: clamp(num(data.saturation, 1), 0, 2),
    variation,
    interactive: data.interactive !== 'false',
    stir: clamp(num(data.stir, 0.7), 0, 2),
    clickSwirl: data.swirl !== 'false',
    intro: data.intro !== 'false',
  };
};

const writeRamp = (slot: Slot) => {
  const labs = slot.settings.colors.map((color) => toLab(parseColor(color)));
  labs.forEach((lab, index) => slot.ramp.set(lab, index * 3));
};

const ensureGl = () => {
  if (gl && fieldProgram && compositeProgram) return true;
  if (gl) return false;
  glCanvas = document.createElement('canvas');
  gl = glCanvas.getContext('webgl2', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: true,
  });
  if (!gl) return false;
  fieldProgram = link(gl, FIELD);
  compositeProgram = link(gl, COMPOSITE);
  if (!fieldProgram || !compositeProgram) {
    console.warn('Grainient: el lienzo no pudo arrancar.');
    return false;
  }
  vao = gl.createVertexArray();
  fieldTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, fieldTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  fieldBuffer = gl.createFramebuffer();
  probe = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  return true;
};

const renderSlot = (slot: Slot) => {
  if (!gl || !glCanvas || !fieldProgram || !compositeProgram || !fieldTexture || !fieldBuffer) return;
  const width = Math.max(1, Math.round(slot.view.width * slot.view.ratio));
  const height = Math.max(1, Math.round(slot.view.height * slot.view.ratio));
  if (slot.canvas.width !== width || slot.canvas.height !== height) {
    slot.canvas.width = width;
    slot.canvas.height = height;
  }
  if (glCanvas.width !== width || glCanvas.height !== height) {
    glCanvas.width = width;
    glCanvas.height = height;
    fieldSize = { width: 0, height: 0 };
  }
  const fieldWidth = Math.max(1, Math.round(width / 2));
  const fieldHeight = Math.max(1, Math.round(height / 2));
  if (fieldWidth !== fieldSize.width || fieldHeight !== fieldSize.height) {
    fieldSize = { width: fieldWidth, height: fieldHeight };
    gl.bindTexture(gl.TEXTURE_2D, fieldTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, fieldWidth, fieldHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fieldBuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fieldTexture, 0);
  }

  const s = slot.settings;
  const aspect = slot.view.width / slot.view.height;
  const fu = fieldProgram.uniforms;
  const cu = compositeProgram.uniforms;
  gl.bindVertexArray(vao);
  gl.disable(gl.BLEND);
  gl.bindFramebuffer(gl.FRAMEBUFFER, fieldBuffer);
  gl.viewport(0, 0, fieldSize.width, fieldSize.height);
  gl.useProgram(fieldProgram.program);
  gl.uniform1f(fu.uAspect, aspect);
  gl.uniform1f(fu.uTime, slot.time);
  gl.uniform3fv(fu.uRamp, slot.ramp);
  gl.uniform1i(fu.uCount, s.colors.length);
  const radians = (s.angle * Math.PI) / 180;
  gl.uniform1i(fu.uType, s.type);
  gl.uniform2f(fu.uDir, Math.sin(radians), Math.cos(radians));
  gl.uniform1f(fu.uExtent, aspect * Math.abs(Math.sin(radians)) + Math.abs(Math.cos(radians)));
  gl.uniform1f(fu.uBands, s.bands);
  gl.uniform1f(fu.uSoftness, s.softness);
  gl.uniform1f(fu.uFlow, s.flow);
  gl.uniform1f(fu.uScale, s.scale);
  gl.uniform1f(fu.uSilk, s.silk);
  gl.uniform4fv(fu.uStir, slot.stirs);
  gl.uniform1fv(fu.uStirWeight, slot.stirWeights);
  gl.uniform4fv(fu.uTwirl, slot.twirls);
  gl.uniform2f(fu.uSeed, s.variation * 3.17, s.variation * 1.91);
  gl.uniform1f(fu.uContrast, s.contrast);
  gl.uniform1f(fu.uSaturation, s.saturation);
  gl.uniform1f(fu.uSettle, slot.introClock * slot.introClock * (3 - 2 * slot.introClock));
  gl.uniform1f(fu.uReveal, slot.introClock);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.viewport(0, 0, width, height);
  gl.useProgram(compositeProgram.program);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, fieldTexture);
  gl.uniform1i(cu.uField, 0);
  gl.uniform1f(cu.uGrain, s.grainAmount);
  gl.uniform1f(cu.uGrainSize, s.grainSize * slot.view.ratio);
  gl.uniform1f(cu.uFrame, slot.frameSeed);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  slot.ctx.drawImage(glCanvas, 0, 0, width, height);
};

const updateTouches = (slot: Slot, dt: number) => {
  const aspect = slot.view.width / slot.view.height;
  const pointer = slot.pointer;
  const follow = 1 - Math.exp(-dt / 0.06);
  const px = pointer.sx;
  const py = pointer.sy;
  pointer.sx += (pointer.x - pointer.sx) * follow;
  pointer.sy += (pointer.y - pointer.sy) * follow;
  const vx = ((pointer.sx - px) / dt) * aspect;
  const vy = (pointer.sy - py) / dt;
  pointer.vx = vx;
  const head = slot.trail[0];
  slot.trail.forEach((sample) => {
    if (sample.done) sample.age += dt;
  });
  if (slot.settings.interactive && pointer.inside && Math.hypot(vx, vy) > 0.02 && !reduceMotion) {
    if (!head || head.done) {
      slot.trail.unshift({ x: 0, y: 0, vx: 0, vy: 0, age: 0, grow: 0, done: false });
      if (slot.trail.length > MAX_STIRS) slot.trail.pop();
    }
    const live = slot.trail[0];
    live.x = (pointer.sx - 0.5) * aspect;
    live.y = pointer.sy - 0.5;
    live.vx = vx;
    live.vy = vy;
    live.grow = Math.min(1, live.grow + dt / STIR_STEP);
    live.done = live.grow >= 1;
  } else if (head) {
    head.done = true;
  }
  while (slot.trail.length && slot.trail[slot.trail.length - 1].age > STIR_LIFE) slot.trail.pop();
  for (let i = 0; i < MAX_STIRS; i++) {
    const sample = slot.trail[i];
    if (!sample) {
      slot.stirWeights[i] = 0;
      continue;
    }
    const fade = 1 - sample.age / STIR_LIFE;
    const cap = Math.min(1, 2.2 / Math.max(Math.hypot(sample.vx, sample.vy), 0.001));
    slot.stirs.set([sample.x, sample.y, sample.vx * cap, sample.vy * cap], i * 4);
    slot.stirWeights[i] = fade * fade * sample.grow * slot.settings.stir * 0.05;
  }
  slot.spins.forEach((spin) => {
    spin.age += dt;
  });
  while (slot.spins.length && slot.spins[slot.spins.length - 1].age > TWIRL_LIFE) slot.spins.pop();
  for (let i = 0; i < MAX_TWIRLS; i++) {
    const spin = slot.spins[i];
    if (!spin) {
      slot.twirls[i * 4 + 2] = 0;
      continue;
    }
    const k = spin.age / TWIRL_LIFE;
    const envelope = Math.min(1, spin.age / 0.18) * (1 - k) * (1 - k);
    slot.twirls.set(
      [spin.x, spin.y, spin.direction * 2.4 * envelope, 0.16 + 0.1 * Math.min(1, spin.age / 0.5)],
      i * 4,
    );
  }
};

const measure = (slot: Slot) => {
  slot.view.width = Math.max(1, slot.container.clientWidth);
  slot.view.height = Math.max(1, slot.container.clientHeight);
  slot.view.ratio = Math.min(window.devicePixelRatio || 1, 1.5);
};

const frame = (now: number) => {
  raf = 0;
  if (document.hidden) return;
  const dt = last ? clamp((now - last) / 1000, 0.001, 0.05) : 1 / 60;
  last = now;
  let moving = false;
  for (const slot of slots) {
    if (!slot.visible || slot.container.clientWidth < 2 || slot.container.clientHeight < 2) continue;
    const s = slot.settings;
    if (!reduceMotion) slot.time += dt * s.speed * 0.16;
    if (slot.introClock < 1) slot.introClock = Math.min(1, slot.introClock + dt / INTRO_SECONDS);
    slot.grainClock += dt;
    if (s.grainAnimated && !reduceMotion && slot.grainClock > 1 / 24) {
      slot.grainClock = 0;
      slot.frameSeed = (slot.frameSeed + 1) % 97;
    }
    updateTouches(slot, dt);
    renderSlot(slot);
    if (
      (!reduceMotion && (s.speed > 0 || s.grainAnimated)) ||
      slot.introClock < 1 ||
      slot.trail.length > 0 ||
      slot.spins.length > 0
    ) {
      moving = true;
    }
  }
  if (moving) raf = requestAnimationFrame(frame);
  else last = 0;
};

const wake = () => {
  if (!raf && !document.hidden) raf = requestAnimationFrame(frame);
};

const locate = (slot: Slot, event: PointerEvent) => {
  const rect = slot.container.getBoundingClientRect();
  const x = (event.clientX - rect.left) / Math.max(1, rect.width);
  const y = 1 - (event.clientY - rect.top) / Math.max(1, rect.height);
  const pointer = slot.pointer;
  pointer.inside = x >= 0 && x <= 1 && y >= 0 && y <= 1 && rect.width > 2 && rect.height > 2;
  pointer.x = x;
  pointer.y = y;
  if (pointer.fresh || !pointer.inside) {
    pointer.sx = x;
    pointer.sy = y;
    pointer.fresh = false;
  }
};

const bindShared = () => {
  const onPointerMove = (event: PointerEvent) => {
    let hit = false;
    for (const slot of slots) {
      locate(slot, event);
      if (slot.pointer.inside || slot.trail.length) hit = true;
    }
    if (hit) wake();
  };
  const onPointerDown = (event: PointerEvent) => {
    for (const slot of slots) {
      locate(slot, event);
      if (!slot.pointer.inside || !slot.settings.clickSwirl || reduceMotion) continue;
      slot.spins.unshift({
        x: (slot.pointer.x - 0.5) * (slot.view.width / slot.view.height),
        y: slot.pointer.y - 0.5,
        age: 0,
        direction: slot.pointer.vx < 0 ? 1 : -1,
      });
      if (slot.spins.length > MAX_TWIRLS) slot.spins.pop();
      wake();
    }
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => {
    for (const slot of slots) slot.pointer.inside = false;
  });
  document.addEventListener('visibilitychange', () => {
    last = 0;
    wake();
  });
};

const register = (container: HTMLElement) => {
  if (container.dataset.ready === '1') return;
  const canvas = container.querySelector('canvas');
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx || !ensureGl()) return;
  container.dataset.ready = '1';
  variationSeed += 1;
  const settings = readSettings(container, variationSeed * 0.83);
  const slot: Slot = {
    container,
    canvas,
    ctx,
    settings,
    ramp: new Float32Array(MAX_COLORS * 3),
    visible: false,
    time: settings.variation,
    introClock: settings.intro && !reduceMotion ? 0 : 1,
    frameSeed: variationSeed % 97,
    grainClock: 0,
    view: { width: 1, height: 1, ratio: 1 },
    trail: [],
    spins: [],
    pointer: { x: 0.5, y: 0.5, sx: 0.5, sy: 0.5, vx: 0, inside: false, fresh: true },
    stirs: new Float32Array(MAX_STIRS * 4),
    stirWeights: new Float32Array(MAX_STIRS),
    twirls: new Float32Array(MAX_TWIRLS * 4),
  };
  writeRamp(slot);
  slots.push(slot);
  const resizeObserver = new ResizeObserver(() => {
    measure(slot);
    if (slot.visible) {
      renderSlot(slot);
      wake();
    }
  });
  resizeObserver.observe(container);
  const intersection = new IntersectionObserver(
    (entries) => {
      slot.visible = entries.some((entry) => entry.isIntersecting);
      if (slot.visible) {
        measure(slot);
        last = 0;
        wake();
      }
    },
    { rootMargin: '120px' },
  );
  intersection.observe(container);
  measure(slot);
  if (slot.container.clientWidth > 2 && slot.container.clientHeight > 2) {
    if (document.hidden) slot.introClock = 1;
    renderSlot(slot);
  }
};

export const setGrainientTone = (node: HTMLElement | null, tone: string) => {
  if (!node || !TONES[tone]) return;
  node.dataset.tone = tone;
  delete node.dataset.colors;
  const slot = slots.find((item) => item.container === node);
  if (!slot) return;
  slot.settings = readSettings(node, slot.settings.variation);
  writeRamp(slot);
  wake();
};

export const bootGrainients = () => {
  reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  if (!ensureGl()) return;
  if (!booted) {
    booted = true;
    bindShared();
  }
  document.querySelectorAll<HTMLElement>('[data-grainient]').forEach(register);
  wake();
};

