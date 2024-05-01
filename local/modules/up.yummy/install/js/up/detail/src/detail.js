import {Type, Tag} from 'main.core';

export class Detail
{
	constructor(options = {})
	{
		this.user = options.user;
		this.recipe = options.recipe;
		this.likeBtn = document.getElementById('like_btn')
		this.featuredBtn = document.getElementById('add_to_featured_btn')
		this.likeBtn.addEventListener('click', () => {
			this.like(this.user, this.recipe).then(r => this.reload());
		});
		this.featuredBtn.addEventListener('click', () => {
			this.addToFeatured(this.user, this.recipe).then(r => this.reload());
		});
		this.reload();
	}

	reload() {
		this.loadLikesCount(this.recipe)
			.then(likesCount => {
				this.likesCount = likesCount;
				this.render();
			});
		this.isRecipeLiked(this.user, this.recipe)
			.then(isLiked => {
				this.isLiked = isLiked;
				this.render();
			});
		this.isRecipeInFeatured(this.user, this.recipe)
			.then(isFeatured => {
				this.isFeatured = isFeatured;
				this.render();
			});
	}
	like(user, recipe) {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
				'up:yummy.detail.like',
				{
					data: {
						recipe: recipe,
						user: user,
					}
				})
				.then((response) => {
					console.log('success');
				})
				.catch((error) => {
					console.error(error);
				})
			;
		});
	}

	addToFeatured(user, recipe) {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
				'up:yummy.detail.addToFeatured',
				{
					data: {
						recipe: recipe,
						user: user,
					}
				})
				.then((response) => {
					console.log('success');
				})
				.catch((error) => {
					console.error(error);
				})
			;
		});
	}
	loadLikesCount(recipe)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
				'up:yummy.detail.getLikesCount',
				{
					data: {
						recipe: recipe,
					}
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					console.error(error);
				})
			;
		});
	}
	isRecipeLiked(user, recipe)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
				'up:yummy.detail.isRecipeLiked',
				{
					data: {
						user: user,
						recipe: recipe,
					}
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					console.error(error);
				})
			;
		});
	}

	isRecipeInFeatured(user, recipe)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
				'up:yummy.detail.isRecipeInFeatured',
				{
					data: {
						user: user,
						recipe: recipe,
					}
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					console.error(error);
				})
			;
		});
	}
	render() {
		const counter = document.getElementById('likes_counter');
		counter.innerHTML = '';
		const likesNumber = Tag.render`<p>${this.likesCount} ❤</p>`;
		counter.appendChild(likesNumber);
		if(this.isLiked === true){
			this.likeBtn.className = `button is-danger`;
		}
		else if (this.isLiked === false){
			this.likeBtn.className = `button is-success`;
		}

		if(this.isFeatured === true){
			this.featuredBtn.className = `button is-danger`;
			this.featuredBtn.textContent = `Убрать из избранного`;
		}
		else if (this.isFeatured === false){
			this.featuredBtn.className = `button is-success`;
			this.featuredBtn.textContent = `В избранное`;
		}
		this.reload();
	}
}
