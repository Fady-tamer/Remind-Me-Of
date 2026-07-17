import { useRef } from "react";

const AddToDo = ({ toDoData, setToDoData }) => {
  const nameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskName = nameRef.current.value;

    const newData = [...toDoData, { task: taskName }];

    // Storage Optimization: Removed manual localStorage call
    // since the parent Home.jsx component handles this automatically.
    setToDoData(newData);

    nameRef.current.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-2.5 rounded-2xl bg-gray-700 flex flex-col sm:flex-row gap-2 lg:gap-0"
    >
      <input
        type="text"
        placeholder="ToDo Name ..."
        ref={nameRef}
        required
        className="w-full sm:w-8/12 h-11 p-2.5 rounded-xl sm:rounded-l-xl sm:rounded-r-none outline-none bg-gray-300 placeholder-gray-600 text-gray-900 focus:bg-white transition-all"
      />
      <button
        type="submit"
        className="w-full sm:w-4/12 h-11 p-2.5 rounded-xl sm:rounded-r-xl sm:rounded-l-none cursor-pointer bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white font-bold transition-all text-center"
      >
        Add
      </button>
    </form>
  );
};

export default AddToDo;
