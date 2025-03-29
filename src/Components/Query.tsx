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

type Inputs = {
  dt_from: Date | null;
  dt_to: Date | null;
  category: string | null;
};

type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
};

const Query = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<Inputs>();

  const [categories, setCategories] = useState<string[] | null>([]);
  const [selected, setSelected] = useState<string>("Select All Categories");
  const { itemID, setItems, setTotalPrice } = useContext(IMSContext);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:2000/query", {});
        const items = response.data.items;

        // Get unique categories with proper typing
        const uniqueCategories = Array.from(
          new Set(items.map((item: Item) => item.category))
        ) as string[];

        setCategories(["Select All Categories", ...uniqueCategories]);
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

    fetchCategory();
  }, [itemID]);

  useEffect(() => {
    setValue("category", selected);
  }, [selected]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const payload: Record<string, string> = {}; // Initialize an empty object

      if (data.dt_from) {
        payload.dt_from = String(data.dt_from).replace("T", " ");
      }

      if (data.dt_to) {
        payload.dt_to = String(data.dt_to).replace("T", " ");
      }

      if (data.category && data.category !== "Select All Categories") {
        payload.category = data.category;
      }

      const response = await axios.post("http://127.0.0.1:2000/query", payload);
      setItems(response.data.items);
      setTotalPrice(response.data.total_price);
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
            Query Inventory
          </h1>

          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="dt_from"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Search by start date
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    {...register("dt_from")}
                    id="dt_from"
                    name="dt_from"
                    type="datetime-local"
                    step={1}
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="mt-1">
                {errors.dt_from && (
                  <p className="text-sm text-red-400 font-medium">
                    {errors.dt_from.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="dt_to"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Search by end date
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    {...register("dt_to")}
                    id="dt_to"
                    name="dt_to"
                    type="datetime-local"
                    step={1}
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="mt-1">
                {errors.dt_to && (
                  <p className="text-sm text-red-400 font-medium">
                    {errors.dt_to.message}
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

          <div className="mt-6 flex items-center justify-start gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Query
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

export default Query;
