import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to the launch screen
    const redirectTimer = setTimeout(() => {
      router.replace('/launch');
    }, 100);
    
    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000080" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
});