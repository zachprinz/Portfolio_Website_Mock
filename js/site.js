Site = function(){
	this.series = [50];
	this.seriesCount = 0;
	this.parse();
	this.currentSeries = 0;
};

Site.prototype = {
	parse: function(){
		var client = new XMLHttpRequest();
		var xmlDoc;
		client.open('GET',"http://snag.azurewebsites.net/website.xml",false);
		client.send();
		var siteInfo = (client.responseXML);
		var seriesLength = parseInt(siteInfo.getElementsByTagName("site")[0].getAttribute("length"));
		for(var x = 0; x < seriesLength; x++){
			var tempSeries = new Series();
			tempSeries.name = siteInfo.getElementsByTagName("series")[x].getAttribute("name");
			tempSeries.description = siteInfo.getElementsByTagName("series")[x].getAttribute("description");
			tempSeries.imagesXML = siteInfo.getElementsByTagName("series")[x].childNodes;
			for(var y = 0; y < tempSeries.imagesXML.length; y++){
				var tempImage = new Image();
				tempImage.name = tempSeries.imagesXML[x].getAttribute("name");
				tempImage.description = tempSeries.imagesXML[x].getAttribute("description");
				tempImage.path = tempSeries.imagesXML[x].getAttribute("path");
				tempSeries.addImage(tempImage);
			}
			this.series[this.seriesCount] = tempSeries;
			this.seriesCount++;
		}
	},
	shiftUp: function(){
		if(this.series[this.currentSeries].currentImage < (this.series[this.currentSeries].imageCount - 1))
			this.series[this.currentSeries].currentImage++;
	},
	shiftDown: function(){
		if(this.series[this.currentSeries].currentImage > 0)
			this.series[this.currentSeries].currentImage--;
	},
	shiftLeft: function(){
		if(this.currentSeries > 0)
			this.currentSeries--;
	},
	shiftRight: function(){
		if(this.currentSeries < (this.seriesCount - 1))
			this.currentSeries++;
	},
	getImage: function(){
		var currentImage = this.series[this.currentSeries].currentImage;
		return this.series[this.currentSeries].images[currentImage].image;
	}
}