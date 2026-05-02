import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, Share, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getTutorialById } from '../services/tutorialService';

export default function TutorialDetailScreen({ route }) {
  const { id } = route.params;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getTutorialById(id);
        setItem(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const onShare = async () => {
    if (!item) return;
    const link = `https://koala04.ifn666.com/assignment2/tutorials/${id}`;
    const message = `${item.title}\nDifficulty: ${item.difficulty || 'N/A'}\nAverage time: ${item.AverageTimeSpentMinutes || 'N/A'} minutes\n${item.description || ''}\n${link}`;
    try {
      await Share.share({ message, url: link, title: item.title });
    } catch (e) {
      Alert.alert('Share Failed', e.message);
    }
  };

  if (loading) return <SafeAreaView style={styles.center}><ActivityIndicator size="large" /></SafeAreaView>;
  if (error) return <SafeAreaView style={styles.center}><Text style={styles.error}>{error}</Text></SafeAreaView>;
  if (!item) return <SafeAreaView style={styles.center}><Text>Tutorial not found.</Text></SafeAreaView>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.row}>Difficulty: {item.difficulty || 'N/A'}</Text>
        <Text style={styles.row}>Average Time: {item.AverageTimeSpentMinutes || 'N/A'} minutes</Text>
        <Text style={styles.section}>Description</Text>
        <Text>{item.description || 'N/A'}</Text>
        <Text style={styles.section}>Instructions</Text>
        <Text>{item.instructions || 'N/A'}</Text>
        <Text style={styles.section}>Categories</Text>
        <Text>{Array.isArray(item.categories) ? item.categories.map((c) => c.name || c.title || c.id).join(', ') : 'N/A'}</Text>
        <Text style={styles.section}>Material</Text>
        <Text>{Array.isArray(item.material) ? item.material.map((m) => m.name || m.title || m.id).join(', ') : 'N/A'}</Text>

        <TouchableOpacity style={styles.shareButton} onPress={onShare}>
          <Text style={styles.shareText}>Share Tutorial</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, gap: 8 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: '700' },
  row: { color: '#333' },
  section: { marginTop: 8, fontWeight: '700' },
  shareButton: { marginTop: 16, backgroundColor: '#2563eb', borderRadius: 8, padding: 12 },
  shareText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  error: { color: 'red' },
});
