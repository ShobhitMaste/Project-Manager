export default function Sidebar({ onAddButtonClick }) {
  return (
    <div className="sidebar">
        <div className="shiftright">
            <h1>Your Projects</h1>
            <button onClick={onAddButtonClick}> + Add Project</button>
            <ul>
                <li>Project 1</li>
                <li>Project 2</li>
            </ul>
        </div>
    </div>
  );
}
