import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  IconButton,
  Chip,
  Alert,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CalendarToday as DateIcon,
  Description as FormIcon,
} from '@mui/icons-material';
import { deleteForm, setCurrentForm } from '../../redux/slices/formsSlice';
import { loadForm } from '../../redux/slices/formBuilderSlice';

const MyForms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { savedForms } = useSelector((state) => state.forms);

  const handleViewForm = (form) => {
    dispatch(setCurrentForm(form));
    navigate('/preview');
  };

  const handleEditForm = (form) => {
    dispatch(loadForm(form));
    navigate('/create');
  };

  const handleDeleteForm = (formId) => {
    if (window.confirm('Are you sure you want to delete this form? This action cannot be undone.')) {
      dispatch(deleteForm(formId));
    }
  };

  const handleCreateNew = () => {
    navigate('/create');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFieldTypeCount = (fields) => {
    const types = {};
    fields.forEach(field => {
      types[field.type] = (types[field.type] || 0) + 1;
    });
    return types;
  };

  if (savedForms.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <FormIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom color="text.secondary">
          No Forms Created Yet
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Start building your first dynamic form to see it listed here.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
          sx={{ px: 4, py: 1.5 }}
        >
          Create Your First Form
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            My Forms
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and preview your saved forms
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
          sx={{ px: 3, py: 1.5 }}
        >
          Create New Form
        </Button>
      </Box>

      <Grid container spacing={3}>
        {savedForms.map((form) => {
          const fieldTypes = getFieldTypeCount(form.fields);
          const totalFields = form.fields.length;
          const requiredFields = form.fields.filter(field => field.required).length;

          return (
            <Grid item xs={12} sm={6} md={4} key={form.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600, flexGrow: 1 }}>
                      {form.name}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteForm(form.id)}
                      sx={{ color: 'error.main', ml: 1 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                    <DateIcon sx={{ fontSize: 16, mr: 1 }} />
                    <Typography variant="body2">
                      Created: {formatDate(form.createdAt)}
                    </Typography>
                  </Box>

                  {form.updatedAt !== form.createdAt && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                      <DateIcon sx={{ fontSize: 16, mr: 1 }} />
                      <Typography variant="body2">
                        Updated: {formatDate(form.updatedAt)}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {totalFields} field{totalFields !== 1 ? 's' : ''} • {requiredFields} required
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                      {Object.entries(fieldTypes).map(([type, count]) => (
                        <Chip
                          key={type}
                          label={`${count} ${type}`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="small"
                    startIcon={<ViewIcon />}
                    onClick={() => handleViewForm(form)}
                    sx={{ mr: 1 }}
                  >
                    Preview
                  </Button>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditForm(form)}
                    color="secondary"
                  >
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {savedForms.length > 0 && (
        <Alert severity="info" sx={{ mt: 4 }}>
          <Typography variant="body2">
            <strong>Tip:</strong> Click "Preview" to see how your form appears to end users, or "Edit" to modify the form structure.
          </Typography>
        </Alert>
      )}
    </Box>
  );
};

export default MyForms;