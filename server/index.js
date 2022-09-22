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

// cors: use it before all route definitions
//ref: https://www.npmjs.com/package/cors

//1.
app.use(cors())

//2.
//app.use(cors({origin: '*'}))

//3.
//app.use(cors({origin: ['http://localhost:3000', 'https://localhost:3000','http://glacial-chamber-01131.herokuapp.com','https://glacial-chamber-01131.herokuapp.com']}));

//4.
// const corsOptions = {
//     origin:'*', 
//     credentials:true, //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

//5.
// const whitelist = ["http://localhost:3000"]
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },
//   credentials: true,
// }
// app.use(cors(corsOptions))


app.use(express.json())


//app.get('/', (req, res) => res.send('Hello world'))
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)


const PORT = process.env.PORT || 5000


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))