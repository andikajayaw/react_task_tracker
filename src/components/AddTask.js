import { useState } from "react";
import Button from "./Button"
const AddTask = () => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);


    const onSave = () => {
        console.log("Save Task");
    }

    return (
        <form className="add-form">
            <div className="form-control">
                <label>Task</label>
                <input type='text' placeholder='Add task' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Day &amp; Time</label>
                <input type='text' placeholder='Add day &amp; time' value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className="form-control form-control-check">
                <label>Reminder</label>
                <input type='checkbox' value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>

            {/* <input type='submit' value='Save Task' className="btn btn-block" /> */}
            <Button btnClass='btn btn-block' text='Save Task' onClick={onSave} />
        </form>
    )
}

export default AddTask