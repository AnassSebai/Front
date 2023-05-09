// Instructions à faire lors du chargement du document
addEventListener("DOMContentLoaded",
    async function(){
        const number = 10;
        // Afficher la première page
        await charger(number, 1, 0);
        // Si on n'est pas sur la page de modification --> afficher la pagination et check des boutons supprimés
        if (window.location.pathname == '/' || window.location.pathname == '/index.html')
        {
            await pagination(number);
            await check_del_customer(1);
        }
    });

async function charger(numberbypage, page, condition) 
{
    // Récupération des données dans le serveur
    const resCustomers = await getCustomer(numberbypage, page);
    // Affichage des données
    dessiner(resCustomers);
    // Check des boutons supprimer ou non
    if(condition != 0)
    {
        console.log("test del customer");
        await check_del_customer(page);
    }
}


function getCustomer(numberbypage, page){
    return new Promise((resolve, reject) => {
        const urlApi = "http://localhost:3001/api/customers?number=" + numberbypage + "&page=" + page; 
        $.get( urlApi, {} )
        .done(function( data ) {
            resolve(data);
        })
        .fail(function(error) {
            reject(new Error(`Une erreur est survenue lors de la récupération des données: ${error.statusText}`));
        }); 
    });
}

function dessiner(table)
{
    const tbCustomers = document.getElementById("tbCustomers");  
    tbCustomers.innerHTML = "";
    for (const customer of table.result) 
    {
        // Si on est sur la page d'accueil
        if (window.location.pathname == '/index.html' || window.location.pathname == '/')
        {
            const htmlContent = "<tr><td id='id'>" + customer.id +
                            "</td><td>" + customer.last + 
                            "</td><td>" + customer.first + 
                            "</td><td>" + customer.email + 
                            "</td><td>" + customer.company + 
                            "</td><td>" + customer.country + 
                            "</td><td>" + customer.created_at + 
                            "</td><td><a href='modifier.html?number=" + customer.id +"'>Modifier </a>" +
                            "</td><td><button id='delButton'>Supprimer</button>";
            tbCustomers.insertAdjacentHTML('beforeend', htmlContent);
        }
        // Si on est sur la page modification client
        else
        {
            const htmlContent = "<tr><td id='id'>" + customer.id +
                            "</td><td class='modif'><input type='text' id='last' placeholder=" + customer.last + ">" +
                            "</td><td class='modif'><input type='text' id='first' placeholder=" + customer.first + ">" +
                            "</td><td class='modif'><input type='email'id='email' placeholder=" + customer.email + " required pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'>" +
                            "</td><td class='modif'><input type='text' id='company' placeholder=" + customer.company + ">" +
                            "</td><td class='modif'><input type='text' id='country' placeholder=" + customer.country + ">" +
                            "</td><td>" + customer.created_at + 
                            "</td><td><form id='modifForm' action='/index.html'><button id='submitButton' type='submit'>Valider</button></form></tr>"; // Ajouter la method = post une fois le back configuré
            tbCustomers.insertAdjacentHTML('beforeend', htmlContent);
            // Vérification manuelle des données rentrés car il n'est pas possible d'inclure la balise input dans le form
           verifier();
        }     
    }
}




async function pagination(numberbypage) {
    // Affichage de la pagination
    const pagination = document.querySelector('.pagination_li');
    pages(pagination, 1, numberbypage);
    // Si l'utilisateur clique sur un nombre de la pagination --> chargement d'une autre page
    pagination.addEventListener("click", async function (event) {
        event.preventDefault();
        // Récupération de la page cliqué
        const page = parseInt(event.target.dataset.page); 
        if (page) 
        {
            try 
            {
                // Chargement et affichage de la page demandé
                charger(numberbypage, page, 1);
                pages(pagination, page, numberbypage);
            } 
            catch(error) 
            {
                console.error(error);
            };
        }
    }); 
}


async function pages(pagination, currentPage, numberbypage){
    // Récupération du nombre total d'éléments à afficher
    total = await getCustomer(10, 1);
    // Calcul du nombre d'onglets à faire
    const totalPages = (total.total+(numberbypage-1))/numberbypage;
    pagination.innerHTML = "";
    // Calcul de pagination
    // Si la page actuelle est supérieur à 10 alors mettre un onglets 10 pages moins loin
    if(currentPage > 10)
        pagination.innerHTML += `<li><a href="#" id="clickable" data-page="${currentPage-10}"><<</a></li>`;
    else
        pagination.innerHTML += `<li><a href="#" id="clickable" data-page="${1}"><<</a></li>`;
    // Changement d'id
    const id = document.getElementById('clickable');
    id.id = "newid";
    // Mise en forme
    style(id,3);
    style(pagination,1);
    // Calcul général de la pagination
    for (let i = 1; i <= totalPages; i++) 
    {
        // Onglet de la page actuelle non disponible au clique
        if (i === currentPage) 
        {
            pagination.innerHTML += `<li><span class="nonclickable">${i}</span></li>`;
            style(document.querySelector('.nonclickable'),2);
        }
        // Affichage des trois premiers, trois derniers onglets et les trois onglets autour de la page actuelle
        else if (i <= 3 || i >= totalPages - 2 || (i >= currentPage - 1 && i <= currentPage + 1)) 
        {
            pagination.innerHTML += `<li><a href="#" id="clickable" data-page="${i}">${i} </a></li>`;
            const id = document.getElementById('clickable');
            id.id = "newid";
            style(id,3);
        } 
        // Résolution d'un bug sur la page 104
        if ((i === 3 && currentPage > 5) || (i === totalPages - 3 && currentPage < totalPages - 4) || (i == currentPage + 2 && i<(totalPages-101)) ) 
        {
            if(currentPage != 104)
                pagination.innerHTML += `<span>...</span>`;
        }
        // Affichage de tout les + 100
        for(let j = 100; j<=(totalPages-100); j = j + 100)
        {
            if ((i >3) && (i === currentPage + j || i === currentPage - j) && i<(totalPages-2)) 
            {
                if(i < (totalPages-103))
                    pagination.innerHTML += `<li><a href="#" id="clickable" data-page="${i}">${i} </a><span>...</span></li>`;
                else
                    pagination.innerHTML += `<li><a href="#" id="clickable" data-page="${i}">${i} </a></li>`;
                const id = document.getElementById('clickable');
                id.id = "newid";
                style(id,3);
            }
        }
    }
    // Si la page actuelle est inférieur à 10 alors mettre un onglets 10 pages moins loin
    if(currentPage < (totalPages - 10))
        pagination.innerHTML += `<li><a href="#" id="clickable" data-page="${currentPage+10}">>></a></li>`;
    else
        pagination.innerHTML += `<li><a href="#" id="clickable" data-page="${totalPages}">>></a></li>`;
    // Changement d'id
    const ids = document.getElementById('clickable');
    ids.id = "newid";
    // Mise en forme de la pagination
    style(ids,3);
}

function style(pagination,number){
    if (number == 1)
    {
            const style = pagination.style;
            style.display = "flex";
            style.listStyle = "none";
            style.paddingTop = "10px";
            style.paddingBottom = "10px";
            style.paddingLeft = "0px";
            style.justifyContent = "flex-start"; // ajouter cette ligne pour aligner le menu à gauche
  }
  if(number == 2)
  {
    const style = pagination.style; 
    style.padding = "3px";
    style.backgroundColor = "#474747";
    style.color = "red";
    style.overflow = "visible";
  }
  if(number == 3)
  {
    const style = pagination.style;
    style.border = "1px solid";
    style.padding = "5px";
    style.borderRadius = "3px";
    style.marginLeft = "3px";
    style.marginRight = "3px";
   }
}






//verification des valeurs du formulaire de modification
function verifier() {
    const lastInput = document.getElementById("last");
    const firstInput = document.getElementById("first");
    const emailInput = document.getElementById("email");
    const companyInput = document.getElementById("company");
    const countryInput = document.getElementById("country");
    const submitButton = document.getElementById("submitButton");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    submitButton.addEventListener("click", function(event) {
      const last = lastInput.value;
      const first = firstInput.value;
      const email = emailInput.value;
      const company = companyInput.value;
      const country = countryInput.value;
  
      if (last === "" || first === "" || company === "" || country === "") {
        event.preventDefault();
        alert("Veuillez remplir tous les champs requis");
      } else if (!emailPattern.test(email)) {
        event.preventDefault();
        alert("Veuillez entrer une adresse e-mail valide");
      }
    });
}
