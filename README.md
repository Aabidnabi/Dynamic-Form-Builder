# Dynamic Form Builder — upliance.ai Associate Software Developer Assignment

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## About upliance.ai

**upliance.ai** has built India's first AI cooking assistant designed especially for beginners — simplifying and automating all parts of cooking for yourself. We're on a mission to revolutionize home appliances in India by blending AI innovation with everyday utility.

As a disruptive startup collaborating closely with industry leaders like OpenAI, we push the boundaries of what smart appliances can do — fast and creatively.

---

## Project Overview

This project is a **Dynamic Form Builder** built using **React**, **TypeScript**, **MUI**, and **Redux**. It allows users to:

- Create fully customizable dynamic forms with various field types and validations.
- Preview forms exactly as an end user would experience them.
- Save multiple form configurations persistently in the browser using `localStorage`.
- Interact with derived fields calculated based on other fields.

---

## Live Demo

🎥 **Project Preview:**  
You can see the live demo here: [Your Live Link]  

Or watch the demonstration below:

![Form Builder Demo](./demo/form-builder-demo.gif)  
*Replace with your actual GIF or video preview.*

---

## Features

### 1. Form Builder (`/create`)

- Add fields: Text, Number, Email, Textarea, Select, Radio, Checkbox, Date.
- Configure fields:
  - Labels, Required toggle, Default values.
  - Validations: Required, min/max length, email format, custom password rules.
- Derived Fields:
  - Define formulas based on parent fields (e.g., calculate Age from DOB).
- Reorder and delete fields dynamically.
- Save form schema with a custom form name in `localStorage`.

### 2. Form Preview (`/preview`)

- Render the form for end-user interaction.
- Real-time validations with error messages.
- Auto-update derived fields as inputs change.

### 3. My Forms (`/myforms`)

- List all saved forms.
- Show form name and creation date.
- Navigate to preview on form selection.

---

## Tech Stack

- **React** with **TypeScript**  
- **Redux Toolkit** for predictable state management  
- **Material-UI (MUI)** for UI components  
- **localStorage** for data persistence  
- Form validation logic with custom rules and derived field computations

---

## How to Run Locally

```bash
git clone https://github.com/your-username/dynamic-form-builder.git
cd dynamic-form-builder
npm install
npm start
