import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getCategories } from '../services/categoryService';

export default function CategoriesScreen() {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { (async () => { try { setItems(await getCategories()); } catch (e) { setError(e.message || 'Unable to load categories.'); } finally { setLoading(false); } })(); }, []);
  if (loading) return <View style={styles.center}><ActivityIndicator size='large'/></View>;
  return <ScrollView contentContainerStyle={styles.container}>{items.map((item) => <View key={item.id} style={styles.row}><Text>{item.name || item.title || `Category ${item.id}`}</Text></View>)}{!!error && <Text style={styles.error}>{error}</Text>}</ScrollView>;
}
const styles = StyleSheet.create({center:{flex:1,justifyContent:'center',alignItems:'center'},container:{padding:16,gap:10},row:{backgroundColor:'#fff',padding:12,borderRadius:8},error:{color:'#b91c1c'}});
