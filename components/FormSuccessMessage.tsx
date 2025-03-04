import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface FormSuccessMessageProps {
  message: string;
}

export function FormSuccessMessage({ message }: FormSuccessMessageProps) {
  return (
    <View style={styles.container}>
      <Check size={20} color="#10B981" />
      <Text style={styles.successText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  successText: {
    color: '#065F46',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
});