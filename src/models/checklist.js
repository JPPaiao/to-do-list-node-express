import mongoose from "mongoose"

const checklistSchema = mongoose.Schema({
    name: {type: String, required: true},
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

const ChecklistModel = mongoose.model('Checklist', checklistSchema)

export { ChecklistModel }
