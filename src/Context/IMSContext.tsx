// IMSContext.tsx
import { createContext } from "react";

type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
};

type IMSContextType = {
  itemID: number | null;
  setItemID: React.Dispatch<React.SetStateAction<number | null>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  totalPrice: number | null;
  setTotalPrice: React.Dispatch<React.SetStateAction<number | null>>;
};

export const IMSContext = createContext<IMSContextType>({
  itemID: null,
  setItemID: () => {}, // Provide a dummy function as default
  items: [],
  setItems: () => {},
  totalPrice: null,
  setTotalPrice: () => {},
});
