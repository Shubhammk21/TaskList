import React, { useState, useRef } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Layout, Input } from "antd";

const { Search } = Input;
const { Header, Content } = Layout;

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const taskFormRef = useRef(null);
  const taskListRef = useRef(null);

  const handleAddOrEditTask = (task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === editingTask.id ? task : t)));
      setEditingTask(null);
    } else {
      setTasks([...tasks, task]);
    }
    // Scroll to TaskList after adding or editing a task
    taskListRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    // Scroll to TaskForm for editing
    taskFormRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  const handleClearSearch = () => {
    setSearchTerm(""); // this for when we seach after input remove the task still in seach then this method handle that problem
  };

  return (
    <Layout>
      <Header
        style={{
          background: "#fff",
          textAlign: "center",
          fontSize: "6vh",
          fontWeight: "600",
          marginBottom: "50px",
        }}
      >
        Task Manager
      </Header>
      <Content className="p-4">
        <div ref={taskFormRef}>
          <TaskForm task={editingTask} onSubmit={handleAddOrEditTask} />
        </div>

        <Search
          placeholder="Search tasks by title, priority, or status"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => {
            if (e.target.value === "") {
              handleClearSearch();
            }
          }}
          style={{
            margin: "50px 5% 20px 0px",
            width: "auto",
            float: "right",
          }}
        />
        <div ref={taskListRef}>
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
