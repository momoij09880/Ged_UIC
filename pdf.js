const pdfjsLib = require('pdfjs-dist');

// Chemin du fichier PDF que vous souhaitez extraire
const pdfPath = 'chemin/vers/votre/fichier.pdf';

// Fonction qui récupère les données du PDF
async function getDataFromPdf() {
  const pdf = await pdfjsLib.getDocument(pdfPath).promise;
  const numPages = pdf.numPages;
  const data = [];

  // Boucle à travers chaque page du PDF
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    data.push(strings);
  }

  console.log(data);
}

getDataFromPdf();
