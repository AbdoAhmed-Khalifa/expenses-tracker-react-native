const URL = 'https://expenses-tracker-7bfa4-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
  const response = await fetch(`${URL}/expenses.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });
  const data = await response.json();
  return data.name;
}
export async function fetchExpenses() {
  const response = await fetch(`${URL}/expenses.json`);
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

export async function updateApiExpense(id, expenseData) {
  const response = await fetch(`${URL}/expenses/${id}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });
  return response.ok;
}

export async function deleteApiExpense(id) {
  const response = await fetch(`${URL}/expenses/${id}.json`, {
    method: 'DELETE',
  });
  return response.ok;
}
