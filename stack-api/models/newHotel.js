const mongoose = require('mongoose')

//Modal for new new hotel

var NewProduct = mongoose.model('product',{
    name : {type:String},
    category : {type:String},
    quantity : {type:Number},
    price : {type:Number},
    discount : {type:Number},
    image : {type:String},
})

module.exports = { NewProduct }