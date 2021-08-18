const express=require("express")
const mongoose=require('mongoose')
const url= 'mongodb://localhost/Products'
const app=express()
const registerViews=require('./routers/views')

mongoose.connect(url,{
    useNewUrlParser:true
})

const con=mongoose.connection

con.on('open',function(){
    console.log('connected..')
})

app.use(express.json())
app.use(express.urlencoded());
app.set('views', 'views');
app.set('view engine', 'ejs')

registerViews(app)

const productRouter = require('./routers/products')
app.use('/products',productRouter)

app.listen(8080,function(){
    console.log('Server started..')
})