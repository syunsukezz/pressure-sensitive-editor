type Segment = { char: string; size: number } | { type: "newline" };

const segments: Segment[] = [];
let container: HTMLElement | null = null;

// 実測される打鍵圧はおよそ 0.81(下限フォールバック値)〜1.1 程度の狭いレンジに収まるため、
// 見た目で差が分かるよう文字サイズ(rem)の範囲に引き伸ばして割り当てる。
// 実機での見え方を見ながら調整する前提の値。
const PRESSURE_MIN = 0.81;
const PRESSURE_MAX = 1.1;
const SIZE_MIN = 1;
const SIZE_MAX = 3;

function pressureToSize(pressure: number): number {
  const ratio = (pressure - PRESSURE_MIN) / (PRESSURE_MAX - PRESSURE_MIN);
  const size = SIZE_MIN + ratio * (SIZE_MAX - SIZE_MIN);
  return Math.min(SIZE_MAX, Math.max(SIZE_MIN, size));
}

function render() {
  if (!container) return;
  container.innerHTML = "";
  for (const segment of segments) {
    if ("type" in segment) {
      container.appendChild(document.createElement("br"));
    } else {
      const span = document.createElement("span");
      span.style.fontSize = `${segment.size}rem`;
      span.textContent = segment.char;
      container.appendChild(span);
    }
  }
}

function mountEditor(el: HTMLElement) {
  container = el;
  render();
}

function insertChar(char: string, size: number) {
  segments.push({ char, size });
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

export { mountEditor, insertChar, insertNewline, deleteLast, pressureToSize };
