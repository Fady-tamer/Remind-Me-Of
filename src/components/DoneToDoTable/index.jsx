const DoneToDoTable = ({
  width = "w-full",
  toDoData,
  setToDoData,
  doneToDoData,
  setDoneToDoData,
}) => {
  const handleDelete = (index) => {
    // 1. Storage Optimization: Removed manual localStorage calls
    // since the parent Home component now handles this automatically.
    const newDoneToDoData = doneToDoData.filter((_, i) => i !== index);
    setDoneToDoData(newDoneToDoData);
  };

  const handleUnDone = (index) => {
    // 2. Logic Optimization: Access the item directly by index instead of using .find()
    const unDoneItem = doneToDoData[index];
    const newDoneData = doneToDoData.filter((_, i) => i !== index);

    setToDoData([...toDoData, unDoneItem]);
    setDoneToDoData(newDoneData);
  };

  return (
    <div className={`w-full ${width}`}>
      <div className="w-full overflow-x-auto rounded-2xl">
        <table className="w-full min-w-125 border-collapse overflow-hidden">
          <thead className="text-white bg-gray-700">
            <tr>
              <th className="w-1/12 py-3 text-center">#</th>
              <th className="w-2/12 py-3 text-center">Un-Do it</th>
              <th className="w-6/12 py-3 text-center">Item</th>
              <th className="w-3/12 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {doneToDoData.map(({ task }, index) => {
              return (
                <tr
                  key={index}
                  className="bg-gray-300 border-b border-white last:border-b-0"
                >
                  <td className="py-3 text-gray-800 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-3">
                    <span
                      onClick={() => {
                        handleUnDone(index);
                      }}
                      className="text-red-500 hover:text-red-600 font-bold cursor-pointer select-none transition-colors text-lg"
                      title="Move back to ToDo"
                    >
                      X
                    </span>
                  </td>
                  <td className="py-3 text-gray-500 line-through decoration-gray-600 decoration-2">
                    {task}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => {
                        handleDelete(index);
                      }}
                      className="px-3 py-1.5 rounded-xl cursor-pointer bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold transition-all text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoneToDoTable;
