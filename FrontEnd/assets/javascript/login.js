

// Exécution de code JS une fois que la page est chargée
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('login-form').addEventListener('submit', function(e) {
		e.preventDefault();
		//Récupération des données du formulaire form
		const user = {
			email: document.querySelector('#email').value,
			password: document.querySelector('#password').value,
		};
		// Requette pour se logger
		fetch("http://localhost:5678/api/users/login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user),
		})
		.then(function(response) {
			if ((response.status === 401) || (response.status === 404)){
				alert("Email ou mot de passe erronné !");
			}else if(response.status === 200){
				return response.json();
			};
			
		})
		.then(function(data) {
			localStorage.setItem('token', data.token);
			localStorage.setItem('userId', data.userId);
			// Redirect to 'index.html'
			location.href = 'index.html';			
		})
		.catch(function(err) {
			console.log(err);
		});
	});
});