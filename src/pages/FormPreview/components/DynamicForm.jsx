import React, { useState, useEffect } from 'react';
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Button,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const DynamicForm = ({ fields, formData, setFormData, errors, setErrors }) => {
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Calculate derived fields whenever form data changes
  useEffect(() => {
    const newFormData = { ...formData };
    let hasChanges = false;

    fields.forEach(field => {
      if (field.derivedFrom && field.formula) {
        const parentField = fields.find(f => f.id === field.derivedFrom);
        if (parentField && formData[field.derivedFrom]) {
          const parentValue = formData[field.derivedFrom];
          let derivedValue = '';

          try {
            if (field.formula === 'age' && parentField.type === 'date') {
              // Calculate age from date of birth
              const birthDate = dayjs(parentValue);
              const today = dayjs();
              derivedValue = today.diff(birthDate, 'year');
            } else if (field.formula.includes('value')) {
              // Simple arithmetic operations
              const numericValue = parseFloat(parentValue);
              if (!isNaN(numericValue)) {
                // Replace 'value' with actual numeric value and evaluate
                const expression = field.formula.replace(/value/g, numericValue);
                // Basic safety check for allowed operations
                if (/^[\d\s+\-*/().]+$/.test(expression)) {
                  derivedValue = eval(expression);
                }
              }
            }

            if (derivedValue !== '' && newFormData[field.id] !== derivedValue) {
              newFormData[field.id] = derivedValue;
              hasChanges = true;
            }
          } catch (error) {
            console.error('Error calculating derived field:', error);
          }
        }
      }
    });

    if (hasChanges) {
      setFormData(newFormData);
    }
  }, [formData, fields, setFormData]);

  const validateField = (field, value) => {
    const fieldErrors = [];

    // Required validation
    if (field.required && (!value || value === '')) {
      fieldErrors.push(`${field.label} is required`);
    }

    if (value && value !== '') {
      // Type-specific validations
      if (field.type === 'text' && field.validation) {
        // Email validation
        if (field.validation.email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            fieldErrors.push('Please enter a valid email address');
          }
        }

        // Password validation
        if (field.validation.password) {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
          if (!passwordRegex.test(value)) {
            fieldErrors.push('Password must be at least 8 characters with uppercase, lowercase, and number');
          }
        }

        // Length validations
        if (field.validation.minLength && value.length < field.validation.minLength) {
          fieldErrors.push(`Minimum length is ${field.validation.minLength} characters`);
        }
        if (field.validation.maxLength && value.length > field.validation.maxLength) {
          fieldErrors.push(`Maximum length is ${field.validation.maxLength} characters`);
        }
      }

      if (field.type === 'number' && field.validation) {
        const numValue = parseFloat(value);
        if (field.validation.min !== undefined && numValue < field.validation.min) {
          fieldErrors.push(`Minimum value is ${field.validation.min}`);
        }
        if (field.validation.max !== undefined && numValue > field.validation.max) {
          fieldErrors.push(`Maximum value is ${field.validation.max}`);
        }
      }
    }

    return fieldErrors;
  };

  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));

    // Clear errors for this field when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: []
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    // Validate all fields
    const newErrors = {};
    let hasErrors = false;

    fields.forEach(field => {
      if (!field.derivedFrom) { // Don't validate derived fields
        const fieldErrors = validateField(field, formData[field.id]);
        if (fieldErrors.length > 0) {
          newErrors[field.id] = fieldErrors;
          hasErrors = true;
        }
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      setSnackbar({
        open: true,
        message: 'Form submitted successfully!',
        severity: 'success'
      });
      console.log('Form submitted with data:', formData);
    } else {
      setSnackbar({
        open: true,
        message: 'Please fix the errors before submitting',
        severity: 'error'
      });
    }
  };

  const renderField = (field) => {
    const fieldError = errors[field.id] && errors[field.id].length > 0;
    const helperText = fieldError ? errors[field.id].join(', ') : '';
    const isDisabled = field.derivedFrom; // Derived fields are read-only

    switch (field.type) {
      case 'text':
        return (
          <TextField
            key={field.id}
            fullWidth
            label={field.label}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            error={fieldError}
            helperText={helperText}
            disabled={isDisabled}
            type={field.validation?.password ? 'password' : 'text'}
            sx={{ mb: 2 }}
          />
        );

      case 'number':
        return (
          <TextField
            key={field.id}
            fullWidth
            type="number"
            label={field.label}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            error={fieldError}
            helperText={helperText}
            disabled={isDisabled}
            sx={{ mb: 2 }}
          />
        );

      case 'textarea':
        return (
          <TextField
            key={field.id}
            fullWidth
            multiline
            rows={4}
            label={field.label}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
            error={fieldError}
            helperText={helperText}
            disabled={isDisabled}
            sx={{ mb: 2 }}
          />
        );

      case 'select':
        return (
          <FormControl key={field.id} fullWidth error={fieldError} sx={{ mb: 2 }}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              label={field.label}
              required={field.required}
              disabled={isDisabled}
            >
              {field.options.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );

      case 'radio':
        return (
          <FormControl key={field.id} component="fieldset" error={fieldError} sx={{ mb: 2 }}>
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              value={formData[field.id] || ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            >
              {field.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled={isDisabled}
                />
              ))}
            </RadioGroup>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );

      case 'checkbox':
        return (
          <FormControl key={field.id} error={fieldError} sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData[field.id] || false}
                  onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                  disabled={isDisabled}
                />
              }
              label={field.label}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );

      case 'date':
        return (
          <DatePicker
            key={field.id}
            label={field.label}
            value={formData[field.id] ? dayjs(formData[field.id]) : null}
            onChange={(newValue) => handleFieldChange(field.id, newValue ? newValue.toISOString() : '')}
            disabled={isDisabled}
            slotProps={{
              textField: {
                fullWidth: true,
                required: field.required,
                error: fieldError,
                helperText: helperText,
                sx: { mb: 2 }
              }
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {fields.map(field => renderField(field))}
      
      {fields.length > 0 && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Submit Form
          </Button>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DynamicForm;