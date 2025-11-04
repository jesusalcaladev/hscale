import type { Shade } from "../types/shade";
import { ShadeItem } from "./shade-item";

export const ShadesList = ({ shades }: { shades: Shade[] }) => {
	return (
		<section className="z-50">
			<p className="mb-5 text-lg font-semibold">Your Color Palette</p>
			<div className="flex flex-row gap-x-2 gap-y-2 h-40 items-center flex-wrap">
				{shades.map((shade, index) => (
					<ShadeItem key={`${shade.hsl}-${index}`} shade={shade} />
				))}
			</div>
		</section>
	);
};
