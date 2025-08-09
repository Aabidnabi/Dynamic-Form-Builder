import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedForms: [],
  currentForm: null,
};

const getSavedFormsFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('savedForms');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading saved forms:', error);
    return [];
  }
};

const formsSlice = createSlice({
  name: 'forms',
  initialState: {
    ...initialState,
    savedForms: getSavedFormsFromLocalStorage(),
  },
  reducers: {
    saveForm: (state, action) => {
      const { name, fields } = action.payload;
      const newForm = {
        id: Date.now().toString(),
        name,
        fields,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const existingIndex = state.savedForms.findIndex(form => form.name === name);
      if (existingIndex !== -1) {
        state.savedForms[existingIndex] = {
          ...state.savedForms[existingIndex],
          fields,
          updatedAt: new Date().toISOString(),
        };
      } else {
        state.savedForms.push(newForm);
      }

      localStorage.setItem('savedForms', JSON.stringify(state.savedForms));
    },

    deleteForm: (state, action) => {
      state.savedForms = state.savedForms.filter(form => form.id !== action.payload);
      localStorage.setItem('savedForms', JSON.stringify(state.savedForms));
    },

    setCurrentForm: (state, action) => {
      state.currentForm = action.payload;
    },

    loadSavedForms: (state) => {
      state.savedForms = getSavedFormsFromLocalStorage();
    },
  },
});

export const { saveForm, deleteForm, setCurrentForm, loadSavedForms } = formsSlice.actions;
export default formsSlice.reducer;
