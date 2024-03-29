import { useState } from "react";
import { createTodoApi } from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';

export default function AddTodoModal({setRefreshList}) {
    const [todoDesc, setTodoDesc] = useState('');

    const handleTodoSubmit = async () => {
        console.log(todoDesc, 'todoDesc');
        if (todoDesc === "") {
            toast('Todo is Required');
            return;
        }

        const result = await createTodoApi({ desc: todoDesc });

        if (result.status === 200) {
            setTodoDesc(''); // Clear the input field
            setRefreshList(new Date());
            toast('Todo Added')
        } else {
            toast(result.message);
        }
    };

    return (
        <div className="modal mt-5" id="exampleModal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title">
                            Add new Todo
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close">
                            <span arial-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <textarea
                                name=""
                                className="form-control"
                                rows={3}
                                value={todoDesc} // Set value to controlled input
                                onChange={(e) => { setTodoDesc(e.target.value) }}
                                placeholder="write"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => { setTodoDesc('') }} data-bs-dismiss="modal">Close</button>
                        <button className="btn btn-secondary" onClick={handleTodoSubmit} data-bs-dismiss="modal"> Save Todo</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
