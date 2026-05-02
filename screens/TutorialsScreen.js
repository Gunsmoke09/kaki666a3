import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getTutorials } from '../services/tutorialService';

export default function TutorialsScreen({ onSelectTutorial }) {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    try { setLoading(true); setError(''); setTutorials(await getTutorials()); }
    catch (e) { setError(e.message || 'Unable to load tutorials.'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  if (loading) return <View style={styles.center}><ActivityIndicator size='large' /></View>;

  return <ScrollView contentContainerStyle={styles.container}>{tutorials.map((item) => <Pressable key={item.id} style={styles.card} onPress={() => onSelectTutorial(String(item.id))}><Text style={styles.title}>{item.title}</Text><Text>{item.difficulty} • {item.averageTime}</Text></Pressable>)}{!!error && <Text style={styles.error}>{error}</Text>}</ScrollView>;
}

const styles = StyleSheet.create({ center:{flex:1,justifyContent:'center',alignItems:'center'}, container:{padding:16,gap:12}, card:{backgroundColor:'#fff',padding:12,borderRadius:8}, title:{fontSize:18,fontWeight:'600'}, error:{color:'#b91c1c'} });
