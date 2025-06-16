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
    <form
      className="flex-left addproject"
      onSubmit={() =>
        onSave(projectInfo.title, projectInfo.description, projectInfo.dueDate)
      }
    >
      <div className="addProjectButtons">
        <button className="buttonWithoutBG" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="buttonWithBG"  type="submit">Save</button>
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
        <textarea
          name="description"
          placeholder="Description Here"
          onChange={handleInput}
        ></textarea>
      </div>
      <div>
        <label>DUE DATE</label>
        <br />
        <input name="dueDate" type="date" onChange={handleInput} />
      </div>
    </form>
  );
}
