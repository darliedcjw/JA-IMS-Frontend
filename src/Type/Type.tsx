export type AdvanceQueryInputs = {
  name: string;
  category: string;
  price_min: number;
  price_max: number;
  page: number;
  limit: number;
  sort_field: string;
  sort_order: string;
};

export type QueryInputs = {
  dt_from: Date | null;
  dt_to: Date | null;
  category: string | null;
};

export type UpsertInputs = {
  name: string;
  price: number;
  category: string;
};

export type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
};
