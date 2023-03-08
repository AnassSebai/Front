// Fonction pour ajouter un événement d'écouteur de formulaire
function addEventListener() {
  // Sélectionner le formulaire d'ajout de client par ID
  var form = $('#addClientForm');

  // Attacher un événement de soumission de formulaire au formulaire
  form.on('submit', function(event) {
    // Empêcher le formulaire de se soumettre normalement
    event.preventDefault();

    // Récupérer les données du formulaire
    var formData = form.serialize();

    // Envoyer les données à la serveur via une requête AJAX POST
    $.ajax({
      type: 'POST',
      url: '/api/clients',
      data: formData,
      success: function(response) {
        // Ajouter le nouveau client au tableau
        addClientToTable(response);

        // Effacer le formulaire après l'ajout
        form[0].reset();

        // Afficher un message de confirmation
        $('#addClientSuccess').fadeIn().delay(2000).fadeOut();
      },
      error: function(error) {
        // Afficher un message d'erreur
        alert('Une erreur est survenue lors de l\'ajout du client.');
      }
    });
  });
}

// Fonction pour ajouter une ligne à un tableau avec les données d'un client
function addClientToTable(client) {
  $('#clientsTable tbody').append(
    '<tr>' +
      '<td>' + client.id + '</td>' +
      '<td>' + client.last + '</td>' +
      '<td>' + client.first + '</td>' +
      '<td>' + client.company + '</td>' +
      '<td>' + client.email + '</td>' +
      '<td>' + client.created_at + '</td>' +
      '<td>' + client.country + '</td>' +
    '</tr>'
  );
}

$(document).ready(function() {
  // Appeler la fonction addEventListener() pour ajouter l'événement d'écouteur de formulaire
  addEventListener();

  function getData() {
    $.get('/api/clients', function(data) {
      console.log(data); // afficher les données récupérées dans la console

      // Parcourir les données et ajouter chaque client dans le tableau
      for (var i = 0; i < data.length; i++) {
        addClientToTable(data[i]);
      }
    }).fail(function(error) {
      console.log(error); // afficher les erreurs dans la console
    });
  }

  // Appeler la fonction getData() au chargement de la page
  getData();
});
