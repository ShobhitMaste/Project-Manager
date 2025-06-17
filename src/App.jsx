import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import AddProject from "./components/AddProject.jsx";
import ViewProject from "./components/ViewProject.jsx";
import SelectOneProject from "./components/SelectOneProject.jsx";
import { useState, useEffect } from "react";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [addingProject, setAddingProject] = useState(false);
  const [currentProject, setCurrentProject] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects])

  function handleProjectEditing(editValues) {
    setProjects((prevProjects) => {
      const tempProjects = [...prevProjects];
      tempProjects[currentProject].title = editValues.title;
      tempProjects[currentProject].description = editValues.description;
      tempProjects[currentProject].dueDate = editValues.dueDate;
      return tempProjects;
    });

    setIsEditing(() => !isEditing);

  }
  
  function handleAddProject() {
    if (isEditing) {
      alert("save Draft or click Cancel");
    } else {
      setAddingProject(() => true);
      setCurrentProject(() => -1);
    }
  }

  function handleCancelAddingProject() {
    setAddingProject(() => false);
    setCurrentProject(() => -1);
  }

  function handleSaveProject(title, description, dueDate) {
    setProjects((prevProjects) => {
      const tempProjects = [...prevProjects];
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
    setCurrentProject(() => projects.length);
  }

  function handleProjectSelection(index) {
    if (addingProject || isEditing) {
      alert("save Draft or click Cancel");
    } else setCurrentProject(() => index);
  }

  function handleAddingTasks(task) {
    console.log(projects);
    setProjects((prevProjects) => {
      const tempProjects = [...prevProjects];
      const updatedTasks = [...tempProjects[currentProject].tasks];
      updatedTasks.push(task);
      tempProjects[currentProject] = {
        ...tempProjects[currentProject],
        tasks: updatedTasks,
      };
      return tempProjects;
    });
  }

  function handleTaskDeletion(taskIndex) {
    setProjects((prevProjects) => {
      const tempProjects = [...prevProjects];
      const updatedTasks = [...tempProjects[currentProject].tasks];
      updatedTasks.splice(taskIndex, 1);
      tempProjects[currentProject] = {
        ...tempProjects[currentProject],
        tasks: updatedTasks,
      };
      return tempProjects;
    });
  }

  function handleProjectDelete(index) {
    setProjects((prevProjects) => {
      const tempProjects = [...prevProjects];
      tempProjects.splice(index, 1);
      return tempProjects;
    });
    setCurrentProject(-1);
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
            handleTaskDeletion={handleTaskDeletion}
            handleProjectDelete={handleProjectDelete}
            isEditing={isEditing}
            handleProjectEditing={handleProjectEditing}
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
