const express=require("express")
const mongoose=require('mongoose')
const url= 'mongodb://localhost/Products'
const app=express()

mongoose.connect(url,{
    useNewUrlParser:true
})

const con=mongoose.connection

con.on('open',function(){
    console.log('connected..')
})

app.use(express.json())

const productRouter = require('./routers/products')
app.use('/products',productRouter)

app.listen(8080,function(){
    console.log('Server started..')
})