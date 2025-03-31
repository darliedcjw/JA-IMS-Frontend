import { useContext } from "react";
import { IMSContext } from "../Context/IMSContext";

const AdvanceDisplay = () => {
  const { advanceItemsResponse } = useContext(IMSContext);

  return (
    <>
      <div className="ms-5 mt-5 me-5 overflow-x-auto">
        <div className="border-b border-gray-900/10 pb-5">
          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              {advanceItemsResponse && advanceItemsResponse.items.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">
                        Name
                      </th>
                      <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">
                        Category
                      </th>
                      <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {advanceItemsResponse.items.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2 px-4 border-b border-gray-300">
                          {item.name}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300">
                          {item.category}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300">
                          ${item.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No items found matching your criteria
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvanceDisplay;
