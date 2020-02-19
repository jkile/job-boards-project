function recipe() {
	var recipe = 'chicken';

	if (recipe !== '') {
		$.ajax({
			url:
				'https://api.edamam.com/search?q=' +
				recipe +
				'&app_key=874f851dcc3dd7631f7bf9660c6a2943&app_id=787163bd',
			method: 'GET',
		}).then(function(data) {
			for (i = 0; i < 5; i++) {
				let recipeUrl = data.hits[i].recipe.url;
				let recipeLabel = data.hits[i].recipe.label;
                let recipeImage = data.hits[i].recipe.image;
				console.log(recipeLabel);
			}
		});
	}
}

recipe();

