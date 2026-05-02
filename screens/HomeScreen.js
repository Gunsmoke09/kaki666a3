import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ onOpen }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>IFN666 Mobile App</Text>
      <Text style={styles.subtitle}>Choose a section to explore</Text>

      <Pressable style={styles.button} onPress={() => onOpen('Tutorials')}>
        <Text style={styles.buttonText}>Go to Tutorials</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => onOpen('Categories')}>
        <Text style={styles.buttonText}>Go to Categories</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => onOpen('Materials')}>
        <Text style={styles.buttonText}>Go to Materials</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({ container:{flex:1,padding:16,gap:12}, title:{fontSize:26,fontWeight:'700'}, subtitle:{fontSize:16,color:'#475569'}, button:{backgroundColor:'#0ea5e9',padding:12,borderRadius:8}, buttonText:{color:'#fff',fontWeight:'600'} });
