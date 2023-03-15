

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
