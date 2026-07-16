import AddToDo from "./AddToDo";

const ToDoTable = ({
  width,
  toDoData,
  setToDoData,
  doneToDoData,
  setDoneToDoData,
}) => {
  const handelDelete = (index) => {
    const newToDoData = toDoData.filter((item, i) => i !== index);
    localStorage.setItem("todos", JSON.stringify(newToDoData));
    setToDoData(newToDoData);
  };

  const handelDone = (index) => {
    const newToDoData = toDoData.filter((item, i) => i !== index);
    const doneItem = toDoData.find((item, i) => i === index);

    const newDoneData = [...doneToDoData, doneItem];

    localStorage.setItem("todos", JSON.stringify(newToDoData));
    localStorage.setItem("doneTodos", JSON.stringify(newDoneData));

    setToDoData(newToDoData);
    setDoneToDoData(newDoneData);
  };

  return (
    <div className={`w-full ${width}`}>
      {/* Add ToDo Form */}
      <AddToDo toDoData={toDoData} setToDoData={setToDoData} />
      
      {/* Table responsive container */}
      <div className="w-full overflow-x-auto rounded-2xl">
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
                <tr key={index} className="bg-gray-300 border-b border-white last:border-b-0">
                  <td className="py-3 text-gray-800 font-medium">{index + 1}</td>
                  <td className="py-3">
                    <span
                      onClick={() => {
                        handelDone(index);
                      }}
                      className="text-green-600 hover:text-green-700 font-semibold cursor-pointer select-none transition-colors"
                    >
                      Finish
                    </span>
                  </td>
                  <td className="py-3 text-gray-800">{task}</td>
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

export default ToDoTable;