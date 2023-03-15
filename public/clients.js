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
});


function getData()
{
  const tableau = 
  [{"id":1,"email":"isidro_von@hotmail.com","first":"Torrey","last":"Veum","company":"Google","created_at":"2014-12-25T04:06:27.981Z","country":"Switzerland"},
      {"id":2,"email":"frederique19@gmail.com","first":"Micah","last":"Sanford","company":"Google","created_at":"2014-07-03T16:08:17.044Z","country":"Democratic People's Republic of Korea"},
      {"id":3,"email":"fredy54@gmail.com","first":"Hollis","last":"Swift","company":"Microsoft","created_at":"2014-08-18T06:15:16.731Z","country":"Tunisia"},
      {"id":4,"email":"braxton29@hotmail.com","first":"Perry","last":"Leffler","company":"Microsoft","created_at":"2014-07-10T11:31:40.235Z","country":"Chad"},
      {"id":5,"email":"turner59@gmail.com","first":"Janelle","last":"Hagenes","company":"Amazon","created_at":"2014-04-21T15:05:43.229Z","country":"Swaziland"}];
  return tableau;
}

addEventListener("DOMContentLoaded",function () {
  console.log("Le document est chargé");
  $("#client").loadTemplate($("#tmpClient"),getData());
});
===========================================================================================


document.addEventListener("DOMContentLoaded",async function() {

  //code
  console.log("Le document est chargé");

  //declare url
  const url = "http://localhost:3001/api/customers";

  //call function to get Data
  const resp = await getAjaxResponse(url);

  //parse data 
  //const respJson= JSON.parse(resp);
  //console.log(respJson);

  const customers = resp;
  console.log(customers);
  

  
  
  document.getElementById("id").innerHTML = customers[0].id;

  document.getElementById("last").innerHTML = customers[0].last;

  document.getElementById("first").innerHTML = customers[0].first;

  document.getElementById("company").innerHTML = customers[0].company;
  document.getElementById("country").innerHTML = customers[0].country;
  document.getElementById("email").innerHTML = customers[0].email;
  document.getElementById("created_at" ).innerHTML = customers[0].created_at;


});




async function getAjaxResponse(url) {
     
  return new Promise(function(resolve, reject){
   
    //eslint-disable-next-line 
    $.get(url,{},function(data,status,xhr){

        if(status === "success"){
            resolve(data);

        }else{
            reject(Error(xhr.statusText));
        }
    },"json");

  });

}



*/


document.addEventListener("DOMContentLoaded", async function() {

  console.log("Le document est chargé");

  const url = "http://localhost:3001/api/customers";

  const resp = await getAjaxResponse(url);

  const customers = resp;

  const tableBody = document.getElementById("customers");
  

  for (let i = 0; i < customers.length; i++) {
    const customer = customers[i];

    const row = tableBody.insertRow();

    const idCell = row.insertCell();
    idCell.innerHTML = customer.id;

    const lastCell = row.insertCell();
    lastCell.innerHTML = customer.last;

    const firstCell = row.insertCell();
    firstCell.innerHTML = customer.first;

    const companyCell = row.insertCell();
    companyCell.innerHTML = customer.company;

    const countryCell = row.insertCell();
    countryCell.innerHTML = customer.country;

    const emailCell = row.insertCell();
    emailCell.innerHTML = customer.email;

    const createdAtCell = row.insertCell();
    createdAtCell.innerHTML = customer.created_at;
  }
 

});

async function getAjaxResponse(url) {
  return new Promise(function(resolve, reject) {
    $.get(url, {}, function(data, status, xhr) {
      if (status === "success") {
        resolve(data);
      } else {
        reject(Error(xhr.statusText));
      }
    }, "json");
  });
}
