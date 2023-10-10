import React, { useState, useEffect} from "react";


function Home() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
  
    useEffect(() => {
      fetch('https://playground.4geeks.com/apis/fake/todos/user/elizaduarte')
        .then((response) => response.json())
        .then((data) => setTasks(data));
    }, []);
  
    const addTask = () => {
      if (newTask.trim() !== '') {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/elizaduarte', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task: newTask }),
        })
          .then((response) => response.json())
          .then((data) => {
            setTasks([...tasks, data]);
            setNewTask('');
          });
      }
    };
  
    const deleteTask = () => {
      fetch(`https://playground.4geeks.com/apis/fake/todos/user/elizaduarte`, {
        method: 'DELETE',
      }).then(() => {
        const updatedTasks = tasks.filter((task) => task !== task);
        setTasks(updatedTasks);
      });
    };

    return (
        <div className="container">
            <div className="row">
                <h1 className='title'>To-Do List</h1>
                <div className='col-12 p-0'>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="What needs to be done?"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyUp={e => addTask(e)}
                    />
                </div>
                <ul className="list-group col-8 p-0">
                    {Array.isArray(tasks) && tasks.map((tasks, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between">
                            <span>{tasks.label}</span>
                            <span>{tasks.done}</span>
                            <button
                                onClick={() => deleteTask(index)}
                                style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                            >
                                <i className="far fa-trash-alt"></i>
                            </button>
                        </li>
                    ))}
                </ul>
                {setNewTask.length > 0 ? (
                    <div className="note">
                        {setNewTask.length} item{setNewTask.length === 1 ? '' : 's'} left
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

export default Home;