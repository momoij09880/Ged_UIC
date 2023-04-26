const fs= require('fs')
const pdf=require('pdf-parse')
let dataBuffer=fs.readFileSync('C:/Users/ATSAI/Downloads/tre.pdf.pdf')
pdf(dataBuffer).then(function(data){
    console.log(data.text)
})
//console.log(dataBuffer);