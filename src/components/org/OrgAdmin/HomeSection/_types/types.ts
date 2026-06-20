import type { DragEvent } from 'react';

export type Review = {
  id: number;
  title: string;
  content?: string;
  authorInfo?: string;
};

export type ReviewForm = Omit<Review, 'id'>;

export type DragHandlers = {
  onDragStart: (event: DragEvent<HTMLButtonElement>, id: number) => void;
  onDragEnd: () => void;
  onDragOver: (event: DragEvent<HTMLLIElement>) => void;
  onDrop: (event: DragEvent<HTMLLIElement>, id: number) => void;
};
