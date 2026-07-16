const DoneToDoTable = ({
  width,
  toDoData,
  setToDoData,
  doneToDoData,
  setDoneToDoData,
}) => {
  const handelDelete = (index) => {
    const newDoneToDoData = doneToDoData.filter((item, i) => i !== index);
    localStorage.setItem("doneTodos", JSON.stringify(newDoneToDoData));
    setDoneToDoData(newDoneToDoData);
  };

  const handelUnDone = (index) => {
    const newDoneData = doneToDoData.filter((item, i) => i !== index);
    const unDoneItem = doneToDoData.find((item, i) => i === index);

    const newToDoData = [...toDoData, unDoneItem];

    localStorage.setItem("todos", JSON.stringify(newToDoData));
    localStorage.setItem("doneTodos", JSON.stringify(newDoneData));

    setToDoData(newToDoData);
    setDoneToDoData(newDoneData);
  };

  return (
    <div className={`w-full ${width}`}>
      {/* Scrollable container prevents layout breaks on small screens */}
      <div className="w-full overflow-x-auto rounded-2xl">
        <table className="w-full min-w-125 border-collapse overflow-hidden">
          <thead className="text-white bg-gray-700">
            <tr>
              <th className="w-1/12 py-3 text-center">#</th>
              <th className="w-2/12 py-3 text-center">un Do it</th>
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
                  <td className="py-3 text-gray-800 font-medium">{index + 1}</td>
                  <td className="py-3">
                    <span
                      onClick={() => {
                        handelUnDone(index);
                      }}
                      className="text-red-500 hover:text-red-600 font-bold cursor-pointer select-none transition-colors text-lg"
                    >
                      X
                    </span>
                  </td>
                  {/* Clean strikethrough styling instead of an absolute div */}
                  <td className="py-3 text-gray-500 line-through decoration-gray-600 decoration-2">
                    {task}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => {
                        handelDelete(index);
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