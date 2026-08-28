# pressure-sensitive-editor

アナログ感圧キーボード（Wooting / Keychron HE など）の打鍵圧に応じて、文字の大きさが変わるシンプルなテキストエディタです。

## 特徴

- 通常の `keydown` / IME は使わず、キーボードのアナログ入力（[WebHID](https://developer.mozilla.org/docs/Web/API/WebHID_API)）から取得した打鍵圧のみを入力経路として使用します。
- 入力できる文字はアルファベット（小文字固定）とスペースのみ。Backspace で削除、Enter で改行できます。
- 各キーが底打ちした瞬間の打鍵圧（N相当）を算出し、その強さに応じて挿入される文字の `font-size`（大きさ）を変化させます。
- 画面上部のリボンに接続状態と、直近に入力した打鍵圧（N）を表示します。

## 必要環境

- WebHID API に対応したブラウザ（Chrome など）
- アナログ感圧キーボード（Wooting、Keychron/Lemokey HEシリーズ、Razer Huntsman、NuPhy、DrunkDeer、MadLions、Bytech系デバイスなど、`src/AnalogSense.js` に実装済みのデバイス）

## セットアップ

```bash
npm install
npm run dev
```

ブラウザで表示された URL を開き、「アナログキーボードに接続」ボタンからデバイスの使用を許可してください。

## 主要ファイル構成

- [`src/AnalogSense.js`](src/AnalogSense.js) / [`src/analogsense.d.ts`](src/analogsense.d.ts) — 各種アナログキーボードの WebHID デバイスドライバ層
- [`src/AnalogsenseHandler.ts`](src/AnalogsenseHandler.ts) — デバイス接続・入力取得のハンドラ
- [`src/calcPressure.ts`](src/calcPressure.ts) — キーの押下速度から打鍵圧を算出するロジック
- [`src/editor.ts`](src/editor.ts) — エディタの文字列モデルと描画、打鍵圧→文字の大きさの変換
- [`src/main.ts`](src/main.ts) — 上記を配線するエントリーポイント

## ビルド

```bash
npm run build
```
