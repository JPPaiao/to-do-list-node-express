import express from "express"
import { ChecklistModel } from "../models/checklist.js"

const router = express.Router()

router.post('/', async (req, res) => {
    let { name } = req.body.checklist
    let checklist = new ChecklistModel({name})
    try {
        await checklist.save()
        res.redirect('/checklists')
    } catch (error) {
        res.status(422).render('checklists/new', { checklist: { ...checklist, error }})
    }
})

router.get('/:id/edit', async (req, res) => {
    let { id } = req.params
    try {
        let checklist = await ChecklistModel.findById(id)
        res.status(200).render('checklists/edit', { checklist: checklist })
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Error ao exibir a edição de lista de tarefas'})
    }
})

router.get('/new', async (req, res) => {
    try {
        let checklist = new ChecklistModel()
        res.status(200).render('checklists/new', { checklist: checklist})
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Error ao exibir as listas'})
    }
})

router.get('/', async (req, res) => {
    try {
        let checklists = await ChecklistModel.find({})
        res.status(200).render('checklists/index', { checklists: checklists})
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Error ao exibir as listas'})
    }
})

router.get('/:id', async (req, res) => {
    let { id } = req.params
    
    try {
        let checklist = await ChecklistModel.findById(id).populate('tasks')
        res.status(200).render('checklists/show.ejs', { checklist: checklist})
    } catch (error) {
        res.status(422).render('pages/error', { error: 'Error ao exibir as listas de tarefas'})
    }
})

router.put('/:id', async (req, res) => {
    let { name } = req.body.checklist
    let { id } = req.params
    let checklist = await ChecklistModel.findById(id)

    try {
        await ChecklistModel.updateMany({_id: id}, { name })
        res.redirect('/checklists')
    } catch (error) {
        let errors = error.errors
        res.status(422).render('checklists/edit', { checklist: { ...checklist, errors} })
    }
})

router.delete('/:id', async (req, res) => {
    let { id } = req.params

    try {
        await ChecklistModel.findByIdAndRemove(id)
        res.status(200).redirect('/checklists')
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Error ao deletar a lista de tarefas'})
    }
})

export default router
