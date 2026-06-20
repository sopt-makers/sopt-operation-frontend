export const isSameOrder = <T extends { id: number }>(
  prevItems: T[],
  nextItems: T[],
) =>
  prevItems.length === nextItems.length &&
  prevItems.every((item, index) => item.id === nextItems[index]?.id);
