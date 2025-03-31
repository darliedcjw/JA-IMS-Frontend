import axios from "axios";
import { useEffect, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IMSContext } from "../Context/IMSContext";
import { UpsertInputs } from "../Type/Type";

const Upsert = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    setError,
    reset,
  } = useForm<UpsertInputs>();

  const { itemID, setItemID } = useContext(IMSContext);

  // Track Form for Changes -> Remove last ID tag display
  useEffect(() => {
    if (isDirty) {
      setItemID(null);
    }
  }, [isDirty]);

  // API -> Upsert
  const onSubmit: SubmitHandler<UpsertInputs> = async (payload) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:2000/upsert",
        payload
      );
      console.log(response.data.id);
      setItemID(response.data.id);
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(
            `Error: ${error.response.status} - ${error.response.data.detail}`
          );
          setItemID(null);
          setError("root.serverError", {
            type: "server",
            message: `Error: ${error.response.status} - ${error.response.data.detail}`,
          });
        }
        // Handle errors where no response was received
        else if (error.request) {
          console.error("Error: No response from server");
          setItemID(null);
          setError("root.serverError", {
            type: "server",
            message: "Error: No response from server",
          });
        }
        // Handle other errors
        else {
          console.error(`Error: ${error.message}`);
          setItemID(null);
          setError("root.serverError", {
            type: "server",
            message: `Error: ${error.message}`,
          });
        }
      } else {
        // Handle non-Axios errors
        console.error("An unknown error occurred:", error);
        setItemID(null);
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
          <div className="border-b border-gray-900/10 pb-5">
            <h1 className="text-base/7 font-semibold text-gray-900">
              Insert/Update Inventory
            </h1>

            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="upsertName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      {...register("name", {
                        required: "Name is a required field.",
                      })}
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. Notebook"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
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

            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="upsertPrice"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 me-2">
                      SGD
                    </div>
                    <input
                      {...register("price", {
                        required: "Price is a required field.",
                      })}
                      id="price"
                      name="price"
                      type="number"
                      step={0.01}
                      placeholder="e.g. 3.50"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="mt-1">
                  {errors.price && (
                    <p className="text-sm text-red-400 font-medium">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="upsertCategory"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      {...register("category", {
                        required: "Category is a required field.",
                      })}
                      id="category"
                      name="category"
                      type="Text"
                      placeholder="e.g. Stationary"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="mt-1">
                  {errors.category && (
                    <p className="text-sm text-red-400 font-medium">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-start gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
            <div className="mt-4">
              {errors.root?.serverError && (
                <p className="text-red-400 font-semibold">
                  errors.root.serverError.message
                </p>
              )}
              {itemID && (
                <p className="text-green-600 font-semibold">
                  Successfully stored item: ID-{itemID}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Upsert;
