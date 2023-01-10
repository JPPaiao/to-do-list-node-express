import express from "express"

const router = express.Router()

router.get('/', (req, res) => {
    console.log('Ola')
    res.send()
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    res.send(`ID: ${req.params.id}`)
})

router.post('/', (req, res) => {
    console.log(req.body)
    res.status(200).send(req.body)
})

export default router
