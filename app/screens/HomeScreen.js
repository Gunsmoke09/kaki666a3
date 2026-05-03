import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ItemCard from '../components/ItemCard';
import { materialsApi, tutorialsApi } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const [tutorials, materials] = await Promise.all([
        tutorialsApi.getAll(),
        materialsApi.getAll(),
      ]);
      const normalized = [
        ...(Array.isArray(tutorials) ? tutorials : []),
        ...(Array.isArray(materials) ? materials : []),
      ];
      setItems(normalized);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Tutorials & Materials</Text>
      {!!error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={items}
        keyExtractor={(item, index) => String(item.id ?? `${item.title}-${index}`)}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} />}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => navigation.navigate('Detail', { id: item.id, item })}
          />
        )}
        ListEmptyComponent={!loading ? <Text>No data found.</Text> : null}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  list: { padding: 16 },
  header: { fontSize: 20, fontWeight: '700', paddingHorizontal: 16, paddingTop: 16 },
  error: { color: 'red', paddingHorizontal: 16, marginTop: 8 },
});
