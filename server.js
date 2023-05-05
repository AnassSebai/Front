const express = require("express");
const bodyParser= require("body-parser");
const cors = require('cors');
//on recupere le module fs
const app = express();//initialiation de l'application web
const port = 3000;//port sur lequel le serveur web est lancé


function main(){

    app.use(express.static('public'));
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: true}));
     


    app.listen(port,function() {//lance le serveur web est a l'ecoute
        console.log(`Serveur lancé sur http.//localhost: ${port}`);
    });
 
    // on pourra creer une page
}
main();

