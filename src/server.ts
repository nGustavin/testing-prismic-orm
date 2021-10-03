import express from 'express'
import cors from 'cors'
import { routes } from './routes/index'

const app = express()

process.on('uncaughtException', err => {
    console.log(err)
    process.exit(1)
})

process.on('SIGTERM', () => {
    process.exit();
});

app.use(cors())
app.use(express.json())

app.use(routes)

app.listen(3333)