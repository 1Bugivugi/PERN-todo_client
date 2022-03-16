import {Fragment, useState} from "react";

export const EditTodo = ({todo}) => {
    const [description, setDescription] = useState(todo.description)

    /**
     * Update todo descr function
     */
    const updateDescription = async (e) => {
        e.preventDefault()
        try {
            const body = {description};
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: 'PUT',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            })

            window.location = '/'
        } catch (e) {
            console.error(e.message)
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal"
                    data-bs-target={`#todo_id${todo.todo_id}`}>
                Edit
            </button>

            <div className="modal fade" id={`todo_id${todo.todo_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true" onClick={() => setDescription(todo.description)}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={() => setDescription(todo.description)}></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className={'form-control'} value={description}
                                   onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning"
                                    onClick={(e) => updateDescription(e)}>Save
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => setDescription(todo.description)}>Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}