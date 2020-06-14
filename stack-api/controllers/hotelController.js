const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId
var multer = require('multer')
var uniqid = require('uniqid')

var { NewProduct } = require('../models/newHotel')

//APIs for manage hotels

//API for get hotel details
router.get('/',(req,res)=>{
    NewProduct.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving all records : '+JSON.stringify(err,undefined,2))
        }
    })
})

//API for create new hotel record 

router.post('/',(req,res)=>{
    var newRecord= new NewProduct({
        name : req.body.name,
        category : req.body.category,
        quantity : req.body.quantity,
        price : req.body.price,
        discount : req.body.discount,
        image : req.body.image
    })

    newRecord.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while register : '+JSON.stringify(err,undefined,2))
        }
    })
})

//API for update hotel details 

router.put('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    var updateRecords={
        name : req.body.name,
        category : req.body.category,
        quantity : req.body.quantity,
        price : req.body.price,
        discount : req.body.discount,
        image : req.body.image
    }

    NewProduct.findByIdAndUpdate(req.params.id, { $set: updateRecords},{new:true}, (err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

//API for delete hotel

router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send('No record with given id : '+req.params.id)
    }

    NewProduct.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while updating records : '+JSON.stringify(err,undefined,2))
        }
    })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, uniqid() + '-' +file.originalname )
  }
})

//For upload handle hotel image

var upload = multer({ storage: storage }).single('file')

router.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

})

module.exports = router