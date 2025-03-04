import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Platform, 
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Image as ImageIcon, X, DollarSign, Camera } from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { format } from 'date-fns';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '@/components/Button';
import { DateTimePicker } from '@/components/DateTimePicker';
import { FormErrorMessage } from '@/components/FormErrorMessage';
import { FormSuccessMessage } from '@/components/FormSuccessMessage';
import { useAppDispatch, useAppSelector } from '@/store';
import { 
  setTitle, 
  setDescription, 
  setEventLocation, 
  setDate, 
  setTime, 
  setPrice, 
  setCategory, 
  setImage,
  createEvent,
  resetForm
} from '@/store/event/actions';
import { isValidDate, isValidTime, isValidPrice } from '@/utils/validation';

export default function CreateEventScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Get form state from Redux
  const { 
    title, 
    description, 
    location, 
    date, 
    time, 
    price, 
    category, 
    image 
  } = useAppSelector(state => state.event.form);
  
  const { loading, error, success } = useAppSelector(state => state.event.status);
  
  // Local validation state
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [priceError, setPriceError] = useState('');
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
  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch]);
  
  // Navigate back after successful event creation
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.back();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [success, router]);
  
  // Validation functions
  const validateTitle = (): boolean => {
    if (!title.trim()) {
      setTitleError('Event title is required');
      return false;
    }
    setTitleError('');
    return true;
  };
  
  const validateDescription = (): boolean => {
    if (!description.trim()) {
      setDescriptionError('Event description is required');
      return false;
    }
    setDescriptionError('');
    return true;
  };
  
  const validateLocation = (): boolean => {
    if (!location.trim()) {
      setLocationError('Event location is required');
      return false;
    }
    setLocationError('');
    return true;
  };
  
  const validateDate = (): boolean => {
    if (!date) {
      setDateError('Event date is required');
      return false;
    }
    
    if (!isValidDate(date)) {
      setDateError('Please select a valid date (not in the past)');
      return false;
    }
    
    setDateError('');
    return true;
  };
  
  const validateTime = (): boolean => {
    if (!time) {
      setTimeError('Event time is required');
      return false;
    }
    
    if (!isValidTime(time)) {
      setTimeError('Please enter a valid time');
      return false;
    }
    
    setTimeError('');
    return true;
  };
  
  const validatePrice = (): boolean => {
    if (price && !isValidPrice(price)) {
      setPriceError('Please enter a valid price');
      return false;
    }
    
    setPriceError('');
    return true;
  };
  
  const validateCategory = (): boolean => {
    if (!category) {
      setCategoryError('Please select an event category');
      return false;
    }
    
    setCategoryError('');
    return true;
  };
  
  // Validate all fields
  const validateForm = (): boolean => {
    const isTitleValid = validateTitle();
    const isDescriptionValid = validateDescription();
    const isLocationValid = validateLocation();
    const isDateValid = validateDate();
    const isTimeValid = validateTime();
    const isPriceValid = validatePrice();
    const isCategoryValid = validateCategory();
    
    return (
      isTitleValid &&
      isDescriptionValid &&
      isLocationValid &&
      isDateValid &&
      isTimeValid &&
      isPriceValid &&
      isCategoryValid
    );
  };
  
  // Handle form submission
  const handleCreateEvent = async () => {
    if (validateForm()) {
      Keyboard.dismiss();
      await dispatch(createEvent());
    }
  };
  
  // Handle input changes
  const handleTitleChange = (text: string) => {
    dispatch(setTitle(text));
    if (titleError) setTitleError('');
  };
  
  const handleDescriptionChange = (text: string) => {
    dispatch(setDescription(text));
    if (descriptionError) setDescriptionError('');
  };
  
  const handleLocationChange = (text: string) => {
    dispatch(setEventLocation(text));
    if (locationError) setLocationError('');
  };
  
  const handleDateChange = (value: string) => {
    dispatch(setDate(value));
    if (dateError) setDateError('');
  };
  
  const handleTimeChange = (value: string) => {
    dispatch(setTime(value));
    if (timeError) setTimeError('');
  };
  
  const handlePriceChange = (text: string) => {
    // Only allow numbers and decimal point
    const formattedPrice = text.replace(/[^0-9.]/g, '');
    dispatch(setPrice(formattedPrice));
    if (priceError) setPriceError('');
  };
  
  const handleCategorySelect = (categoryId: string) => {
    dispatch(setCategory(categoryId));
    if (categoryError) setCategoryError('');
  };
  
  // Image picker functions
  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Sorry, we need camera roll permissions to upload images.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      // Launch image library with correct options
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        dispatch(setImage(result.assets[0].uri));
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };
  
  const takePhoto = async () => {
    try {
      // Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Sorry, we need camera permissions to take photos.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        dispatch(setImage(result.assets[0].uri));
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };
  
  const handleRemoveImage = () => {
    dispatch(setImage(null));
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
        <Text style={styles.title}>Create Event</Text>
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
            {success && <FormSuccessMessage message="Event created successfully!" />}
            
            <View style={styles.imageUploadContainer}>
              {image ? (
                <View style={styles.imagePreviewContainer}>
                  <Image 
                    source={{ uri: image }} 
                    style={styles.imagePreview}
                    resizeMode="cover"
                  />
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={handleRemoveImage}
                  >
                    <X size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity 
                  style={styles.uploadButton}
                  onPress={pickImage}
                >
                  <ImageIcon size={32} color="#000080" />
                  <Text style={styles.uploadText}>Upload Event Image</Text>
                  
                  {Platform.OS !== 'web' && (
                    <View style={styles.imageOptionsContainer}>
                      <TouchableOpacity 
                        style={styles.imageOptionButton}
                        onPress={pickImage}
                      >
                        <ImageIcon size={20} color="#000080" />
                        <Text style={styles.imageOptionText}>Choose from Library</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.imageOptionButton}
                        onPress={takePhoto}
                      >
                        <Camera size={20} color="#000080" />
                        <Text style={styles.imageOptionText}>Take Photo</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Event Title</Text>
              <TextInput
                style={[styles.input, titleError ? styles.inputError : null]}
                value={title}
                onChangeText={handleTitleChange}
                placeholder="Enter event title"
                placeholderTextColor="#94A3B8"
                onBlur={validateTitle}
              />
              {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
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
                placeholder="Describe your event"
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
                  placeholder="Event location"
                  placeholderTextColor="#94A3B8"
                  onBlur={validateLocation}
                />
              </View>
              {locationError ? <Text style={styles.errorText}>{locationError}</Text> : null}
            </View>
            
            <View style={styles.row}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <DateTimePicker
                  mode="date"
                  value={date}
                  onChange={handleDateChange}
                  label="Date"
                  error={dateError}
                  minimumDate={new Date()}
                />
              </View>
              
              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <DateTimePicker
                  mode="time"
                  value={time}
                  onChange={handleTimeChange}
                  label="Time"
                  error={timeError}
                  is24Hour={false}
                  minuteInterval={15}
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Price</Text>
              <View style={[
                styles.inputWithIcon,
                priceError ? styles.inputError : null
              ]}>
                <DollarSign size={20} color="#000080" style={styles.inputIcon} />
                <TextInput
                  style={styles.iconInput}
                  value={price}
                  onChangeText={handlePriceChange}
                  placeholder="0.00 (leave empty for free)"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  onBlur={validatePrice}
                />
              </View>
              {priceError ? <Text style={styles.errorText}>{priceError}</Text> : null}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      
      <View style={styles.footer}>
        <Button 
          title={loading ? "Creating..." : "Create Event"} 
          onPress={handleCreateEvent}
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
  imageUploadContainer: {
    marginBottom: 24,
  },
  uploadButton: {
    height: 200,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000080',
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'center',
  },
  imageOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  imageOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  imageOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000080',
    marginLeft: 6,
  },
  imagePreviewContainer: {
    position: 'relative',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
  row: {
    flexDirection: 'row',
    marginHorizontal: -8,
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