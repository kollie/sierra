import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format, isValid, parseISO } from 'date-fns';
import { Calendar, Clock } from 'lucide-react-native';

interface DateTimePickerProps {
  mode: 'date' | 'time';
  value: string;
  onChange: (value: string) => void;
  label: string;
  error?: string;
  minimumDate?: Date;
  is24Hour?: boolean;
  minuteInterval?: 5 | 10 | 15 | 20 | 30;
}

export function DateTimePicker({
  mode,
  value,
  onChange,
  label,
  error,
  minimumDate = new Date(),
  is24Hour = false,
  minuteInterval = 15
}: DateTimePickerProps) {
  const [isPickerVisible, setPickerVisible] = useState(false);
  
  const showPicker = () => {
    setPickerVisible(true);
  };
  
  const hidePicker = () => {
    setPickerVisible(false);
  };
  
  const handleConfirm = (date: Date) => {
    hidePicker();
    
    try {
      if (mode === 'date') {
        onChange(format(date, 'yyyy-MM-dd'));
      } else {
        onChange(format(date, 'HH:mm'));
      }
    } catch (error) {
      console.error('Error formatting date:', error);
    }
  };
  
  const getDisplayValue = () => {
    if (!value) {
      return mode === 'date' ? 'Select date' : 'Select time';
    }
    
    try {
      if (mode === 'date') {
        const date = parseISO(value);
        return isValid(date) ? format(date, 'MMMM d, yyyy') : 'Select date';
      } else {
        // For time, we need to create a date object with the time value
        const [hours, minutes] = value.split(':').map(Number);
        const date = new Date();
        date.setHours(hours || 0, minutes || 0);
        
        return isValid(date) ? format(date, is24Hour ? 'HH:mm' : 'h:mm a') : 'Select time';
      }
    } catch (error) {
      console.error('Error parsing date:', error);
      return mode === 'date' ? 'Select date' : 'Select time';
    }
  };
  
  const getInitialDate = () => {
    if (!value) {
      return new Date();
    }
    
    try {
      if (mode === 'date') {
        const date = parseISO(value);
        return isValid(date) ? date : new Date();
      } else {
        // For time, we need to create a date object with the time value
        const [hours, minutes] = value.split(':').map(Number);
        const date = new Date();
        date.setHours(hours || 0, minutes || 0);
        return date;
      }
    } catch (error) {
      console.error('Error getting initial date:', error);
      return new Date();
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.inputContainer,
          error ? styles.inputError : null
        ]}
        onPress={showPicker}
      >
        {mode === 'date' ? (
          <Calendar size={20} color="#001B3A" style={styles.icon} />
        ) : (
          <Clock size={20} color="#001B3A" style={styles.icon} />
        )}
        <Text style={[
          styles.displayValue,
          !value ? styles.placeholderText : null
        ]}>
          {getDisplayValue()}
        </Text>
      </TouchableOpacity>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode={mode}
        date={getInitialDate()}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        minimumDate={mode === 'date' ? minimumDate : undefined}
        is24Hour={is24Hour}
        minuteInterval={minuteInterval}
        {...(Platform.OS === 'ios' && {
          display: 'spinner',
          accentColor: "#000080"
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  icon: {
    marginRight: 8,
  },
  displayValue: {
    fontSize: 16,
    color: '#1E293B',
  },
  placeholderText: {
    color: '#94A3B8',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 4,
  }
});