import dayjs from 'dayjs';

/**
 * Utility functions for handling derived fields
 */

export const calculateDerivedValue = (field, parentValue, parentField) => {
  if (!field.derivedFrom || !field.formula || !parentValue) {
    return '';
  }

  try {
    if (field.formula === 'age' && parentField.type === 'date') {
      // Calculate age from date of birth
      const birthDate = dayjs(parentValue);
      const today = dayjs();
      return today.diff(birthDate, 'year');
    } else if (field.formula.includes('value')) {
      // Simple arithmetic operations
      const numericValue = parseFloat(parentValue);
      if (!isNaN(numericValue)) {
        // Replace 'value' with actual numeric value and evaluate
        const expression = field.formula.replace(/value/g, numericValue);
        // Basic safety check for allowed operations
        if (/^[\d\s+\-*/().]+$/.test(expression)) {
          // Use Function constructor instead of eval for better security
          return new Function('return ' + expression)();
        }
      }
    }
  } catch (error) {
    console.error('Error calculating derived field:', error);
  }

  return '';
};

export const updateDerivedFields = (fields, formData) => {
  const newFormData = { ...formData };
  let hasChanges = false;

  fields.forEach(field => {
    if (field.derivedFrom && field.formula) {
      const parentField = fields.find(f => f.id === field.derivedFrom);
      if (parentField && formData[field.derivedFrom]) {
        const derivedValue = calculateDerivedValue(
          field,
          formData[field.derivedFrom],
          parentField
        );

        if (derivedValue !== '' && newFormData[field.id] !== derivedValue) {
          newFormData[field.id] = derivedValue;
          hasChanges = true;
        }
      }
    }
  });

  return { newFormData, hasChanges };
};

export const getAvailableParentFields = (fields, currentFieldId) => {
  return fields.filter(field => 
    field.id !== currentFieldId && 
    !field.derivedFrom && 
    (field.type === 'number' || field.type === 'date')
  );
};

export const validateFormula = (formula, parentFieldType) => {
  if (!formula.trim()) {
    return { isValid: false, error: 'Formula cannot be empty' };
  }

  if (formula === 'age') {
    if (parentFieldType !== 'date') {
      return { isValid: false, error: 'Age formula can only be used with date fields' };
    }
    return { isValid: true };
  }

  if (formula.includes('value')) {
    if (parentFieldType !== 'number') {
      return { isValid: false, error: 'Arithmetic formulas can only be used with number fields' };
    }
    
    // Check if formula contains only allowed characters
    const testExpression = formula.replace(/value/g, '1');
    if (!/^[\d\s+\-*/().]+$/.test(testExpression)) {
      return { isValid: false, error: 'Formula contains invalid characters. Only +, -, *, /, (), and numbers are allowed' };
    }

    // Test if formula is valid by trying to evaluate it
    try {
      new Function('return ' + testExpression)();
      return { isValid: true };
    } catch (error) {
      return { isValid: false, error: 'Invalid formula syntax' };
    }
  }

  return { isValid: false, error: 'Formula must be "age" for date fields or contain "value" for number fields' };
};