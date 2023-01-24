import express from "express"
import { checklistModel } from "../models/checklist.js"

const router = express.Router()

router.post('/', async (req, res) => {
    let { name } = req.body

    try {
        let checklist = await checklistModel.create({ name })
        res.status(200).send(checklist)
    } catch (error) {
        res.status(422).json(error)
    }
})


router.get('/', async (req, res) => {
    try {
        let checklists = await checklistModel.find({})
        res.status(200).json(checklists)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:id', async (req, res) => {
    let { id } = req.params
    try {
        let checklist = await checklistModel.findById(id)
        res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)
    }
})


router.put('/:id', async (req, res) => {
    let { name } = req.body
    let { id } = req.params

    try {
        let checklist = await checklistModel.findByIdAndUpdate(id, { name }, { new: true })
        res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)
    }
})

router.delete('/:id', async (req, res) => {
    let { id } = req.params

    try {
        let checklist = await checklistModel.findByIdAndRemove(id)
        res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)
    }
})

export default router
