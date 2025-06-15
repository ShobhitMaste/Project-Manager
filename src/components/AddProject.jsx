export default function AddProject() {
  return (
    <div className="flex-left">
      <div className="addProjectButtons">
        <button>Cancel</button>
        <button>Save</button>
      </div>
      <div>
        <label>TITLE</label>
        <input type="text" placeholder="Bloggify" />
      </div>
      <div>
        <label>DESCRIPTION</label>
        <textarea></textarea>
      </div>
      <div>
        <label>DUE DATE</label>
        <input type="date" />
      </div>
    </div>
  );
}
