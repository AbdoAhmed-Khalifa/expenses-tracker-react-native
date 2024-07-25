import { StyleSheet, Text, View } from 'react-native';
import { useLayoutEffect, useState, useEffect } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { useExpense } from './../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import {
  deleteApiExpense,
  storeExpense,
  updateApiExpense,
} from '../utils/http';
import Loading from '../components/UI/Loading';
import Error from '../components/UI/Error';

function ManageExpenses({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const { deleteExpense, addExpense, updateExpense, expenses } = useExpense();
  const expenseId = route.params?.expenseId;
  const [isEditing, setIsEditing] = useState(!!expenseId);
  const [selectedExpense, setSelectedExpense] = useState(
    expenses.find(expense => expense.id === expenseId)
  );

  useEffect(() => {
    console.log('expenseId changed:', expenseId);
    setIsEditing(!!expenseId);
    setSelectedExpense(expenses.find(expense => expense.id === expenseId));
  }, [expenseId, expenses]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function handleDeleteExpense() {
    setIsSubmitting(true);
    try {
      await deleteApiExpense(expenseId);
      deleteExpense(expenseId);
      navigation.goBack();
    } catch (err) {
      setError('Failed to delete expense. Please try again later.');
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    navigation.goBack();
  }

  async function handleConfirm(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        updateExpense(expenseId, expenseData);
        await updateApiExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (err) {
      setError('Failed to save expense. Please try again later.');
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) return <Error message={error} />;

  if (isSubmitting) return <Loading />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={handleCancel}
        onSubmit={handleConfirm}
        submitButtonText={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
        key={expenseId} // Add key to force re-render
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={handleDeleteExpense}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
