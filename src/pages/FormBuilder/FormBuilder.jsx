import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
} from '@mui/material';
import { Save as SaveIcon, Add as AddIcon } from '@mui/icons-material';
import FieldTypeSelector from './components/FieldTypeSelector';
import FieldList from './components/FieldList';
import FieldEditor from './components/FieldEditor';
import { saveForm } from '../../redux/slices/formsSlice';
import { setFormName, clearForm } from '../../redux/slices/formBuilderSlice';

const FormBuilder = () => {
  const dispatch = useDispatch();
  const { fields, formName } = useSelector((state) => state.formBuilder);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [tempFormName, setTempFormName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const selectedField = fields.find(field => field.id === selectedFieldId);

  const handleSaveForm = () => {
    if (fields.length === 0) {
      setSnackbar({
        open: true,
        message: 'Cannot save an empty form. Please add at least one field.',
        severity: 'error'
      });
      return;
    }
    setSaveDialogOpen(true);
    setTempFormName(formName);
  };

  const confirmSave = () => {
    if (!tempFormName.trim()) {
      setSnackbar({
        open: true,
        message: 'Please enter a form name.',
        severity: 'error'
      });
      return;
    }

    dispatch(saveForm({
      name: tempFormName.trim(),
      fields: fields,
    }));
    
    dispatch(setFormName(tempFormName.trim()));
    setSaveDialogOpen(false);
    setSnackbar({
      open: true,
      message: 'Form saved successfully!',
      severity: 'success'
    });
  };

  const handleNewForm = () => {
    dispatch(clearForm());
    setSelectedFieldId(null);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AddIcon />
              Add Fields
            </Typography>
            <FieldTypeSelector />
          </Paper>
          
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Form Fields ({fields.length})</Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={handleNewForm}
                disabled={fields.length === 0}
              >
                New Form
              </Button>
            </Box>
            <FieldList
              selectedFieldId={selectedFieldId}
              onSelectField={setSelectedFieldId}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, minHeight: 600 }}>
            {selectedField ? (
              <FieldEditor
                field={selectedField}
                allFields={fields}
              />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 400,
                  color: 'text.secondary',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  No Field Selected
                </Typography>
                <Typography variant="body2" textAlign="center">
                  Select a field from the left panel to edit its properties,<br />
                  or add a new field to get started.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ position: 'fixed', bottom: 24, right: 24 }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          onClick={handleSaveForm}
          sx={{
            borderRadius: 28,
            px: 3,
            py: 1.5,
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
            },
          }}
        >
          Save Form
        </Button>
      </Box>

      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Form Name"
            fullWidth
            variant="outlined"
            value={tempFormName}
            onChange={(e) => setTempFormName(e.target.value)}
            placeholder="Enter a name for your form"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

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

export default FormBuilder;