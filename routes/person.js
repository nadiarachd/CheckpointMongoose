const { Router } = require("express")
const express=require("express")
const router=express.Router()
const Person =require("../model/Person.js")

//http://localhost:5000/api/persons/addPerson
// 1- Create and Save a Record of a Model
//Public
router.post("/addPerson",async(req,res)=>{
     
    try {
        const newUser= new Person({
           
            ...req.body
    
        })
        const user=await newUser.save()
        res.json({msg:"user created",user})
        console.log(user)
    } catch (err) {
        console.log(err)
    }})
// 2- http://localhost:5000/api/persons/createmany
// Create Many Records with model.create()
// Public



router.post("/createmany",async(req,res)=>{
    
  try {
    let Arr = [...req.body]
    const user= await Person.create(Arr, (err, data) => {
        res.json({msg:"user created",Arr})
        console.log(Arr)
    } )}
  catch (err) {
    console.log(err);
  }
     });
 
//http://localhost:5000/api/persons/getPerson
//3-  Use model.find() to Search Your Database
//Public

router.get("/getPerson",async(req,res)=>{

    try {
        const users=await Person.find()
        res.json({msg:"data fetched",users})
    } catch (error) {
       console.log(error)  
    }
})

//http://localhost:5000/api/persons/findOne
//4-  Use model.findOne() to Return a Single Matching Document from Your Database
//Public

router.get("/findOne",async(req,res)=>{

    try {
        const users=await Person.findOne({ favoriteFoods: req.body.favoriteFoods })
        res.json({msg:"data fetched",users})
    } catch (error) {
       console.log(error)  
    }
})
//http://localhost:5000/api/persons/findById
//5- Use model.findById() to Search Your Database By _id

router.get("/findById/:id",async(req,res)=>{

    try {
      const user= await Person.findById(req.params.id)
        res.json({user})
    } catch (err) {
        console.log(err)
    }})


//http://localhost:5000/api/persons/classicUpdate
//6-Perform Classic Updates by Running Find, Edit, then Save
//
router.put("/classicUpdate/:id",(req,res)=>{

        Person.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    }
    const hum = data.favoriteFoods.push("humburger");
    res.json({hum})
    data.save((err, data) => {
      if (err) {
        console.log(err);
      }
  
      console.log(data);
    });
  })});

//http://localhost:5000/api/persons/findOneUpdate
//7-Perform New Updates on a Document Using model.findOneAndUpdate()
//
router.put("/findOneUpdate",async(req,res)=>{
    
try {
     const age=await  Person.findOneAndUpdate({name:req.body.name},{$set:{age:20}})
    res.json({msg:"age Edited",age})
} catch (err) {
    console.log(err)
}})


//http://localhost:5000/api/persons/deletePerson
//8-Delete One Document Using model.findByIdAndRemove
//
router.delete("/deletePerson/:id",async(req,res)=>{
    try {
        const user=await Person.findOneAndDelete({_id:req.params.id})
        console.log(user)
         res.json({msg:"user deleted",user}) 
        
    } catch (err) {
        console.log(err)
        
    }
})
//http://localhost:5000/api/persons/deletemany
//9-MongoDB and Mongoose - Delete Many Documents with model.remove()
// delete many
router.delete("/deletemany",async(req,res)=>{
    try {
       const user=await Person.remove({ name: "mary" })
       console.log(user)
       res.json({msg:"users deleted",user})
    } catch (err) {
        console.log(err)
    }

  });
//http://localhost:5000/api/persons/findchain
//10-Chain Search Query Helpers to Narrow Search Results
router.get("/findchain",(req,res)=>{
Person
  .find({ favoriteFoods: { $all: ["grill"] } })
  .sort({ age: "asc" })
  .limit(4)
  .select({ name: true })
  .exec((err, data) => {
    if (err) {
        console.log(err);
      }
  
      console.log(data);
      res.json({msg:"action done",data})
    
        
  })});


    module.exports=router