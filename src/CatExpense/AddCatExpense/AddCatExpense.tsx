import React, { useEffect, useState } from "react";
import { AddCatExpenseProps } from "./types";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const AddCatExpenseDialog: React.FC<AddCatExpenseProps> = ({
  setExpenses,
  setIsShowAddExpense,
}) => {
  const [catFact, setCatFact] = useState("");
  const [error, setError] = useState("");
  const [isCatFactLoading, setIsCatFactLoading] = useState(true);
  const [expenseForm, setExpenseForm] = useState({
    itemName: "",
    category: "",
    amount: undefined,
  });

  useEffect(() => {
    if (!catFact) {
      fetchCatFact();
    }
  }, []);

  const fetchCatFact = async () => {
    try {
      const response = await axios.get("https://catfact.ninja/fact");
      setCatFact(response.data.fact);
    } catch (error) {
      console.error("Error fetching cat fact:", error);
    } finally {
      setIsCatFactLoading(false);
    }
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setExpenseForm({ ...expenseForm, [event.target.name]: event.target.value });
  };

  const onAddExpenseHandler = () => {
    const { itemName, category, amount } = expenseForm;

    if (!itemName || !category || !amount) {
      setError("Please fill in all fields.");
      return;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Amount must be a positive number.");
      return;
    }
    setError("");

    setExpenses((expenses) => {
      const newExpense = {
        id: uuidv4(),
        itemName,
        category,
        amount: parseFloat(amount),
      };
      return [...expenses, newExpense];
    });
    setIsShowAddExpense(false);
    setExpenseForm({
      itemName: "",
      category: "",
      amount: undefined,
    });
  };

  const onCancelClickHandler = () => {
    setIsShowAddExpense(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg mx-5 max-w-4xl">
        <h2 className="text-lg font-bold mb-4">Expense Detail</h2>
        {error && (
          <p className="bg-red-100 text-red-800 font-medium px-2.5 py-2 mb-4 rounded border border-red-400">
            {error}
          </p>
        )}

        <div className="flex gap-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Item Name"
              value={expenseForm.itemName}
              name="itemName"
              onChange={onChangeHandler}
              className="border rounded w-full p-2 mb-4"
            />
            <select
              value={expenseForm.category}
              onChange={onChangeHandler}
              name="category"
              className="border rounded w-full p-2 mb-4"
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Furniture">Furniture</option>
              <option value="Accessory">Accessory</option>
            </select>
            <input
              type="number"
              placeholder="Amount"
              defaultValue={undefined}
              name="amount"
              onChange={onChangeHandler}
              className="border rounded w-full p-2 mb-4"
            />
          </div>

          <div className="flex-1 md:w-[400px]">
            {isCatFactLoading ? (
              <div
                role="status"
                className="w-full h-full grid place-items-center"
              >
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin fill-indigo-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <div className="max-w-2xl mb-4 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded border border-green-400">
                <span className="font-bold">Random Cat Fact:</span>{" "}
                <p>{catFact}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={onAddExpenseHandler}
          >
            Submit
          </button>
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded py-2 px-4"
            onClick={onCancelClickHandler}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCatExpenseDialog;
