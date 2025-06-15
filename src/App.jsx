import Navbar from "./components/Navbar.jsx"
import Sidebar from "./components/Sidebar.jsx"
import AddProject from "./components/AddProject.jsx";
import { useState } from "react";

export default function App() {
  const [projects, setProjects] = useState([]);
  const [addingProject, setAddingProject] = useState(false);
  
  function handleAddingProject(){

  }


  function handleAddProject(){
    setAddingProject(true);
  }

  return(
    <>
      <Navbar />
      <div className="bodyGrid">
        <Sidebar onAddButtonClick={handleAddProject}/>
        {addingProject && <AddProject />}
      </div>
    </>
  );
}