import { useState } from 'react';
import type { ChangeEvent } from 'react';
import './TaskManager.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

export default function TaskManager() {
  // State for the new appointment input
  const [newAppointmentTitle, setNewAppointmentTitle] = useState<string>("");
  const [newAppointmentPriority, setNewAppointmentPriority] = useState<Task['priority']>("medium");

  // State for the list of appointments
  const [appointments, setAppointments] = useState<Task[]>([]);

  // State for filter options
  const [priorityFilter, setPriorityFilter] = useState<string>("all"); // "all", "low", "medium", "high"
  const [statusFilter, setStatusFilter] = useState<string>("all"); // "all", "active", "completed"

  // --- Event Handlers for Inputs and Filters ---
  const handleNewAppointmentTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // TODO: Update newAppointmentTitle state
    
  };

  const handleNewAppointmentPriorityChange = (value: Task['priority']) => {
    // TODO: Update newAppointmentPriority state
    
  };

  const handlePriorityFilterChange = (value: string) => {
    // TODO: Update priorityFilter state
    
  };

  const handleStatusFilterChange = (value: string) => {
    // TODO: Update statusFilter state
    
  };

  // --- Core Appointment Functions ---
  const handleAddAppointment = () => {
    // TODO: Implement adding a new appointment
    // - Validate title is not empty
    // - Create new task object with unique ID (e.g., Date.now() or a counter)
    // - Add to appointments state
    // - Clear input fields (setNewAppointmentTitle(""), setNewAppointmentPriority("medium"))
    
  };

  const handleToggleComplete = (id: number) => {
    // TODO: Toggle the 'completed' status of the appointment with the given ID
    
  };

  const handleCancelAppointment = (id: number) => {
    // TODO: Remove the appointment with the given ID from the list
    
  };

  const handleChangePriority = (id: number, priority: Task['priority']) => {
    // TODO: Update the priority of the appointment with the given ID
    
  };

  // --- Filtering Logic ---
  const filteredAppointments = appointments.filter(appointment => {
    // TODO: Implement filtering logic based on priorityFilter and statusFilter
    return true; // Replace with proper filtering logic
  });

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Patient Appointment Manager</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Appointment Input Form */}
        <div className="task-input flex flex-col sm:flex-row gap-2 mb-6 p-4 border rounded-lg shadow-sm">
          <Input
            type="text"
            placeholder="Enter patient name and reason for visit"
            className="flex-grow"
            data-testid="task-input"
            value={newAppointmentTitle}
            onChange={handleNewAppointmentTitleChange}
          />
          <Select
            onValueChange={handleNewAppointmentPriorityChange}
            value={newAppointmentPriority}
          >
            <SelectTrigger className="w-full sm:w-[180px]" data-testid="priority-select">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
            </SelectContent>
          </Select>
          <Button
            data-testid="add-task-button"
            className="w-full sm:w-auto"
            onClick={handleAddAppointment}
          >
            Schedule Appointment
          </Button>
        </div>

        {/* Filter Controls */}
        <div className="filter-controls flex flex-col sm:flex-row gap-2 mb-6 p-4 border rounded-lg shadow-sm">
          <Select
            onValueChange={handlePriorityFilterChange}
            value={priorityFilter}
          >
            <SelectTrigger className="w-full sm:w-[200px]" data-testid="filter-priority">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleStatusFilterChange}
            value={statusFilter}
          >
            <SelectTrigger className="w-full sm:w-[200px]" data-testid="filter-status">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Appointments</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Appointment List */}
        <ul className="task-list space-y-3" data-testid="task-list">
          {filteredAppointments.map(task => (
            <li
              key={task.id}
              data-testid={`task-item-${task.id}`}
              className={cn("flex items-center gap-3 p-3 border rounded-lg shadow-sm transition-shadow duration-200", task.completed ? "bg-gray-100 opacity-70 hover:shadow-md" : "bg-white hover:shadow-md")}
            >
              <Checkbox 
                id={`task-checkbox-${task.id}`}
                data-testid={`task-checkbox-${task.id}`}
                checked={task.completed} 
                onCheckedChange={() => handleToggleComplete(task.id)}
              />
              <label
                htmlFor={`task-checkbox-${task.id}`}
                className={`flex-grow cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
                data-testid={`task-title-${task.id}`}
              >
                {task.title}
              </label>
              <Badge
                data-testid={`task-priority-${task.id}`}
                variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'secondary' : 'outline'}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
              <Select
                onValueChange={(newPriority) => handleChangePriority(task.id, newPriority as Task['priority'])}
                value={task.priority}
              >
                <SelectTrigger className="w-[130px] text-xs h-8" data-testid={`task-priority-selector-${task.id}`}>
                  <SelectValue placeholder="Change" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline"
                size="sm" 
                data-testid={`delete-button-${task.id}`}
                onClick={() => handleCancelAppointment(task.id)}
              >
                Cancel
              </Button>
            </li>
          ))}
          {filteredAppointments.length === 0 && (
            <li className="text-center text-gray-500 py-4">
              No appointments scheduled or matching filters.
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
