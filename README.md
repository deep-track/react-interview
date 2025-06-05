# React Task Manager Take-Home Assignment

## Task Instructions

Your task is to implement a functional Task Manager component in React with TypeScript. We've provided a skeleton implementation in `src/module/task-manager.tsx` that includes the basic UI structure, but you need to implement the core functionality.

## Task Manager Component Requirements

### Core Features:
1. Implement a Task Manager application that allows users to:
   - Add a new task with a title (non-empty string)
   - Delete an existing task
   - Toggle a task's completion status (mark as completed or not completed)
2. Ensure the task list persists when tasks are added, deleted, or toggled
3. Display tasks in a list, showing their title and completion status
4. Include basic styling to make the UI clean and user-friendly
5. Handle edge cases like empty task titles gracefully (prevent adding empty tasks)

### Task Object Structure:
```typescript
interface Task {
  id: number;    // Unique identifier for the task
  title: string; // Task description
  completed: boolean; // Completion status
}
```

### What's Already Set Up:
- Basic component structure with UI elements (input field, add button, task list)
- CSS styling in `src/module/TaskManager.css`
- TypeScript interface for the Task object
- State hooks for managing tasks and input field

### What You Need to Implement:
- Logic for adding new tasks (with validation for empty tasks)
- Logic for toggling task completion status
- Logic for deleting tasks
- Persistence of the task list

### Notes:
- Do NOT modify the import statements or the component name
- The provided CSS styling is sufficient, but you can enhance it if desired
- Your implementation will be tested against a suite of test cases

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
    Open your web browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`). You should see the Task Manager application.

5.  **Run Tests** (Optional):
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

## Submission
Please submit your completed `src/module/task-manager.tsx` file by tomorrow. If you've made any changes to the CSS file (`src/module/TaskManager.css`), please include that as well.
