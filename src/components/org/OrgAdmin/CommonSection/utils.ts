const isValidHexColor = (hex: string) => {
  const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
  return hexRegex.test(hex);
};

export const expandHexColor = (hex: string) => {
  if (!isValidHexColor(hex)) return '#ffffff';

  if (hex.length === 4) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }

  return hex;
};
