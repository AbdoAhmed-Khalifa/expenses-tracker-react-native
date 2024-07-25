import { useState } from 'react';
import AuthContent from './../components/Auth/AuthContent';
import Loading from '../components/UI/Loading';
import { signIn } from '../utils/auth';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../store/auth-context';

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { authenticate } = useAuth();

  async function handleSignIn({ email, password }) {
    setIsLoading(true);
    try {
      const token = await signIn(email, password);
      authenticate(token);
    } catch (err) {
      Alert.alert(
        'Authentication failed',
        "Couldn't sign in. Please check your credentials or try again later."
      );
      setIsLoading(false);
    }
  }

  if (isLoading) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome back!</Text>

      <Text style={styles.text}>
        Please log in to continue to your account.
      </Text>
      <AuthContent isLogin onAuthenticate={handleSignIn} />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    marginBottom: 10,
    marginHorizontal: 20,
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});
