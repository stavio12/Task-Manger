import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";

function TaskEdit() {
    const [name, setName] = useState("");
    const { id } = useParams(id);
    useEffect(() => {
        try {
            return axios
                .get(`/tasks/${id}/edit`)
                .then((response) => setName(response.data.task.name));
        } catch (error) {
            console.log(error.response);
        }
    }, []);

    const updateTask = (e) => {
        e.preventDefault();
        axios.put(`/tasks/${id}`, { name }).then((response) => {
            if (response.status === 200) {
                setName("");
                window.location.href = "/home";
            }
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Edit Task</div>

                        <div className="card-body">
                            <form action="" onSubmit={updateTask}>
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        value={name}
                                        maxLength="255"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        rows="5"
                                        placeholder="Edit a task"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Edit Task
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskEdit;
