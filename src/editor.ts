type Segment = { char: string; weight: number } | { type: "newline" };

const segments: Segment[] = [];
let container: HTMLElement | null = null;

// 実測される打鍵圧はおよそ 0.81(下限フォールバック値)〜1.1 程度の狭いレンジに収まるため、
// 見た目で差が分かるようフォントウェイトの全域(100〜900)に引き伸ばして割り当てる。
// 実機での見え方を見ながら調整する前提の値。
const PRESSURE_MIN = 0.81;
const PRESSURE_MAX = 1.1;
const WEIGHT_MIN = 100;
const WEIGHT_MAX = 900;

function pressureToWeight(pressure: number): number {
  const ratio = (pressure - PRESSURE_MIN) / (PRESSURE_MAX - PRESSURE_MIN);
  const weight = WEIGHT_MIN + ratio * (WEIGHT_MAX - WEIGHT_MIN);
  return Math.min(WEIGHT_MAX, Math.max(WEIGHT_MIN, weight));
}

function render() {
  if (!container) return;
  container.innerHTML = "";
  for (const segment of segments) {
    if ("type" in segment) {
      container.appendChild(document.createElement("br"));
    } else {
      const span = document.createElement("span");
      span.style.fontWeight = String(segment.weight);
      span.textContent = segment.char;
      container.appendChild(span);
    }
  }
}

function mountEditor(el: HTMLElement) {
  container = el;
  render();
}

function insertChar(char: string, weight: number) {
  segments.push({ char, weight });
  render();
}

function insertNewline() {
  segments.push({ type: "newline" });
  render();
}

function deleteLast() {
  segments.pop();
  render();
}

export { mountEditor, insertChar, insertNewline, deleteLast, pressureToWeight };
