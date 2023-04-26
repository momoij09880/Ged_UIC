 
const fs = require('fs');
const PDFParser = require('pdf-parse');

// Chemin du fichier PDF à extraire
const pdfPath = "C:/Users/ATSAI/Downloads/tre.pdf.pdf";

// Lire le fichier PDF
const pdfBuffer = fs.readFileSync(pdfPath);
let contenu;
// Parser le contenu du PDF
PDFParser(pdfBuffer).then(data => {
  // Extraire le contenu textuel du PDF
   contenu = data.text;
  

  console.log(contenu.length);



  // Afficher le contenu extrait
  
}).catch(error => {
  console.error('Erreur :', error);
});

