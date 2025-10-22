import { useState } from "react";
import { generatePalette } from "./utils/generate-palatte";
import { generateContrastColor } from "./utils/colors";
import Colorful from "@uiw/react-color-colorful";
import { Button } from "./components/button";
import { BackgroundGrid } from "./components/background-grid";
import { TailwindCSS } from "./components/icons/tailwindcss";
import { CSSNew } from "./components/icons/css";
import { SVG } from "./components/icons/svg";
import { exportCss, exportSVG, exportTailwindcss } from "./utils/export";
import { copyToClipboard } from "./utils/clipboard";
import { Header } from "./components/header";
import { Shades } from "./components/shades";
import { ExportColor } from "./components/export-color";

function App() {
  const [shadesCount, setShadesCount] = useState<number>(9);
  const [color, setColor] = useState<string>("#121212");
  const [name, setName] = useState<string>("custom");

  const shades = generatePalette(color, shadesCount);

  return (
    <main className="bg-neutral-950 text-white w-screen h-screen relative items-center flex-col flex">
      <BackgroundGrid color={color} />
      <Header />
      <div className="px-10 z-50 w-full h-full flex flex-col items-center gap-y-10">
        <div className="flex flex-row w-[80%] gap-x-10 z-50">
          <div className="mr-10 flex-col flex gap-y-5">
            <h2 className="text-xl font-semibold">Settings</h2>
            <Colorful
              color={color}
              disableAlpha={true}
              onChange={(color) => {
                setColor(color.hex);
              }}
            />
            <div className="mt-5">
              <div className="flex flex-row mb-2 items-center gap-x-5">
                <p>Shade count</p>
                <p className="font-black">{shadesCount}</p>
              </div>
              <input
                type="range"
                min={5}
                max={12}
                value={shadesCount}
                onChange={(e) => setShadesCount(Number(e.target.value))}
              />
            </div>
            <div>
              <div className="flex flex-row mb-2 items-center justify-between">
                <p>Palette name</p>
              </div>
              <input
                type="text"
                className="px-3 py-2 rounded-lg text-white bg-white/5 border border-neutral-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <ExportColor shades={shades} name={name} />
          </div>
          <Shades shades={shades} />
        </div>
      </div>
    </main>
  );
}

export default App;
