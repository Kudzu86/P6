document.addEventListener('DOMContentLoaded', () => {
    // Étape 1 : Récupérer le film le mieux noté
    fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
        .then(response => response.json())
        .then(data => {
            const bestFilm = data.results[0]; // On prend le film avec la meilleure note
            const filmDetailsUrl = bestFilm.url; // On récupère l'URL des détails du film

            // Étape 2 : Faire une nouvelle requête pour obtenir les détails du film
            fetch(filmDetailsUrl)
                .then(response => response.json())
                .then(filmDetails => {
                    // Étape 3 : Mettre à jour la page avec les informations du film
                    updateBestFilm(filmDetails);
                })
                .catch(error => console.error('Erreur lors de la récupération des détails du film:', error));
        })
        .catch(error => console.error('Erreur lors de la récupération du meilleur film:', error));
});

function updateBestFilm(film) {
    // Mise à jour de l'image
    const imgElement = document.querySelector('.film-image img');
    imgElement.src = film.image_url;
    imgElement.alt = `Image de couverture de ${film.title}`;
    imgElement.title = `Image de couverture de ${film.title}`;

    // Mise à jour du lien de l'image pour ouvrir en plein écran
    const imgLink = document.querySelector('.film-image a');
    imgLink.href = film.image_url;

    // Mise à jour du titre
    document.querySelector('.film-description h1').textContent = film.title;
    
    // Mise à jour de la description
    document.querySelector('.film-description p').textContent = film.description;
    
    // Mise à jour du lien "Détails"
    const detailsLink = document.querySelector('.film-description .bouton_details1');
    detailsLink.href = film.url;
}

