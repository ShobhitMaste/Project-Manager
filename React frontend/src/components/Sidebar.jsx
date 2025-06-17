export default function Sidebar({
  onAddButtonClick,
  currentProjects,
  onSelectProject,
  activeProject,
}) {
  return (
    <div className="sidebar">
      <div className="shiftright">
        <h1>Your Projects</h1>
        <button className="buttonWithBG" onClick={onAddButtonClick}> + Add Project</button>
        <ul>
          {currentProjects.map((items, index) => (
            <li
              className={index == activeProject ? "active" : undefined}
              key={index}
              onClick={() => onSelectProject(index)}
            >
              {items.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
