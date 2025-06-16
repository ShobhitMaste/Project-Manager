import { useState } from "react";
export default function ViewProject({
  handleAddingTasks,
  Projects,
  activeProject,
}) {
  let project = Projects[activeProject];
  const [task, setTask] = useState();
  function handleTaskInput(event) {
    setTask(event.target.value);
  }
  return (
    <div className="projectbody flex-col">
      <div className="projectheading">
        <h1>{project.title}</h1>
        <div>
          <button className="buttonWithoutBG right-gap">Edit</button>
          <button className="buttonWithoutBG">Delete</button>
        </div>
      </div>

      <p className="juslighttext margin-top-0">{project.dateCreated}</p>

      {project.description && (
        <p
          className="description"
          dangerouslySetInnerHTML={{
            __html: project.description.replace(/\n/g, "<br>"),
          }}
        />
      )}

      <hr className="separator" />

      <h1>Tasks</h1>
      <div className="flex-start gap tasks">
        <input type="text" onChange={handleTaskInput} value={task} />
        <button
          className="buttonWithoutBG juslighttext"
          onClick={() => {
            setTask("");
            handleAddingTasks(task);
          }}
        >
          Add Task
        </button>
      </div>
      <div className="taskbody">
        <ul>
          {project.tasks.map((taskValue, index) => {
            return (
              <li key={index}>
                <p>{taskValue}</p>
                <button className="buttonWithoutBG juslighttext">Clear</button>
              </li>
            );
          })}
          <li>
            <p>Task 1</p>
            <button className="buttonWithoutBG juslighttext">Clear</button>
          </li>
          <li>
            <p>Task 2</p>
            <button className="buttonWithoutBG juslighttext">Clear</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

// .value.replace(/\n/g, '<br>')
