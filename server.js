const express =require("express");
//on recupere le module fs
const app = express();//initialiation de l'application web
const port = 3000;//port sur lequel le serveur web est lancÃ©

function main(){

    app.use(express.static('public'));
    app.get("/", (req,res) => {

        //HTTP permet de definir le mode de comunication entre le client et le serveur
        //req contient des info sur la requete HTTP
        //res est la reponde de la fonction renvoyer au client
        res.set('Content-Type', 'text/html');//permet de fixer la valeur d'un champs de l'entete HTTP
        res.send('<html><body><h1>Accueil</h1></body></html>');//permet de transmettre une reponse au client
       
   
    });

    //page 1 contient la liste des clients
    app.get("/liste.html", (req,res) => {

        res.set('Content-Type', 'application/json');
        //res.send( __dirname + '.html');
       
   
    });

    app.listen(port,function() {
        console.log(`Serveur lancÃ© sur http.//localhost: ${port}`);
    });
 
    // on pourra creer une page
}
main();
