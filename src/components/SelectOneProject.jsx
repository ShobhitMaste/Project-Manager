export default function SelectOneProject({onAddButtonClick}){
    return (
        <div className="flex-center flex-col selectoneproject">
            <img src="./selectproject.png" height="140" />
            <h2>No Project Selected</h2>
            <h3 className="lightText">Select a project or get started with a new one</h3>
            <button className="lightText" onClick={onAddButtonClick}>Create New Project</button>
        </div>
    );
}