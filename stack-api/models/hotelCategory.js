const mongoose = require('mongoose')

//Modal for hotel category

var HotelCategory = mongoose.model('category',{
    name : {type:String}
})

module.exports = { HotelCategory }