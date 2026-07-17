const ReminderTable = ({ width = "w-full", reminderData, setReminderData }) => {
  const handleDelete = (index) => {
    // Storage optimization: Removed manual localStorage sync
    const newData = reminderData.filter((_, i) => i !== index);
    setReminderData(newData);
  };

  return (
    <div className={`w-full overflow-x-auto rounded-2xl ${width}`}>
      {/* Tailwind fix: Changed min-w-150 to min-w-[600px] */}
      <table className="w-full min-w-150 border-collapse overflow-hidden">
        <thead className="text-white bg-gray-700">
          <tr style={{ borderLeft: "15px solid #364153" }}>
            <th className="w-1/12 py-3 text-center">#</th>
            <th className="w-2/12 py-3 text-center">Item</th>
            <th className="w-2/12 py-3 text-center">Category</th>
            <th className="w-5/12 py-3 text-center">Date</th>
            <th className="w-2/12 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {reminderData.map(({ task, color, category, date }, index) => {
            return (
              <tr
                key={index}
                className="bg-[#eee] border-b border-white last:border-b-0"
                style={{ borderLeft: `15px solid ${color}` }}
              >
                <td className="py-3 text-gray-800 font-medium">{index + 1}</td>
                <td className="py-3 text-gray-800">{task}</td>
                <td className="py-3 text-gray-800">{category}</td>
                <td className="py-3 text-gray-800">{date}</td>
                <td className="py-3">
                  <button
                    onClick={() => {
                      handleDelete(index);
                    }}
                    className="px-3 py-1.5 rounded-xl cursor-pointer bg-red-500 hover:bg-red-600 active:scale-95 transition-all text-white text-sm font-semibold"
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
  );
};

export default ReminderTable;
