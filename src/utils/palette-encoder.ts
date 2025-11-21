import type { Shade } from "../types/shade";

export const encodePalette = (palette: Shade[]): string => {
	const hexCodes = palette.map((shade) => shade.hex.replace("#", ""));
	const encoded = hexCodes.join("-");

	return btoa(encoded)
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
};

export const decodePalette = (encodedString: string): string[] => {
	try {
		const decoded = atob(encodedString.replace(/-/g, "+").replace(/_/g, "/"));
		return decoded.split("-").map((hex) => `#${hex}`);
	} catch (error) {
		console.error("Error decoding palette:", error);
		return [];
	}
};
