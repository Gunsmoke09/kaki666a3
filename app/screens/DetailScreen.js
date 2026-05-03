import { useEffect, useState } from 'react';
import { Alert, Button, SafeAreaView, ScrollView, Share, StyleSheet, Text } from 'react-native';
import { materialsApi, tutorialsApi } from '../services/api';

const toShareContent = (item) => {
  const title = item.title || item.name || `Task ${item.id}`;
  const description = item.description || item.summary || 'No description available';
  const link = `https://ifn666.com/tasks/${item.id}`;
  return { title, description, link };
};

export default function DetailScreen({ route }) {
  const paramsItem = route.params?.item;
  const id = route.params?.id;
  const [item, setItem] = useState(paramsItem || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id || paramsItem) return;

    const loadById = async () => {
      setLoading(true);
      setError('');
      try {
        const [tutorialResult, materialResult] = await Promise.allSettled([
          tutorialsApi.getById(id),
          materialsApi.getById(id),
        ]);

        if (tutorialResult.status === 'fulfilled') {
          setItem(tutorialResult.value);
        } else if (materialResult.status === 'fulfilled') {
          setItem(materialResult.value);
        } else {
          throw new Error('Item not found in tutorials or materials');
        }
      } catch (err) {
        setError(err.message || 'Failed to load detail');
      } finally {
        setLoading(false);
      }
    };

    loadById();
  }, [id, paramsItem]);

  const onShare = async () => {
    if (!item) return;

    try {
      const content = toShareContent(item);
      await Share.share({
        title: content.title,
        message: `${content.title}\n\n${content.description}\n\n${content.link}`,
        url: content.link,
      });
    } catch (err) {
      Alert.alert('Share error', err.message || 'Unable to share this item');
    }
  };

  if (loading) return <SafeAreaView style={styles.container}><Text>Loading...</Text></SafeAreaView>;
  if (error) return <SafeAreaView style={styles.container}><Text style={styles.error}>{error}</Text></SafeAreaView>;
  if (!item) return <SafeAreaView style={styles.container}><Text>Item not available.</Text></SafeAreaView>;

  const content = toShareContent(item);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.description}>{content.description}</Text>
        <Text style={styles.link}>{content.link}</Text>
        <Button title="Share this item" onPress={onShare} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  content: { gap: 12 },
  title: { fontSize: 24, fontWeight: '700' },
  description: { fontSize: 16, color: '#444' },
  link: { fontSize: 14, color: '#2a67d1' },
  error: { color: 'red' },
});
