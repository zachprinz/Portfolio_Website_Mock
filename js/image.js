SeriesImage = function(){
	this.name;
	this.description;
	this.path;
	this.image = new Image();
	this.image.src = 'images/' + this.path;
}

SeriesImage.prototype = {

}