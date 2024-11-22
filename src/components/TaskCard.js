const SingleTaskCard = ({ handleCheckboxChange, goToEditTask, deleteTask, task, index }) => {
    return (
        <div className="card text-center mb-5">
            <div className="card-header d-flex justify-content-between">
                <div>Task To Do</div>
                <div>{task.id}</div>
            </div>
            <div className="card-body">
                <h5 className="card-title text-start">
                    <input
                        className='form-check-input me-2'
                        type='checkbox'
                        checked={task.isChecked || false}
                        onChange={() => handleCheckboxChange(task.id)}
                    />
                    <span
                        className='inline-block'
                        style={{
                            textDecoration:
                                task.isChecked ? 'line-through' : 'none'
                        }}>
                        {task.name}
                    </span>
                </h5>
                <p className='card-text text-start'
                    style={{
                        textDecoration: task.isChecked ? 'line-through' : 'none'
                    }}>
                    Description : {task.description}
                </p>
            </div>
            <div className='card-text text-start ms-3'>
                <p className={
                    task.isChecked ?
                        'text-success col-12 col-sm-3 mb-2 ps-2'
                        : 'text-danger col-sm-3 col-12 mb-2 ps-2'}>
                    Status : {task.isChecked ? "Complete" : "Incomplete"}
                </p>
                <p className={
                    task.priority === 'Low' ?
                        'bg-success col-10 col-sm-3 ps-2 priority'
                        : task.priority === 'Medium' ?
                            'bg-warning  col-10 col-sm-3 ps-2 priority'
                            : 'bg-danger  col-10 col-sm-3 ps-2 priority'
                }
                >
                    Priority : {task.priority}
                </p>
            </div>
            <div className="text-body-secondary row justify-content-center mb-4">
                <button
                    onClick={goToEditTask.bind(this, index)}
                    disabled={task.isChecked}
                    className='edit action-btn mx-2 mb-2 col-sm-2 col-8'
                >
                    Edit
                </button>
                <button
                    onClick={deleteTask.bind(this, task.id)}
                    disabled={task.isChecked}
                    className='delete action-btn mx-2 mb-2 col-sm-2 col-8'
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default SingleTaskCard
