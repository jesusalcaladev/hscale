const toHex = (r: number, g: number, b: number) => {
  const toHex = (c: number): string => {
    const hex = Math.max(0, Math.min(255, c)).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const hslToHex = (hsl: string) => {
  const match = hsl.match(
    /hsl\(\s*(\d+)(?:deg)?\s*[,\s]\s*(\d+)%\s*[,\s]\s*(\d+)%\s*\)/i,
  );

  if (!match) {
    // Handle invalid HSL string format, e.g., return a default black or throw an error
    console.warn("Invalid HSL string format:", hsl);
    return "#000000";
  }

  let h = parseInt(match[1], 10);
  const s = parseInt(match[2], 10) / 100;
  const l = parseInt(match[3], 10) / 100;

  // Normalize hue to be within [0, 360)
  h %= 360;
  if (h < 0) h += 360;

  if (s === 0) {
    // Achromatic (grayscale)
    const val = Math.round(l * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${val}${val}${val}`;
  }

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r_prime = 0;
  let g_prime = 0;
  let b_prime = 0;

  if (0 <= h && h < 60) {
    r_prime = c;
    g_prime = x;
    b_prime = 0;
  } else if (60 <= h && h < 120) {
    r_prime = x;
    g_prime = c;
    b_prime = 0;
  } else if (120 <= h && h < 180) {
    r_prime = 0;
    g_prime = c;
    b_prime = x;
  } else if (180 <= h && h < 240) {
    r_prime = 0;
    g_prime = x;
    b_prime = c;
  } else if (240 <= h && h < 300) {
    r_prime = x;
    g_prime = 0;
    b_prime = c;
  } else if (300 <= h && h < 360) {
    r_prime = c;
    g_prime = 0;
    b_prime = x;
  }

  const r = Math.round((r_prime + m) * 255);
  const g = Math.round((g_prime + m) * 255);
  const b = Math.round((b_prime + m) * 255);

  return toHex(r, g, b);
};

export const hexToHsl = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error("Invalid hex color");

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max === min) {
    h = s = 0;
  } else {
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

  return { h, s, l };
};

export const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (c: number): string => {
    const hex = Math.max(0, Math.min(255, c)).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error("Invalid hex color");

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return { r, g, b };
};

const srgbToLinear = (value: number): number => {
  if (value <= 0.04045) {
    return value / 12.92;
  } else {
    return Math.pow((value + 0.055) / 1.055, 2.4);
  }
};

export const hexToOklch = (
  hex: string,
): { l: number; c: number; h: number } => {
  // Primero convertir HEX a RGB
  const { r, g, b } = hexToRgb(hex);

  // Convertir RGB a Linear RGB
  const linearR = srgbToLinear(r / 255);
  const linearG = srgbToLinear(g / 255);
  const linearB = srgbToLinear(b / 255);

  // Convertir Linear RGB a LMS (cone response)
  const l =
    0.4122214708 * linearR + 0.5363325363 * linearG + 0.0514459929 * linearB;
  const m =
    0.2119034982 * linearR + 0.6806995451 * linearG + 0.1073969566 * linearB;
  const s =
    0.0883024619 * linearR + 0.2817188376 * linearG + 0.6299787005 * linearB;

  // Aplicar la función de compresión (raíz cúbica)
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  // Convertir LMS a OKLab
  const ll = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const aa = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  // Convertir OKLab a OKLCH
  const lightness = ll;
  const chroma = Math.sqrt(aa * aa + bb * bb);
  let hue = Math.atan2(bb, aa) * (180 / Math.PI);

  // Asegurar que el hue esté entre 0 y 360
  if (hue < 0) hue += 360;

  return {
    l: Math.round(lightness * 10000) / 10000,
    c: Math.round(chroma * 10000) / 10000,
    h: Math.round(hue * 100) / 100,
  };
};

export const generateContrastColor = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#ffffff";
};
