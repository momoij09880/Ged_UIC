const http=require('http');

//d=faut utilise fs pour les fichier hml qu'on souhaite envoyer au client
const fs= require('fs');

//créé un serveur et on affiche un message quand le serveur est créé
const serveur= http.createServer((requete,reponse)=>{
    //console.log("serveur créé");
   // console.log(requete);
    /*afficheer l'url de la requette*/ 
    //console.log(requete.url);

    /**Une reponse à toujour une entete */
    reponse.setHeader("content-type","text/html");
    //on ecrit la reponse
    let fichier="";
    fichier= "./te/index.html";
  
    //pour avoir une reponse du serveur
    fs.readFile(fichier, (erreur,donnee)=>{
        reponse.write(donnee);
        reponse.end();
    })
}) 
    // lecture du fichier html et envoie de la reponse
 
// pour permettre à notre serveur de pouvoir ecouter les requettes(numero du port,le domaine,une fonction callback qu s'execute lorsque le serveur est pret à ecouter les requettes
serveur.listen(3001,"localhost",()=>{
    console.log("pret à ecouter les requettes");
})