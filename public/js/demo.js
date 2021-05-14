



const weatherForm=document.querySelector('form')
const input=document.querySelector('input')
const m1=document.querySelector('#message-1')
const m2=document.querySelector('#message-2')
const m3=document.querySelector('#message-3')
const m4=document.querySelector('#message-4')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const city=input.value


    m1.textContent='Loading....'
    m2.textContent=''
    m3.textContent=''
    m4.textContent=''
    const someurl='http://api.weatherstack.com/current?access_key=973bd6978203587589e9722d1583ddec&query='
    fetch('/weather?address='+city)
    .then((response)=>{
            response.json().then((data)=>{
            if(data.error)
            {
               // console.log(data.error.info)
                m1.textContent="Try a different city"
            }
            else
            {
                // console.log('You requested for the weather of '+data.location.name+' in the region of '+data.location.region)
                // console.log('The weather description is '+data.current.weather_descriptions[0])
                // console.log('It is currently '+data.current.temperature+'°C with '+data.current.humidity+'% humidity')
                // console.log('It feels like '+data.current.feelslike+'°C')
                m1.textContent='You requested for the weather of '+data.city+' in the region of '+data.region
                m2.textContent='The weather description is '+data.weather_description
                m3.textContent='It is currently '+data.temperature+' with '+data.humidity+' humidity'
                m4.textContent='It feels like '+data.feelslike
            }
    })
})
    
})