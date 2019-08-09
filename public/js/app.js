console.log("Cloent side server")

fetch('http://puzzle.mead.io/puzzle')
.then(resp => resp.json())
.then(data => {
    console.log(data)
})
 

const weatherForm = document.querySelector("form")
const searchBar = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.innerText = "Loading..."
    const location = searchBar.value 
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then(resp => resp.json())
    .then(data => {
        // console.log(data.error)
        if(!data.error){
            console.log(data.forecast.summary)
            console.log(data.location)
            messageOne.innerText = data.forecast.summary
            messageTwo.innerText = data.location
        }
        else{
            console.log(data.error)
            messageOne.innerText = data.error
        }   
    })
})