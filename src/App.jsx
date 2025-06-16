import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import AddProject from "./components/AddProject.jsx";
import ViewProject from "./components/ViewProject.jsx";
import SelectOneProject from "./components/SelectOneProject.jsx";
import { useState } from "react";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [addingProject, setAddingProject] = useState(false);
  const [currentProject, setCurrentProject] = useState(-1);

  function handleAddProject() {
    setAddingProject(() => true);
    setCurrentProject(() => -1);
  }

  function handleCancelAddingProject() {
    setAddingProject(() => false);
    setCurrentProject(() => -1);
  }

  function handleSaveProject(title, description, dueDate) {
    setProjects((prevProjects) => {
      let tempProjects = prevProjects;
      tempProjects.push({
        title,
        description,
        dueDate,
        dateCreated: getDateParts().date,
        key: projects.length,
        tasks: ["Add Task Here"],
      });
      return tempProjects;
    });
    setAddingProject(() => false);
    setCurrentProject(() => projects.length - 1);
  }

  function handleProjectSelection(index) {
    if (addingProject) {
      alert("save Draft or click Cancel");
    } else setCurrentProject(() => index);
  }

  function handleAddingTasks(task) {
    console.log(projects);
    setProjects((prevProjects) => {
      let tempProjects = prevProjects;
      tempProjects[currentProject].tasks.unshift(task);
      return tempProjects;
    });
  }

  return (
    <>
      <Navbar />
      <div className="bodyGrid">
        <Sidebar
          onAddButtonClick={handleAddProject}
          currentProjects={projects}
          onSelectProject={handleProjectSelection}
          activeProject={currentProject}
        />
        {addingProject && currentProject == -1 && (
          <AddProject
            onCancel={handleCancelAddingProject}
            onSave={handleSaveProject}
          />
        )}
        {!addingProject && currentProject != -1 && (
          <ViewProject
            handleAddingTasks={handleAddingTasks}
            activeProject={currentProject}
            Projects={projects}
          />
        )}
        {!addingProject && currentProject == -1 && (
          <SelectOneProject onAddButtonClick={handleAddProject} />
        )}
      </div>
    </>
  );
}

function getDateParts() {
  const now = new Date();

  const date = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }); // "12 June 2025"

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }); // "09:45 AM"

  return { date, time };
}
