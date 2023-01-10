import express  from "express"
import router from "./src/route/checklist.js"

const app = express()
app.use(express.json())

app.use('/checklists', router)

app.listen(3000, () => {
    console.log('Server active')
})
