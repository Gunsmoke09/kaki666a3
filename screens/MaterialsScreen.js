import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getMaterials } from '../services/materialService';

export default function MaterialsScreen() {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { (async () => { try { setItems(await getMaterials()); } catch (e) { setError(e.message || 'Unable to load materials.'); } finally { setLoading(false); } })(); }, []);
  if (loading) return <View style={styles.center}><ActivityIndicator size='large'/></View>;
  return <ScrollView contentContainerStyle={styles.container}>{items.map((item) => <View key={item.id} style={styles.row}><Text>{item.name || item.title || `Material ${item.id}`}</Text></View>)}{!!error && <Text style={styles.error}>{error}</Text>}</ScrollView>;
}
const styles = StyleSheet.create({center:{flex:1,justifyContent:'center',alignItems:'center'},container:{padding:16,gap:10},row:{backgroundColor:'#fff',padding:12,borderRadius:8},error:{color:'#b91c1c'}});
