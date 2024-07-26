import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentExpenses from '../screens/RecentExpenses';
import AllExpenses from '../screens/AllExpenses';
import { GlobalStyles } from './../constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '../components/UI/IconButton';
import { useAuth } from '../store/auth-context';
import AddExpense from '../screens/AddExpense';

const BottomTab = createBottomTabNavigator();

function BottomTabNavigation() {
  const { logout } = useAuth();
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: 'white',
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            color={tintColor}
            size={32}
            icon="exit"
            onPress={logout}
          />
        ),
      })}
    >
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ManageExpenses"
        component={AddExpense}
        options={{
          title: 'Add Expense',
          tabBarLabel: 'Add Expenses',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigation;
