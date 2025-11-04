import type { Shade } from "../types/shade";
import { hslToHex } from "./colors";

export const generatePalette = (color: string, shades: number): Shade[] => {
	const hex = color.replace(/^#/, "");
	const r = parseInt(hex.substr(0, 2), 16) / 255;
	const g = parseInt(hex.substr(2, 2), 16) / 255;
	const b = parseInt(hex.substr(4, 2), 16) / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	const baseHue = Math.round(h * 360);
	const baseSaturation = Math.round(s * 100);

	const palette = [];

	// Distribución de luminosidad predefinida (de claro a oscuro)
	const lightnessValues = [95, 85, 75, 65, 55, 45, 35, 25, 15, 10, 8, 5];

	// Nombres en formato 50, 100, 200, ..., 900, 950
	const shadeNames = [
		50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000,
	];

	for (let i = 0; i < shades; i++) {
		// Usar distribución predefinida o calcular proporcionalmente
		const lightness =
			i < lightnessValues.length
				? lightnessValues[i]
				: Math.max(5, 100 - i * (95 / (shades - 1)));

		// Ajustar saturación para colores muy claros/oscuros
		let saturation = baseSaturation;
		if (lightness > 85 || lightness < 15) {
			saturation = Math.min(100, baseSaturation + 15);
		}

		const hslValue = `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
		const hex = hslToHex(hslValue);
		const name = shadeNames[i].toString();

		palette.push({
			name: name,
			hex: hex,
			hsl: hslValue,
		});
	}

	return palette;
};
