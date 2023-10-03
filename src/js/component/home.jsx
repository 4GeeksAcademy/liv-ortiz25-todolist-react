import React, { useState} from "react";


const Home =() => {
    const [task, setTasks] = useState('');       
    const [tasksList, setTasksList] = useState([]); 

    window.onload = function createUser (e) {
        e.preventDefault();
        console.log('crear usuario')
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( [] )
      };
        fetch('https://playground.4geeks.com/apis/fake/todos/user/elizaduarte', requestOptions)
        .then( (response) => response.json() )
        .then( (data) => console.log(data) )
      }

      function getTask () {
        console.log('leer tareas')
        fetch('https://playground.4geeks.com/apis/fake/todos/user/elizaduarte')
        .then( (response) => response.json() )
        .then( (data) => console.log(data) )
      }

      function addTask (e) {
          e.preventDefault();  
          //setTasksList('');
          console.log(tasksList)
          console.log(task)

          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              [{ task }]
            )
        }
          
          console.log('Agregar tarea')
          fetch('https://playground.4geeks.com/apis/fake/todos/user/elizaduarte', requestOptions)
          .then( (response) => response.json() )
          .then( (data) => console.log(data) )

          
        }

      const deleteTask = (index) => {     

          const newList = [...task];
          newList.splice(index,1);
          setTasks(newList);
          

          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              
               newList
              
            )
          };
          
          fetch('https://playground.4geeks.com/apis/fake/todos/user/elizaduarte', requestOptions)
          .then( (response) => response.json() )
          .then( (data) => console.log(data) )
        
      }


    return (
        <div className="container">
            <div className="row">
                <h1 className='title'>To-Do List</h1>
                <div className='col-12 p-0'>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="What needs to be done?"
                        value={task}
                        onChange={e => getTask(e)}
                        onKeyUp={e => addTask(e)}
                    />
                </div>
                <ul className="list-group col-8 p-0">
                    {tasksList.map((task, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between">
                            <span>{task}</span>
                            <button
                                onClick={_e => deleteTask(index)}
                                style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
                            >
                                <i className="far fa-trash-alt"></i>
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

export default Home;