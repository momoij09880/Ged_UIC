const fs = require('fs');
const PDFParser = require('pdf-parse');

const { Configuration, OpenAIApi}= require("openai");
const { text } = require("pdfkit");
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.key,
});
//const key='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';
const openai= new OpenAIApi(configuration);


// Chemin du fichier PDF à extraire
const pdfPath = "C:/Users/ATSAI/Downloads/tre.pdf.pdf";
// Lire le fichier PDF
const pdfBuffer = fs.readFileSync(pdfPath);


let contenu;
let longueur;
let diviseur;
let max;
let text1="";
let nbr=0;

// Parser le contenu du PDF
PDFParser(pdfBuffer).then(data => {
  // Extraire le contenu textuel du PDF
   
  for(let i=0;i<4000;i++){
    


  }
  
  longueur= data.text.length;
  diviseur=longueur/4000;
  max=longueur/diviseur;
  //console.log(max);
  
  while(nbr<max){
    text1+=data.text[nbr];
    nbr++;
  }
  //console.log(text1);

  
  async function runCompletion(){
    const completion= await openai.createCompletion({
        model:"text-davinci-003",
        prompt: text1,
    });
    console.log(completion.data.choices[0].text);
 }

 runCompletion();



  
}).catch(error => {
  console.error('Erreur :', error);
});