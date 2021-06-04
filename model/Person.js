const mongoose=require('mongoose')

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        
    },
    age:{type:Number} ,

favoriteFoods: {type:[String]}
})
module.exports=mongoose.model('persons',personSchema)