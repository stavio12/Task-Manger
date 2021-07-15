import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function App() {
    const [name, setName] = useState("");
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            return axios.get("/tasks").then((response) => {
                setLoading(false);

                setTasks(response.data.tasks);
            });
        } catch (error) {
            console.log(error.response);
        }
    }, [tasks]);

    const createTask = (e) => {
        e.preventDefault();
        axios.post("/tasks", { name }).then((response) => {
            if (response.status === 200) {
                setTasks([response.data, ...tasks]);
                setName("");
            }
        });
    };

    const deleteTask = (id) => {
        const notId = (task) => task.id !== id;

        const updatedTasks = tasks.filter(notId);
        setTasks(updatedTasks);

        // Delete from backend
        axios.delete(`/tasks/${id}`);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Create Component</div>

                        <div className="card-body">
                            <form action="" onSubmit={createTask}>
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        name=""
                                        id=""
                                        value={name}
                                        maxLength="255"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        rows="5"
                                        placeholder="Create a new task"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Create Task
                                </button>
                            </form>

                            <hr />
                            {loading && (
                                <h3>
                                    <span className="spinner-border"></span>
                                    Loading...
                                </h3>
                            )}
                            {tasks.map((task) => (
                                <div key={task.id} className="media ">
                                    <div className="media-body">
                                        <div className="pt-2">
                                            {task.name}
                                            <br />
                                            <span className="text-muted">
                                                by {task.user.name} |{" "}
                                                {task.updated_at}
                                            </span>
                                            <Link
                                                to={`/${task.id}/edit`}
                                                className="btn btn-sm btn-warning float-right "
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-danger float-right pl-2"
                                                onClick={() =>
                                                    deleteTask(task.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
