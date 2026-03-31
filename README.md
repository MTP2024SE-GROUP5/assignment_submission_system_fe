# Assignment Submission System

A digital platform designed to streamline the academic workflow, connecting students and teachers through a clean, efficient, and localized workspace.

## Features

- **Multi-Role Support**: Dedicated dashboards tailored for students and teachers.
- **Workspace Management**: Manage courses, enrollments, statuses, and student members.
- **Assignment Handling**: Create, draft, submit, grade, and review academic assignments.
- **Academic Calendar**: Real-time interfaces to track approaching deadlines.
- **Full Internationalization (i18n)**: Comprehensive multi-language UI support.

## Localization (i18n) Framework Documentation

This project uses **[react-i18next](https://react.i18next.com/)** (the official React binding for `i18next`) as its localization framework. It allows dynamically switching UI text representations without tearing down the React component tree.

### Core Architecture
- **Framework & Tooling**: `react-i18next` combined with `i18next-browser-languagedetector` for intelligent language fallback and user-preference detection.
- **Namespaces**: Translation dictionaries are broken down into logical modules to optimize loading and prevent key collisions:
  - `common`: Global UI boundaries, navigation menus, badges, and shared system statuses.
  - `dashboard`: Business-logic heavy views such as dashboards, course specifics, grading modals, and tables.
  - `settings`: Application configuration elements.
  - `auth`: Authentication layout screens (Login, Signup, User sessions).
- **Directory Structure**: Actual translation entries are maintained as static JSON files mapped inside `src/locales/{locale}/{namespace}.json`.

### Currently Supported Locales
- English (US) — `en-US`
- Simplified Chinese (简体中文) — `zh-CN`
- Japanese (日本語) — `ja-JP`

---

## Running the Application

### 1. Setup & Installation

Ensure you have your environment set up with Node.js. Install all project dependencies by running:

```bash
npm install
```

### 2. Launching the App

Start the core development server:

```bash
npm start
```

*(Note: Depending on your package scripts, you can also build or preview the application natively following Electron/Vite commands if applicable.)*

### 3. Selecting the Language

By default, the application will initialize and match your system language if it is within the supported locales (otherwise, it will default safely). 

To manually change the language inside the running application:
1. Open the **Sidebar Navigation Panel** from the main dashboard.
2. Navigate to **Settings** (⚙️).
3. Under the **Appearance** section, locate the **Language Switcher**.
4. Use the custom slider or dropdown to select your language of choice (e.g., `English`, `简体中文`, or `日本語`).
5. **Real-time Change:** The application's UI strings, table headers, validation errors, and statuses will swap out instantly—no manual page refresh is required!

## Extension & Contribution
To add a new language or modify an existing translation:
1. Navigate to the relevant module dictionary in `src/locales/<language>/<namespace>.json`.
2. Add the corresponding key-value pair.
3. Reference it in code using the built-in translation hooks (`const { t } = useTranslation('namespace')`).
