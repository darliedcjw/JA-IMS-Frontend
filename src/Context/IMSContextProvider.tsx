import React, { useState } from "react";
import { IMSContext } from "./IMSContext";

type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
};

const IMSContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [itemID, setItemID] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  return (
    <IMSContext.Provider
      value={{ itemID, setItemID, items, setItems, totalPrice, setTotalPrice }}
    >
      {children}
    </IMSContext.Provider>
  );
};

export default IMSContextProvider;
