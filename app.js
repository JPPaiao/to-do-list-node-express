import express from "express"
import path from "path"
import url from 'url'
import methodOverride  from "method-override"
import checklistRouter from "./src/route/checklist.js"
import taskRounter from "./src/route/task.js"
import rootRouter from "./src/route/index.js"
import "./config/database.js"

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

app.use('/', rootRouter)
app.use('/checklists', checklistRouter)
app.use('/checklists', taskRounter)

app.listen(3000, () => {
    console.log('Server active')
})
