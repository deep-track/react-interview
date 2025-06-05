
import { useState } from 'react';
import './TaskManager.css';
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Task Manager Component
// Instructions for the candidate:
// 1. Create a Task Manager application that allows users to:
//    - Add a new task with a title (non-empty string).
//    - Delete an existing task.
//    - Toggle a task's completion status (mark as completed or not completed).
// 2. The task list should persist when tasks are added, deleted, or toggled.
// 3. Display tasks in a list, showing their title and completion status (e.g., a checkbox or text decoration).
// 4. Include basic styling to make the UI clean and user-friendly (use the provided TaskManager.css file).
// 5. Handle edge cases like empty task titles gracefully (e.g., prevent adding empty tasks).
// 6. Submit the completed TaskManager.jsx file by tomorrow.
// Do NOT modify the import statements or the component name.

// Example task object structure (for reference):
// {
//   id: number, // Unique identifier for the task
//   title: string, // Task description
//   completed: boolean // Completion status
// }

// Define the Task interface
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TaskManager() {
  // State for the new task input
  const [newTaskText, setNewTaskText] = useState('');

  // State for the list of tasks - initialized with empty array
  // This is a skeleton implementation that will pass rendering tests
  // but fail functionality tests
  const [tasks, setTasks] = useState<Task[]>([]);

  // TODO: Implement function to add a new task
  const handleAddTask = () => {
    // This is just a skeleton - the candidate needs to implement this
    console.log('Add task:', newTaskText);

    
    setTasks(
      [...tasks, {id: tasks.length+1, title: newTaskText, completed: false}]
    );

    // Clear the input field after attempting to add
    setNewTaskText('');
  };

  // TODO: Implement function to toggle task completion
  const handleToggleComplete = (id: number ) => {
    // This is just a skeleton - the candidate needs to implement this
        
    console.log('Toggle task:', id);
  };

  // TODO: Implement function to delete a task
  const handleDeleteTask = (id: number ) => {
    // This is just a skeleton - the candidate needs to implement this
    console.log('Delete task:', id);
  };

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Task Manager</CardTitle>
      </CardHeader>
      <CardContent>

        <div className="task-input flex gap-2">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            data-testid="task-input"
          />
          <Button onClick={handleAddTask} data-testid="add-task-button">Add Task</Button>
        </div>

        <ul className="task-list" data-testid="task-list">
          {tasks.map((task) => (
            <li key={task.id} data-testid={`task-item-${task.id}`}>
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => handleToggleComplete(task.id)}
                aria-label={`Mark ${task.title} as completed`}
                data-testid={`task-checkbox-${task.id}`}
              />
              <span className={cn(
                task.completed ? 'line-through' : 'none'
              )} data-testid={`task-title-${task.id}`}>
                {task.title}
              </span>
              <Button
                onClick={() => handleDeleteTask(task.id)}
                aria-label={`Delete ${task.title}`}
                variant="destructive"
                data-testid={`delete-button-${task.id}`}
              >
                Delete Task
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>

    </Card>
  );
}
