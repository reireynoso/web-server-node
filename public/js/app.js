console.log("Cloent side server")

fetch('http://puzzle.mead.io/puzzle')
.then(resp => resp.json())
.then(data => {
    console.log(data)
})
 


fetch('http://localhost:3000/weather?address=new_york')
.then(resp => resp.json())
.then(data => {
    // console.log(data.error)
    if(!data.error){
        console.log(data.forecast.summary)
        console.log(data.location)
    }
    else{
        console.log(data.error)
    }   
})

