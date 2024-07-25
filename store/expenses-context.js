import { createContext, useReducer, useContext } from 'react';

const initialState = {
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: expenses => {},
  deleteExpense: id => {},
  updateExpense: (id, { description, amount, date }) => {},
};

export const ExpensesContext = createContext(initialState);

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        expense => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {
        ...updatableExpense,
        ...action.payload.data,
      };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      const filteredExpenses = state.filter(
        expense => expense.id !== action.payload
      );
      return filteredExpenses;
    default:
      return state;
  }
}

export default function ExpensesProvider({ children }) {
  const [expensesState, dispatch] = useReducer(
    expensesReducer,
    initialState.expenses
  );

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpense() {
  if (!ExpensesContext) {
    throw new Error(
      'useExpense must be used within an ExpensesContextProvider'
    );
  }

  return useContext(ExpensesContext);
}
