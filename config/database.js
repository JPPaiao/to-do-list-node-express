import mongoose from "mongoose"
mongoose.Promise = global.Promise

mongoose.set("strictQuery", true);

mongoose.connect('mongodb://localhost/todo-list', {})
.then(() => console.log('Conectado ao Mongodb'))
.catch((err) => console.error(err))
