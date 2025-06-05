import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskManager from '../module/task-manager';

// Helper function to add a task
const addTask = (taskText: string) => {
  const inputElement = screen.getByTestId('task-input');
  const addButton = screen.getByTestId('add-task-button');

  fireEvent.change(inputElement, { target: { value: taskText } });
  fireEvent.click(addButton);
};

describe('TaskManager Component - Secret Tests', () => {
  beforeEach(() => {
    render(<TaskManager />);
  });

  it('should render the TaskManager component with an input field and an add button', () => {
    expect(screen.getByTestId('task-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-task-button')).toBeInTheDocument();
  });

  it('should allow adding a new task and display it in the list', () => {
    addTask('New Test Task 1');
    expect(screen.getByTestId('task-title-1')).toBeInTheDocument(); // Assumes first task gets ID 1
  });

  it('should not add an empty task', () => {
    addTask('');
    // Assuming tasks are rendered in a list or a specific container
    // This query might need adjustment based on how empty states or tasks are rendered
    const taskList = screen.getByTestId('task-list'); // List should always exist
    // After attempting to add an empty task, no new task item should be in the list.
    expect(taskList.querySelector('[data-testid^="task-item-"]')).not.toBeInTheDocument();
    // If there's a specific message for empty tasks, test for that instead
    // expect(screen.queryByText(/task cannot be empty/i)).not.toBeInTheDocument(); // or .toBeInTheDocument() if an error is shown
  });

  it('should allow toggling a task completion status', () => {
    addTask('Task to Toggle');
    const taskTextElement = screen.getByTestId('task-title-1');
    // Find the checkbox associated with the task. This assumes a certain structure.
    // You might need to adjust the selector based on your actual HTML structure.
    // For example, if the checkbox is a sibling or parent/child of the task text.
    const checkbox = screen.getByTestId('task-checkbox-1');

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    // Optionally, check for visual indication like line-through style
    expect(taskTextElement).toHaveStyle('text-decoration: line-through');

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(taskTextElement).not.toHaveStyle('text-decoration: line-through');
  });

  it('should allow deleting a task', () => {
    addTask('Task to Delete');
    expect(screen.getByTestId('task-title-1')).toBeInTheDocument();

    // Find the delete button associated with the task.
    // This selector might need adjustment.
    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);

    expect(screen.queryByTestId('task-item-1')).not.toBeInTheDocument();
  });

  it('should persist tasks after multiple additions and deletions', () => {
    addTask('Persistent Task 1');
    addTask('Task To Be Deleted');
    addTask('Persistent Task 2');

    expect(screen.getByTestId('task-title-1')).toBeInTheDocument();
    expect(screen.getByTestId('task-title-2')).toBeInTheDocument();
    expect(screen.getByTestId('task-title-3')).toBeInTheDocument();

    // Delete the middle task
    // This requires a more specific way to target the delete button for "Task To Be Deleted"
    // For example, if each task item has a unique test-id or the delete button is a child
    const deleteButton = screen.getByTestId('delete-button-2'); // Assumes the button is directly selectable
    
    fireEvent.click(deleteButton);


    expect(screen.queryByTestId('task-item-2')).not.toBeInTheDocument();
    expect(screen.getByTestId('task-title-1')).toBeInTheDocument();
    expect(screen.getByTestId('task-title-3')).toBeInTheDocument();
  });

  it('should handle multiple tasks with unique IDs and toggle/delete them correctly', () => {
    addTask('Unique Task A');
    addTask('Unique Task B');
    addTask('Unique Task C');

    // Toggle Task B
    const taskBCheckbox = screen.getByTestId('task-checkbox-2');
    fireEvent.click(taskBCheckbox);
    expect(taskBCheckbox).toBeChecked();
    expect(screen.getByTestId('task-title-2')).toHaveStyle('text-decoration: line-through');

    // Delete Task A
    const taskADeleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(taskADeleteButton);
    expect(screen.queryByTestId('task-item-1')).not.toBeInTheDocument();

    // Ensure Task B (toggled) and Task C (untouched) are still there
    expect(screen.getByTestId('task-title-2')).toBeInTheDocument();
    expect(screen.getByTestId('task-title-3')).toBeInTheDocument();
    expect(screen.getByTestId('task-checkbox-3')).not.toBeChecked();
  });
});
