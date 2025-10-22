import type { Shade } from "../types/shade";
import { copyToClipboard } from "../utils/clipboard";
import { generateContrastColor } from "../utils/colors";

export const Shades = ({ shades }: { shades: Shade[] }) => {
  return (
    <section className="z-50">
      <p className="mb-5 text-lg font-semibold">Your Color Palette</p>
      <div className="flex flex-row gap-x-2 gap-y-2 h-40 items-center flex-wrap">
        {shades.map((shade) => (
          <div
            onClick={() => {
              copyToClipboard(shade.hex, "Color copied to clipboard!");
            }}
            key={shade.hsl}
            className={`w-[110px] hover:scale-[1.05] active:scale-[0.95] hover:opacity-70 transition-all hover:cursor-pointer h-full rounded-xl px-2 py-2 flex flex-col justify-between`}
            style={{ backgroundColor: shade.hex }}
          >
            <p
              className="font-medium text-sm"
              style={{
                color: generateContrastColor(shade.hex),
              }}
            >
              color-{shade.name}
            </p>
            <p
              className="opacity-60 "
              style={{
                color: generateContrastColor(shade.hex),
              }}
            >
              {shade.hex}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
