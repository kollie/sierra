import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';

interface FormErrorMessageProps {
  error: string | null;
}

export function FormErrorMessage({ error }: FormErrorMessageProps) {
  if (!error) return null;
  
  return (
    <View style={styles.container}>
      <X size={20} color="#EF4444" />
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
});