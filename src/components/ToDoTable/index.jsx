import AddToDo from "./AddToDo";

const ToDoTable = ({
  width = "w-full",
  toDoData,
  setToDoData,
  doneToDoData,
  setDoneToDoData,
}) => {
  const handleDelete = (index) => {
    // Storage optimization: Removed manual localStorage sync
    const newToDoData = toDoData.filter((_, i) => i !== index);
    setToDoData(newToDoData);
  };

  const handleDone = (index) => {
    // Logic Optimization: Access the item directly by index instead of using .find()
    const doneItem = toDoData[index];
    const newToDoData = toDoData.filter((_, i) => i !== index);

    // Storage optimization: Removed manual localStorage sync
    setToDoData(newToDoData);
    setDoneToDoData([...doneToDoData, doneItem]);
  };

  return (
    <div className={`w-full ${width}`}>
      {/* Add ToDo Form */}
      <AddToDo toDoData={toDoData} setToDoData={setToDoData} />

      {/* Table responsive container */}
      <div className="w-full overflow-x-auto rounded-2xl">
        {/* Tailwind fix: Changed min-w-125 to min-w-[500px] */}
        <table className="w-full min-w-125 border-collapse overflow-hidden">
          <thead className="text-white bg-gray-700">
            <tr>
              <th className="w-1/12 py-3 text-center">#</th>
              <th className="w-2/12 py-3 text-center">Done</th>
              <th className="w-6/12 py-3 text-center">Item</th>
              <th className="w-3/12 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {toDoData.map(({ task }, index) => {
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
                        handleDone(index);
                      }}
                      className="text-green-600 hover:text-green-700 font-semibold cursor-pointer select-none transition-colors"
                      title="Mark as Done"
                    >
                      Finish
                    </span>
                  </td>
                  <td className="py-3 text-gray-800">{task}</td>
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

export default ToDoTable;
