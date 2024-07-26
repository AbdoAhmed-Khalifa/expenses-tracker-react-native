import { StatusBar } from 'expo-status-bar';
import ExpensesProvider from './store/expenses-context';
import AuthNavigation from './navigation/AuthNavigation';
import AuthProvider from './store/auth-context';

function Root() {
  return <AuthNavigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthProvider>
        <ExpensesProvider>
          <AuthNavigation />
        </ExpensesProvider>
      </AuthProvider>
    </>
  );
}
