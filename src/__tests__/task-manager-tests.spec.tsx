import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskManager from '../module/task-manager';

// Helper function to add an appointment with priority
const addAppointment = (appointmentText: string, priority: string = 'medium') => {
  const inputElement = screen.getByTestId('task-input');
  const addButton = screen.getByTestId('add-task-button');
  
  // Set the appointment text
  fireEvent.change(inputElement, { target: { value: appointmentText } });
  
  // Select the priority
  const prioritySelect = screen.getByTestId('priority-select');
  fireEvent.click(prioritySelect);
  const priorityOption = screen.getByRole('option', { name: `${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority` });
  fireEvent.click(priorityOption);
  
  // Click the add button
  fireEvent.click(addButton);
};

describe('Patient Appointment Manager Component - Tests', () => {
  beforeEach(() => {
    render(<TaskManager />);
  });

  it('should render the Patient Appointment Manager component with an input field, priority selector, and a schedule button', () => {
    expect(screen.getByTestId('task-input')).toBeInTheDocument();
    expect(screen.getByTestId('priority-select')).toBeInTheDocument();
    expect(screen.getByTestId('add-task-button')).toBeInTheDocument();
  });

  it('should allow scheduling a new appointment and display it in the list', () => {
    addAppointment('John Doe - Annual Checkup');
    expect(screen.getByText('John Doe - Annual Checkup')).toBeInTheDocument();
  });

  it('should not add an empty appointment', () => {
    addAppointment('');
    // Assuming appointments are rendered in a list or a specific container
    const taskList = screen.getByTestId('task-list'); // List should always exist
    // After attempting to add an empty appointment, no new appointment item should be in the list
    expect(taskList.querySelector('[data-testid^="task-item-"]')).not.toBeInTheDocument();
    // If there's a specific message for empty appointments, test for that instead
    // expect(screen.queryByText(/appointment description cannot be empty/i)).not.toBeInTheDocument();
  });

  it('should allow marking an appointment as completed (patient seen)', () => {
    addAppointment('Sarah Johnson - Follow-up');
    
    // Find the appointment's checkbox by its title
    const appointmentLabel = screen.getByText('Sarah Johnson - Follow-up');
    const appointmentId = appointmentLabel.getAttribute('for')?.split('-').pop();
    
    // Get the checkbox for the appointment
    const checkbox = screen.getByTestId(`task-checkbox-${appointmentId}`);
    
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    
    // Check for visual indication like line-through style
    expect(appointmentLabel).toHaveClass('line-through');
  });
  
  it('should toggle appointment completion status', () => {
    // Add an appointment with a distinct name
    addAppointment('TOGGLE_TEST: Patient Checkup');
    
    // Find the appointment's checkbox by its title
    const appointmentLabel = screen.getByText('TOGGLE_TEST: Patient Checkup');
    const appointmentId = appointmentLabel.getAttribute('for')?.split('-').pop();
    
    // Get the checkbox for the appointment
    const checkbox = screen.getByTestId(`task-checkbox-${appointmentId}`);
    
    // Initial state should be unchecked (not completed)
    expect(checkbox).not.toBeChecked();
    
    // Toggle completion status by clicking the checkbox
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    
    // Toggle again to mark as not completed
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('should allow canceling an appointment', () => {
    addAppointment('Michael Brown - Prescription Renewal');
    expect(screen.getByText('Michael Brown - Prescription Renewal')).toBeInTheDocument();

    // Find the appointment label and extract ID to locate the cancel button
    const appointmentLabel = screen.getByText('Michael Brown - Prescription Renewal');
    const appointmentId = appointmentLabel.getAttribute('for')?.split('-').pop();
    
    // Find the cancel button associated with the appointment
    const cancelButton = screen.getByTestId(`delete-button-${appointmentId}`);
    fireEvent.click(cancelButton);

    expect(screen.queryByText('Michael Brown - Prescription Renewal')).not.toBeInTheDocument();
  });

  it('should persist appointments after multiple additions and cancellations', () => {
    addAppointment('Emma Wilson - Annual Physical');
    addAppointment('James Miller - To Be Canceled');
    addAppointment('Olivia Davis - Blood Test');

    expect(screen.getByText('Emma Wilson - Annual Physical')).toBeInTheDocument();
    expect(screen.getByText('James Miller - To Be Canceled')).toBeInTheDocument();
    expect(screen.getByText('Olivia Davis - Blood Test')).toBeInTheDocument();

    // Find the appointment label to be canceled and extract its ID
    const appointmentToCancel = screen.getByText('James Miller - To Be Canceled');
    const appointmentId = appointmentToCancel.getAttribute('for')?.split('-').pop();
    
    // Cancel the middle appointment
    const cancelButton = screen.getByTestId(`delete-button-${appointmentId}`);
    fireEvent.click(cancelButton);

    // Check that the canceled appointment is gone and others remain
    expect(screen.queryByText('James Miller - To Be Canceled')).not.toBeInTheDocument();
    expect(screen.getByText('Emma Wilson - Annual Physical')).toBeInTheDocument();
    expect(screen.getByText('Olivia Davis - Blood Test')).toBeInTheDocument();
  });

  it('should handle multiple appointments with unique IDs and mark/cancel them correctly', () => {
    addAppointment('Robert Taylor - Vaccination');
    addAppointment('Sophia Martinez - Consultation');
    addAppointment('William Anderson - X-Ray Results');

    // Mark Sophia's appointment as completed
    const sophiaAppointment = screen.getByText('Sophia Martinez - Consultation');
    const sophiaId = sophiaAppointment.getAttribute('for')?.split('-').pop();
    const sophiaCheckbox = screen.getByTestId(`task-checkbox-${sophiaId}`);
    
    fireEvent.click(sophiaCheckbox);
    expect(sophiaCheckbox).toBeChecked();
    expect(sophiaAppointment).toHaveClass('line-through');

    // Cancel Robert's appointment
    const robertAppointment = screen.getByText('Robert Taylor - Vaccination');
    const robertId = robertAppointment.getAttribute('for')?.split('-').pop();
    const robertDeleteButton = screen.getByTestId(`delete-button-${robertId}`);
    
    fireEvent.click(robertDeleteButton);
    expect(screen.queryByText('Robert Taylor - Vaccination')).not.toBeInTheDocument();

    // Ensure Sophia's appointment (marked as completed) and William's appointment (untouched) are still there
    expect(screen.getByText('Sophia Martinez - Consultation')).toBeInTheDocument();
    expect(screen.getByText('William Anderson - X-Ray Results')).toBeInTheDocument();
    
    // Check William's appointment is still unchecked
    const williamAppointment = screen.getByText('William Anderson - X-Ray Results');
    const williamId = williamAppointment.getAttribute('for')?.split('-').pop();
    const williamCheckbox = screen.getByTestId(`task-checkbox-${williamId}`);
    expect(williamCheckbox).not.toBeChecked();
  });
  
  it('should allow setting and displaying appointment priorities', () => {
    // Add appointments with different priorities and distinct names
    addAppointment('HIGH_TEST: Emergency Surgery - Dr. Smith', 'high');
    addAppointment('MEDIUM_TEST: Regular Checkup - Dr. Johnson', 'medium');
    addAppointment('LOW_TEST: Prescription Refill - Dr. Williams', 'low');
    
    // Find each appointment and check its associated badge content
    const highAppointment = screen.getByText(/HIGH_TEST:/);
    const highPriorityId = highAppointment.getAttribute('for')?.split('-').pop();
    expect(screen.getByTestId(`task-priority-${highPriorityId}`)).toHaveTextContent('High');
    
    const mediumAppointment = screen.getByText(/MEDIUM_TEST:/);
    const mediumPriorityId = mediumAppointment.getAttribute('for')?.split('-').pop();
    expect(screen.getByTestId(`task-priority-${mediumPriorityId}`)).toHaveTextContent('Medium');
    
    const lowAppointment = screen.getByText(/LOW_TEST:/);
    const lowPriorityId = lowAppointment.getAttribute('for')?.split('-').pop();
    expect(screen.getByTestId(`task-priority-${lowPriorityId}`)).toHaveTextContent('Low');
  });
  
  it('should allow changing the priority of an existing appointment', () => {
    addAppointment('PRIORITY_CHANGE: Follow-up Visit - Dr. Brown', 'medium');
    
    // Find the appointment by text
    const appointment = screen.getByText(/PRIORITY_CHANGE:/);
    const appointmentId = appointment.getAttribute('for')?.split('-').pop();
    
    // Find and click the priority selector for the appointment
    const prioritySelector = screen.getByTestId(`task-priority-selector-${appointmentId}`);
    fireEvent.click(prioritySelector);
    
    // Select high priority
    const highPriorityOption = screen.getByRole('option', { name: 'High' });
    fireEvent.click(highPriorityOption);
    
    // Check that the priority was updated
    expect(screen.getByTestId(`task-priority-${appointmentId}`)).toHaveTextContent('High');
  });
  
  it('should filter appointments by priority', () => {
    // Add appointments with different priorities and distinct names
    addAppointment('HIGH_PRIORITY: Emergency Surgery - Dr. Smith', 'high');
    addAppointment('MEDIUM_PRIORITY: Regular Checkup - Dr. Johnson', 'medium');
    addAppointment('LOW_PRIORITY: Prescription Refill - Dr. Williams', 'low');
    
    // Filter by high priority
    const priorityFilter = screen.getByTestId('filter-priority');
    fireEvent.click(priorityFilter);
    const highPriorityOption = screen.getByRole('option', { name: /High Priority/i });
    fireEvent.click(highPriorityOption);
    
    // Check that only high priority appointments are shown
    expect(screen.getByText(/HIGH_PRIORITY:/)).toBeInTheDocument(); // High priority
    expect(screen.queryByText(/MEDIUM_PRIORITY:/)).not.toBeInTheDocument(); // Medium priority
    expect(screen.queryByText(/LOW_PRIORITY:/)).not.toBeInTheDocument(); // Low priority
  });
  
  it('should filter appointments by completion status', () => {
    // Add three appointments with distinct names
    addAppointment('FIRST: Test appointment');
    addAppointment('SECOND: Test appointment');
    addAppointment('THIRD: Test appointment');
    
    // Find the first appointment's checkbox by its title
    const firstAppointmentLabel = screen.getByText(/FIRST: Test appointment/);
    const firstAppointmentId = firstAppointmentLabel.getAttribute('for')?.split('-').pop();
    
    // Mark the first appointment as completed
    const checkbox = screen.getByTestId(`task-checkbox-${firstAppointmentId}`);
    fireEvent.click(checkbox);
    
    // Filter by completion status
    const statusFilter = screen.getByTestId('filter-status');
    fireEvent.click(statusFilter);
    const completedOption = screen.getByRole('option', { name: /Completed/i });
    fireEvent.click(completedOption);
    
    // Check that only the completed appointment is shown
    expect(screen.getByText(/FIRST: Test appointment/)).toBeInTheDocument();
    expect(screen.queryByText(/SECOND: Test appointment/)).not.toBeInTheDocument();
    expect(screen.queryByText(/THIRD: Test appointment/)).not.toBeInTheDocument();
    
    // Change filter to active
    fireEvent.click(statusFilter);
    const activeOption = screen.getByRole('option', { name: /Active/i });
    fireEvent.click(activeOption);
    
    // Check that only non-completed appointments are shown
    expect(screen.queryByText(/FIRST: Test appointment/)).not.toBeInTheDocument();
    expect(screen.getByText(/SECOND: Test appointment/)).toBeInTheDocument();
    expect(screen.getByText(/THIRD: Test appointment/)).toBeInTheDocument();
  });
  
  it('should combine priority and status filters', () => {
    // Add appointments with different priorities and distinct names
    addAppointment('HIGH_PRIORITY: Emergency Surgery - Dr. Smith', 'high');
    addAppointment('MEDIUM_PRIORITY: Regular Checkup - Dr. Johnson', 'medium');
    addAppointment('LOW_PRIORITY: Prescription Refill - Dr. Williams', 'low');
    
    // Find and mark the medium priority appointment as completed
    // Find by text content instead of assuming the ID
    const mediumAppointmentLabel = screen.getByText(/MEDIUM_PRIORITY:.*/);
    const mediumAppointmentId = mediumAppointmentLabel.getAttribute('for')?.split('-').pop(); // Extract ID from for attribute
    
    // Use the extracted ID to find the checkbox
    const checkbox = screen.getByTestId(`task-checkbox-${mediumAppointmentId}`);
    fireEvent.click(checkbox);
    
    // Filter by medium priority and completed status
    const priorityFilter = screen.getByTestId('filter-priority');
    fireEvent.click(priorityFilter);
    const mediumPriorityOption = screen.getByRole('option', { name: /Medium Priority/i });
    fireEvent.click(mediumPriorityOption);
    
    const statusFilter = screen.getByTestId('filter-status');
    fireEvent.click(statusFilter);
    const completedOption = screen.getByRole('option', { name: /Completed/i });
    fireEvent.click(completedOption);
    
    // Check that only medium priority and completed appointment is shown
    // Use text content to verify instead of relying on specific IDs
    expect(screen.queryByText(/HIGH_PRIORITY:/)).not.toBeInTheDocument(); // High priority, not completed
    expect(screen.getByText(/MEDIUM_PRIORITY:/)).toBeInTheDocument(); // Medium priority, completed
    expect(screen.queryByText(/LOW_PRIORITY:/)).not.toBeInTheDocument(); // Low priority, not completed
  });
});
