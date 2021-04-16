const express = require('express')
require('dotenv').config()
const cors = require('cors')
const router = require('./routes/index')


const PORT = process.env.PORT || 3303
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)


app.listen(PORT, () => console.log(`start serer ${PORT}`))