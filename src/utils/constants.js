/**
 * Application constants
 */

export const FIELD_TYPES = {
  TEXT: 'text',
  NUMBER: 'number',
  TEXTAREA: 'textarea',
  SELECT: 'select',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  DATE: 'date'
};

export const FIELD_TYPE_LABELS = {
  [FIELD_TYPES.TEXT]: 'Text',
  [FIELD_TYPES.NUMBER]: 'Number',
  [FIELD_TYPES.TEXTAREA]: 'Textarea',
  [FIELD_TYPES.SELECT]: 'Select',
  [FIELD_TYPES.RADIO]: 'Radio',
  [FIELD_TYPES.CHECKBOX]: 'Checkbox',
  [FIELD_TYPES.DATE]: 'Date'
};

export const FIELD_TYPE_COLORS = {
  [FIELD_TYPES.TEXT]: '#1976d2',
  [FIELD_TYPES.NUMBER]: '#388e3c',
  [FIELD_TYPES.TEXTAREA]: '#f57c00',
  [FIELD_TYPES.SELECT]: '#7b1fa2',
  [FIELD_TYPES.RADIO]: '#d32f2f',
  [FIELD_TYPES.CHECKBOX]: '#0288d1',
  [FIELD_TYPES.DATE]: '#5d4037'
};

export const VALIDATION_RULES = {
  REQUIRED: 'required',
  MIN_LENGTH: 'minLength',
  MAX_LENGTH: 'maxLength',
  EMAIL: 'email',
  PASSWORD: 'password',
  MIN_VALUE: 'min',
  MAX_VALUE: 'max'
};

export const LOCAL_STORAGE_KEYS = {
  SAVED_FORMS: 'savedForms'
};

export const ROUTES = {
  CREATE: '/create',
  PREVIEW: '/preview',
  MY_FORMS: '/myforms'
};

export const DEFAULT_FIELD_CONFIG = {
  [FIELD_TYPES.TEXT]: {
    label: 'Text Field',
    required: false,
    defaultValue: '',
    validation: {}
  },
  [FIELD_TYPES.NUMBER]: {
    label: 'Number Field',
    required: false,
    defaultValue: '',
    validation: {}
  },
  [FIELD_TYPES.TEXTAREA]: {
    label: 'Textarea Field',
    required: false,
    defaultValue: '',
    validation: {}
  },
  [FIELD_TYPES.SELECT]: {
    label: 'Select Field',
    required: false,
    defaultValue: '',
    validation: {},
    options: ['Option 1']
  },
  [FIELD_TYPES.RADIO]: {
    label: 'Radio Field',
    required: false,
    defaultValue: '',
    validation: {},
    options: ['Option 1']
  },
  [FIELD_TYPES.CHECKBOX]: {
    label: 'Checkbox Field',
    required: false,
    defaultValue: false,
    validation: {}
  },
  [FIELD_TYPES.DATE]: {
    label: 'Date Field',
    required: false,
    defaultValue: '',
    validation: {}
  }
};