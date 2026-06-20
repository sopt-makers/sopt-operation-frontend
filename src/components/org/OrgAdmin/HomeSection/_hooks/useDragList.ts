import { type DragEvent, useEffect, useState } from 'react';

const isSameItem = <T extends { id: number }>(prevItem: T, nextItem: T) => {
  const prevKeys = Object.keys(prevItem) as (keyof T)[];
  const nextKeys = Object.keys(nextItem) as (keyof T)[];

  if (prevKeys.length !== nextKeys.length) {
    return false;
  }

  return prevKeys.every((key) => Object.is(prevItem[key], nextItem[key]));
};

const isSameList = <T extends { id: number }>(
  prevItems: T[],
  nextItems: T[],
) => {
  if (prevItems.length !== nextItems.length) {
    return false;
  }

  return prevItems.every((item, index) => isSameItem(item, nextItems[index]));
};

const useDragList = <T extends { id: number }>(initialItems: T[]) => {
  const [items, setItems] = useState(initialItems);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  useEffect(() => {
    setItems((prevItems) =>
      isSameList(prevItems, initialItems) ? prevItems : initialItems,
    );
  }, [initialItems]);

  const reorderItems = (targetId: number) => {
    if (draggingId === null || draggingId === targetId) {
      return;
    }

    setItems((prevItems) => {
      const draggingIndex = prevItems.findIndex(({ id }) => id === draggingId);
      const targetIndex = prevItems.findIndex(({ id }) => id === targetId);

      if (draggingIndex === -1 || targetIndex === -1) {
        return prevItems;
      }

      const nextItems = [...prevItems];
      const [draggingItem] = nextItems.splice(draggingIndex, 1);
      nextItems.splice(targetIndex, 0, draggingItem);

      return nextItems;
    });
  };

  const onDragStart = (event: DragEvent<HTMLButtonElement>, id: number) => {
    setDraggingId(id);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(id));
  };

  const onDragEnd = () => {
    setDraggingId(null);
  };

  const onDragOver = (event: DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: DragEvent<HTMLLIElement>, targetId: number) => {
    event.preventDefault();
    reorderItems(targetId);
  };

  return {
    items,
    setItems,
    draggingId,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
  };
};

export default useDragList;
