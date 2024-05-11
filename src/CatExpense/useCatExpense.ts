import { useMemo, useState } from "react";
import { Expense } from "./types";

const useCatExpense = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isShowAddExpense, setIsShowAddExpense] = useState(false);

  const onAddExpenseClickHandler = () => {
    setIsShowAddExpense(true);
  };

  const highlightTopCategories = useMemo(() => {
    const categoryCounts: { [key: string]: number } = {};
    expenses.forEach((expense) => {
      categoryCounts[expense.category] =
        (categoryCounts[expense.category] || 0) + expense.amount;
    });

    // Find the maximum spending amount
    const maxAmount = Math.max(...Object.values(categoryCounts));

    // Filter categories that match the maximum spending amount
    const topCategories = Object.keys(categoryCounts).filter(
      (category) => categoryCounts[category] === maxAmount
    );

    return topCategories;
  }, [expenses]);

  const toggleSelectItem = (isChecked: boolean, id: string | "all") => {
    if (id === "all") {
      if (isChecked) {
        setSelectedItems(expenses.map((expense) => expense.id));
      } else {
        setSelectedItems([]);
      }
    } else {
      const selectedIndex = selectedItems.indexOf(id);
      if (selectedIndex === -1) {
        setSelectedItems([...selectedItems, id]);
      } else {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems.splice(selectedIndex, 1);
        setSelectedItems(updatedSelectedItems);
      }
    }
  };

  const isItemSelected = (id: string) => selectedItems.includes(id);

  const onDeleteExpensesClick = () => {
    const updatedExpenses = expenses.filter(
      (expense) => !selectedItems.includes(expense.id)
    );
    setExpenses(updatedExpenses);
    setSelectedItems([]);
  };

  return {
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
  };
};

export default useCatExpense;
