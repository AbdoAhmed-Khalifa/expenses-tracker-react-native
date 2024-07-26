const URL = 'https://expenses-tracker-7bfa4-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData, token) {
  const response = await fetch(`${URL}/expenses.json?auth=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });
  const data = await response.json();
  return data.name;
}
export async function fetchExpenses(token) {
  const response = await fetch(`${URL}/expenses.json?auth=${token}`);
  const data = await response.json();
  const expenses = [];
  for (const key in data) {
    const expenseObj = {
      id: key,
      amount: data[key].amount,
      date: new Date(data[key].date),
      description: data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export async function updateApiExpense(id, expenseData, token) {
  const response = await fetch(`${URL}/expenses/${id}.json?auth=${token}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });
  return response.ok;
}

export async function deleteApiExpense(id, token) {
  const response = await fetch(`${URL}/expenses/${id}.json?auth=${token}`, {
    method: 'DELETE',
  });
  return response.ok;
}
