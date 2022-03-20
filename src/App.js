import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();
    return data
  }

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

  const toggleAddTask = () => {
    console.log(showAddTask);
    setShowAddTask(!showAddTask);
  }

  return (
    <div className="container">
      <Header onAdd={toggleAddTask} showAdd={showAddTask} />
      { showAddTask && <AddTask onAdd={addTask} />}
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
