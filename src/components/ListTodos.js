import {Fragment, useEffect, useState} from "react";
import {EditTodo} from "./EditTodo";

export const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    /**
     * Delete todo function
     */
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'DELETE'
            })

            setTodos(todos.filter(todo => todo.todo_id !== id))
            console.log(deleteTodo)
        } catch (e) {
            console.error(e.message)
        }
    }

    /**
     * Get todos
     *
     * @returns {Promise<void>}
     */
    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/todos');
            const jsonData = await response.json();

            setTodos(jsonData)
        } catch (e) {
            console.error(e.message)
        }
    }

    /**
     * On rerender get todos
     */
    useEffect(() => {
        getTodos()
    }, [])

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {todos.map((todo, key) => {
                    return (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo}/></td>
                            <td>
                                <button className={'btn btn-danger'} onClick={() => deleteTodo(todo.todo_id)}>Delete
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </Fragment>
    );
}