import { useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useExpense } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';
import Loading from '../components/UI/Loading';
import Error from '../components/UI/Error';
function RecentExpenses() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const { expenses, setExpenses } = useExpense();
  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (err) {
        setError("Couldn't fetch expenses!");
      }
      setIsLoading(false);
    }
    getExpenses();
  }, []);

  const recentExpenses = expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });
  if (error && !isLoading) return <Error message={error} />;

  if (isLoading) return <Loading />;
  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      infoText={'No expenses registered for the last 7 days.'}
    />
  );
}

export default RecentExpenses;
