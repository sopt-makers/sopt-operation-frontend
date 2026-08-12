export const reconcileWithServerData = <T extends { id: number }>(
  draftItems: T[],
  serverItems: T[],
): T[] => {
  const serverById = new Map(serverItems.map((item) => [item.id, item]));

  const reconciledExisting = draftItems
    .filter((item) => serverById.has(item.id))
    .map((item) => serverById.get(item.id) as T);

  const draftIds = new Set(draftItems.map((item) => item.id));
  const newItems = serverItems.filter((item) => !draftIds.has(item.id));

  return [...reconciledExisting, ...newItems];
};
