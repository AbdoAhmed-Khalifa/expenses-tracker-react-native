const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';
import { GlobalStyles } from '../constants/styles';
import EditExpenses from '../screens/EditExpense';
function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="ExpensesOverview"
        component={BottomTabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="EditExpenses" component={EditExpenses} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
