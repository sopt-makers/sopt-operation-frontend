const isValidHexColor = (hex: string) => {
  const hexRegex = /^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
  return hexRegex.test(hex);
};

export const expandHexColor = (hex: string) => {
  if (!isValidHexColor(hex)) return '#ffffff';

  if (hex.length === 3) {
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  return `#${hex}`;
};
