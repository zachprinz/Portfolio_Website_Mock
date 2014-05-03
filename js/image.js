SeriesImage = function(series){
	this.name;
	this.description;
	this.path;
	this.image = new Image();
	this.series = series;
	var series = series;
	this.image.addEventListener("load", function() {
		console.log("image loaded");
		series.site.updateDraw();
	}, false);
}

SeriesImage.prototype = {
	setup: function(){
		this.image.src = 'js/images/' + this.path;
	}
}