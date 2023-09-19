// Récupération du tableau de projets disponibles
const gallery = document.querySelector(".gallery");
let token = localStorage.getItem("token");
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then(function (data) {
    let works = data;
    for (let work of works) {
      //   Insertion de l'élément "figure"
      const worksContainer = document.querySelector(".gallery");
      let workFigure = document.createElement("figure");
      workFigure.setAttribute(
        "class",
        `work-item category-id-0 category-id-${work.categoryId}`
      );
      workFigure.setAttribute("id", `work-item-${work.id}`);
      worksContainer.appendChild(workFigure);
      // Création et insertion de l'élément "img"
      let workImg = document.createElement("img");
      workImg.setAttribute("src", work.imageUrl);
      workImg.setAttribute("alt", work.title);
      workFigure.appendChild(workImg);
      // Insertion du titre "figcaption"
      let workFigcaption = document.createElement("figcaption");
      workFigure.appendChild(workFigcaption);
      workFigcaption.innerHTML = work.title;
    }
  });
//Ajout de  filtre des catégories
// Requet pour la récupération des catégories existant dans l'api
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then(function (data) {
    let categories = data;
    categories.unshift({ id: 0, name: "Tous" });
    //Boucler sur chaque catégorie
    for (let category of categories) {
      //Création de boutons filtre
      let myButton = document.createElement("button");
      myButton.classList.add("work-filter", "filters-design");
      if (category.id === 0)
        myButton.classList.add("filter-active", "filter-all");
      myButton.setAttribute("data-filter", category.id);
      myButton.textContent = category.name;
      //Ajout des nouveaux boutons à la div.filters
      document.querySelector("div.filters").appendChild(myButton);
      // Evenement du click sur <buttton> pour filtrer
      myButton.addEventListener("click", function (e) {
        e.preventDefault();
        // Récupération de tous les filters
        let allWorkFilter = document.querySelectorAll(".work-filter");
        for (let workFilter of allWorkFilter) {
          workFilter.classList.remove("filter-active");
        }
        e.target.classList.add("filter-active");
        // récupération des projets
        let categoryId = myButton.getAttribute("data-filter");
        let workItems = document.querySelectorAll(".work-item");
        for (let workItem of workItems){
          workItem.style.display = "none";
        };
        let workItemCategoriesId = document
          .querySelectorAll(`.work-item.category-id-${categoryId}`)
          for(let workItem of workItemCategoriesId ){
            workItem.style.display = "block";
          };
      });
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  //  Vérifier si token et userId présents dans le localstorage
  if (
    localStorage.getItem("token") != null &&
    localStorage.getItem("userId") != null
  ) {
    // changement d'apparence admin connecté
    document.querySelector("body").classList.add("connected");
    let headerTop = document.getElementById("header-top");
    headerTop.style.display = "flex";
    let filters = document.getElementById("all-filters");
    filters.style.display = "none";
    let margeBas = document.getElementById("marge-bas");
    margeBas.style.paddingBottom = "98px";
    let presentationMargeHaut = document.getElementById(
      "Presentation-marge-haut"
    );
    presentationMargeHaut.style.marginTop = "-50px";
  }
  // Se deconnecter au click sur logout
  document.getElementById("logout").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    // Changement d'apparence au click sur logout
    document.querySelector("body").classList.remove("connected");
    let headerTop = document.getElementById("header-top");
    headerTop.style.display = "none";
    let filters = document.getElementById("all-filters");
    filters.style.display = "flex";
    let margeBas = document.getElementById("marge-bas");
    margeBas.style.paddingBottom = "0";
    let logOut = document.getElementById("logout");
    logOut.style.display = "none";
  });

  // Ouvrir la modale au click sur le bouton modifier
  document
    .getElementById("maj-projets")
    .addEventListener("click", function (event) {
      event.preventDefault();
      // Fetcher tous les projets dans la modal
      fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then(function (data) {
          let works = data;
          // vider les anciens projets.
          document.querySelector(
            "#modal-works.modal-gallery .modal-content"
          ).innerText = "";
          // Boucler sur chaque projet
          for (let work of works) {
            //   Insertion de l'élément "figure"
            const worksContainer = document.querySelector(".gallery");
            let workFigure = document.createElement("figure");
            workFigure.setAttribute(
              "class",
              `work-item category-id-0 category-id-${work.categoryId}`
            );
            workFigure.setAttribute("id", `work-item-${work.id}`);
            worksContainer.appendChild(workFigure);
            // Création et insertion de l'élément "img"
            let workImg = document.createElement("img");
            workImg.setAttribute("src", work.imageUrl);
            workImg.setAttribute("alt", work.title);
            workFigure.appendChild(workImg);
            // Insertion action au "figcaption"
            let workFigcaption = document.createElement("figcaption");
            workFigure.appendChild(workFigcaption);
            // Creation icon poubelle
            let poubelleIcon = document.createElement("i");
            poubelleIcon.classList.add("fa-solid", "fa-trash-can", "trash");
            workFigure.appendChild(poubelleIcon);
            // Suppression
            poubelleIcon.addEventListener("click", function (event) {
              event.preventDefault();
              if (confirm("Voulez-vous supprimer cet élément ?")) {
                // Recuperer pour supprimer projets dans la modale et la gallery
                fetch(`http://localhost:5678/api/works/${work.id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                })
                  .then(function (response) {
                    console.log("Projet supprimé.");
                    //  Suppression de projet de la page
                    document.getElementById(`work-item-${work.id}`).remove();
                    console.log(`work-item-${work.id}`);
                    // Suppression de projet de la page à partir du popup
                    document
                      .getElementById(`work-item-popup-${work.id}`)
                      .remove();
                    console.log(`work-item-popup-${work.id}`);
                  })
                  .catch(function (err) {
                    console.log(err);
                  });
              }
            });
            // Ajout  de nouveaux images dans le contenu  existant de la modale
            document.querySelector("div.modal-content").appendChild(workFigure);
            // Opening work modal
            let modal = document.getElementById("modal");
            modal.style.display = "flex";
            let modalWorks = document.getElementById("modal-works");
            modalWorks.style.display = "block";
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  //Gestion de la fermeture de la modal au click à l'extérieur
  let allModalWorks = document.querySelectorAll("#modal-works")
  for(let modalWorks of allModalWorks) {
    modalWorks.addEventListener("click", function (e) {
      e.stopPropagation();
    });
    // Bloquer la fermeture de la modal edit en cliquant à l'intérieur
    let allModalEdit = document.querySelectorAll("#modal-edit");
    for(let modalEdit of allModalEdit) {
      modalEdit.addEventListener("click", function (e) {
        e.stopPropagation();
      });
      // Fermer chaque fenetre modal en cliquant à l'exterieur
      document
        .getElementById("modal")
        .addEventListener("click", function (e) {
          e.preventDefault();
          let modal = document.getElementById("modal");
          modal.style.display = "none";
          let modalWorks = document.getElementById("modal-works");
          modalWorks.style.display = "none";
          let modalEdit = document.getElementById("modal-edit");
          modalEdit.style.display = "none";
          // Reinitialiser tout form dans la modal edit
          // Supprimer image s'il en existe
          if (document.getElementById("form-image-preview") != null) {
            document.getElementById("form-image-preview").remove();
          }
          // Retour au design initial de form
          document.getElementById("modal-edit-work-form").reset();
          let iconNewPhoto = document.getElementById("photo-add-icon");
          iconNewPhoto.style.display = "block";
          let buttonNewPhoto = document.getElementById("new-image");
          buttonNewPhoto.style.display = "block";
          let photoMaxSize = document.getElementById("photo-size");
          photoMaxSize.style.display = "block";
          let modalEditPhoto = document.getElementById("modal-edit-new-photo");
          modalEditPhoto.style.padding = "30px 0 19px 0";
          document.getElementById("submit-new-work").style.backgroundColor =
            "#A7A7A7";
        });
    };
  };
  // Fermeture de la seconde modal avec le button "x"
  document
    .getElementById("button-to-close-second-window")
    .addEventListener("click", function (event) {
      event.preventDefault();
      let modal = document.getElementById("modal");
      modal.style.display = "none";
      let modalEdit = document.getElementById("modal-edit");
      modalEdit.style.display = "none";
      //Reinitialiser tout form dans la modal edit
      // Supprimer image s'il en existe
      if (document.getElementById("form-image-preview") != null) {
        document.getElementById("form-image-preview").remove();
      }
      // Retour au design initial de form
      document.getElementById("modal-edit-work-form").reset();
      let iconNewPhoto = document.getElementById("photo-add-icon");
      iconNewPhoto.style.display = "block";
      let buttonNewPhoto = document.getElementById("new-image");
      buttonNewPhoto.style.display = "block";
      let photoMaxSize = document.getElementById("photo-size");
      photoMaxSize.style.display = "block";
      let modalEditPhoto = document.getElementById("modal-edit-new-photo");
      modalEditPhoto.style.padding = "30px 0 19px 0";
      document.getElementById("submit-new-work").style.backgroundColor =
        "#A7A7A7";
    });

  // Ouvrir la fenetre modal2 avec le boutton "ajouter photo"
  document
    .getElementById("modal-edit-add")
    .addEventListener("click", function (e) {
      e.preventDefault();
      let modalWorks = document.getElementById("modal-works");
      modalWorks.style.display = "none";
      let modalEdit = document.getElementById("modal-edit");
      modalEdit.style.display = "block";
    });

  // Retour à la fenetre modal1 à travers la fleche retour
  document
    .getElementById("fleche-retour")
    .addEventListener("click", function (e) {
      e.preventDefault();
      let modalWorks = document.getElementById("modal-works");
      modalWorks.style.display = "block";
      let modalEdit = document.getElementById("modal-edit");
      modalEdit.style.display = "none";
      // Reinitialiser tout form dans la modal edit
      // Supprimer image s'il en existe
      if (document.getElementById("form-image-preview") != null) {
        document.getElementById("form-image-preview").remove();
      }
      // Reinitialiser le design de form
      document.getElementById("modal-edit-work-form").reset();
      let iconNewPhoto = document.getElementById("photo-add-icon");
      iconNewPhoto.style.display = "block";
      let buttonNewPhoto = document.getElementById("new-image");
      buttonNewPhoto.style.display = "block";
      let photoMaxSize = document.getElementById("photo-size");
      photoMaxSize.style.display = "block";
      let modalEditPhoto = document.getElementById("modal-edit-new-photo");
      modalEditPhoto.style.padding = "30px 0 19px 0";
      document.getElementById("submit-new-work").style.backgroundColor =
        "#A7A7A7";
    });

  // Fetch pour ajouter options des categorie dans la modal d'edition
  fetch("http://localhost:5678/api/categories")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      let categories = data;
      // Boucler sur chaque categorie
      for (let category of categories) {
        // Creation d'elements <option> dans la modal de modif et leur ajout a la select choix categorie
        let categorieOption = document.createElement("option");
        categorieOption.setAttribute("value", category.id);
        categorieOption.textContent = category.name;
        document
          .querySelector("select.Choix-categorie")
          .appendChild(categorieOption);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
    
  // Gestion du formulaire form
  document
    .getElementById("modal-edit-work-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append("title", document.getElementById("form-title").value);
      formData.append(
        "category",
        document.getElementById("form-category").value
      );
      formData.append("image", document.getElementById("form-image").files[0]);
      // fetch pour poster nouveau work
      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          // Creation elément <figure>
          let workFigure = document.createElement("figure");
          workFigure.setAttribute(
            "class",
            `work-item category-id-0 category-id-${json.categoryId}`);
          workFigure.setAttribute("id", `work-item-${json.id}`);
          // Creation element <img>
          let workImg = document.createElement("img");
          workImg.setAttribute("src", json.imageUrl);
          workImg.setAttribute("alt", json.title);
          workFigure.appendChild(workImg);
          // Creation element <figcaption>
          let workFigcaption = document.createElement("figcaption");
          workFigcaption.textContent = json.title;
          workFigure.appendChild(workFigcaption);
          //  Ajout de nouveau <figure> à la div.gllery existante
          document.querySelector("div.gallery").appendChild(workFigure);
          // Fermeture de la fenetre modal2
          let modal = document.getElementById("modal");
          modal.style.display = "none";
          let modalEdit = document.getElementById("modal-edit");
          modalEdit.style.display = "none";
          //  Reinitialiser tout le formulaire dans la modal2
          // Rétirer eventuellement image existant
          if (document.getElementById("form-image-preview") != null) {
            document.getElementById("form-image-preview").remove();
          }
          // Retour au design initial de form
          document.getElementById("modal-edit-work-form").reset();
          let iconNewPhoto = document.getElementById("photo-add-icon");
          iconNewPhoto.style.display = "block";
          let buttonNewPhoto = document.getElementById("new-image");
          buttonNewPhoto.style.display = "block";
          let photoMaxSize = document.getElementById("photo-size");
          photoMaxSize.style.display = "block";
          let modalEditPhoto = document.getElementById("modal-edit-new-photo");
          modalEditPhoto.style.padding = "30px 0 19px 0";
          document.getElementById("submit-new-work").style.backgroundColor =
            "#A7A7A7";
        })
        .catch(function (err) {
          console.log(err);
        });
    });

  // Vérifier le poids de fichiers image
	document.getElementById('form-image').addEventListener('change', () => {
		let fileInput = document.getElementById('form-image');
		const maxFileSize = 4194304; // 4MB
		if(fileInput.files[0].size > maxFileSize) {
			alert("Le fichier sélectionné est trop volumineux. La taille maximale est de 4 Mo.");
			document.getElementById('form-image').value = '';
		}
		else {
			if(fileInput.files.length > 0) {
        // Creation de l'aperçu de l'image
				let myPreviewImage = document.createElement('img');
				myPreviewImage.setAttribute('id','form-image-preview');
				myPreviewImage.src = URL.createObjectURL(fileInput.files[0]);
				document.querySelector('#modal-edit-new-photo').appendChild(myPreviewImage);
				myPreviewImage.style.display = "block";	
				myPreviewImage.style.height ="169px";
				let iconNewPhoto = document.getElementById('photo-add-icon');
				iconNewPhoto.style.display= "none";
				let buttonNewPhoto = document.getElementById('new-image');
				buttonNewPhoto.style.display= "none";
				let photoMaxSize = document.getElementById('photo-size');
				photoMaxSize.style.display= "none";	
				let modalEditPhoto = document.getElementById('modal-edit-new-photo');
				modalEditPhoto.style.padding = "0";
			}
		}
	});

  // Création de la fonction checkNewProjectFields() vérifiant les champs images, titre et catégorie
	function checkNewProjectFields() {
    let title = document.getElementById('form-title');
		let category = document.getElementById('form-category');
		let image = document.getElementById('form-image');
		let submitWork = document.getElementById('submit-new-work');
		if(title.value.trim() === "" || category.value.trim() === "" || image.files.length === 0) {
      submitWork.style.backgroundColor= "#A7A7A7";
		} else {
      submitWork.style.backgroundColor= "#1D6154";
		}
	};
  // Lier la fonction checkNewProjectFields() sur les 3 champs en écoutant les événements "input
  document.getElementById('form-title').addEventListener('input', checkNewProjectFields);
  document.getElementById('form-category').addEventListener('input', checkNewProjectFields);
  document.getElementById('form-image').addEventListener('input', checkNewProjectFields);
});
