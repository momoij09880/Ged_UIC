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

let chaine;
let mot_clé;
let list_mot=[];

//methode pour intéragir avec chatgpt àfin d'obtenir les mots clé d'un document pdf
async function runCompletion(test){
  const completion= await openai.createCompletion({
      model:"text-davinci-003",
      prompt: test + " donnes moi les mots clés de ce texte en ajoutant mots clés: " ,
  });
  
   chaine=completion.data.choices[0].text;
   /*On récupère la reponse de chatgpt on la divise en fonction des virgule on le mets dans un tableau et on obtient tous les mots clé du tableau*/
   mot_clé=chaine.split(",");
  
   for(let i=0;i<mot_clé.length;i++){
   // console.log(mot_clé[i]);
    list_mot.push(mot_clé[i]);
   }
  // console.log(list_mot.length);

}


//methode qui permet d'intéragir avec chatgpt afin de savoir de quoi parle un texte
async function talkaboutgpt(test){
  const completion= await openai.createCompletion({
      model:"text-davinci-003",
      prompt: test + "fais moi un résumé de ce texte" ,
  });
  
   chaine=completion.data.choices[0].text;
   console.log(chaine);
}


/*On sait que chatgpt à un prompt qui est limité pour lui soumettre un un text qu'il doit traiter, il faut le diviser, diviser le text par 4000, 4000 etant la taille max de mot accepté */
async function talkabout(pdfPath){
  const pdfBuffer = fs.readFileSync(pdfPath);
  PDFParser(pdfBuffer).then(data => {
  let contenu;
let longueur;
let diviseur;
let max;
let text1="";
let nbr=0;
let actu=0;
let mot_clé=[];
let resumé="";
console.log(data.text.length);

while(actu<data.text.length){

  longueur=data.text.length;
  diviseur =longueur/4000;
  max=longueur/diviseur;

  while(nbr<max){
    text1+=data.text[nbr];
    //console.log("morel",nbr);
    nbr++;
    
  }
  
  resume+=talkaboutgpt(text1);
  actu+=max;

} 
}).catch(error => {
  console.error('Erreur :', error);
});
}



/*methode permerttant d'obtenir les mots clés d'un text provenant d'un document pdf */
async function keyswords(pdfPath){
    const pdfBuffer = fs.readFileSync(pdfPath);
      // Parser le contenu du PDF
    PDFParser(pdfBuffer).then(data => {
      // Extraire le contenu textuel du PDF
      let contenu;
    let longueur;
    let diviseur;
    let max;
    let text1="";
    let nbr=0;
    let actu=0;
    let mot_clé=[];
    console.log(data.text.length);

    while(actu<data.text.length){

        longueur=data.text.length;
        diviseur =longueur/4000;
        max=longueur/diviseur;

        while(nbr<max){

            text1+=data.text[nbr];
            //console.log("morel",nbr);
            nbr++;
            
        }
        runCompletion(text1);
        //talkabout(text1);
        actu+=max;

    } 
    }).catch(error => {
      console.error('Erreur :', error);
    });
}


/*extraire le texte d'un document page par page */
async function mo(pdfPath){

    const pagenumb=2;
    const pdfBuffer = fs.readFileSync(pdfPath);
 // Parser le contenu du PDF
    PDFParser(pdfBuffer).then(data => {

        const pages= data.text.split('\n\n');

        for(let i=0;i<data.numpages;i++){

            console.log("page ",i+1);
            runCompletion(pages[i]);
          
        }


    }).catch(error => {
      console.error('Erreur :', error);
    });
    }



/**Methode qui permet de faire des recherche dans un document pdf */
async function search(pdfPath,mot){

  mot=mot.toLowerCase();
  const pagenumb=2;
  const pdfBuffer = fs.readFileSync(pdfPath);
// Parser le contenu du PDF
  PDFParser(pdfBuffer).then(data => {

      const pages= data.text.split('\n\n');

      for(let i=0;i<data.numpages;i++){

          //console.log("page ",i+1);
          //runCompletion(pages[i]);
          pages[i].toLocaleLowerCase();
          if(pages[i].indexOf(mot)!==-1){
            console.log("le mot à été trouver à la page ",i);
          }
        
      }
  }).catch(error => {
    console.error('Erreur :', error);
  });
  }


/*Methode qui permet d'afficher tout les documents pdf qui contient un mot */
//prends en parametre une list d'adresse de fichier pdf ainsi que le mot recherché
async function search_all(list,mot){

  //faire une boucle qui parcour la list d'adresse des doc(à adapter au code pour prendre directement depuis la base de donnée)
  for(let i=0;i<list.length;i++){
    
    // une adresse est passer
        PDFParser(list[i]).then(data => {

          //on decoupe le document en fonction de ses page
          const pages= data.text.split('\n\n');

          // on lance la recherche
          for(let j=0;i<data.numpages;j++){

             pages[j].toLocaleLowerCase();
             
              if(pages[j].indexOf(mot)!==-1){
                
                console.log("le mot à été dans le document",i," à la page ",j);
              }
            
          }
      }).catch(error => {
        console.error('Erreur :', error);
      });

  }

}


//keyswords("C:/Users/ATSAI/Downloads/tre.pdf.pdf");
//mo("C:/Users/ATSAI/Downloads/tre.pdf.pdf");
search("C:/Users/ATSAI/Downloads/tre.pdf.pdf","general");

