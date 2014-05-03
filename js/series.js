Series = function(){
	this.name;
	this.description;
	this.imagesXML;
	this.images = [50];
	this.imageCount = 0;
	this.currentImage = 0;
};

Series.prototype = {
	addImage: function(image){
		this.images[this.imageCount] = image;
		this.imageCount++;
	},
}