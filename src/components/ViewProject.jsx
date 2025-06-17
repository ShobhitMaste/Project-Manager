import { useState } from "react";
export default function ViewProject({
  handleAddingTasks,
  Projects,
  activeProject,
  handleTaskDeletion,
  handleProjectDelete,
  isEditing,
  handleProjectEditing,
}) {
  let project = Projects[activeProject];
  const [task, setTask] = useState("");

  const [editValues, setEditValues] = useState({
    title: project.title ?? "",
    description: project.description ?? "",
    dueDate: project.dueDate ?? "",
  });

  function handleTaskInput(event) {
    setTask(event.target.value);
  }
  
  function handleProjectEdit(event){
    let target = event.target.name;
    console.log(target)
    setEditValues((prevValues) => {
      let tempValues = {...prevValues};
      tempValues[target] = event.target.value;
      return tempValues;
    })
  }

  return (
    <div
      className={`projectbody flex-col ${isEditing ? "margin-top" : undefined}`}
    >
      <div className="projectheading">
        {!isEditing ? (
          <h1>{project.title}</h1>
        ) : (
          <input type="text" value={editValues.title} onChange={handleProjectEdit} name="title" />
        )}
        <div>
          <button
            className="buttonWithoutBG right-gap"
            onClick={() => handleProjectEditing(editValues)}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          {!isEditing && (
            <button
              className="buttonWithoutBG margin-right-0"
              onClick={() => handleProjectDelete(activeProject)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="duedate juslighttext">
        <p className="juslighttext">{project.dateCreated}</p>
        {isEditing ? (
          <div>
            <label>Due Date - </label>
            <input type="date" value={editValues.dueDate} placeholder="Description" onChange={handleProjectEdit} name="dueDate" />
          </div>
        ) : (
          project.dueDate && <p>Due On {project.dueDate}</p>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={editValues.description}
          style={{ width: "98%" , backgroundColor: '#f5f5f5', border: '0px'}}
          onChange={handleProjectEdit}
          name="description"
        ></textarea>
      ) : (
        project.description && (
          <p
            className="description"
            dangerouslySetInnerHTML={{
              __html: project.description.replace(/\n/g, "<br>"),
            }}
          />
        )
      )}

      <hr className="separator" />

      <h1>Tasks</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (task != "") handleAddingTasks(task);
          setTask(() => "");
        }}
        className="flex-start gap tasks"
      >
        <input
          type="text"
          onChange={handleTaskInput}
          value={task}
          placeholder="Add Tasks Here"
        />
        <button className="buttonWithoutBG juslighttext" type="submit">
          Add Task
        </button>
      </form>
      <div className="taskbody">
        <ul>
          {project.tasks.map((taskValue, index) => {
            return (
              <li key={index}>
                <p>
                  {index + 1}.‎ ‎ {taskValue}
                </p>
                <button
                  onClick={() => handleTaskDeletion(index)}
                  className="buttonWithoutBG juslighttext"
                >
                  Clear
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// .value.replace(/\n/g, '<br>')
