import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  Functions as FormulaIcon,
} from '@mui/icons-material';
import { updateField } from '../../../redux/slices/formBuilderSlice';

const FieldEditor = ({ field, allFields }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState('basic');

  const handleFieldUpdate = (updates) => {
    dispatch(updateField({ id: field.id, updates }));
  };

  const handleValidationUpdate = (validationType, value) => {
    const newValidation = { ...field.validation, [validationType]: value };
    handleFieldUpdate({ validation: newValidation });
  };

  const handleOptionAdd = () => {
    const newOptions = [...field.options, `Option ${field.options.length + 1}`];
    handleFieldUpdate({ options: newOptions });
  };

  const handleOptionUpdate = (index, value) => {
    const newOptions = [...field.options];
    newOptions[index] = value;
    handleFieldUpdate({ options: newOptions });
  };

  const handleOptionDelete = (index) => {
    const newOptions = field.options.filter((_, i) => i !== index);
    handleFieldUpdate({ options: newOptions });
  };

  const availableParentFields = allFields.filter(f => 
    f.id !== field.id && 
    !f.derivedFrom && 
    (f.type === 'number' || f.type === 'date')
  );

  const renderValidationOptions = () => {
    const validationOptions = [];

    validationOptions.push(
      <TextField
        key="minLength"
        label="Minimum Length"
        type="number"
        size="small"
        value={field.validation.minLength || ''}
        onChange={(e) => handleValidationUpdate('minLength', parseInt(e.target.value) || undefined)}
        sx={{ mb: 2 }}
      />
    );

    validationOptions.push(
      <TextField
        key="maxLength"
        label="Maximum Length"
        type="number"
        size="small"
        value={field.validation.maxLength || ''}
        onChange={(e) => handleValidationUpdate('maxLength', parseInt(e.target.value) || undefined)}
        sx={{ mb: 2 }}
      />
    );

    if (field.type === 'text') {
      validationOptions.push(
        <FormControlLabel
          key="email"
          control={
            <Switch
              checked={field.validation.email || false}
              onChange={(e) => handleValidationUpdate('email', e.target.checked)}
            />
          }
          label="Email Format"
          sx={{ mb: 1 }}
        />
      );

      validationOptions.push(
        <FormControlLabel
          key="password"
          control={
            <Switch
              checked={field.validation.password || false}
              onChange={(e) => handleValidationUpdate('password', e.target.checked)}
            />
          }
          label="Password Rules (8+ chars, uppercase, lowercase, number)"
          sx={{ mb: 1 }}
        />
      );
    }

    if (field.type === 'number') {
      validationOptions.push(
        <TextField
          key="min"
          label="Minimum Value"
          type="number"
          size="small"
          value={field.validation.min || ''}
          onChange={(e) => handleValidationUpdate('min', parseFloat(e.target.value) || undefined)}
          sx={{ mb: 2 }}
        />
      );

      validationOptions.push(
        <TextField
          key="max"
          label="Maximum Value"
          type="number"
          size="small"
          value={field.validation.max || ''}
          onChange={(e) => handleValidationUpdate('max', parseFloat(e.target.value) || undefined)}
          sx={{ mb: 2 }}
        />
      );
    }

    return validationOptions;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <SettingsIcon color="primary" />
        <Typography variant="h6">
          Edit Field: {field.label}
        </Typography>
        <Chip label={field.type} size="small" color="primary" />
      </Box>

      {/* Basic Settings */}
      <Accordion expanded={expanded === 'basic'} onChange={() => setExpanded(expanded === 'basic' ? '' : 'basic')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Basic Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Field Label"
              value={field.label}
              onChange={(e) => handleFieldUpdate({ label: e.target.value })}
              fullWidth
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={field.required}
                  onChange={(e) => handleFieldUpdate({ required: e.target.checked })}
                />
              }
              label="Required Field"
            />

            {field.type !== 'checkbox' && (
              <TextField
                label="Default Value"
                value={field.defaultValue}
                onChange={(e) => handleFieldUpdate({ defaultValue: e.target.value })}
                fullWidth
                multiline={field.type === 'textarea'}
                rows={field.type === 'textarea' ? 3 : 1}
              />
            )}
          </Box>
        </AccordionDetails>
      </Accordion>

      {(field.type === 'select' || field.type === 'radio') && (
        <Accordion expanded={expanded === 'options'} onChange={() => setExpanded(expanded === 'options' ? '' : 'options')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {field.options.map((option, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionUpdate(index, e.target.value)}
                    size="small"
                    fullWidth
                  />
                  <IconButton
                    onClick={() => handleOptionDelete(index)}
                    disabled={field.options.length <= 1}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={handleOptionAdd}
                variant="outlined"
                size="small"
              >
                Add Option
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}

      <Accordion expanded={expanded === 'validation'} onChange={() => setExpanded(expanded === 'validation' ? '' : 'validation')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Validation Rules</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {renderValidationOptions()}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'derived'} onChange={() => setExpanded(expanded === 'derived' ? '' : 'derived')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormulaIcon />
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Derived Field</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Derived fields automatically calculate their value based on other fields.
              Currently supports: Age from Date of Birth, and simple arithmetic operations.
            </Alert>
            
            <FormControl fullWidth>
              <InputLabel>Parent Field</InputLabel>
              <Select
                value={field.derivedFrom || ''}
                onChange={(e) => handleFieldUpdate({ derivedFrom: e.target.value || null })}
                label="Parent Field"
              >
                <MenuItem value="">
                  <em>None (Regular Field)</em>
                </MenuItem>
                {availableParentFields.map((parentField) => (
                  <MenuItem key={parentField.id} value={parentField.id}>
                    {parentField.label} ({parentField.type})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {field.derivedFrom && (
              <TextField
                label="Formula"
                value={field.formula}
                onChange={(e) => handleFieldUpdate({ formula: e.target.value })}
                fullWidth
                placeholder="e.g., 'age' for age calculation from date, or 'value * 2' for arithmetic"
                helperText="Use 'age' for age calculation from date fields, or 'value' for the parent field value in arithmetic operations"
              />
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FieldEditor;