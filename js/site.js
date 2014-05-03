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
		client.open('GET',"js/xml/website.xml",false);//"http://lavelle.azurewebsites.net/js/xml/website.xml",false);
		client.send();
		var siteInfo = (client.responseXML);
		var seriesLength = parseInt(siteInfo.getElementsByTagName("site")[0].getAttribute("length"));
		for(var x = 0; x < seriesLength; x++){
			var tempSeries = new Series();
			tempSeries.name = siteInfo.getElementsByTagName("series")[x].getAttribute("name");
			tempSeries.description = siteInfo.getElementsByTagName("series")[x].getAttribute("description");
			tempSeries.imagesXML = siteInfo.getElementsByTagName("series")[x].childNodes;
			console.log("Series: " + x);
			for(var y = 0; y < tempSeries.imagesXML.length; y++){
				console.log("Image: " + y);
				var tempImage = new SeriesImage();
				tempImage.name = tempSeries.imagesXML[y].getAttribute("name");
				tempImage.description = tempSeries.imagesXML[y].getAttribute("description");
				tempImage.path = tempSeries.imagesXML[y].getAttribute("path");
				tempImage.setup();
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