import React, { useState } from 'react';
import moment from 'moment';
import { deleteTodo, markedTodo } from '../../services/api';
import { toast } from 'react-toastify';

export default function Todo({ todo, setRefreshList }) {
    const [showMarkButton, setShowMarkButton] = useState(true);

    const handleDelete = async () => {
        const result = await deleteTodo({
            todo_id: todo._id
        });

        if (result.status === 200) {
            setRefreshList(new Date());
            toast('Deleted');
        } else {
            toast('Failed to delete, please try again');
        }
    };

    const handleMarked = async () => {
        const result = await markedTodo({
            todo_id: todo._id
        });

        if (result.status === 200) {
            setRefreshList(new Date());
            toast(result.message);
            setShowMarkButton(false); // Hide the button after marking complete
        } else {
            toast('Failed to toggle, please try again');
        }
    };

    return (
        <div className="col-sm-3 mx-3 my-2 alert bg-light">
            <div className="card-header">
                {todo.isCompleted ? 'Completed' : 'Not Completed'}
            </div>
            <div className="card-body">
                <h4 className="card-title">{todo.desc}</h4>
                <p className="card-text">{moment(todo.date).fromNow()}</p>
            </div>

            <div className="actionButtons" style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                <div className="deleteButton">
                    <button style={{ background: 'red' }} onClick={handleDelete}>Delete</button>
                </div>
                {!todo.isCompleted && ( // Render the "Mark Complete" button only if showMarkButton is true
                    <div className="markTodo">
                        <button onClick={handleMarked} style={{ background: '' }}>
                            {todo.isComplete ? 'Mark Uncomplete' : 'Mark Complete'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
