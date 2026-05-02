import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { register } from '../services/authService';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async () => {
    try {
      setLoading(true); setMessage('');
      await register(name, email, password);
      setMessage('Registration successful.');
    } catch (error) { setMessage(error.message || 'Registration failed.'); }
    finally { setLoading(false); }
  };

  return <View style={styles.container}><Text style={styles.title}>Register</Text><TextInput style={styles.input} placeholder='Name' value={name} onChangeText={setName}/><TextInput style={styles.input} placeholder='Email' autoCapitalize='none' value={email} onChangeText={setEmail}/><TextInput style={styles.input} placeholder='Password' secureTextEntry value={password} onChangeText={setPassword}/><Pressable style={styles.button} onPress={onSubmit} disabled={loading}><Text style={styles.buttonText}>{loading?'Loading...':'Register'}</Text></Pressable>{!!message && <Text style={styles.message}>{message}</Text>}</View>;
}

const styles = StyleSheet.create({ container:{flex:1,padding:16,gap:10}, title:{fontSize:24,fontWeight:'700'}, input:{borderWidth:1,borderColor:'#cbd5e1',borderRadius:8,padding:10}, button:{backgroundColor:'#0ea5e9',padding:12,borderRadius:8,alignItems:'center'}, buttonText:{color:'#fff',fontWeight:'600'}, message:{color:'#334155'} });
