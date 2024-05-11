import AddCatExpenseDialog from "./AddCatExpense/AddCatExpense";
import useCatExpense from "./useCatExpense";

const CatExpense = () => {
  const {
    expenses,
    onAddExpenseClickHandler,
    highlightTopCategories,
    toggleSelectItem,
    isItemSelected,
    isShowAddExpense,
    setExpenses,
    setIsShowAddExpense,
    selectedItems,
    onDeleteExpensesClick,
  } = useCatExpense();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cat Expense Tracker</h1>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={onAddExpenseClickHandler}
      >
        Add Expense
      </button>

      <button
        className="bg-red-500 hover:bg-red-700 disabled:opacity-60 disabled:hover:bg-red-500 text-white font-bold py-2 px-4 rounded ml-2 disabled:cursor-not-allowed"
        onClick={onDeleteExpensesClick}
        disabled={selectedItems.length <= 0}
      >
        Delete Expense
      </button>

      {isShowAddExpense && (
        <AddCatExpenseDialog
          setIsShowAddExpense={setIsShowAddExpense}
          setExpenses={setExpenses}
        />
      )}
      <table className="w-full border-collapse border border-gray-400 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2 w-12">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-indigo-600"
                  checked={
                    !!(
                      selectedItems.length &&
                      expenses.length === selectedItems.length
                    )
                  }
                  onChange={(event) =>
                    toggleSelectItem(event.target.checked, "all")
                  }
                />
              </div>
            </th>
            <th className="border border-gray-400 px-4 py-2">Item Name</th>
            <th className="border border-gray-400 px-4 py-2">Category</th>
            <th className="border border-gray-400 px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length ? (
            expenses.map((expense) => (
              <tr
                key={expense.id}
                className={
                  highlightTopCategories.includes(expense.category)
                    ? "bg-green-200"
                    : isItemSelected(expense.id)
                    ? "bg-blue-200"
                    : ""
                }
              >
                <td className="border border-gray-400 px-4 py-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-indigo-600"
                      checked={isItemSelected(expense.id)}
                      onChange={(event) =>
                        toggleSelectItem(event.target.checked, expense.id)
                      }
                    />
                  </div>
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {expense.itemName}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {expense.category}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-center">
                  {expense.amount}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-7 text-center font-extrabold">
                No Cat Data Found. Please Add Expense.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CatExpense;
