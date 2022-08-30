require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const authRoute = require('./routes/authRoute')
const postRoute = require('./routes/postRoute')

const connectDB = async() => {
    try {
        
        const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-henrywebdev.vggcelm.mongodb.net/?retryWrites=true&w=majority`
        console.log(connectionString)

        await mongoose.connect(connectionString, {
            //useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false
        })

        console.log('MongoDB connected')
    } 
    catch (error) {
        console.log('MongoDB connects fail: ', error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()

app.use(express.json())
app.use(cors())

//app.get('/', (req, res) => res.send('Hello world'))

app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))