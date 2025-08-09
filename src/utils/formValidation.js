/**
 * Utility functions for form validation
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const validateRequired = (value) => {
  if (typeof value === 'boolean') return true;
  if (typeof value === 'number') return !isNaN(value);
  return value && value.toString().trim() !== '';
};

export const validateMinLength = (value, minLength) => {
  if (!value) return true; // Let required validation handle empty values
  return value.toString().length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  if (!value) return true;
  return value.toString().length <= maxLength;
};

export const validateMinValue = (value, minValue) => {
  if (!value && value !== 0) return true;
  const numValue = parseFloat(value);
  return !isNaN(numValue) && numValue >= minValue;
};

export const validateMaxValue = (value, maxValue) => {
  if (!value && value !== 0) return true;
  const numValue = parseFloat(value);
  return !isNaN(numValue) && numValue <= maxValue;
};

export const getFieldValidationErrors = (field, value) => {
  const errors = [];

  // Required validation
  if (field.required && !validateRequired(value)) {
    errors.push(`${field.label} is required`);
  }

  // Skip other validations if field is empty and not required
  if (!validateRequired(value) && !field.required) {
    return errors;
  }

  // Type-specific validations
  if (field.type === 'text' && field.validation) {
    if (field.validation.email && !validateEmail(value)) {
      errors.push('Please enter a valid email address');
    }

    if (field.validation.password && !validatePassword(value)) {
      errors.push('Password must be at least 8 characters with uppercase, lowercase, and number');
    }

    if (field.validation.minLength && !validateMinLength(value, field.validation.minLength)) {
      errors.push(`Minimum length is ${field.validation.minLength} characters`);
    }

    if (field.validation.maxLength && !validateMaxLength(value, field.validation.maxLength)) {
      errors.push(`Maximum length is ${field.validation.maxLength} characters`);
    }
  }

  if (field.type === 'number' && field.validation) {
    if (field.validation.min !== undefined && !validateMinValue(value, field.validation.min)) {
      errors.push(`Minimum value is ${field.validation.min}`);
    }

    if (field.validation.max !== undefined && !validateMaxValue(value, field.validation.max)) {
      errors.push(`Maximum value is ${field.validation.max}`);
    }
  }

  return errors;
};

export const validateForm = (fields, formData) => {
  const errors = {};
  let hasErrors = false;

  fields.forEach(field => {
    // Skip validation for derived fields
    if (field.derivedFrom) return;

    const fieldErrors = getFieldValidationErrors(field, formData[field.id]);
    if (fieldErrors.length > 0) {
      errors[field.id] = fieldErrors;
      hasErrors = true;
    }
  });

  return { errors, hasErrors };
};