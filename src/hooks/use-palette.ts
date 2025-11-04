import { useEffect, useState } from "react";
import { generatePalette } from "../utils/generate-palatte";
import type { Shade } from "../types/shade";

const DEFAULT_SHADES_COUNT = 9;

export const usePalette = () => {
	const [shadesCount, setShadesCount] = useState<number>(DEFAULT_SHADES_COUNT);
	const [color, setColor] = useState<string>("#121212");
	const [name, setName] = useState<string>("custom");
	const [shades, setShades] = useState<Shade[]>(
		generatePalette(color, shadesCount),
	);

	useEffect(() => {
		const newShades = generatePalette(color, shadesCount);
		setShades(newShades);
	}, [color, shadesCount]);

	const settingProps = {
		color,
		setColor,
		name,
		setName,
		shadesCount,
		setShadesCount,
		shades,
	};

	return { shades, name, color, settingProps };
};
