import React, { useState } from "react";


function App() {
    const [task, setTask] = useState('');       
    const [tasksList, setTasksList] = useState([]); 

    const handleAddTask = (event) => {
        if (task && event.key == "Enter") {
            setTasksList([...tasksList, task]); 
            setTask('');                        
        }
    };

    const taskChange = (event) => {
        setTask(event.target.value)
    }

    const deleteTask = (index) => {
        const newList = tasksList.filter((value, i) => i !== index)
        setTasksList(newList)
    }

    return (
        <div className="container">
            <div className="row">
                <h1 className='title'>Todo List</h1>
                <div className='col-12 p-0'>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="What needs to be done?"
                        value={task}
                        onChange={e => taskChange(e)}
                        onKeyUp={e => handleAddTask(e)}
                    />
                </div>
                <ul className="list-group col-8 p-0">
                    {tasksList.map((task, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between">
                            <span>{task}</span>
                            <button
                                onClick={e => deleteTask(index)}
                                style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                            >
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </li>
                    ))}
                </ul>
                {tasksList.length > 0 ? (
                    <div className="note">
                        {tasksList.length} item{tasksList.length === 1 ? '' : 's'} left
                    </div>
                ) : (
                    <div>
						<h6 className="note">No tasks, add a task</h6>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;