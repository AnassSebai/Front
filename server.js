const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

function main() {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.static(('public')));

  // Tableau de clients
  const clients = [];

  // Route pour récupérer tous les clients
  app.get('/clients', (req, res) => {
    res.json(clients);
  });

  // Route pour ajouter un nouveau client
  app.post('/clients', (req, res) => {
      // Génère un ID unique pour le nouveau client
      const newClientId = clients.length > 0 ? clients[clients.length - 1].id + 1 : 1;

      // Génère automatiquement la date
      const date = new Date().toLocaleDateString();

      // Crée le nouveau client
      const newClient = {
        id: newClientId,
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        societe: req.body.societe,
        pays: req.body.pays,
        date: date
      };

      // Ajoute le nouveau client au tableau
      clients.push(newClient);

      // Renvoie le nouveau client avec le code de statut 201 Created
      res.status(201).json(newClient);
    });

  // Port d'écoute
  const port = 3000;
  app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
  });
}

main();
