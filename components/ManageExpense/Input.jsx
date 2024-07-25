import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Input({ label, style, TextInputConfig,invalid }) {
  let inputStyle = [styles.input];
  if (TextInputConfig && TextInputConfig.multiline) {
    inputStyle.push(styles.inputMultiLine);
  }
  if(invalid){
    inputStyle.push(styles.invalidInput);
    
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label,invalid&&styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyle} {...TextInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSIze: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiLine: {
    minHeight: 100,
    textAlignVertical: 'top',
  },

  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
});
