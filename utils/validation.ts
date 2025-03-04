import { UserOnboardingState } from '@/types/redux';
import { EventFormState } from '@/types/redux';
import { isValid, isBefore, parseISO, startOfDay } from 'date-fns';

/**
 * Validates email format
 * @param email Email to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param password Password to validate
 * @returns Boolean indicating if password is valid
 */
export const isValidPassword = (password: string): boolean => {
  // Only check for minimum length of 8 characters
  return password.length >= 8;
};

/**
 * Validates the entire onboarding data before submission
 * @param data The onboarding state data
 * @returns Error message if validation fails, null if valid
 */
export const validateOnboardingData = (data: UserOnboardingState): string | null => {
  // Validate personal info
  if (!data.personalInfo.firstName.trim()) {
    return 'First name is required';
  }
  
  if (!data.personalInfo.lastName.trim()) {
    return 'Last name is required';
  }
  
  // Validate account info
  if (!data.accountInfo.email.trim()) {
    return 'Email is required';
  }
  
  if (!isValidEmail(data.accountInfo.email)) {
    return 'Please enter a valid email address';
  }
  
  if (!data.accountInfo.password.trim()) {
    return 'Password is required';
  }
  
  if (!isValidPassword(data.accountInfo.password)) {
    return 'Password must be at least 8 characters';
  }
  
  // Validate preferences
  if (data.preferences.interests.length < 1) {
    return 'Please select at least one interest';
  }
  
  if (!data.preferences.location.trim()) {
    return 'Location is required';
  }
  
  // All validations passed
  return null;
};

/**
 * Validates date format and ensures it's not in the past
 * @param dateString Date string in YYYY-MM-DD format
 * @returns Boolean indicating if date is valid
 */
export const isValidDate = (dateString: string): boolean => {
  if (!dateString) return false;
  
  const date = parseISO(dateString);
  const today = startOfDay(new Date());
  
  return isValid(date) && !isBefore(date, today);
};

/**
 * Validates time format (HH:MM)
 * @param timeString Time string in HH:MM format
 * @returns Boolean indicating if time is valid
 */
export const isValidTime = (timeString: string): boolean => {
  if (!timeString) return false;
  
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
};

/**
 * Validates price format (numeric, can be decimal)
 * @param priceString Price string
 * @returns Boolean indicating if price is valid
 */
export const isValidPrice = (priceString: string): boolean => {
  if (!priceString) return true; // Price can be empty (free event)
  
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  return priceRegex.test(priceString);
};

/**
 * Validates the entire event form data before submission
 * @param data The event form data
 * @returns Error message if validation fails, null if valid
 */
export const validateEventData = (data: EventFormState): string | null => {
  // Validate title
  if (!data.title.trim()) {
    return 'Event title is required';
  }
  
  // Validate description
  if (!data.description.trim()) {
    return 'Event description is required';
  }
  
  // Validate location
  if (!data.location.trim()) {
    return 'Event location is required';
  }
  
  // Validate date
  if (!data.date) {
    return 'Event date is required';
  }
  
  if (!isValidDate(data.date)) {
    return 'Please select a valid date (not in the past)';
  }
  
  // Validate time
  if (!data.time) {
    return 'Event time is required';
  }
  
  if (!isValidTime(data.time)) {
    return 'Please enter a valid time (HH:MM)';
  }
  
  // Validate price
  if (data.price && !isValidPrice(data.price)) {
    return 'Please enter a valid price';
  }
  
  // Validate category
  if (!data.category) {
    return 'Please select an event category';
  }
  
  // All validations passed
  return null;
};