import mongoose from "mongoose"

const taskSchema = mongoose.Schema({
    name: {type: String, required: true},
    done: {type: Boolean, default: false},
    checklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
        required: true
    }
})

const TaskModel = mongoose.model('Task', taskSchema)

export { TaskModel }
