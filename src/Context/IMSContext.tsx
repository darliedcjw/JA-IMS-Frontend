// IMSContext.tsx
import { createContext } from "react";

type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
};

type AdvanceItemResponse = {
  items: Item[];
  count: number;
  page: number;
  limit: number;
};

type IMSContextType = {
  itemID: number | null;
  setItemID: React.Dispatch<React.SetStateAction<number | null>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  totalPrice: number | null;
  setTotalPrice: React.Dispatch<React.SetStateAction<number | null>>;
  advanceItemsResponse: AdvanceItemResponse;
  setAdvanceItemsResponse: React.Dispatch<
    React.SetStateAction<AdvanceItemResponse>
  >;
};

export const IMSContext = createContext<IMSContextType>({
  itemID: null,
  setItemID: () => {}, // Provide a dummy function as default
  items: [],
  setItems: () => {},
  totalPrice: null,
  setTotalPrice: () => {},
  advanceItemsResponse: {
    items: [],
    count: 0,
    page: 1,
    limit: 10,
  },
  setAdvanceItemsResponse: () => {},
});
