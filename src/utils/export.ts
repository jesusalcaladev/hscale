import type { Shade } from "../types/shade";
import { generateContrastColor, hexToOklch } from "./colors";

export const exportSVG = (shades: Shade[]) => {
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	// Ancho basado en la cantidad de colores (cada color 100px de ancho)
	svg.setAttribute("width", (shades.length * 100).toString());
	svg.setAttribute("height", "100");
	svg.setAttribute("viewBox", `0 0 ${shades.length * 100} 100`);
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

	// Crear un rectángulo para cada color en la paleta
	shades.forEach((color, index) => {
		const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rect.setAttribute("x", (index * 100).toString());
		rect.setAttribute("y", "0");
		rect.setAttribute("width", "100");
		rect.setAttribute("height", "100");
		rect.setAttribute("fill", color.hex);
		svg.appendChild(rect);

		// Opcional: agregar texto con el nombre/número del color
		const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text.setAttribute("x", (index * 100 + 50).toString());
		text.setAttribute("y", "50");
		text.setAttribute("text-anchor", "middle");
		text.setAttribute("dominant-baseline", "middle");
		text.setAttribute("fill", generateContrastColor(color.hex));
		text.setAttribute("font-family", "Arial, sans-serif");
		text.setAttribute("font-size", "14");
		text.textContent = color.name; // o el nombre que prefieras
		svg.appendChild(text);
	});

	return svg.outerHTML;
};

export const exportTailwindcss = (
	shades: Shade[],
	namePalette: string = "custom",
) => {
	let variables = "";
	shades.forEach((shade) => {
		const { c, h, l } = hexToOklch(shade.hex);
		variables += `--${namePalette}-${shade.name}: oklch(${l} ${c} ${h});\n`;
	});

	return variables;
};

export const exportCss = (shades: Shade[], namePalette: string = "custom") => {
	let variables = "";
	variables += ":root {\n";
	shades.forEach((shade) => {
		variables += `--${namePalette}-${shade.name}: ${shade.hex};\n`;
	});
	variables += "}\n";

	return variables;
};
