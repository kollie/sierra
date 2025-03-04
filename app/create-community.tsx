import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Platform, 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin } from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from '@/components/Button';
import { FormErrorMessage } from '@/components/FormErrorMessage';
import { FormSuccessMessage } from '@/components/FormSuccessMessage';
import { useAppDispatch, useAppSelector } from '@/store';
import { 
  setName, 
  setDescription, 
  setCommunityLocation, 
  setCategory, 
  setGuidelines,
  createCommunity,
  resetForm
} from '@/store/community/actions';

export default function CreateCommunityScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Get form state from Redux
  const { 
    name, 
    description, 
    location, 
    category, 
    guidelines 
  } = useAppSelector(state => state.community.form);
  
  const { loading, error, success } = useAppSelector(state => state.community.status);
  
  // Local validation state
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  
  // Categories
  const categories = [
    { id: 'social', name: 'Social' },
    { id: 'sports', name: 'Sports' },
    { id: 'education', name: 'Education' },
    { id: 'arts', name: 'Arts' },
    { id: 'technology', name: 'Technology' },
    { id: 'outdoors', name: 'Outdoors' },
  ];
  
  // Reset form when component unmounts
  useState(() => {
    return () => {
      dispatch(resetForm());
    };
  });
  
  // Navigate back after successful community creation
  useState(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.back();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [success, router]);
  
  // Validation functions
  const validateName = (): boolean => {
    if (!name.trim()) {
      setNameError('Community name is required');
      return false;
    }
    setNameError('');
    return true;
  };
  
  const validateDescription = (): boolean => {
    if (!description.trim()) {
      setDescriptionError('Community description is required');
      return false;
    }
    setDescriptionError('');
    return true;
  };
  
  const validateLocation = (): boolean => {
    if (!location.trim()) {
      setLocationError('Community location is required');
      return false;
    }
    setLocationError('');
    return true;
  };
  
  const validateCategory = (): boolean => {
    if (!category) {
      setCategoryError('Please select a community category');
      return false;
    }
    
    setCategoryError('');
    return true;
  };
  
  // Validate all fields
  const validateForm = (): boolean => {
    const isNameValid = validateName();
    const isDescriptionValid = validateDescription();
    const isLocationValid = validateLocation();
    const isCategoryValid = validateCategory();
    
    return (
      isNameValid &&
      isDescriptionValid &&
      isLocationValid &&
      isCategoryValid
    );
  };
  
  // Handle form submission
  const handleCreateCommunity = async () => {
    if (validateForm()) {
      Keyboard.dismiss();
      
      await dispatch(createCommunity({
        name,
        description,
        location,
        category,
        guidelines
      }));
    }
  };
  
  // Handle input changes
  const handleNameChange = (text: string) => {
    dispatch(setName(text));
    if (nameError) setNameError('');
  };
  
  const handleDescriptionChange = (text: string) => {
    dispatch(setDescription(text));
    if (descriptionError) setDescriptionError('');
  };
  
  const handleLocationChange = (text: string) => {
    dispatch(setCommunityLocation(text));
    if (locationError) setLocationError('');
  };
  
  const handleCategorySelect = (categoryId: string) => {
    dispatch(setCategory(categoryId));
    if (categoryError) setCategoryError('');
  };
  
  const handleGuidelinesChange = (text: string) => {
    dispatch(setGuidelines(text));
  };
  
  const dismissKeyboard = () => {
    Keyboard.dismiss();
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
        <Text style={styles.title}>Create Community</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        extraScrollHeight={Platform.OS === 'ios' ? 120 : 80}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View>
            {error && <FormErrorMessage error={error} />}
            {success && <FormSuccessMessage message="Community created successfully!" />}
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Community Name</Text>
              <TextInput
                style={[styles.input, nameError ? styles.inputError : null]}
                value={name}
                onChangeText={handleNameChange}
                placeholder="Enter community name"
                placeholderTextColor="#94A3B8"
                onBlur={validateName}
              />
              {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[
                  styles.input, 
                  styles.textArea,
                  descriptionError ? styles.inputError : null
                ]}
                value={description}
                onChangeText={handleDescriptionChange}
                placeholder="Describe your community"
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={Platform.OS === 'ios' ? 0 : 4}
                textAlignVertical="top"
                onBlur={validateDescription}
              />
              {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoriesContainer}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryChip,
                      category === cat.id && styles.selectedCategoryChip,
                      categoryError ? styles.categoryChipError : null
                    ]}
                    onPress={() => handleCategorySelect(cat.id)}
                  >
                    <Text 
                      style={[
                        styles.categoryChipText,
                        category === cat.id && styles.selectedCategoryChipText
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {categoryError ? <Text style={styles.errorText}>{categoryError}</Text> : null}
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Location</Text>
              <View style={[
                styles.inputWithIcon,
                locationError ? styles.inputError : null
              ]}>
                <MapPin size={20} color="#000080" style={styles.inputIcon} />
                <TextInput
                  style={styles.iconInput}
                  value={location}
                  onChangeText={handleLocationChange}
                  placeholder="Community location"
                  placeholderTextColor="#94A3B8"
                  onBlur={validateLocation}
                />
              </View>
              {locationError ? <Text style={styles.errorText}>{locationError}</Text> : null}
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Community Guidelines</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={guidelines}
                onChangeText={handleGuidelinesChange}
                placeholder="Optional: Add guidelines for your community"
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={Platform.OS === 'ios' ? 0 : 3}
                textAlignVertical="top"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      
      <View style={styles.footer}>
        <Button 
          title={loading ? "Creating..." : "Create Community"} 
          onPress={handleCreateCommunity}
          disabled={loading}
          loading={loading}
        />
      </View>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  formGroup: {
    marginBottom: 20,
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
  inputError: {
    borderColor: '#EF4444',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  iconInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    margin: 4,
  },
  selectedCategoryChip: {
    backgroundColor: '#000080',
    borderColor: '#000080',
  },
  categoryChipError: {
    borderColor: '#EF4444',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#1E293B',
  },
  selectedCategoryChipText: {
    color: '#FFFFFF',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  }
});