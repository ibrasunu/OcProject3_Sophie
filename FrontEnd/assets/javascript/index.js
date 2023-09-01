
 // Récupération du tableau de projets disponibles

fetch("http://localhost:5678/api/works")
    .then (response => response.json())
    .then( (works) => {
        for (let i=0; i < works.length; i++) {
            //   Insertion de l'élément "figure"
        const worksContainer = document.querySelector(".gallery");
        let workFigure = document.createElement("figure");
        worksContainer.appendChild(workFigure);        

    // Insertion de l'élément "img"
        let workImg = document.createElement("img");
        workFigure.appendChild(workImg);
        workImg.src = works[i].imageUrl;
        workImg.alt = works[i].title;       

    // Insertion du titre "figcation"
        let workFigcaption = document.createElement("figcaption");
        workFigure.appendChild(workFigcaption);             
        workFigcaption.innerHTML = works[i].title;


    }
    // function displayWorks(category) {
    //   const worksContainer = document.querySelector(".gallery");
    //   let filteredWorks = work.filter(work => work.category === category);
    //   let workHTML = '';
    //       filteredWorks.forEach(work => {
    //         workHTML += `<figure>
    //                         <img src="${work.imageUrl}" alt="${work.title}">
    //                         <figcaption>${work.title}</figcaption>
    //                       </figure>`
    //                     });
    //         worksContainer.innerHTML = workHTML;
    //     }

    //         // Afficher tous les produits par défaut
    //       displayWorks('');

    //     // Ajouter des événements aux boutons de filtre
    //     filterButtons.forEach(button => {
    //       button.addEventListener('click', () => {
    //         const category = button.dataset.category;
    //         displayWorks(category);
    //       });
    //     });

     })

const filters = ['Tous', 'Objets', 'Appartement ', 'Hotels et restaurants'];
const filterContainer = document.querySelector('#filters');
filters.forEach(filter =>{
    const btn = document.createElement('button');
    btn.textContent = filter;
    btn.style.backgroundColor = 'white';
    btn.style.color = '1D6154';
})