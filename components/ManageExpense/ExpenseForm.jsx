import { StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '../UI/Button';
import { getFormattedDate } from './../../utils/date';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({ onCancel, onSubmit, submitButtonText, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount.toString() || '',
      isValid: true,
    },
    date: {
      value: defaultValues?.date ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues?.description || '',
      isValid: true,
    },
  });
  function handleInputValue(curInput, value) {
    setInputs(curValues => {
      return { ...curValues, [curInput]: { value: value, isValid: true } };
    });
  }

  function handleSubmit() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid =
      expenseData.date && expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs(curValues => {
        return {
          amount: { value: curValues.amount.value, isValid: amountIsValid },
          date: { value: curValues.date.value, isValid: dateIsValid },
          description: {
            value: curValues.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsValid =
    inputs.amount.isValid && inputs.date.isValid && inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          TextInputConfig={{
            keyboardType: 'decimal-pad',
            value: inputs.amount.value,
            onChangeText: handleInputValue.bind(this, 'amount'),
          }}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
          TextInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: inputs.date.value,
            onChangeText: handleInputValue.bind(this, 'date'),
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        TextInputConfig={{
          multiline: true,

          value: inputs.description.value,
          onChangeText: handleInputValue.bind(this, 'description'),
        }}
      />
      {!formIsValid && (
        <Text style={styles.errorText}>
          Invalid input, Please check your input values.
        </Text>
      )}

      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={handleSubmit} style={styles.button}>
          {submitButtonText}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
