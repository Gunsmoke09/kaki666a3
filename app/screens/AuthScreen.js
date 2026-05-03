import { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { authApi } from '../services/api';

export default function AuthScreen() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    try {
      const payload = { email, password };
      const result = mode === 'login' ? await authApi.login(payload) : await authApi.register(payload);
      Alert.alert('Success', `${mode} successful: ${JSON.stringify(result)}`);
    } catch (err) {
      Alert.alert('Auth error', err.message || 'Request failed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{mode === 'login' ? 'Login' : 'Register'}</Text>
      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title={mode === 'login' ? 'Login' : 'Register'} onPress={submit} />
      <View style={{ height: 8 }} />
      <Button
        title={mode === 'login' ? 'Switch to Register' : 'Switch to Login'}
        onPress={() => setMode(mode === 'login' ? 'register' : 'login')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
});
