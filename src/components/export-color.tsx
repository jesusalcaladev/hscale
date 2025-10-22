import type { Shade } from "../types/shade";
import { copyToClipboard } from "../utils/clipboard";
import { exportCss, exportSVG, exportTailwindcss } from "../utils/export";
import { Button } from "./button";
import { CSSNew } from "./icons/css";
import { SVG } from "./icons/svg";
import { TailwindCSS } from "./icons/tailwindcss";

export const ExportColor = ({
  shades,
  name,
}: {
  shades: Shade[];
  name: string;
}) => {
  return (
    <div className="mt-5">
      <p className="mb-3">Export for</p>
      <div className="flex flex-row flex-wrap gap-x-2 gap-y-4">
        <Button
          onClick={() => {
            const css = exportTailwindcss(shades, name);
            copyToClipboard(css, "Tailwind CSS copied to clipboard!");
          }}
        >
          <TailwindCSS className="size-5" />
        </Button>
        <Button
          onClick={() => {
            const css = exportCss(shades, name);
            copyToClipboard(css, "CSS copied to clipboard!");
          }}
        >
          <CSSNew className="size-5" />
        </Button>
        <Button
          onClick={() => {
            const svg = exportSVG(shades);
            copyToClipboard(svg, "SVG copied to clipboard!");
          }}
        >
          <SVG className="size-5" />
        </Button>
      </div>
    </div>
  );
};
