const { response } = require('express')
const Product=require('../models/product')


const registerViews = (app)=>{
    app.get('/', async (req,res)=>{
        try{
            const products= await Product.find({})
         //   console.log(products)
            res.render('index',{products:products})
        }
        catch(err){
            res.send('Error '+err)
        }
       
    })

    app.get('/', async (req,res)=>{
        res.render('index')
    })

    app.get('/create', async (req,res)=>{
        res.render('create')
    })

    app.get('/edit/:id', async (req,res)=>{
        const product= await Product.findById(req.params.id)
        res.render('edit',{product:product})//wyśietlenie formularza
    })

    app.get('/delete/:id', async (req,res)=>{
        res.render('delete',{idd:req.params.id})
    })

    app.post('/create', async(req,res)=>{

        const product=new Product({
            name:req.body.name,
            price:req.body.price,
            category:req.body.category,
            producent:req.body.producent
        })
        console.log("prod" + product)
        try{
            const pr= await product.save()
            res.redirect('/')
        }
        catch(err){
            res.send('Error '+err)
        }
    })
    
    app.post('/delete', async(req,res)=>{
        // res.send('Get request')
        console.log(req.body._id)
         try{
             const product= await Product.deleteOne({_id:req.body._id})
            
             res.redirect('/')
         }
         catch(err){
             res.send('Error '+err)
         }
     })

    //aktualizacja
    app.post('/edit', async(req,res)=>{
       
        try{
            
            const product= await Product.findById(req.body._id)
            
            if(req.body.name) product.name=req.body.name
            if(req.body.price) product.price=req.body.price
            if(req.body.category) product.category=req.body.category
            if(req.body.producent) product.producent=req.body.producent
            
            const newProduct=await product.save()
            res.redirect('/')
        }
        catch(err){
            res.send('Error '+err)
        }
    })


}



module.exports = registerViews