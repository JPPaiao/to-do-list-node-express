import express from "express"
import { ChecklistModel } from "../models/checklist.js"
import { TaskModel } from "../models/task.js"

const checklistDepedentRoute = express.Router()

checklistDepedentRoute.get('/:id/tasks/new', async (req, res) => {
    let { id } = req.params

    try {
        let task = TaskModel()
        res.status(200).render('tasks/new', { checklistId: id, task: task })
    } catch (error) {
        res.status(422).render('pages/error', {errors: 'Error ao carregar o formulário'})
    }
})

checklistDepedentRoute.post('/:id/tasks', async (req, res) => {
    let { name } = req.body.task
    let { id } = req.params
    let task = new TaskModel({ name, checklist: id })

    try {
        await task.save()
        let checklist = await ChecklistModel.findById(id)
        checklist.tasks.push(task)
        await checklist.save()
    } catch (error) {
        let errors = error.errors
        res.status(422).render('task/new', { task: { ...task, errors }, checklistId: id })
    }
})

export default checklistDepedentRoute
