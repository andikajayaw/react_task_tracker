import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctors Appointment",
      day: "Feb 5th at 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Meeting Appointment",
      day: "Feb 7th at 2:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Shopping",
      day: "Feb 10th at 2:30pm",
      reminder: false,
    },
  ]);

  //Add Task

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    // console.log(id);
    const newTask = {id, ...task};

    setTasks([...tasks, newTask]);
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    // console.log(id);
    setTasks(tasks.map((task) => task.id == id ? { ...task, reminder: !task.reminder} : task))
  }

  return (
    <div className="container">
      <Header />
      <AddTask onAdd={addTask} />
      {
        tasks.length > 0 ? 
        (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) 
        : 
        ('No tasks')
      }
    </div>
  );
}

export default App;
