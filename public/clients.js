/*$(document).ready(function() {
  // écoute l'événement de click sur le bouton submit du formulaire
  $('#newClientsForm').submit(function(event) {
    // évite le comportement par défaut de la soumission du formulaire
    event.preventDefault();

    // récupère les valeurs du formulaire
    var email = $('#email').val();
    var nom = $('#nom').val();
    var prenom = $('#prenom').val();
    var societe = $('#societe').val();
    var pays = $('#pays').val();
    var date = new Date().toISOString();

    // crée un objet client avec les valeurs récupérées du formulaire
    var client = {
      email: email,
      nom: nom,
      prenom: prenom,
      societe: societe,
      pays: pays,
      date: date
    };

    // envoie les données du formulaire en POST à l'API /api/clients
    $.ajax({
      url: '/api/clients',
      method: 'POST',
      data: JSON.stringify(client),
      contentType: 'application/json',
      success: function(data) {
        // ajoute le client à la fin du tableau de clients affiché sur la page
        var id = data.id;
        $('#clientsTable > tbody:last-child').append('<tr><td>' + id + '</td><td>' + data.email + '</td><td>' + data.nom + '</td><td>' + data.prenom + '</td><td>' + data.societe + '</td><td>' + data.pays + '</td><td>' + data.date + '</td></tr>');

        // affiche le message de succès
        $('#message').text('Client ajouté avec succès');

        // vide le formulaire
        $('#newClientsForm')[0].reset();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Erreur: ' + errorThrown);
      }
    });
  });
});*/


function getData()
{
    const tableau = 
    [{"id":1,"email":"isidro_von@hotmail.com","prenom":"Torrey","nom":"Veum","societe":"Google","date":"2014-12-25T04:06:27.981Z","pays":"Switzerland"},
        {"id":2,"email":"frederique19@gmail.com","prenom":"Micah","nom":"Sanford","societe":"Google","date":"2014-07-03T16:08:17.044Z","pays":"Democratic People's Republic of Korea"},
        {"id":3,"email":"fredy54@gmail.com","prenom":"Hollis","nom":"Swift","societe":"Microsoft","date":"2014-08-18T06:15:16.731Z","pays":"Tunisia"},];
    return tableau;
}

addEventListener("DOMContentLoaded",function () {
    console.log("Le document est chargé");
    $("#client").loadTemplate($("#tmpClient"),getData());
});
