Series = function(site){
	this.name;
	this.description;
	this.imagesXML;
	this.images = [50];
	this.imageCount = 0;
	this.currentImage = 0;
	this.loadedImages = 0;
	this.site = site;
};

Series.prototype = {
	addImage: function(image){
		this.images[this.imageCount] = image;
		this.imageCount++;
	},
	getImage: function(x){
		return this.images[this.currentImage + x].image;
	}
}