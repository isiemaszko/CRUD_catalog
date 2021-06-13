const express=require("express")
const router =express.Router()
const Product=require('../models/product')

router.get('/', async(req,res)=>{
   // res.send('Get request')
    try{
        const products= await Product.find()
        res.json(products)
    }
    catch(err){
        res.send('Error '+err)
    }
})

router.get('/:id', async(req,res)=>{
    // res.send('Get request')
     try{
         const product= await Product.findById(req.params.id)
         res.json(product)
     }
     catch(err){
         res.send('Error '+err)
     }
 })

router.post('/', async(req,res)=>{

    const product=new Product({
        name:req.body.name,
        price:req.body.price,
        category:req.body.category,
        producent:req.body.producent
    })

    try{
        const pr= await product.save()
        res.json(pr)
    }
    catch(err){
        res.send('Error '+err)
    }
})

router.patch('/:id', async(req,res)=>{
   

    try{
        const product= await Product.findById(req.params.id)
        if(req.body.name) product.name=req.body.name
        if(req.body.price) product.price=req.body.price
        if(req.body.category) product.category=req.body.category
        if(req.body.producent) product.producent=req.body.producent
        
        const newProduct=await product.save()
        res.json(newProduct)
    }
    catch(err){
        res.send('Error '+err)
    }
})

router.delete('/:id', async(req,res)=>{
    // res.send('Get request')
     try{
         const product= await Product.deleteOne({_id:req.params.id})
        
         res.send('Delete success')
     }
     catch(err){
         res.send('Error '+err)
     }
 })

module.exports=router
