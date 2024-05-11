import { Expense } from "../types";

export interface AddCatExpenseProps {
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  setIsShowAddExpense: React.Dispatch<React.SetStateAction<boolean>>;
}
