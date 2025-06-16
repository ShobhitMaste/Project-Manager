import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import AddProject from "./components/AddProject.jsx";
import ViewProject from "./components/ViewProject.jsx"
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
        dateCreated: getDate().date,
        // key: title + getDate().time
        key: projects.length,
      });
      return tempProjects;
    });
    setAddingProject(() => false);
    setCurrentProject(() => projects.length - 1);
  }

  function handleProjectSelection(index) {
    if(addingProject){
      alert("save Draft or click Cancel");
    } else
      setCurrentProject(() => index);
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
        {addingProject && (currentProject == -1) && (
          <AddProject
            onCancel={handleCancelAddingProject}
            onSave={handleSaveProject}
          />
        )}
        {!addingProject && (currentProject != -1) && <ViewProject/>}
        {!addingProject && (currentProject == -1) && <SelectOneProject onAddButtonClick={handleAddProject}/>}
        
      </div>
    </>
  );
}

function getDate() {
  let dateCOmplex = new Date();
  let date = dateCOmplex.toDateString();
  let time = dateCOmplex.toTimeString();
  return { date, time };
}
