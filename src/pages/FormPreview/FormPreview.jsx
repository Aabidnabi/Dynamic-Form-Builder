import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Typography,
  Box,
  Alert,
  Button,
} from '@mui/material';
import { Preview as PreviewIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import DynamicForm from './components/DynamicForm';

const FormPreview = () => {
  const { fields, formName } = useSelector((state) => state.formBuilder);
  const { currentForm } = useSelector((state) => state.forms);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const previewFields = currentForm?.fields || fields;
  const previewFormName = currentForm?.name || formName || 'Untitled Form';

  useEffect(() => {
    const initialData = {};
    previewFields.forEach(field => {
      if (field.type === 'checkbox') {
        initialData[field.id] = false;
      } else {
        initialData[field.id] = field.defaultValue || '';
      }
    });
    setFormData(initialData);
  }, [previewFields]);

  const handleReset = () => {
    const resetData = {};
    previewFields.forEach(field => {
      if (field.type === 'checkbox') {
        resetData[field.id] = false;
      } else {
        resetData[field.id] = field.defaultValue || '';
      }
    });
    setFormData(resetData);
    setErrors({});
  };

  if (previewFields.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ color: 'text.secondary', mb: 2 }}>
          <PreviewIcon sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Form to Preview
          </Typography>
          <Typography variant="body2">
            Create a form in the Form Builder or select a saved form from My Forms to preview it here.
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Box>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PreviewIcon color="primary" />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {previewFormName}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleReset}
            size="small"
          >
            Reset Form
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          This is how your form will appear to end users. All validations and derived field calculations are active.
        </Alert>

        <DynamicForm
          fields={previewFields}
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
      </Paper>
    </Box>
  );
};

export default FormPreview;