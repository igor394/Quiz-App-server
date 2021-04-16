const express = require('express')
require('dotenv').config()
const cors = require('cors')
const router = require('./routes/index')
const sequelize = require('./modelDb/db')
const models = require('./modelDb/models')


const PORT = process.env.PORT || 3303
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`start serer ${PORT}`))
    }
    catch (err) {
        console.log(err)
    }
}
start()