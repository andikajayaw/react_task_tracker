import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([]);

  const URL = "http://localhost:5000/tasks";

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(URL)
    const data = await res.json();
    return data
  }

  // Fetch One Task
  const fetchTask = async (id) => {
    const res = await fetch(`${URL}/${id}`)
    const data = await res.json();
    return data
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = {id, ...task};
    // setTasks([...tasks, newTask]);
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const taskToggle = await fetchTask(id);
    const updTask = {...taskToggle, reminder: !taskToggle.reminder}

    const res = await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })
    const data = await res.json()
    // console.log(id);
    setTasks(tasks.map((task) => task.id == id ? { ...task, reminder: data.reminder} : task))
  }

  const toggleAddTask = () => {
    console.log(showAddTask);
    setShowAddTask(!showAddTask);
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={toggleAddTask} showAdd={showAddTask} />
        <Routes>
        <Route 
          path="/" 
          element={
            <>
              { showAddTask && <AddTask onAdd={addTask} />}
              {
                tasks.length > 0 ? 
                (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) 
                : 
                ('No tasks')
              }
            </>
          }
        />        
          <Route path="/about" component={About} to element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
