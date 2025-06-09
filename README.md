# React Patient Appointment Manager Take-Home Assignment

## Task Instructions

Your task is to implement a functional Patient Appointment Manager component in React with TypeScript. We've provided a skeleton implementation in `src/module/task-manager.tsx` that includes the basic UI structure, but you need to implement the core functionality.

## Patient Appointment Manager Component Requirements

### Core Features:
1. Implement a Patient Appointment Manager application that allows doctors to:
   - Add a new patient appointment with a description (non-empty string)
   - Cancel an existing appointment
   - Mark appointments as completed after the patient has been seen
   - Categorize appointments by priority (High, Medium, Low)
   - Filter appointments by priority and completion status
2. Ensure the appointment list persists when appointments are added, canceled, or marked as completed
3. Display appointments in a list, showing their description, priority, and completion status
4. Include basic styling to make the UI clean and user-friendly
5. Handle edge cases like empty appointment descriptions gracefully

### Appointment Object Structure:
```typescript
interface Task {
  id: number;    // Unique identifier for the appointment
  title: string; // Appointment description (patient name, reason for visit, etc.)
  completed: boolean; // Whether the patient has been seen
  priority: "high" | "medium" | "low"; // Priority level of the appointment
}
```

### What's Already Set Up:
- Basic component structure with UI elements (input field, priority selector, add button, filter controls)
- CSS styling in `src/module/TaskManager.css`
- TypeScript interface for the Task object
- Component skeleton with TODO comments

### What You Need to Implement:
- State management for appointments, input fields, and filters
- Logic for adding new appointments with priority (with validation for empty descriptions)
  - **Important**: Use `Date.now()` to generate unique IDs for new appointments
- Logic for marking appointments as completed
- Logic for canceling appointments
- Logic for changing appointment priority after creation
- Logic for filtering appointments by priority and completion status

### Notes:
- Do NOT modify the import statements or the component name
- The provided CSS styling is sufficient, but you can enhance it if desired
- Your implementation will be tested against a suite of test cases
- Pay attention to the data-testid attributes in the template - these are used by the tests

## Setup and Running the Application

1.  **Navigate to Project Directory**:
    Open your terminal and ensure you are in the project root directory:
    ```bash
    cd /path/to/project/directory
    ```

2.  **Install Dependencies**:
    Install the necessary packages:
    ```bash
    bun install
    ```

3.  **Start the Development Server**:
    Once dependencies are installed, start the Vite development server:
    ```bash
    bun run dev
    ```

4.  **View the Application**:
    Open your web browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`). You should see the Patient Appointment Manager application.

5.  **Run Tests**:
    To verify your implementation against the test cases:
    ```bash
    bun run test
    ```

## Evaluation Criteria

Your submission will be evaluated based on:
1. **Functionality**: Does it meet all the requirements?
2. **Code Quality**: Is the code clean, well-organized, and maintainable?
3. **TypeScript Usage**: Are types properly defined and used?
4. **Error Handling**: Are edge cases handled appropriately?
5. **UI/UX**: Is the interface intuitive and responsive?
6. **Test Coverage**: Does your implementation pass all the test cases?
7. **Feature Completeness**: Have you implemented all the required features, including priority management and filtering?

## Required data-testid Attributes

Your implementation must include the following data-testid attributes for testing:

- `task-input`: The input field for appointment description
- `priority-select`: The priority selector dropdown
- `add-task-button`: The button to add a new appointment
- `filter-priority`: The dropdown to filter by priority
- `filter-status`: The dropdown to filter by completion status
- `task-list`: The list container for appointments
- `task-item-{id}`: The list item for each appointment (where {id} is the appointment ID)
- `task-checkbox-{id}`: The checkbox to mark an appointment as completed
- `task-title-{id}`: The text element displaying the appointment description
- `task-priority-{id}`: The element displaying the appointment priority
- `task-priority-selector-{id}`: The dropdown to change an appointment's priority
- `delete-button-{id}`: The button to cancel an appointment

## Submission
Please submit your completed `src/module/task-manager.tsx` file by the deadline. If you've made any changes to the CSS file (`src/module/TaskManager.css`), please include that as well.
