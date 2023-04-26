const fs = require('fs');
const PDFParser = require('pdf-parse');

// Charger le contenu du fichier PDF
const pdfBuffer = fs.readFileSync("C:/Users/ATSAI/Downloads/tre.pdf.pdf");

// Parse du contenu du PDF
let longueur;
let diviseur;
let max;
let text1="";
let nbr=0;
PDFParser(pdfBuffer)
  .then(data => {
    // Récupérer le contenu textuel de la première page du PDF
    //const page = data.getTextContent();
    //console.log('Contenu de la page 1 du PDF :', page.getTextContent);

    //console.log(data.text[101].toString());
     
    /**let mo="";
  for(let i=0;i<4000;i++){
    mo+=data.text[i].toString()
  }
  console.log(mo); */


  longueur= data.text.length;
  diviseur=longueur/4000;
  max=longueur/diviseur;
  console.log(max);
  
  while(nbr<max){
    text1+=data.text[nbr];
    nbr++;
  }
  console.log(text1);

  })
  .catch(error => {
    console.error('Erreur lors de l\'extraction du contenu du PDF :', error);
  });
