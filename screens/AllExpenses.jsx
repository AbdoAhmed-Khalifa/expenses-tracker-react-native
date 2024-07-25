import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useExpense } from '../store/expenses-context';
function AllExpenses() {
  const { expenses } = useExpense();
  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenses}
      infoText="No expenses registered yet."
    />
  );
}

export default AllExpenses;
