# Dynamic Form Builder  
*Associate Software Developer Assignment — upliance.ai*

---

## About upliance.ai

**upliance.ai** is pioneering India's first AI-powered cooking assistant, specially designed to simplify and automate cooking for beginners. Our mission is to revolutionize home appliances by integrating cutting-edge AI technology to enhance everyday cooking experiences for young India.

As an innovative startup collaborating with industry leaders such as OpenAI, we are committed to pushing the boundaries of smart appliance capabilities with speed and precision.

---

## Project Summary

This repository contains a **Dynamic Form Builder** application developed using **React**, **TypeScript**, **Material-UI (MUI)**, and **Redux Toolkit**. The application enables users to:

- Create fully customizable dynamic forms with multiple field types and complex validation rules.
- Preview the form as it would appear to an end user, including real-time validation feedback.
- Save and manage multiple form configurations persistently using browser `localStorage`.
- Implement derived fields that calculate values based on other field inputs.

---

## Live Demonstration

A live deployment of the application is available at: [https://dynamic-form-builder-ivory.vercel.app/]

## Key Features

### Form Builder (`/create`)

- Support for multiple input field types: Text, Number, Email, Textarea, Select, Radio, Checkbox, and Date.
- Field configuration options include:
  - Custom labels, required toggles, and default values.
  - Validation rules such as mandatory inputs, length restrictions, email format verification, and custom password policies.
- Support for **Derived Fields**:
  - Define fields whose values are computed based on one or more parent fields.
  - Provide custom formulas or logic (e.g., calculating Age from Date of Birth).
- Intuitive interface to reorder or remove fields.
- Ability to save form schemas by specifying a form name; all data is stored in `localStorage` without backend dependencies.

### Form Preview (`/preview`)

- Interactive rendering of the constructed form.
- Real-time input validation with user-friendly error messages.
- Automatic updating of derived fields based on parent field changes.

### My Forms (`/myforms`)

- Displays a comprehensive list of all saved forms.
- Shows form metadata including name and creation date.
- Enables quick access to form previews.

---

## Technology Stack

- **React** (with **TypeScript**) for robust frontend development.
- **Redux Toolkit** for scalable and maintainable state management.
- **Material-UI (MUI)** for consistent, accessible UI components.
- **Browser localStorage** for persistent form schema storage.

---

## Setup and Installation

To run the project locally:

```bash
git clone https://github.com/your-username/dynamic-form-builder.git
cd dynamic-form-builder
npm install
npm start
