import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Button, Box } from '@mui/material';
import {
  TextFields as TextIcon,
  Numbers as NumberIcon,
  Subject as TextareaIcon,
  ArrowDropDown as SelectIcon,
  RadioButtonChecked as RadioIcon,
  CheckBox as CheckboxIcon,
  DateRange as DateIcon,
} from '@mui/icons-material';
import { addField } from '../../../redux/slices/formBuilderSlice';

const fieldTypes = [
  { type: 'text', label: 'Text', icon: <TextIcon />, color: '#1976d2' },
  { type: 'number', label: 'Number', icon: <NumberIcon />, color: '#388e3c' },
  { type: 'textarea', label: 'Textarea', icon: <TextareaIcon />, color: '#f57c00' },
  { type: 'select', label: 'Select', icon: <SelectIcon />, color: '#7b1fa2' },
  { type: 'radio', label: 'Radio', icon: <RadioIcon />, color: '#d32f2f' },
  { type: 'checkbox', label: 'Checkbox', icon: <CheckboxIcon />, color: '#0288d1' },
  { type: 'date', label: 'Date', icon: <DateIcon />, color: '#5d4037' },
];

const FieldTypeSelector = () => {
  const dispatch = useDispatch();

  const handleAddField = (type) => {
    dispatch(addField({ type }));
  };

  return (
    <Grid container spacing={1}>
      {fieldTypes.map((fieldType) => (
        <Grid item xs={6} key={fieldType.type}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleAddField(fieldType.type)}
            sx={{
              py: 1.5,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
              borderColor: fieldType.color,
              color: fieldType.color,
              '&:hover': {
                borderColor: fieldType.color,
                backgroundColor: `${fieldType.color}10`,
              },
            }}
          >
            <Box sx={{ fontSize: '1.2rem' }}>
              {fieldType.icon}
            </Box>
            <Box sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
              {fieldType.label}
            </Box>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default FieldTypeSelector;