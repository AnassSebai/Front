// Au chargement du document faire les instructions suivantes
addEventListener("DOMContentLoaded",
    async function(){
        // Récupération des variables passées via l'URL
        const id = getUserIdFromUrl(); 
        // Chargement du client à modifier
        await charger(1, id, 0);
        // Modification des informations
        await modifier();
    });

function getUserIdFromUrl()
{
    // Récupère ce qu'il y a après le & dans l'URL
    var parameters = location.search.substring(1).split("&");
    // Divise la partie gauche et droite du égal
    var temp = parameters[0].split("=");
    // Récupère la valeur de la variable
    number = decodeURIComponent(temp[1]);
    return number;
}

// Chargement du client à modifier
async function modifier()
{   
    // A l'écoute des clique sur le bouton envoyer
    const modifForm = document.getElementById("modifForm");
    modifForm.addEventListener("submit", function(event){
        event.preventDefault();
        // Prépare les données
        const customer = {
            "id" : document.getElementById("id").textContent,
            "first" : document.getElementById("first").value,   
            "email" : document.getElementById("email").value,
            "last" : document.getElementById("last").value,
            "company" : document.getElementById("company").value,
            "country" : document.getElementById("country").value}

        // Modification des données sur le serveur
        modifierClient(customer); 
        alert("client modifié avec succès!");
        // Redirection vers la page d'accueil
        window.location.href="index.html";
    });
}

// Modification des données sur le serveur
function modifierClient(customer) {
    const url="http://localhost:3001/api/customers";
    $.ajax({
        url: url,
        type: 'PUT',
        data: customer,
        success: function(result) {
          console.log('modification avec succès!');
          // Redirection vers la page d'accueil
          window.location.href = "index.html";
        },
        error: function(err) {
          console.error('Erreur ', err);
        }
      });
}