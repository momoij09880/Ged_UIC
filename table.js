const fs = require('fs');
const { PDFReader } = require('pdfreader').PDFReader;

async function extractTOC() {
  const filePath = 'chemin/vers/votre/fichier.pdf';
  const rows = {};

  new PDFReader().parseFileItems(filePath, function(err, item) {
    if (err) console.error(err);
    else if (!item) {
      // Lorsque la lecture est terminée, affichez les données de la table des matières
      console.log(rows);
    } else if (item.text) {
      // Recherchez la table des matières dans le PDF en utilisant des expressions régulières
      if (/^Table\s*of\s*Contents/i.test(item.text)) rows[item.text] = [];
      else if (/Chapter\s*\d+/i.test(item.text) && rows['Table of Contents']) {
        rows['Table of Contents'].push(item.text);
      }
    }
  });
}

extractTOC();
