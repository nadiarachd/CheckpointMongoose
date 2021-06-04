const express=require("express")
const connect=require("./config/connectDB")
const cors=require("cors")
const Person =require("./model/Person.js")
// Instanciation

const app = express();

//middleware
app.use(express.json())
app.use(cors())
//connect DB
connect()
//Person.find().then((Person)=>console.log(Person)).catch((err)=>console.log(err));
//Routes
app.use("/api/persons",require("./routes/person"))

// Port
const port=5000
app.listen(port,err=>{
    err? console.log(err): console.log(`server is running on port ${port}`)
})