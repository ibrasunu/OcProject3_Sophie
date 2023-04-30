
//Récupération du tableau de projets disponibles
    getWorks();
async function getWorks() {
    let works = await fetch('http://localhost:5678/api/works');    
    return works.json();
}

//Création des projets via la liste récupérée précédemment
    creationWorks();

async function creationWorks() {
    let result = await getWorks()
    .then( (work) => {
    for (let i=0; i < work.length; i++) {               

        // Insertion de l'élément "figure"
        let workFigure = document.createElement("figure");
        document.querySelector(".gallery").appendChild(workFigure);        

    // Insertion de l'élément "img"
        let workImg = document.createElement("img");
        workFigure.appendChild(workImg);
        workImg.src = work[i].imageUrl;
        workImg.alt = work[i].title;       

    // Insertion du titre "figcation"
        let workFigcaption = document.createElement("figcaption");
            workFigure.appendChild(workFigcaption);             
            workFigcaption.innerHTML = work[i].title;
        }

    });
}
