## Sprint 02 - Cash Flow Tracker

### 1. Understanding the Sprint

Prompt:

"First let us understand what they are saying. Can you explain the sprint requirements to me in simple terms and tell me what exactly they expect from each phase?"

Purpose:

Before starting development, I wanted to understand the complete requirement instead of directly jumping into coding.

---

### 2. Breaking Down Phase 1

Prompt:

"Let us go one by one. First let us see phase by phase and understand what they want and how we need to do it."

Purpose:

I wanted to break the project into smaller tasks and understand the logic flow before implementation.

---

### 3. Planning the Project Structure

Prompt:

"Let's start coding. First let us create the file structure."

Purpose:

Created the basic project structure and organized files before implementation.

---

### 4. Building Phase 1

Prompt:

"Ok now let's start coding for Phase 1."

Purpose:

Implemented:

* Form inputs
* Salary tracking
* Expense tracking
* Remaining balance calculation
* Validation logic

---

### 5. Understanding Phase 2

Prompt:

"Let's move to Phase 2."

Purpose:

Analyzed LocalStorage, delete functionality, and Chart.js requirements before implementation.

---

### 6. Implementing LocalStorage

Prompt:

"Can you explain how LocalStorage should work in this project and how we should save and retrieve the data?"

Purpose:

Learned:

* JSON.stringify()
* JSON.parse()
* Saving application state
* Loading saved state on refresh

---

### 7. Implementing Delete Functionality

Prompt:

"How should we implement delete functionality so that it removes the expense from the UI, updates LocalStorage, and recalculates the balance?"

Purpose:

Implemented:

* Delete buttons
* Event delegation
* State updates
* Re-rendering logic

---

### 8. Adding Data Visualization

Prompt:

"Help me implement the Chart.js pie chart and explain how it should update when expenses are added or removed."

Purpose:

Implemented:

* Chart.js integration
* Dynamic chart rendering
* Chart updates on state changes

Issue Faced:

Chart duplication during updates.

Resolution:

Learned to destroy the previous chart instance before rendering a new one.

---

### 9. Reviewing the Full JavaScript

Prompt:

"Can you give me all the JavaScript code from Phase 1 until now?"

Purpose:

Combined all completed features into a single organized script.

---

### 10. Understanding Phase 3

Prompt:

"Ok now let's do Phase 3."

Purpose:

Analyzed:

* PDF generation
* Currency conversion
* Threshold alerts

before implementation.

---

### 11. PDF Export

Prompt:

"How can we generate a downloadable report using jsPDF?"

Purpose:

Implemented:

* PDF generation
* Salary summary
* Expense summary
* Balance summary

---

### 12. Exporting the Pie Chart

Prompt:

"I cannot download the pie chart."

Purpose:

Investigated why the chart was not included in the PDF.

Solution:

Converted the Chart.js canvas into an image and embedded it inside the generated PDF.

---

### 13. Currency Conversion

Prompt:

"The currency conversion is not working properly."

Purpose:

Debugged currency conversion implementation.

Learned:

* Original values should remain stored in INR.
* Conversion should happen only during rendering.

---

### 14. Supporting Multiple Currencies

Prompt:

"It should change from INR to any currency type, not only USD."

Purpose:

Extended functionality to support multiple currencies through API integration.

Implemented:

* Dynamic currency selection
* Exchange rate fetching
* Currency formatting

---

### 15. Updating Existing Code

Prompt:

"Can you update this in my existing JavaScript code?"

Purpose:

Integrated the improved currency conversion logic directly into the existing project without rewriting the entire application.

---

### 16. Currency Icon Issue

Prompt:

"The currency icon is coming twice."

Purpose:

Debugged UI formatting issue.

Root Cause:

Currency symbols were being rendered both in HTML and JavaScript.

Solution:

Removed hardcoded symbols from HTML and handled formatting through JavaScript.

---

### 17. Currency Accuracy Investigation

Prompt:

"The conversion rates are not from real time."

Purpose:

Investigated API behavior and explored alternative exchange-rate APIs.

Learned:

* Different APIs provide different update frequencies.
* Free APIs may not provide live market rates.

---

### 18. UI Improvements

Prompt:

"Let us update the UI of the CSS."

Purpose:

Improved the overall look and feel of the application.

Implemented:

* Modern dashboard styling
* Responsive layout
* Summary cards
* Improved form styling
* Better expense list presentation

---

### 19. Final Review

Prompt:

"Can you review the complete project and identify any improvements before submission?"

Purpose:

Performed a final review of:

* Validation
* State management
* LocalStorage
* Chart rendering
* PDF export
* Currency conversion
* Responsive design

Outcome:

Successfully completed the Cash Flow Tracker using Vanilla JavaScript while implementing DOM Manipulation, Event Handling, State Management, LocalStorage Persistence, Chart.js Visualization, Currency Conversion APIs, PDF Exporting, and Responsive UI Design.
