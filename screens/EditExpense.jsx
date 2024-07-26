import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { useExpense } from './../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteApiExpense, updateApiExpense } from '../utils/firebase';
import Loading from '../components/UI/Loading';
import Error from '../components/UI/Error';
import { useAuth } from '../store/auth-context';

function EditExpenses({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const { deleteExpense, updateExpense, expenses } = useExpense();
  const { token } = useAuth();
  const expenseId = route.params?.expenseId;
  const selectedExpense = expenses.find(expense => expense.id === expenseId);

  async function handleDeleteExpense() {
    setIsSubmitting(true);
    try {
      await deleteApiExpense(expenseId, token);
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
      updateExpense(expenseId, expenseData);
      await updateApiExpense(expenseId, expenseData, token);
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
        submitButtonText="Update"
        defaultValues={selectedExpense}
      />

      <View style={styles.deleteContainer}>
        <IconButton
          icon="trash"
          size={36}
          color={GlobalStyles.colors.error500}
          onPress={handleDeleteExpense}
        />
      </View>
    </View>
  );
}

export default EditExpenses;

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
