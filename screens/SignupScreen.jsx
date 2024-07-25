import { useState } from 'react';
import { signUp } from '../utils/auth';
import AuthContent from './../components/Auth/AuthContent';
import Loading from './../components/UI/Loading';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../store/auth-context';
function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { authenticate } = useAuth();
  async function handleSignup({ email, password }) {
    setIsLoading(true);
    try {
      const token = await signUp(email, password);
      authenticate(token);
    } catch (err) {
      Alert.alert(
        'Authentication failed',
        "Couldn't sign up. Please check your credentials or try again later."
      );
      setIsLoading(false);
    }
  }

  if (isLoading) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome!</Text>
      <Text style={styles.text}> Create account to continue.</Text>
      <AuthContent onAuthenticate={handleSignup} />
    </View>
  );
}

export default SignupScreen;

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
