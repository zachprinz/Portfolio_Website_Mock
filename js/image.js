SeriesImage = function(){
	this.name;
	this.description;
	this.path;
	this.image = new Image();
}

SeriesImage.prototype = {
	setup: function(){
		this.image.src = 'images/' + this.path;
	}
}