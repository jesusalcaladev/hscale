import { Colorful } from "@uiw/react-color";
import type { Shade } from "../types/shade";
import { ExportPalette } from "./export-palette";

type Props = {
  color: string;
  setColor: (color: string) => void;
  name: string;
  setName: (name: string) => void;
  shadesCount: number;
  setShadesCount: (count: number) => void;
  shades: Shade[];
};

export const SettingPalette = ({
  color,
  setColor,
  name,
  setName,
  shadesCount,
  setShadesCount,
  shades,
}: Props) => {
  return (
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
      <ExportPalette shades={shades} name={name} />
    </div>
  );
};
