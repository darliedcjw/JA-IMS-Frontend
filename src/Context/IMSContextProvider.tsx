import React, { useState } from "react";
import { IMSContext } from "./IMSContext";

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

const IMSContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [itemID, setItemID] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [advanceItemsResponse, setAdvanceItemsResponse] =
    useState<AdvanceItemResponse>({
      items: [],
      count: 0,
      page: 1,
      limit: 10,
    });

  return (
    <IMSContext.Provider
      value={{
        itemID,
        setItemID,
        items,
        setItems,
        totalPrice,
        setTotalPrice,
        advanceItemsResponse,
        setAdvanceItemsResponse,
      }}
    >
      {children}
    </IMSContext.Provider>
  );
};

export default IMSContextProvider;
