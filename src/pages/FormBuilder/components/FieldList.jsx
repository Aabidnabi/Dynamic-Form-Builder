import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import {
  TextFields as TextIcon,
  Numbers as NumberIcon,
  Subject as TextareaIcon,
  ArrowDropDown as SelectIcon,
  RadioButtonChecked as RadioIcon,
  CheckBox as CheckboxIcon,
  DateRange as DateIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  Functions as FormulaIcon,
} from '@mui/icons-material';
import { deleteField } from '../../../redux/slices/formBuilderSlice';

const fieldIcons = {
  text: <TextIcon />,
  number: <NumberIcon />,
  textarea: <TextareaIcon />,
  select: <SelectIcon />,
  radio: <RadioIcon />,
  checkbox: <CheckboxIcon />,
  date: <DateIcon />,
};

const FieldList = ({ selectedFieldId, onSelectField }) => {
  const dispatch = useDispatch();
  const { fields } = useSelector((state) => state.formBuilder);

  const handleDeleteField = (fieldId, event) => {
    event.stopPropagation();
    dispatch(deleteField(fieldId));
    if (selectedFieldId === fieldId) {
      onSelectField(null);
    }
  };

  if (fields.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 4,
          color: 'text.secondary',
        }}
      >
        <Typography variant="body2">
          No fields added yet.<br />
          Add fields using the buttons above.
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ p: 0 }}>
      {fields.map((field, index) => (
        <ListItem
          key={field.id}
          disablePadding
          sx={{
            mb: 1,
            border: 1,
            borderColor: selectedFieldId === field.id ? 'primary.main' : 'divider',
            borderRadius: 1,
            backgroundColor: selectedFieldId === field.id ? 'primary.50' : 'transparent',
          }}
        >
          <ListItemButton
            onClick={() => onSelectField(field.id)}
            sx={{ py: 1 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <DragIcon sx={{ color: 'text.secondary', fontSize: '1rem' }} />
            </ListItemIcon>
            <ListItemIcon sx={{ minWidth: 36 }}>
              {fieldIcons[field.type]}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {field.label}
                  </Typography>
                  {field.required && (
                    <Chip label="Required" size="small" color="error" sx={{ height: 16, fontSize: '0.6rem' }} />
                  )}
                  {field.derivedFrom && (
                    <Chip
                      icon={<FormulaIcon sx={{ fontSize: '0.7rem' }} />}
                      label="Derived"
                      size="small"
                      color="secondary"
                      sx={{ height: 16, fontSize: '0.6rem' }}
                    />
                  )}
                </Box>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
                </Typography>
              }
            />
            <IconButton
              size="small"
              onClick={(e) => handleDeleteField(field.id, e)}
              sx={{ color: 'error.main' }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default FieldList;