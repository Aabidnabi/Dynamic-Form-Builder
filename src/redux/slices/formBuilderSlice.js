import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  fields: [],
  formName: '',
  isFormValid: false,
};

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    addField: (state, action) => {
      const newField = {
        id: uuidv4(),
        type: action.payload.type,
        label: `${action.payload.type.charAt(0).toUpperCase() + action.payload.type.slice(1)} Field`,
        required: false,
        defaultValue: '',
        validation: {},
        options: action.payload.type === 'select' || action.payload.type === 'radio' ? ['Option 1'] : [],
        derivedFrom: null,
        formula: '',
      };
      state.fields.push(newField);
    },
    
    updateField: (state, action) => {
      const { id, updates } = action.payload;
      const fieldIndex = state.fields.findIndex(field => field.id === id);
      if (fieldIndex !== -1) {
        state.fields[fieldIndex] = { ...state.fields[fieldIndex], ...updates };
      }
    },
    
    deleteField: (state, action) => {
      state.fields = state.fields.filter(field => field.id !== action.payload);
      // Remove any derived fields that depend on the deleted field
      state.fields = state.fields.map(field => {
        if (field.derivedFrom === action.payload) {
          return { ...field, derivedFrom: null, formula: '' };
        }
        return field;
      });
    },
    
    reorderFields: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedField = state.fields[dragIndex];
      state.fields.splice(dragIndex, 1);
      state.fields.splice(hoverIndex, 0, draggedField);
    },
    
    setFormName: (state, action) => {
      state.formName = action.payload;
    },
    
    clearForm: (state) => {
      state.fields = [];
      state.formName = '';
      state.isFormValid = false;
    },
    
    loadForm: (state, action) => {
      state.fields = action.payload.fields || [];
      state.formName = action.payload.name || '';
    },
    
    setFormValid: (state, action) => {
      state.isFormValid = action.payload;
    },
  },
});

export const {
  addField,
  updateField,
  deleteField,
  reorderFields,
  setFormName,
  clearForm,
  loadForm,
  setFormValid,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;