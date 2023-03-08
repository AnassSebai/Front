const express =require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

function main(){
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req,res) => {
        res.set('Content-Type', 'text/html');
        res.sendFile(__dirname + '/public/index.html');
    });

    app.get("/liste.html", (req,res) => {
        res.set('Content-Type', 'application/json');
        // Code pour renvoyer la liste des clients
    });

    app.post('/api/clients', (req, res) => {
        const newClient = req.body;
        // Code pour ajouter le nouveau client à la base de données
        res.status(201).send('Client ajouté avec succès');
    });

    app.listen(port,function() {
        console.log(`Serveur lancé sur http://localhost:${port}`);
    });
}

main();
