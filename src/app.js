const path=require('path')
const express= require('express')
const hbs=require('hbs')
const request = require('request')

const app=express()
const pathdir=path.join(__dirname,'../public')
const viewsdir=path.join(__dirname,'../templates/views')
const partialdir=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsdir)
app.use(express.static(pathdir))
hbs.registerPartials(partialdir)


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Anirudh'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Address should be entered'
        })
    }
    const city=req.query.address
    const url ='http://api.weatherstack.com/current?access_key=973bd6978203587589e9722d1583ddec&query='+encodeURIComponent(city)
    request({url, json:true},(error,{body}=response)=>{
         if(body.error)
        {
            return res.send({error:'enter better city'})
        }
        else{
            const data=body
            return res.send({
                city:data.location.name,
                region:data.location.region,
                weather_description:data.current.weather_descriptions[0],
                temperature:data.current.temperature+'°C',
                humidity:data.current.humidity+'%',
                feelslike:data.current.feelslike+'°C'
            })
            // console.log(chalk.red.bold('You requested for the weather of '+data.location.name+' in the region of '+data.location.region))
            // console.log(chalk.white('-------------------------------------------------------------------------------------------------------'))
            // console.log(chalk.yellow.bold('The weather description is '+data.current.weather_descriptions[0]))
            // console.log(chalk.white('-------------------------------------------------------------------------------------------------------'))
            // console.log(chalk.blue.bold('It is currently '+data.current.temperature+'°C with '+data.current.humidity+'% humidity'))
            // console.log(chalk.white('-------------------------------------------------------------------------------------------------------'))
            // console.log(chalk.green.bold('It feels like '+data.current.feelslike+'°C'))
        }
    
    
    })

})

app.get('/help',(req,res)=>{
    res.render('help',{
        help:'help text',
        title:'help',
        name:'Anirudh'

    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Anirudh'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Help article not found',
        name:'Anirudh'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Page not found',
        name:'Anirudh'
    })
})

app.listen(3030,()=>{
    console.log('Server started at port 3030')
})