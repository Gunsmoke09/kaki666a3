import { useEffect, useMemo, useState } from 'react';
import { Linking, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TutorialsScreen from './screens/TutorialsScreen';
import TutorialDetailScreen from './screens/TutorialDetailScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import MaterialsScreen from './screens/MaterialsScreen';

const TABS = ['Home', 'Tutorials', 'Categories', 'Materials', 'Login', 'Register'];

function getTutorialIdFromUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const paths = parsed.pathname.split('/').filter(Boolean);
    if (parsed.host === 'tutorials' && paths[0]) return paths[0];
    if (paths[0] === 'tutorials' && paths[1]) return paths[1];
  } catch (e) {
    return null;
  }
  return null;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [tutorialId, setTutorialId] = useState(null);

  useEffect(() => {
    const onReceiveUrl = ({ url }) => {
      const id = getTutorialIdFromUrl(url);
      if (id) {
        setTutorialId(id);
        setActiveTab('TutorialDetail');
      }
    };

    const sub = Linking.addEventListener('url', onReceiveUrl);
    Linking.getInitialURL().then((url) => onReceiveUrl({ url }));
    return () => sub.remove();
  }, []);

  const screen = useMemo(() => {
    if (activeTab === 'Home') return <HomeScreen onOpen={setActiveTab} />;
    if (activeTab === 'Login') return <LoginScreen />;
    if (activeTab === 'Register') return <RegisterScreen />;
    if (activeTab === 'Tutorials') return <TutorialsScreen onSelectTutorial={(id) => { setTutorialId(id); setActiveTab('TutorialDetail'); }} />;
    if (activeTab === 'TutorialDetail') return <TutorialDetailScreen tutorialId={tutorialId} />;
    if (activeTab === 'Categories') return <CategoriesScreen />;
    if (activeTab === 'Materials') return <MaterialsScreen />;
    return <HomeScreen onOpen={setActiveTab} />;
  }, [activeTab, tutorialId]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>{screen}</View>
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.tabButton}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabActive]}>{tab}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flex: 1 },
  tabBar: { flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderTopColor: '#cbd5e1', paddingVertical: 8, justifyContent: 'center' },
  tabButton: { paddingHorizontal: 10, paddingVertical: 6 },
  tabText: { color: '#334155', fontSize: 12 },
  tabActive: { color: '#0284c7', fontWeight: '700' },
});
