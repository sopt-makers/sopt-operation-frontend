export type Review = {
  id: number;
  title: string;
  content?: string;
  authorInfo?: string;
};

export type ReviewForm = Omit<Review, 'id'>;
