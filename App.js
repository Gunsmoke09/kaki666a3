import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getTutorialById, getTutorials } from './services/tutorialService';

const APP_BASE_URL = 'kaki666://tutorials';

function getIdFromUrl(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split('/').filter(Boolean);

    if (parts[0] === 'tutorials' && parts[1]) {
      return parts[1];
    }
  } catch (error) {
    return null;
  }

  return null;
}

export default function App() {
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareError, setShareError] = useState('');

  const loadTutorials = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTutorials();
      setTutorials(data);
    } catch (apiError) {
      setError('Unable to load tutorials right now. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const openTutorialById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError('');
      const tutorial = await getTutorialById(id);
      setSelectedTutorial(tutorial);
    } catch (apiError) {
      setSelectedTutorial(null);
      setError('Unable to open that tutorial link.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTutorials();
  }, [loadTutorials]);

  useEffect(() => {
    const handleIncomingUrl = async ({ url }) => {
      const id = getIdFromUrl(url);
      if (id) {
        await openTutorialById(id);
      }
    };

    const subscription = Linking.addEventListener('url', handleIncomingUrl);

    Linking.getInitialURL().then(async (url) => {
      const id = getIdFromUrl(url);
      if (id) {
        await openTutorialById(id);
      }
    });

    return () => subscription.remove();
  }, [openTutorialById]);

  const handleSelectTutorial = async (id) => {
    await openTutorialById(id);
  };

  const handleShare = async () => {
    if (!selectedTutorial) return;

    try {
      setShareError('');
      const deepLink = `${APP_BASE_URL}/${selectedTutorial.id}`;
      const message = [
        `Tutorial: ${selectedTutorial.title}`,
        `Difficulty: ${selectedTutorial.difficulty}`,
        `Average time: ${selectedTutorial.averageTime}`,
        `Description: ${selectedTutorial.description}`,
        `Open in app: ${deepLink}`,
      ].join('\n');

      await Share.share({
        message,
      });
    } catch (sharingError) {
      setShareError('Sharing failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" />
        </View>
      ) : selectedTutorial ? (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>{selectedTutorial.title}</Text>
          <Text style={styles.meta}>Difficulty: {selectedTutorial.difficulty}</Text>
          <Text style={styles.meta}>Average time: {selectedTutorial.averageTime}</Text>
          <Text style={styles.description}>{selectedTutorial.description}</Text>

          <Pressable style={styles.primaryButton} onPress={handleShare}>
            <Text style={styles.buttonText}>Share Tutorial</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={() => setSelectedTutorial(null)}>
            <Text style={styles.secondaryText}>Back to Tutorials</Text>
          </Pressable>

          {!!shareError && <Text style={styles.errorText}>{shareError}</Text>}
          {!!error && <Text style={styles.errorText}>{error}</Text>}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>Tutorials</Text>
          {tutorials.map((item) => (
            <Pressable key={item.id} style={styles.card} onPress={() => handleSelectTutorial(item.id)}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.meta}>{item.difficulty} • {item.averageTime}</Text>
            </Pressable>
          ))}

          {!!error && <Text style={styles.errorText}>{error}</Text>}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  meta: {
    fontSize: 15,
    color: '#334155',
  },
  description: {
    fontSize: 16,
    color: '#0f172a',
    lineHeight: 22,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  primaryButton: {
    backgroundColor: '#0ea5e9',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#e2e8f0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  secondaryText: {
    color: '#1e293b',
    fontWeight: '600',
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
  },
});
