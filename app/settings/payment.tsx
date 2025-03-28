import { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Plus, Trash2 } from 'lucide-react-native';
import { Button } from '@/components/Button';

const savedCards = [
  {
    id: '1',
    last4: '4242',
    expMonth: '12',
    expYear: '2025',
    brand: 'Visa',
  },
];

export default function PaymentSettingsScreen() {
  const router = useRouter();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPayPalLinked, setIsPayPalLinked] = useState(false);

  const handleAddCard = async () => {
    if (!cardNumber || !expiry || !cvc) {
      Alert.alert('Error', 'Please fill in all card details');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsLoading(false);
      setIsAddingCard(false);
      Alert.alert('Success', 'Card added successfully');
      
      setCardNumber('');
      setExpiry('');
      setCvc('');
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to add card. Please try again.');
    }
  };

  const handleDeleteCard = (cardId: string) => {
    Alert.alert(
      'Remove Card',
      'Are you sure you want to remove this card?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'Card removed successfully'),
        },
      ]
    );
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted.substring(0, 19);
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Payment Methods</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Cards</Text>
          {savedCards.map(card => (
            <View key={card.id} style={styles.cardItem}>
              <View style={styles.cardInfo}>
                <CreditCard size={24} color="#1E293B" />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardType}>{card.brand}</Text>
                  <Text style={styles.cardNumber}>•••• {card.last4}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDeleteCard(card.id)}
              >
                <Trash2 size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {!isAddingCard ? (
          <TouchableOpacity 
            style={styles.addCardButton}
            onPress={() => setIsAddingCard(true)}
          >
            <Plus size={20} color="#001B3A" />
            <Text style={styles.addCardText}>Add New Card</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.addCardForm}>
            <Text style={styles.formTitle}>Add New Card</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Card Number</Text>
              <TextInput
                style={styles.input}
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                maxLength={19}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Expiry Date</Text>
                <TextInput
                  style={styles.input}
                  value={expiry}
                  onChangeText={(text) => {
                    const formatted = formatExpiry(text);
                    if (formatted.length <= 5) {
                      setExpiry(formatted);
                    }
                  }}
                  placeholder="MM/YY"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>

              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>CVC</Text>
                <TextInput
                  style={styles.input}
                  value={cvc}
                  onChangeText={(text) => {
                    const cleaned = text.replace(/\D/g, '');
                    if (cleaned.length <= 3) {
                      setCvc(cleaned);
                    }
                  }}
                  placeholder="123"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.formActions}>
              <Button
                title="Cancel"
                variant="outline"
                onPress={() => setIsAddingCard(false)}
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title={isLoading ? "Adding..." : "Add Card"}
                onPress={handleAddCard}
                disabled={isLoading}
                loading={isLoading}
                style={{ flex: 2 }}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8FAFC',
    marginBottom: 8,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDetails: {
    marginLeft: 12,
  },
  cardType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  cardNumber: {
    fontSize: 14,
    color: '#64748B',
  },
  deleteButton: {
    padding: 8,
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#001B3A',
    marginLeft: 8,
  },
  addCardForm: {
    padding: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  formActions: {
    flexDirection: 'row',
    marginTop: 24,
  },
});