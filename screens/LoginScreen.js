import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { login } from '../services/authService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async () => {
    try {
      setLoading(true); setMessage('');
      await login(email, password);
      setMessage('Login successful.');
    } catch (error) { setMessage(error.message || 'Login failed.'); }
    finally { setLoading(false); }
  };

  return <View style={styles.container}><Text style={styles.title}>Login</Text><TextInput style={styles.input} placeholder='Email' autoCapitalize='none' value={email} onChangeText={setEmail}/><TextInput style={styles.input} placeholder='Password' secureTextEntry value={password} onChangeText={setPassword}/><Pressable style={styles.button} onPress={onSubmit} disabled={loading}><Text style={styles.buttonText}>{loading?'Loading...':'Login'}</Text></Pressable>{!!message && <Text style={styles.message}>{message}</Text>}</View>;
}

const styles = StyleSheet.create({ container:{flex:1,padding:16,gap:10}, title:{fontSize:24,fontWeight:'700'}, input:{borderWidth:1,borderColor:'#cbd5e1',borderRadius:8,padding:10}, button:{backgroundColor:'#0ea5e9',padding:12,borderRadius:8,alignItems:'center'}, buttonText:{color:'#fff',fontWeight:'600'}, message:{color:'#334155'} });
