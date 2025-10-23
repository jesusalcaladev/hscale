import { BackgroundGrid } from "./components/ui/background-grid";
import { Header } from "./components/header";
import { ShadesList } from "./components/shades-list";
import { SettingPalette } from "./components/setting-palette";
import { usePalette } from "./hooks/use-palette";

export function HScale() {
  const { settingProps, shades, color } = usePalette();
  return (
    <main className="bg-neutral-950 text-white w-screen overflow-x-hidden min-h-screen relative items-center flex-col flex">
      <BackgroundGrid color={color} />
      <Header />
      <div className="px-10 z-50 w-full h-full flex flex-col items-center gap-y-10">
        <div className="flex flex-row w-[80%] gap-x-10 z-50">
          <SettingPalette {...settingProps} />
          <ShadesList shades={shades} />
        </div>
      </div>
    </main>
  );
}
