
import "./style.css";
import {
  connectAnalogDevice,
  hasAuthorizedDevice,
  startAnalogDeviceMonitor,
  SetAnalogsenseCallback,
} from "./AnalogsenseHandler.ts";
import { CaliculatePressure, SetPressureCallback } from "./calcPressure.ts";
import { mountEditor, insertChar, insertNewline, deleteLast, pressureToWeight } from "./editor.ts";

const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <div id="status-bar">
    <button id="connect-button">アナログキーボードに接続</button>
    <span id="status-text">未接続</span>
    <span id="pressure-text"></span>
  </div>
  <div id="editor"></div>
`;

const connectButton = document.querySelector<HTMLButtonElement>("#connect-button")!;
const statusText = document.querySelector<HTMLSpanElement>("#status-text")!;
const pressureText = document.querySelector<HTMLSpanElement>("#pressure-text")!;
mountEditor(document.querySelector<HTMLDivElement>("#editor")!);

async function connect() {
  connectButton.disabled = true;
  const connected = await connectAnalogDevice();
  statusText.textContent = connected ? "接続済み" : "未接続";
  connectButton.disabled = connected;
}

connectButton.addEventListener("click", connect);
startAnalogDeviceMonitor(() => connect());

if (await hasAuthorizedDevice()) {
  connect();
}

SetAnalogsenseCallback((inputs) => {
  for (const { key, value } of inputs) {
    CaliculatePressure(key, value);
  }
});

SetPressureCallback((code, pressure) => {
  pressureText.textContent = `${pressure.toFixed(2)}N`;
  if (code.length === 1 && /^[A-Z]$/.test(code)) {
    insertChar(code.toLowerCase(), pressureToWeight(pressure));
  } else if (code === "Space") {
    insertChar(" ", pressureToWeight(pressure));
  } else if (code === "Backspace") {
    deleteLast();
  } else if (code === "Enter") {
    insertNewline();
  }
});
