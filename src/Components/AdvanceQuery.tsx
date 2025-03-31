import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { IMSContext } from "../Context/IMSContext";
import { AdvanceQueryInputs, Item } from "../Type/Type";

const AdvanceQuery = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<AdvanceQueryInputs>({
    defaultValues: {
      name: "",
      category: "",
      price_min: 1,
      price_max: 10,
      page: 1,
      limit: 10,
      sort_field: "price",
      sort_order: "asc",
    },
  });

  const [categories, setCategories] = useState<string[] | null>([]);
  const [selected, setSelected] = useState<string>("Select All Categories");
  const [selectedSortField, setSelectedSortField] = useState<string>("price");
  const [selectedSortOrder, setSelectedSortOrder] = useState<string>("asc");
  const { itemID, setAdvanceItemsResponse } = useContext(IMSContext);

  const sortFields = ["name", "category", "price"];
  const sortOrders = ["asc", "desc"];

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:2000/query", {});
        const items = response.data.items;
        const uniqueCategories = Array.from(
          new Set(items.map((item: Item) => item.category))
        ) as string[];

        setCategories(["Select All Categories", ...uniqueCategories]);
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchCategory();
  }, [itemID]);

  useEffect(() => {
    setValue("category", selected);
  }, [selected]);

  useEffect(() => {
    setValue("sort_field", selectedSortField);
  }, [selectedSortField]);

  useEffect(() => {
    setValue("sort_order", selectedSortOrder);
  }, [selectedSortOrder]);

  const handleApiError = (error: any) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          `Error: ${error.response.status} - ${error.response.data.detail}`
        );
        setError("root.serverError", {
          type: "server",
          message: `Error: ${error.response.status} - ${error.response.data.detail}`,
        });
      } else if (error.request) {
        console.error("Error: No response from server");
        setError("root.serverError", {
          type: "server",
          message: "Error: No response from server",
        });
      } else {
        console.error(`Error: ${error.message}`);
        setError("root.serverError", {
          type: "server",
          message: `Error: ${error.message}`,
        });
      }
    } else {
      console.error("An unknown error occurred:", error);
      setError("root.serverError", {
        type: "server",
        message: `Error: ${error}`,
      });
    }
  };

  const onSubmit: SubmitHandler<AdvanceQueryInputs> = async (data) => {
    try {
      const filters: Record<string, string | number[]> = {};

      if (data.name) {
        filters.name = data.name;
      }

      if (data.category && data.category !== "Select All Categories") {
        filters.category = data.category;
      }

      filters.price_range = [Number(data.price_min), Number(data.price_max)];

      const payload = {
        filters: filters,
        pagination: {
          page: Number(data.page),
          limit: Number(data.limit),
        },
        sort: {
          field: data.sort_field,
          order: data.sort_order,
        },
      };

      const response = await axios.post(
        "http://127.0.0.1:2000/advance-query",
        payload
      );
      setAdvanceItemsResponse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(
            `Error: ${error.response.status} - ${error.response.data.detail}`
          );
          setError("root.serverError", {
            type: "server",
            message: `Error: ${error.response.status} - ${error.response.data.detail}`,
          });
        }
        // Handle errors where no response was received
        else if (error.request) {
          console.error("Error: No response from server");
          setError("root.serverError", {
            type: "server",
            message: "Error: No response from server",
          });
        }
        // Handle other errors
        else {
          console.error(`Error: ${error.message}`);
          setError("root.serverError", {
            type: "server",
            message: `Error: ${error.message}`,
          });
        }
      } else {
        // Handle non-Axios errors
        console.error("An unknown error occurred:", error);
        setError("root.serverError", {
          type: "server",
          message: `Error: ${error}`,
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="ms-5 mt-5 me-5">
          <h1 className="text-base/7 font-semibold text-gray-900">
            Advanced Query Inventory
          </h1>

          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    {...register("name")}
                    id="name"
                    type="text"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    placeholder="Enter product name"
                  />
                </div>
              </div>
              <div className="mt-1">
                {errors.name && (
                  <p className="text-sm text-red-400 font-medium">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Listbox value={selected ?? null} onChange={setSelected}>
            <Label className="mt-3 block text-sm/6 font-medium text-gray-900">
              Category
            </Label>
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4 ">
                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                  <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                    <span className="block truncate">{selected}</span>
                  </span>
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                  {categories?.map((category) => (
                    <ListboxOption
                      key={category}
                      value={category}
                      className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                    >
                      <div className="flex items-center">
                        <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                          {category}
                        </span>
                      </div>

                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                        <CheckIcon aria-hidden="true" className="size-5" />
                      </span>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </div>
          </Listbox>

          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="price_min"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Minimum Price
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    {...register("price_min", {
                      required: "Minimum price is required",
                      valueAsNumber: true,
                      min: { value: 0, message: "Price must be positive" },
                    })}
                    id="price_min"
                    type="number"
                    step="0.01"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="mt-1">
                {errors.price_min && (
                  <p className="text-sm text-red-400 font-medium">
                    {errors.price_min.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="price_max"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Maximum Price
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    {...register("price_max", {
                      required: "Maximum price is required",
                      valueAsNumber: true,
                      min: { value: 0, message: "Price must be positive" },
                    })}
                    id="price_max"
                    type="number"
                    step="0.01"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="mt-1">
                {errors.price_max && (
                  <p className="text-sm text-red-400 font-medium">
                    {errors.price_max.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="page"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Page
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    {...register("page", {
                      required: "Page is required",
                      valueAsNumber: true,
                      min: { value: 1, message: "Minimally need 1 page" },
                    })}
                    id="page"
                    type="number"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="mt-1">
                {errors.page && (
                  <p className="text-sm text-red-400 font-medium">
                    {errors.page.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="limit"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Items Per Page
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    {...register("limit", {
                      required: "Items per page is required",
                      valueAsNumber: true,
                      min: { value: 1, message: "Must show at least 1 item" },
                    })}
                    id="limit"
                    type="number"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="mt-1">
                {errors.limit && (
                  <p className="text-sm text-red-400 font-medium">
                    {errors.limit.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label className="block text-sm/6 font-medium text-gray-900">
                Sort By
              </label>
              <Listbox
                value={selectedSortField}
                onChange={setSelectedSortField}
              >
                <div className="mt-2">
                  <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                      <span className="block truncate">
                        {selectedSortField}
                      </span>
                    </span>
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </ListboxButton>
                  <ListboxOptions
                    transition
                    className="z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                  >
                    {sortFields.map((field) => (
                      <ListboxOption
                        key={field}
                        value={field}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                      >
                        <div className="flex items-center">
                          <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                            {field}
                          </span>
                        </div>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                          <CheckIcon aria-hidden="true" className="size-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm/6 font-medium text-gray-900">
                Sort Order
              </label>
              <Listbox
                value={selectedSortOrder}
                onChange={setSelectedSortOrder}
              >
                <div className="mt-2">
                  <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                      <span className="block truncate">
                        {selectedSortOrder}
                      </span>
                    </span>
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </ListboxButton>
                  <ListboxOptions
                    transition
                    className="z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                  >
                    {sortOrders.map((order) => (
                      <ListboxOption
                        key={order}
                        value={order}
                        className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                      >
                        <div className="flex items-center">
                          <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                            {order}
                          </span>
                        </div>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                          <CheckIcon aria-hidden="true" className="size-5" />
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-start gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Advance Query
            </button>
          </div>

          <div className="mt-4">
            {errors.root?.serverError && (
              <p className="text-red-400 font-semibold">
                {errors.root.serverError.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default AdvanceQuery;
