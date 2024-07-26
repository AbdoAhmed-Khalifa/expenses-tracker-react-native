import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { GlobalStyles } from '../constants/styles';
import { useExpense } from './../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense } from '../utils/firebase';
import Loading from '../components/UI/Loading';
import Error from '../components/UI/Error';
import { useAuth } from '../store/auth-context';

function AddExpense({ navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const { addExpense } = useExpense();
  const { token } = useAuth();
  function handleCancel() {
    navigation.goBack();
  }

  async function handleConfirm(expenseData) {
    setIsSubmitting(true);
    try {
      const id = await storeExpense(expenseData, token);
      addExpense({ ...expenseData, id: id });

      navigation.goBack();
    } catch (err) {
      setError('Failed to save expense. Please try again later.');
    }
    setIsSubmitting(false);
  }

  if (error && !isSubmitting) return <Error message={error} />;

  if (isSubmitting) return <Loading />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={handleCancel}
        onSubmit={handleConfirm}
        submitButtonText="Add"
      />
    </View>
  );
}

export default AddExpense;

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
