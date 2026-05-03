import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ItemCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{item.title || item.name || `Item #${item.id}`}</Text>
      {!!(item.description || item.summary) && (
        <Text numberOfLines={2} style={styles.description}>
          {item.description || item.summary}
        </Text>
      )}
      <View style={styles.metaRow}>
        <Text style={styles.meta}>ID: {item.id}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  description: { color: '#666' },
  metaRow: { marginTop: 8 },
  meta: { color: '#333', fontSize: 12 },
});
