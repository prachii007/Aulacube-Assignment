const TaskForm = ({ state, handleState, onClick, feature }) => {
    return (
        <div className='text-center mt-5'>
            <h1 className='my-5'>{feature} Task</h1>
            <div className='task-div'>
                <div className='mb-5 row'>
                    <label htmlFor='taskName' className='mb-2'>Task Name <span className='text-danger'>*</span></label>
                    <input className='form-control' type='text' id='taskName' name='taskName' onChange={handleState} value={state.taskName} />
                </div>
                <div className='mb-5 row'>
                    <label htmlFor='taskDescription' className='mb-2'>Task Description</label>
                    <textarea className='form-control' id='taskDescription' name='taskDescription' onChange={handleState} value={state.taskDescription} rows={5} placeholder='Write description of your task in detail here..'></textarea>
                </div>
                <div className='mb-5 row'>
                    <label htmlFor='taskPriority' className='mb-2'>Priority Level</label>
                    <select className='form-select' id='taskPriority' name='taskPriority' onChange={handleState} value={state.taskPriority}>
                        <option value='Low'>Low</option>
                        <option value='Medium'>Medium</option>
                        <option value='High'>High</option>
                    </select>
                </div>
                <button onClick={onClick} className='submit-button'> Submit</button>
            </div>
        </div>
    )
}
export default TaskForm