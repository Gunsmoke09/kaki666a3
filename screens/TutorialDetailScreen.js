import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { getTutorialById } from '../services/tutorialService';

export default function TutorialDetailScreen({ tutorialId }) {
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDetail = async () => {
      if (!tutorialId) {
        setError('No tutorial selected.');
        setTutorial(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        setTutorial(await getTutorialById(tutorialId));
      } catch (e) {
        setError(e.message || 'Unable to load tutorial detail.');
        setTutorial(null);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [tutorialId]);

  const onShare = async () => {
    if (!tutorial) return;

    const id = tutorial.id ?? tutorialId;
    const message = `Tutorial: ${tutorial.title}\nDifficulty: ${tutorial.difficulty}\nTime: ${tutorial.averageTime} mins\n\n${tutorial.description}\n\nOpen: https://koala04.ifn666.com/tutorials/${id}`;

    try {
      await Share.share({ message });
    } catch {
      setError('Unable to open share menu. Please try again.');
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size='large' /></View>;
  if (error && !tutorial) return <View style={styles.center}><Text style={styles.error}>{error}</Text></View>;

  return <ScrollView contentContainerStyle={styles.container}><Text style={styles.title}>{tutorial?.title}</Text><Text>Difficulty: {tutorial?.difficulty}</Text><Text>Average time: {tutorial?.averageTime}</Text><Text>Description: {tutorial?.description}</Text><Text>Instructions: {tutorial?.instructions || 'N/A'}</Text><Text>Categories: {(tutorial?.categories || []).join(', ') || 'N/A'}</Text><Text>Materials: {(tutorial?.materials || []).join(', ') || 'N/A'}</Text><Pressable style={styles.button} onPress={onShare}><Text style={styles.buttonText}>Share</Text></Pressable>{!!error && <Text style={styles.error}>{error}</Text>}</ScrollView>;
}

const styles = StyleSheet.create({ center:{flex:1,justifyContent:'center',alignItems:'center'}, container:{padding:16,gap:8}, title:{fontSize:24,fontWeight:'700'}, error:{color:'#b91c1c'}, button:{marginTop:10,backgroundColor:'#0ea5e9',padding:12,borderRadius:8,alignItems:'center'}, buttonText:{color:'#fff',fontWeight:'600'} });
