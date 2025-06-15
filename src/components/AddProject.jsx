import { useState } from "react";

export default function AddProject({ onCancel, onSave }) {
  const [projectInfo, setProjectInfo] = useState({});

  function handleInput(event) {
    let valueChanged = event.target.name;
    setProjectInfo((prev) => ({
      ...prev,
      [valueChanged]: event.target.value,
    }));
  }

  return (
    <div className="flex-left addproject">
      <div className="addProjectButtons">
        <button onClick={onCancel}>Cancel</button>
        <button
          onClick={() =>
            onSave(
              projectInfo.title,
              projectInfo.description,
              projectInfo.dueDate
            )
          }
        >
          Save
        </button>
      </div>
      <div>
        <label>TITLE</label> <br />
        <input
          name="title"
          onChange={handleInput}
          required
          autoFocus
          type="text"
          placeholder="Bloggify"
        />
      </div>
      <div>
        <label>DESCRIPTION</label>
        <br />
        <textarea name="description" onChange={handleInput}></textarea>
      </div>
      <div>
        <label>DUE DATE</label>
        <br />
        <input name="dueDate" type="date" onChange={handleInput} />
      </div>
    </div>
  );
}
