export type Ad = {
  id: number;
  title: string;
  picture: string;
  description: string;
  location: string;
  owner: string;
  price: number;
  createdAt: string;
  category: { id: number };
  user: { id: number };
};
