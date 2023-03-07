const express =require('express');
const app = express();//initialiation de l'instance express
const port = 3000;// le port d'ecoute 

function main(){
    // Ajouter un middleware pour servir les fichiers statiques dans le dossier "Front"
    app.use(express.static("Front"));
    //on démare le serveur d'une façon qu'on écoute les requêtes entrantes 
    app.listen(port,() =>{
        console.log(`le port utilisé ${port}`);
    });
}
main();
