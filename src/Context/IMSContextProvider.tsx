import React, { useState, useMemo } from "react";
import { IMSContext } from "./IMSContext";
import { Item, AdvanceItemResponse } from "../Type/Type";

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

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      itemID,
      setItemID,
      items,
      setItems,
      totalPrice,
      setTotalPrice,
      advanceItemsResponse,
      setAdvanceItemsResponse,
    }),
    [itemID, items, totalPrice, advanceItemsResponse] // Dependencies
  );

  return (
    <IMSContext.Provider value={contextValue}>{children}</IMSContext.Provider>
  );
};

export default IMSContextProvider;
